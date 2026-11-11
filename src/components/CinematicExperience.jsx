import {createContext,useCallback,useContext,useEffect,useLayoutEffect,useMemo,useRef,useState} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import {byPath} from '../data/exhibits.js';
import IntroSequence from './IntroSequence.jsx';
import CardFlightTransition from './CardFlightTransition.jsx';

const Experience=createContext(null);
const SESSION_KEY='longyuan:intro:v3';
export const useCinematic=()=>useContext(Experience);
function firstVisit(){try{return sessionStorage.getItem(SESSION_KEY)!=='seen'}catch{return true}}
function markSeen(){try{sessionStorage.setItem(SESSION_KEY,'seen')}catch{/* Storage may be unavailable in private browsing. */}}

export default function CinematicExperience({children}){
 const location=useLocation(),navigate=useNavigate();
 const [reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [intro,setIntro]=useState(()=>location.pathname==='/'&&firstVisit()&&!matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [flight,setFlight]=useState(null);
 const [introRun,setIntroRun]=useState(0);
 const site=useRef(null),previous=useRef(location),flightRef=useRef(null);
 const galleryState=useRef(location.state?.archiveOrigin?.snapshot??{phase:0,query:'',paused:false,scrollY:0});
 const busy=intro?'intro':flight?'flight':'idle';
 const finishIntro=useCallback(()=>{markSeen();setIntro(false);requestAnimationFrame(()=>document.querySelector('.hero h1')?.focus({preventScroll:true}))},[]);
 const finishFlight=useCallback(()=>{
  const closing=flightRef.current;
  flightRef.current=null;setFlight(null);
  requestAnimationFrame(()=>{
   if(closing?.direction==='back'){
    const link=[...document.querySelectorAll('[data-archive-path]')].find(el=>el.dataset.archivePath===closing.record.path);
    link?.focus({preventScroll:true});
   }else document.querySelector('main h1')?.focus({preventScroll:true});
  });
 },[]);
 useEffect(()=>{
  const mq=matchMedia('(prefers-reduced-motion: reduce)');
  const change=()=>{setReduced(mq.matches);if(mq.matches)finishIntro()};
  mq.addEventListener('change',change);return()=>mq.removeEventListener('change',change);
 },[finishIntro]);
 useLayoutEffect(()=>{
  const old=previous.current;previous.current=location;
  if(old.key===location.key)return;
  // Filtering and timeline selection update the query within the same page.
  // Keep the reading position; only a different page starts at its masthead.
  if(old.pathname===location.pathname)return;
  const running=flightRef.current;
  if(running?.direction==='forward'&&location.pathname===running.record.path){window.scrollTo({top:0,behavior:'instant'});return}
  // POP restores the same home entry. A normal Home link intentionally starts at the top.
  const origin=old.state?.archiveOrigin;
  if(location.pathname==='/'&&origin?.homeKey===location.key&&byPath.has(origin.recordPath)){
   galleryState.current=origin.snapshot;
   window.scrollTo({top:origin.snapshot.scrollY??0,behavior:'instant'});
   const reverse={direction:'back',record:byPath.get(origin.recordPath),snapshot:origin.snapshot,id:location.key};
   flightRef.current=reverse;setFlight(reverse);
  }else{
   if(running){flightRef.current=null;setFlight(null)}
   window.scrollTo({top:0,behavior:'instant'});
  }
 },[location]);
 useLayoutEffect(()=>{
  if(busy==='idle')return;
  const prevOverflow=document.body.style.overflow;
  const prevBehavior=document.documentElement.style.scrollBehavior;
  document.body.style.overflow='hidden';document.documentElement.style.scrollBehavior='auto';
  if(site.current)site.current.inert=true;
  return()=>{document.body.style.overflow=prevOverflow;document.documentElement.style.scrollBehavior=prevBehavior;if(site.current)site.current.inert=false};
 },[busy]);
 const openArchive=useCallback((record,element,snapshot)=>{
  if(flightRef.current||intro)return;
  const rect=element.getBoundingClientRect();
  const saved={...snapshot,visited:true,scrollY:window.scrollY};galleryState.current=saved;
  const origin={homeKey:location.key,recordPath:record.path,snapshot:saved};
  const next={direction:'forward',record,rect:{left:rect.left,top:rect.top,width:rect.width,height:rect.height},origin,id:Date.now()};
  flightRef.current=next;setFlight(next);
 },[intro,location.key]);
 const commitFlight=useCallback(()=>{
  const current=flightRef.current;
  if(current?.direction==='forward')navigate(current.record.path,{state:{archiveOrigin:current.origin}});
 },[navigate]);
 const replay=useCallback(()=>{window.scrollTo({top:0,behavior:'instant'});setIntroRun(run=>run+1);setIntro(true)},[]);
 const value=useMemo(()=>({busy,reduced,galleryState,openArchive,replay,returnToArchive:()=>navigate(-1)}),[busy,reduced,openArchive,replay,navigate]);
 return <Experience.Provider value={value}>
  <div ref={site} className="cinematic-site" data-motion={busy} aria-hidden={busy!=='idle'?true:undefined}>{children}</div>
  {intro&&<IntroSequence key={introRun} onFinish={finishIntro} reduced={reduced}/>}
  {flight&&<CardFlightTransition key={flight.id} flight={flight} reduced={reduced} onNavigate={commitFlight} onFinish={finishFlight}/>}
 </Experience.Provider>;
}
