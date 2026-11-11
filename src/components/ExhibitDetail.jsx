import {personResearchPhoto} from '../data/researchPortraits.js';
import PortraitPlaceholder from './PortraitPlaceholder.jsx';
import {exhibitIllustration,exhibitPhotos} from '../data/exhibitMedia.js';
import {useState} from 'react';
import {Link,useLocation,useParams} from 'react-router-dom';
import {byPath,exhibitGroups,levels,localImage,relatedRecords} from '../data/exhibits.js';
import {illustrations} from '../data/content.js';
import ArchiveImage from './ArchiveImage.jsx';
import Modal from './Modal.jsx';
import {useCinematic} from './CinematicExperience.jsx';

export function ImageCredit({image}) {
 return <span className="image-credit">{image.credit} · <a href={image.source} target="_blank" rel="noreferrer">原始文件</a>{image.licenseUrl&&<> · <a href={image.licenseUrl} target="_blank" rel="noreferrer">{image.license}</a></>} · {image.processing??'未修复'}</span>;
}
function ExhibitGallery({images}) {
 const [active,setActive]=useState(null);
 const move=step=>setActive(index=>(index+step+images.length)%images.length);
 return <section className="exhibit-gallery" aria-label="图像资料">
  <h2>图像资料</h2>
  <div className="exhibit-photo-grid">{images.map((image,index)=><figure key={image.path}>
   <button type="button" onClick={()=>setActive(index)} aria-label={'放大：'+image.alt}>
    <ArchiveImage src={localImage(image)} alt={image.alt} width={image.width??1000} height={image.height??640}/>
   </button>
   <figcaption>{image.alt}<br/><ImageCredit image={image}/></figcaption>
  </figure>)}</div>
  {active!==null&&<Modal title="图像资料" className="lightbox exhibit-lightbox" onClose={()=>setActive(null)} onKeyDown={e=>{
   if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowLeft'?-1:1)}
  }}>
   <ArchiveImage key={images[active].path} src={localImage(images[active])} alt={images[active].alt} loading="eager"/>
   <div className="lightbox-controls">
    <button onClick={()=>move(-1)} disabled={images.length<2}>← 上一张</button>
    <div aria-live="polite">{active+1} / {images.length} · {images[active].alt}<br/><ImageCredit image={images[active]}/></div>
    <button onClick={()=>move(1)} disabled={images.length<2}>下一张 →</button>
   </div>
  </Modal>}
 </section>;
}
function ExhibitTimeline({timeline,refs}) {
 if(!timeline?.length)return null;
 return <section className="exhibit-milestones"><h2>时间坐标</h2><ol>{timeline.map((item,index)=>
  <li key={index}><strong>{item.date}</strong><span>{item.text} <Citations ids={item.refs} refs={refs}/></span></li>
 )}</ol></section>;
}
function Citations({ids,refs}) {
 return (ids??[]).map(id=>refs.has(id)&&<a key={id} className="exhibit-citation" href={refs.get(id).url} target="_blank" rel="noreferrer" aria-label={'参考资料 '+refs.get(id).number}>[{refs.get(id).number}]</a>);
}
export default function ExhibitDetail({group}) {
 const {returnToArchive}=useCinematic();
 const {slug}=useParams();
 const location=useLocation();
 const record=byPath.get('/'+group+'/'+slug);
 const meta=exhibitGroups[group];
 if(!record)return <main className="placeholder"><h1>此页未归档</h1><Link to={'/'+group}>返回{meta.title} ↗</Link></main>;
 const research=group==='people'?personResearchPhoto(record.id):null;
 const photos=exhibitPhotos(record)??(research?[research]:[]);
 const visual=exhibitIllustration(record)??illustrations[record.visual];
 const refs=new Map(record.sources.map((source,index)=>[source.id,{...source,number:index+1}]));
 const related=relatedRecords(record);
 const returnTo=location.state?.returnTo;
 const returnLink=typeof returnTo==='string'&&/^\/(map|history|people|museums|search)(\?|$)/.test(returnTo)?returnTo:'/'+group;
 return <main className={'exhibit-v2 exhibit-detail exhibit-detail-'+group+' exhibit-composition-'+(record.composition??'standard')}>
  <header className="exhibit-masthead exhibit-dossier">
   <div className="exhibit-kicker">{location.state?.archiveOrigin?<button className="flight-return" onClick={returnToArchive}>← 返回历史档案</button>:<Link to={returnLink}>← 返回索引</Link>}<span>{meta.english} / {levels[record.priority]}</span></div>
   <div className="exhibit-dossier-layout">
    <div className="exhibit-dossier-copy"><span className="exhibit-meta-line">{record.region} / {record.theme}</span><h1 tabIndex={-1}>{record.title}</h1><p className="exhibit-subtitle">{record.subtitle}</p><p>{record.summary}</p></div>
    {photos.length>0?<figure className="exhibit-cover"><ArchiveImage src={localImage(photos[0])} alt={photos[0].alt} width={photos[0].width??1000} height={photos[0].height??640} loading="eager"/><figcaption><ImageCredit image={photos[0]}/></figcaption></figure>
     :visual?<figure className="exhibit-cover"><ArchiveImage src={visual.src} alt={visual.caption} loading="eager"/><figcaption>{visual.caption}</figcaption></figure>
     :group==='people'?<div className="dossier-portrait-placeholder"><PortraitPlaceholder/></div>:<div aria-hidden="true" className="exhibit-monogram">{record.theme}<small>{meta.english} / LONGYUAN</small></div>}
   </div>
  </header>
  <div className="exhibit-reading exhibit-article-grid">
   <article className="exhibit-article">
    {record.composition==='confluence'&&<ExhibitTimeline timeline={record.timeline} refs={refs}/>}
    {record.sections.map((section,index)=><section className="exhibit-chapter" key={section.title}>
     <span className="exhibit-chapter-number">{String(index+1).padStart(2,'0')}</span><h2>{section.title}</h2><p>{section.text} <Citations ids={section.refs} refs={refs}/></p>
    </section>)}
    {record.composition!=='confluence'&&<ExhibitTimeline timeline={record.timeline} refs={refs}/>}
    {photos.length>0&&<ExhibitGallery images={photos}/>}
    <section className="exhibit-references"><h2>资料来源</h2><ol>{[...refs.values()].map(source=>
     <li key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.publisher} · {source.title} ↗</a>{source.supports&&<p>{Array.isArray(source.supports)?source.supports.join('；'):source.supports}</p>}<small>{source.publishedAt&&'发布 '+source.publishedAt+' · '}{source.accessedAt&&'核查 '+source.accessedAt}</small></li>
    )}</ol></section>
   </article>
   <aside className="exhibit-sidebar">
    <p className="exhibit-sidebar-caption">RELATED FILES / 关联阅览</p>
    {record.address&&<p className="exhibit-note">{record.address}</p>}
    {group==='museums'&&<Link to={'/map?point='+record.id}>在红色地图查看 ↗</Link>}
    {record.composition==='corridor'&&<Link to="/map?theme=西路军">打开河西走廊主题示意 ↗</Link>}
    {record.composition==='foundation'&&<Link to="/map?theme=根据地">打开南梁主题示意 ↗</Link>}
    {record.composition==='confluence'&&<Link to="/map?point=huining">查看会宁点位 ↗</Link>}
    {related.map(entry=><Link key={entry.path} to={entry.path}>{entry.title}<small>{exhibitGroups[entry.group].title} / {entry.region}</small></Link>)}
    <Link to={'/'+group}>返回{meta.title}索引</Link>
   </aside>
  </div>
 </main>;
}
