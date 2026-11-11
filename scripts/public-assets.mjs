// Copied into the upload folder as scripts/public-assets.mjs.
// Only Node built-ins are used, on Windows and Cloudflare's Linux builder.
import {readFile,writeFile,mkdir,readdir,lstat} from 'node:fs/promises';
import {resolve,dirname,relative,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {gzipSync,gunzipSync} from 'node:zlib';
import {createHash} from 'node:crypto';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const publicRoot=resolve(root,'public');
const archive=resolve(root,'public-assets.json.gz');
const hash=data=>createHash('sha256').update(data).digest('hex');
function destination(name){
 if(typeof name!=='string'||name.includes('\\')||name.includes(':')||name.includes('\0')||name.split('/').some(p=>!p||p==='.'||p==='..'))throw new Error('Unsafe asset path');
 const target=resolve(publicRoot,name);
 if(!target.startsWith(publicRoot+sep))throw new Error('Asset outside public directory');
 return target;
}
async function ensureParents(target){
 let current=publicRoot;
 for(const segment of ['.',...relative(publicRoot,dirname(target)).split(sep).filter(Boolean)]){
  current=resolve(current,segment);
  await mkdir(current,{recursive:true});
  const stat=await lstat(current);
  if(stat.isSymbolicLink()||!stat.isDirectory())throw new Error('Asset directory must be a regular directory');
 }
}
async function collect(dir){
 const entries=[];
 for(const item of (await readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))){
  if(item.isSymbolicLink())throw new Error('Symlinks cannot be packed');
  const full=resolve(dir,item.name);
  if(item.isDirectory())entries.push(...await collect(full));
  else if(item.isFile()){
   const data=await readFile(full);
   const path=relative(publicRoot,full).split(sep).join('/');
   destination(path);
   entries.push({path,sha256:hash(data),base64:data.toString('base64')});
  }
 }
 return entries;
}
if(process.argv.includes('--pack')){
 const files=await collect(publicRoot);
 if(!files.length)throw new Error('Refusing to replace the asset bundle with an empty directory');
 await writeFile(archive,gzipSync(JSON.stringify({format:1,files}),{level:9}));
 console.log(`Packed ${files.length} public assets.`);
}else{
 const bundle=JSON.parse(gunzipSync(await readFile(archive),{maxOutputLength:128*1024*1024}));
 if(bundle.format!==1||!Array.isArray(bundle.files))throw new Error('Unsupported asset bundle');
 let written=0,retained=0;
 const seen=new Set();
 for(const entry of bundle.files){
  const target=destination(entry.path);
  if(seen.has(entry.path))throw new Error('Duplicate asset path');
  seen.add(entry.path);
  const data=Buffer.from(entry.base64,'base64');
  if(hash(data)!==entry.sha256)throw new Error(`Corrupted asset: ${entry.path}`);
  await ensureParents(target);
  // Existing local files may be user edits. Never overwrite them automatically.
  try{
   const stat=await lstat(target);
   if(stat.isSymbolicLink()||!stat.isFile())throw new Error('Asset must be a regular file');
   if(hash(await readFile(target))!==entry.sha256)retained++;
  }catch(error){
   if(error.code!=='ENOENT')throw error;
   await writeFile(target,data,{flag:'wx'});written++;
  }
 }
 console.log(`Restored ${written} of ${bundle.files.length} public assets.`);
 if(retained)console.log(`Kept ${retained} locally edited assets. Run npm run assets:pack to include those edits in Git.`);
}
