import {personResearchPhoto} from '../data/researchPortraits.js';
import PortraitPlaceholder from './PortraitPlaceholder.jsx';
import {exhibitIllustration,exhibitPhotos} from '../data/exhibitMedia.js';
import ArchiveImage from './ArchiveImage.jsx';
import {ImageCredit} from './ExhibitDetail.jsx';
import PeopleRegisters from './PeopleRegisters.jsx';
import {Link,useSearchParams} from 'react-router-dom';
import {exhibits,exhibitGroups,levels,matchesRecord,localImage,recordImages} from '../data/exhibits.js';

export function ExhibitSelect({label,value,onChange,options}) {
 return <label className="exhibit-select"><span>{label}</span>
  <select value={value} onChange={e=>onChange(e.target.value)}>
   <option value="">全部</option>
   {options.map(([key,name])=><option key={key} value={key}>{name}</option>)}
  </select>
 </label>;
}
export function optionsFor(records,key) {
 return [...new Set(records.map(record=>record[key]).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'zh-CN')).map(value=>[value,value]);
}
export function useExhibitFilters() {
 const [params,setParams]=useSearchParams();
 const set=(key,value)=>setParams(previous=>{
  const next=new URLSearchParams(previous);
  if(value)next.set(key,value);else next.delete(key);
  if(key!=='point')next.delete('point');
  return next;
 },{replace:true});
 return {params,set,reset:()=>setParams({}, {replace:true})};
}
export default function ExhibitIndex({group}) {
 const meta=exhibitGroups[group];
 const records=group?exhibits.filter(record=>record.group===group):exhibits;
 const {params,set,reset}=useExhibitFilters();
 const q=params.get('q')??'', theme=params.get('theme')??'', region=params.get('region')??'', level=params.get('level')??'', category=params.get('group')??'', facility=params.get('facility')??'';
 const filtered=records.filter(record=>matchesRecord(record,q)&&(!theme||record.theme===theme)&&(!region||record.region===region)&&(!level||record.priority===level)&&(!category||record.group===category)&&(!facility||record.type===facility));
 return <main className={'exhibit-v2 exhibit-index exhibit-index-'+(group??'search')}>
  <header className="exhibit-masthead">
   <div className="exhibit-kicker">LONGYUAN / {meta?.english??'COLLECTION INDEX'} <span>{meta?.number??'00'}</span></div>
   <h1>{meta?.title??'全馆检索'}</h1><p>{meta?.description??'检索历史专题、人物档案、场馆名录与地区。'}</p>
  </header>
  <section className="exhibit-reading">
   {group==='people'&&<p className="exhibit-note">已收录人物名录。当前按有公开依据的人物建档，群体名录和人数口径另行核实。</p>}
   <div className="exhibit-filters">
    <label className="exhibit-select"><span>关键词</span><input type="search" placeholder="标题、地点或内容" value={q} onChange={e=>set('q',e.target.value)}/></label>
    {!group&&<ExhibitSelect label="板块" value={category} onChange={v=>set('group',v)} options={Object.entries(exhibitGroups).map(([key,value])=>[key,value.title])}/>}
    <ExhibitSelect label="历史主题" value={theme} onChange={v=>set('theme',v)} options={optionsFor(records,'theme')}/>
    <ExhibitSelect label="地区" value={region} onChange={v=>set('region',v)} options={optionsFor(records,'region')}/>
    {group==='museums'&&optionsFor(records,'type').length>0&&<ExhibitSelect label="设施类别" value={facility} onChange={v=>set('facility',v)} options={optionsFor(records,'type')}/>}
    <ExhibitSelect label="重要等级" value={level} onChange={v=>set('level',v)} options={Object.entries(levels)}/>
    <button className="v2-reset" onClick={reset}>清除筛选</button>
   </div>
   <p role="status" className="exhibit-count">展馆索引 / {filtered.length} 项</p>
   <div className="exhibit-catalog">
    {filtered.map(record=>group==='people'?<PersonCard key={record.path} record={record} returnTo={'/people'+(params.toString()?'?'+params:'')}/>:<Link key={record.path} className="exhibit-entry" to={record.path} state={{returnTo:'/'+(group??'search')+(params.toString()?'?'+params:'')}}>
     <ExhibitCover record={record}/>
     <span className="exhibit-entry-label">{levels[record.priority]} / {record.region}</span>
     <h2>{record.title}</h2>
     {(record.group==='museums'||record.group==='history')&&<p className="exhibit-entry-subtitle">{record.subtitle}</p>}
     <p>{record.summary}</p><span className="exhibit-entry-action">阅读档案 ↗</span>
    </Link>)}
   </div>
   {!filtered.length&&<p className="exhibit-note">没有符合当前条件的记录。</p>}
  {group==='people'&&<PeopleRegisters query={q} theme={theme} region={region} level={level}/>}
  </section>
 </main>;
}

function ExhibitCover({record}){
 if(record.group==='people')return null;
 const photo=exhibitPhotos(record)?.[0];
 const art=exhibitIllustration(record);
 if(!photo&&!art)return null;
 return <figure className="history-index-image">
  <ArchiveImage src={photo?localImage(photo):art.src} alt={photo?.alt??art.caption}/>
  <figcaption>{photo?photo.alt:art.caption}</figcaption>
 </figure>;
}

function PersonCard({record,returnTo}){
 const portrait=recordImages[record.path]?.[0]??personResearchPhoto(record.id);
 const milestone=record.timeline?.[0];
 return <article className={'profile-card '+(portrait?'has-portrait':'')}>
  <Link className="profile-identity" to={record.path} state={{returnTo}}>
   {portrait?<ArchiveImage src={localImage(portrait)} alt={portrait.alt}/>:<PortraitPlaceholder/>}
   <div><span className="exhibit-entry-label">{record.theme} / {record.region}</span><h2>{record.title}</h2><p>{record.subtitle}</p></div>
  </Link>
  <div className="profile-story">
   <p>{record.summary}</p>
   {record.sections[0]&&<p className="profile-context"><strong>{record.sections[0].title}</strong> · {record.sections[0].text}</p>}
   {milestone&&<p className="profile-milestone"><time>{milestone.date}</time> {milestone.text}</p>}
   <Link to={record.path} state={{returnTo}} className="exhibit-entry-action">展开生平与史料 ↗</Link>
   {portrait&&<details className="profile-credit"><summary>肖像资料与来源</summary><ImageCredit image={portrait}/></details>}
  </div>
 </article>;
}
