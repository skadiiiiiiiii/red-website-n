import {exhibitIllustration,exhibitPhotos} from '../data/exhibitMedia.js';
import MarchChronology from './MarchChronology.jsx';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {exhibits,levels,localImage,matchesRecord,relatedRecords} from '../data/exhibits.js';
import {ExhibitSelect,optionsFor,useExhibitFilters} from './ExhibitIndex.jsx';
import {ImageCredit} from './ExhibitDetail.jsx';
import ArchiveImage from './ArchiveImage.jsx';

const sites=exhibits.filter(record=>record.group==='museums').map(record=>({...record,priority:record.mapPriority??record.priority}));
const routes=[
 {label:'长征入甘',ids:['ejie','cirina','lazikou','hadapu','minzhou','bangluo','jieshipu','huining']},
 {label:'南梁与根据地',ids:['nanliang','helianwan','taozhou']},
 {label:'河西走廊',ids:['gulang','gaotai','linze','liyuankou','gao-jincheng']},
];
function MapDiagram({records,active,choose}) {
 const known=new Set(routes.flatMap(route=>route.ids));
 const lanes=[...routes,{label:'其他纪念地点',ids:records.map(record=>record.id).filter(id=>!known.has(id))}];
 const groups=lanes.map(lane=>({...lane,points:lane.ids.map(id=>records.find(record=>record.id===id)).filter(Boolean)})).filter(lane=>lane.points.length);
 return <div className="red-map-scroll" tabIndex={0} aria-label="可滚动的主题线路图">
  <div className="red-map-diagram">
   {groups.map(lane=><section className="red-map-lane" key={lane.label}>
    <h2>{lane.label}</h2>
    <svg viewBox="0 0 600 34" preserveAspectRatio="none" aria-hidden="true"><path d="M0 20 C120 20 130 8 245 8 S400 27 490 27 L600 27"/></svg>
    <div className="red-map-pins">{lane.points.map(point=><button type="button" key={point.id} onClick={()=>choose(point.id)} aria-pressed={active?.id===point.id} className={'map-pin '+(point.priority==='important'?'is-key':'')}>
     <span className="map-pin-dot" aria-hidden="true"/>{point.district||point.region}<small>{point.title}</small>
    </button>)}</div>
   </section>)}
  </div>
 </div>;
}
export default function RedMap(){
 const {params,set,reset}=useExhibitFilters();
 const [listMode,setListMode]=useState(false);
 const q=params.get('q')??'',theme=params.get('theme')??'',region=params.get('region')??'',level=params.get('level')??'';
 const filtered=sites.filter(record=>matchesRecord(record,q)&&(!theme||record.theme===theme)&&(!region||record.region===region)&&(!level||record.priority===level));
 const active=filtered.find(record=>record.id===params.get('point'))??filtered[0];
 const photo=active&&exhibitPhotos(active)?.[0];
 const art=active&&exhibitIllustration(active);
 const related=active?relatedRecords(active).filter(record=>record.group==='history'):[];
 return <main className="exhibit-v2 red-map">
  <header className="exhibit-masthead"><div className="exhibit-kicker">LONGYUAN / RED ROUTES <span>04</span></div><h1>红色地图</h1><p>循主题寻找陇原革命旧址、纪念馆和烈士纪念设施。</p></header>
  <section className="exhibit-reading"><MarchChronology/>
   <h2 className="map-directory-heading">旧址与纪念场馆</h2><p className="exhibit-note">本图是主题线路示意。节点按展览主题组织，连线表示阅读关联。位置与间距均为版面安排，不能用于导航或还原行军轨迹。</p>
   <div className="exhibit-filters">
    <label className="exhibit-select"><span>搜索地点</span><input type="search" value={q} placeholder="地点、场馆或地区" onChange={e=>set('q',e.target.value)}/></label>
    <ExhibitSelect label="历史主题" value={theme} onChange={v=>set('theme',v)} options={optionsFor(sites,'theme')}/>
    <ExhibitSelect label="地市" value={region} onChange={v=>set('region',v)} options={optionsFor(sites,'region')}/>
    <ExhibitSelect label="重要等级" value={level} onChange={v=>set('level',v)} options={Object.entries(levels)}/>
    <button className="v2-reset" onClick={reset}>清除筛选</button>
   </div>
   <p role="status" className="exhibit-count">红色地图 / {filtered.length} 个地点</p>
   <div className="red-map-layout">
    <div className="red-map-canvas">
     <div className="map-toolbar"><button onClick={()=>setListMode(mode=>!mode)} aria-pressed={listMode}>{listMode?'切换线路图':'切换列表'}</button>
     </div>
     {!listMode&&filtered.length>0&&<MapDiagram records={filtered} active={active} choose={id=>set('point',id)}/>}
     {listMode&&<ul className="red-map-list">{filtered.map(point=><li key={point.id}><button onClick={()=>set('point',point.id)} aria-pressed={active?.id===point.id}>{point.title} <small>{point.region}</small></button></li>)}</ul>}
     {!filtered.length&&<p className="map-empty">没有符合当前筛选的地点。</p>}
    </div>
    {active&&<aside className="red-map-info" aria-live="polite">
     <span className="exhibit-entry-label">{levels[active.priority]} / {active.region}</span>
     <h2>{active.title}</h2>
     {photo?<figure><ArchiveImage key={photo.path} src={localImage(photo)} alt={photo.alt}/><figcaption><ImageCredit image={photo}/></figcaption></figure>:art?<figure><ArchiveImage key={art.src} src={art.src} alt={art.caption} loading="eager"/><figcaption>{art.caption}</figcaption></figure>:<p className="exhibit-note">场馆影像待补充</p>}
     <p>{active.summary}</p>
     {active.address&&<p>{active.address}</p>}
     {related.map(record=><Link key={record.path} to={record.path}>{record.title} ↗</Link>)}
     <Link className="map-read" to={active.path} state={{returnTo:'/map?'+new URLSearchParams({...Object.fromEntries(params),point:active.id})}}>进入场馆档案 ↗</Link>
    </aside>}
   </div>
   {!listMode&&<details className="map-access-list"><summary>文字点位索引</summary><ul>{filtered.map(point=><li key={point.id}><Link to={point.path} state={{returnTo:'/map?'+new URLSearchParams({...Object.fromEntries(params),point:point.id})}}>{point.title}</Link></li>)}</ul></details>}
  </section>
 </main>;
}
