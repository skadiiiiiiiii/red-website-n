import assert from 'node:assert/strict';
import {readFile,readdir} from 'node:fs/promises';
import {byPath,exhibits,exhibitGroups,peopleRegisters,recordImages,matchesRecord} from '../src/data/exhibits.js';

assert.equal(byPath.size,exhibits.length,'Unique exhibit paths');
const important=group=>exhibitGroups[group].records.filter(record=>record.priority==='important').length;
for(const [group,count] of [['history',3],['people',9],['museums',6]])assert.equal(important(group),count);
function verifySources(sources,sections) {
 const ids=new Set(sources.map(source=>source.id));
 assert.equal(ids.size,sources.length);
 assert.ok(sources.length);
 for(const source of sources)assert.equal(new URL(source.url).protocol,'https:');
 for(const section of sections){
  assert.ok(section.refs?.length);
  for(const id of section.refs)assert.ok(ids.has(id),id);
 }
}
for(const record of exhibits){
 assert.ok(record.title&&record.summary&&record.sections.length,record.path);
 verifySources(record.sources,[...record.sections,...(record.timeline??[])]);
 for(const path of record.related??[])assert.ok(byPath.has(path),record.path+' → '+path);
}
for(const group of peopleRegisters) {
 verifySources(group.sources,group.entries);
 for(const item of group.entries)if(item.to)assert.ok(byPath.has(item.to),item.to);
}
assert.ok(exhibits.filter(record=>matchesRecord(record,'董振堂')).some(record=>record.path==='/people/dong-zhentang'));
for(const [path,images] of Object.entries(recordImages)){
 assert.ok(byPath.has(path),path);
 for(const image of images){
  assert.ok(image.alt&&image.credit&&image.source,'Images retain their description, credit and source');
  if(image.licenseUrl)assert.ok(image.license&&image.licenseUrl.startsWith('https://'));
  for(const path of [image.path,image.originalPath].filter(Boolean)){
   const source=await readFile('public/'+path);
   assert.deepEqual(await readFile('dist/'+path),source,path);
   assert.equal(source[0],0xff);
   assert.equal(source[1],0xd8);
  }
 }
}
const assetNames=await readdir('dist/assets');
const html=await readFile('dist/index.html','utf8');
for(const [,href] of html.matchAll(/(?:src|href)="([^"]+)"/g)){
 assert.ok(href.startsWith('./assets/')&&assetNames.includes(href.slice(9)),href);
}
console.log('PASS: '+exhibits.length+' records, 18 priority dossiers, '+peopleRegisters.length+' registers, citations, related routes, local photo bytes and relative build references.');
const gallerySource=await readFile('src/components/HeroGallery.jsx','utf8');
const cardPaths=[...gallerySource.matchAll(/'(\/(?:history|museums)\/[a-z-]+)'/g)].map(match=>match[1]);
assert.equal(new Set(cardPaths).size,9,'Nine distinct curated cards');
for(const path of cardPaths){
 const record=byPath.get(path);
 assert.ok(record&&record.sections.length>=2&&record.sources.length,path+' must open an existing sourced article');
}
console.log('PASS: all 9 cinematic cards resolve to substantive, sourced dossiers.');
