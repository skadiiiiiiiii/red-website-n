import {useEffect,useLayoutEffect,useMemo,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {byPath,exhibits,exhibitGroups,localImage,matchesRecord} from '../data/exhibits.js';
import {exhibitIllustration,exhibitPhotos} from '../data/exhibitMedia.js';
import ArchiveImage from './ArchiveImage.jsx';
import {useCinematic} from './CinematicExperience.jsx';

const featured=['/history/nanliang','/history/huining','/history/west-route-army','/history/lazikou','/history/landing','/history/sparks','/museums/lanzhou-office','/history/shanchengbao','/history/lanzhou-battle'].map(path=>byPath.get(path)).filter(Boolean);
const mod=(n,length)=>((n%length)+length)%length;
export function ArchiveCard({record}){
 const photo=exhibitPhotos(record)?.[0],art=exhibitIllustration(record);
 const date=record.timeline?.[0]?.date;
 return <div className="archive-volume">
  <div className="volume-pages" aria-hidden="true"/>
  <div className="volume-back" aria-hidden="true"><span>烽火陇原</span><b>{record.title}</b><p>{record.summary}</p><small>THE ECHOES OF LONGYUAN</small></div>
  <div className="volume-front">
   <div className="volume-top"><span>烽火陇原</span><small>{record.group.toUpperCase()} / {record.id.toUpperCase()}</small></div>
   <div className="volume-image">{photo||art?<ArchiveImage src={photo?localImage(photo):art.src} alt={photo?.alt??art.caption} loading="eager"/>:<div className="volume-type-image" aria-hidden="true"><span>{record.title}</span></div>}<span>{photo?'旧址实景':art?'情境插画':'人物档案'}</span></div>
   <div className="volume-copy"><p>{date??record.region} <i/> {record.theme}</p><h3>{record.title}</h3><span>{record.subtitle}</span></div>
   <div className="volume-bottom"><span>查看档案</span><b>↗</b></div>
  </div>
 </div>;
}

export default function HeroGallery(){
 const {busy,reduced,galleryState,openArchive}=useCinematic();
 const [query,setQuery]=useState(galleryState.current.query??'');
 const [displayedQuery,setDisplayedQuery]=useState(query),[filterChanging,setFilterChanging]=useState(false);
 const [paused,setPaused]=useState(galleryState.current.paused??false);
 const [selected,setSelected]=useState(Math.round(galleryState.current.phase??0));
 const [visible,setVisible]=useState(false),[compact,setCompact]=useState(()=>matchMedia('(max-width: 760px)').matches);
 const [hover,setHover]=useState(false),[focused,setFocused]=useState(false);
 const root=useRef(null),stage=useRef(null),links=useRef(new Map()),wake=useRef(()=>{}),paint=useRef(()=>{});
 const phase=useRef(galleryState.current.phase??0),target=useRef(phase.current),drag=useRef(null),dragged=useRef(false);
 const focusAfterMove=useRef(false);
 const records=useMemo(()=>displayedQuery.trim()?exhibits.filter(record=>matchesRecord(record,displayedQuery)):featured,[displayedQuery]);
 const count=records.length;
 const current=count?mod(selected,count):0;
 const active=records[current];
 const offsets=compact?[-1,0,1]:[-1,0,1,2,3];
 const indexes=count?[...new Set(offsets.map(offset=>mod(current+offset,count)))]:[];
 useEffect(()=>{
  const io=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.1});
  io.observe(root.current);
  const mq=matchMedia('(max-width: 760px)'),resize=()=>setCompact(mq.matches);mq.addEventListener('change',resize);
  return()=>{io.disconnect();mq.removeEventListener('change',resize)};
 },[]);
 useEffect(()=>{galleryState.current={...galleryState.current,query,paused}},[query,paused,galleryState]);
 useEffect(()=>{
  if(query===displayedQuery)return;
  setFilterChanging(true);
  const timer=setTimeout(()=>{phase.current=0;target.current=0;setSelected(0);setDisplayedQuery(query);setFilterChanging(false)},reduced?0:140);
  return()=>clearTimeout(timer);
 },[query,displayedQuery,reduced]);
 useEffect(()=>{
  if(!count)return;
  let raf=0,last=0,alive=true,lastScroll=window.scrollY;
  function render(){
   for(const [index,el] of links.current){
    if(!el)continue;
    const edge=count===1?.5:1.5;
    let distance=mod(index-phase.current+edge,count)-edge;
    const width=stage.current?.clientWidth??700;
    const cardWidth=compact?210:Math.min(278,Math.max(210,width*.38));
    const x=distance*cardWidth*(compact?1.02:distance<0?1.08:.94);
    const y=compact?Math.abs(distance)*15:Math.max(-distance,0)*65+Math.max(distance,0)*17;
    const z=compact?Math.max(-95,-Math.abs(distance)*90):-distance*105;
    const angle=reduced?0:(compact?distance*-7:-13-distance*9);
    el.style.transform=`translate3d(${x}px,${y}px,${z}px) rotateY(${angle}deg) rotateZ(${reduced?0:distance*1.3}deg)`;
    el.style.opacity=distance<-1.28||distance>3.2?'0':distance>2.4?'.45':'1';
    el.style.filter=!compact&&!reduced&&distance<-.65?`blur(${Math.min(2.5,(-distance-.65)*4)}px)`:'none';
    el.style.zIndex=String(20-Math.round(distance*3));
    el.style.pointerEvents=Math.abs(distance)<.55?'auto':'none';
   }
   galleryState.current={...galleryState.current,phase:phase.current};
  }
  const tick=now=>{
   raf=0;if(!alive)return;
   const dt=Math.min(last?now-last:16,40);last=now;
   const auto=count>1&&visible&&busy==='idle'&&!reduced&&!compact&&!paused&&!hover&&!focused&&!drag.current&&!document.hidden;
   if(auto)target.current+=dt/12000;
   phase.current=reduced?target.current:phase.current+(target.current-phase.current)*(1-Math.exp(-dt/120));
   if(Math.abs(target.current-phase.current)<.0003)phase.current=target.current;
   const next=Math.round(phase.current);setSelected(old=>old===next?old:next);
   render();
   if(focusAfterMove.current&&Math.abs(target.current-phase.current)<.002){
    focusAfterMove.current=false;
    links.current.get(mod(Math.round(phase.current),count))?.focus({preventScroll:true});
   }
   if(visible&&busy==='idle'&&!document.hidden&&(auto||Math.abs(target.current-phase.current)>.0003))raf=requestAnimationFrame(tick);
  };
  wake.current=()=>{if(!raf&&visible&&busy==='idle'&&!document.hidden){last=0;raf=requestAnimationFrame(tick)}};
  paint.current=render;
  const visibility=()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0}else wake.current()};
  const resize=()=>render();
  const scroll=()=>{
   const nextScroll=window.scrollY;
   if(visible&&busy==='idle'&&!reduced&&!compact&&!focused&&!paused){target.current+=(nextScroll-lastScroll)/2200;wake.current()}
   lastScroll=nextScroll;
  };
  const wheel=event=>{if(Math.abs(event.deltaX)>Math.abs(event.deltaY)&&Math.abs(event.deltaX)>1){event.preventDefault();target.current+=event.deltaX/440;wake.current()}};
  const node=stage.current;node?.addEventListener('wheel',wheel,{passive:false});
  document.addEventListener('visibilitychange',visibility);window.addEventListener('resize',resize);window.addEventListener('scroll',scroll,{passive:true});
  render();wake.current();
  return()=>{alive=false;cancelAnimationFrame(raf);node?.removeEventListener('wheel',wheel);document.removeEventListener('visibilitychange',visibility);window.removeEventListener('resize',resize);window.removeEventListener('scroll',scroll);wake.current=()=>{}};
 },[records,busy,visible,reduced,compact,paused,hover,focused,galleryState,count]);
 useLayoutEffect(()=>paint.current(),[selected,compact,records]);
 function step(direction){target.current=Math.round(target.current)+direction;wake.current()}
 function updateQuery(value){setQuery(value)}
 function open(event,record,index){
  if(event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  if(dragged.current){event.preventDefault();dragged.current=false;return}
  if(index!==current){event.preventDefault();return}
  event.preventDefault();
  // Stop at the selected book so returning can restore an exact, focusable position.
  phase.current=Math.round(phase.current);target.current=phase.current;paint.current();
  openArchive(record,event.currentTarget,{phase:phase.current,query,paused});
 }
 return <section ref={root} className={'hero-gallery '+(compact?'is-compact ':'')+(filterChanging?'is-filtering':'')} aria-label="历史档案卡片空间" onFocusCapture={()=>setFocused(true)} onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))setFocused(false)}}>
  <div className="gallery-heading"><span>循迹 · 阅读陇原</span><small>HISTORY IN FOCUS</small></div>
  <div ref={stage} className="gallery-stage" aria-roledescription="轮播" onPointerEnter={()=>setHover(true)} onPointerLeave={()=>setHover(false)} onKeyDown={event=>{
   if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();focusAfterMove.current=true;step(event.key==='ArrowLeft'?-1:1)}
  }} onPointerDown={event=>{
   if(event.button!==0)return;dragged.current=false;drag.current={x:event.clientX,y:event.clientY,phase:target.current,id:event.pointerId};
  }} onPointerMove={event=>{
   if(!drag.current)return;const dx=event.clientX-drag.current.x,dy=event.clientY-drag.current.y;
   if(!dragged.current&&Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>10){drag.current=null;return}
   if(Math.abs(dx)>8){dragged.current=true;event.currentTarget.setPointerCapture(event.pointerId);target.current=drag.current.phase-dx/240;wake.current()}
  }} onPointerUp={event=>{
   if(drag.current){drag.current=null;if(dragged.current){target.current=Math.round(target.current);wake.current()}}
   if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
  }} onPointerCancel={()=>{drag.current=null;target.current=Math.round(target.current);wake.current()}} onClickCapture={event=>{if(dragged.current){event.preventDefault();event.stopPropagation();dragged.current=false}}}>
   <div className="gallery-orbit" aria-hidden="true"/>
   <div className="gallery-space">{indexes.map(index=>{
    const record=records[index];
    return <Link key={record.path} ref={el=>{if(el)links.current.set(index,el);else links.current.delete(index)}} to={record.path} className={'gallery-book '+(index===current?'is-current':'')} data-archive-path={record.path} aria-label={'阅读'+record.title} aria-hidden={index!==current?true:undefined} tabIndex={index===current?0:-1} onClick={event=>open(event,record,index)}><ArchiveCard record={record}/></Link>;
   })}</div>
   {!count&&<div className="gallery-empty"><p>未找到相关历史档案，<br/>请尝试其他关键词。</p><button onClick={()=>updateQuery('')}>查看全部专题</button></div>}
  </div>
  <div className="gallery-toolbar"><div className="gallery-pagination"><button onClick={()=>step(-1)} disabled={count<2} aria-label="上一个历史档案">←</button><span aria-live="polite">{count?String(current+1).padStart(2,'0'):'00'} <i>/ {String(count).padStart(2,'0')}</i></span><button onClick={()=>step(1)} disabled={count<2} aria-label="下一个历史档案">→</button></div><span className="gallery-drag-hint">拖动阅览 · 点击展开</span>{!compact&&!reduced&&<button className="gallery-pause" onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?'继续流动':'暂停流动'}</button>}</div>
  <form className="gallery-search" onSubmit={event=>{
   event.preventDefault();
   const pending=query!==displayedQuery;
   const record=pending?(query.trim()?exhibits.find(item=>matchesRecord(item,query)):featured[0]):active;
   const element=links.current.get(current)??stage.current;
   if(record&&element)openArchive(record,element,{phase:pending?0:Math.round(phase.current),query,paused});
  }}>
   <label htmlFor="archive-space-search">馆藏检索</label><input id="archive-space-search" value={query} onChange={event=>updateQuery(event.target.value)} placeholder="搜索历史、人物、旧址" autoComplete="off" maxLength={80}/>{query&&<button type="button" onClick={()=>updateQuery('')} aria-label="清除检索">×</button>}<button type="submit" disabled={!count} aria-label="打开当前检索档案">↗</button>
  </form>
  {query&&<p className="gallery-result-note" role="status">{filterChanging?'正在检索…':count+' 份相关档案'} · <Link to={'/search?q='+encodeURIComponent(query)}>查看检索列表 ↗</Link></p>}
  {active&&<p className="gallery-current-description">{exhibitGroups[active.group].title} / {active.region}</p>}
 </section>;
}
