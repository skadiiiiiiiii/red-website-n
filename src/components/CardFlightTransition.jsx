import {useEffect,useRef} from 'react';
import {ArchiveCard} from './HeroGallery.jsx';

export default function CardFlightTransition({flight,reduced,onNavigate,onFinish}){
 const overlay=useRef(null),card=useRef(null),veil=useRef(null),skip=useRef(null);
 const commit=useRef(false);
 const callbacks=useRef({onNavigate,onFinish});callbacks.current={onNavigate,onFinish};
 useEffect(()=>{
  let alive=true;const animations=[];
  skip.current?.focus({preventScroll:true});
  const animate=async(el,frames,options)=>{
   if(!alive)return;
   const animation=el.animate(frames,{fill:'forwards',easing:'cubic-bezier(.22,.7,.15,1)',...options});animations.push(animation);
   try{await animation.finished}catch{/* An interrupted navigation cancels its animations. */}
  };
  const navigate=()=>{if(alive&&!commit.current&&flight.direction==='forward'){commit.current=true;callbacks.current.onNavigate()}};
  const run=async()=>{
   const simple=reduced||matchMedia('(max-width: 760px)').matches||!card.current.animate;
   if(simple){
    card.current.style.display='none';
    if(!card.current.animate){navigate();callbacks.current.onFinish();return}
    await animate(veil.current,[{opacity:0},{opacity:1}],{duration:reduced?80:160});navigate();
    await animate(overlay.current,[{opacity:1},{opacity:0}],{duration:reduced?100:180});
    if(alive)callbacks.current.onFinish();return;
   }
   const w=card.current.offsetWidth,h=card.current.offsetHeight;
   const cx=(innerWidth-w)/2,cy=(innerHeight-h)/2;
   const center=`translate3d(${cx}px,${cy}px,0) rotateY(360deg) scale(1)`;
   const scale=Math.max(innerWidth/w,innerHeight/h)*1.6;
   const full=`translate3d(${cx}px,${cy}px,220px) rotateY(360deg) scale(${scale})`;
   const locate=()=>{
    const source=flight.direction==='forward'?flight.rect:[...document.querySelectorAll('[data-archive-path]')].find(el=>el.dataset.archivePath===flight.record.path)?.getBoundingClientRect();
    const rect=source??{left:innerWidth*.6,top:innerHeight*.35,width:w*.7,height:h*.7};
    return `translate3d(${rect.left-(w-rect.width)/2}px,${rect.top-(h-rect.height)/2}px,0) rotateY(-13deg) scale(${rect.width/w},${rect.height/h})`;
   };
   if(flight.direction==='forward'){
    animate(veil.current,[{opacity:0},{opacity:.94}],{duration:650});
    await animate(card.current,[{transform:locate()},{transform:center}],{duration:600});
    if(!alive)return;
    animate(card.current.querySelector('.volume-front'),[{opacity:1},{opacity:0}],{duration:400});
    animate(veil.current,[{opacity:.94},{opacity:1}],{duration:380});
    await animate(card.current,[{transform:center},{transform:full}],{duration:440});
    if(!alive)return;navigate();
    await animate(overlay.current,[{opacity:1},{opacity:0}],{duration:240});
   }else{
    veil.current.style.opacity='1';
    await animate(card.current,[{transform:full,opacity:0},{transform:center,opacity:1}],{duration:380});
    if(!alive)return;
    animate(veil.current,[{opacity:1},{opacity:0}],{duration:520});
    await animate(card.current,[{transform:center},{transform:locate()}],{duration:540});
    await animate(overlay.current,[{opacity:1},{opacity:0}],{duration:120});
   }
   if(alive)callbacks.current.onFinish();
  };
  run();
  return()=>{alive=false;animations.forEach(animation=>animation.cancel())};
 },[flight,reduced]);
 const finishNow=()=>{if(flight.direction==='forward'&&!commit.current){commit.current=true;onNavigate()}onFinish()};
 return <div ref={overlay} className="card-flight" role="dialog" aria-modal="true" aria-label={(flight.direction==='back'?'返回历史卡片：':'正在打开：')+flight.record.title} onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();finishNow()}if(event.key==='Tab'){event.preventDefault();skip.current?.focus()}}}>
  <div ref={veil} className="flight-veil"/>
  <div ref={card} className="flight-book"><ArchiveCard record={flight.record}/></div>
  <button ref={skip} className="flight-skip" onClick={finishNow}>跳过转场 ↗</button>
 </div>;
}
