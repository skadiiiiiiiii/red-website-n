import {useEffect,useRef,useState} from 'react';
import BrandMark from './BrandMark.jsx';
import {localImage,recordImages} from '../data/exhibits.js';

const frames=[
 {photo:recordImages['/museums/hadapu'][0],label:'哈达铺 · 北上的方向'},
 {photo:recordImages['/museums/huining'][0],label:'会宁 · 山河的回响'},
];
export default function IntroSequence({onFinish,reduced}){
 const skip=useRef(null),[hidden,setHidden]=useState(document.hidden);
 useEffect(()=>{
  skip.current?.focus();
  if(reduced){onFinish();return}
  let remaining=6100,started=performance.now(),timer;
  const resume=()=>{started=performance.now();timer=setTimeout(onFinish,remaining)};
  const visibility=()=>{
   setHidden(document.hidden);
   if(document.hidden){clearTimeout(timer);remaining-=performance.now()-started}else resume();
  };
  if(!document.hidden)resume();
  document.addEventListener('visibilitychange',visibility);
  return()=>{clearTimeout(timer);document.removeEventListener('visibilitychange',visibility)};
 },[onFinish,reduced]);
 return <section className={'cinema-intro '+(hidden?'is-suspended':'')} role="dialog" aria-modal="true" aria-label="烽火陇原开场片头" onKeyDown={event=>{
  if(event.key==='Escape'){event.preventDefault();onFinish()}
  if(event.key==='Tab'){event.preventDefault();skip.current?.focus()}
 }}>
  <button ref={skip} className="intro-skip" onClick={onFinish}>跳过片头 <span>↗</span></button>
  <div className="intro-contours" aria-hidden="true"><svg viewBox="0 0 1400 800" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="currentColor">{Array.from({length:8},(_,i)=><path key={i} d={`M-100 ${480+i*27} Q230 ${100+i*30} 530 ${420+i*22} T1050 ${290+i*30} T1500 ${160+i*32}`}/>)}</g></svg></div>
  <div className="intro-dust" aria-hidden="true">{Array.from({length:7},(_,i)=><i key={i} style={{'--dust':i}}/>)}</div>
  <div className="intro-beam" aria-hidden="true"/>
  <div className="intro-frames" aria-hidden="true">{frames.map(({photo,label},index)=><figure key={photo.path} className={'intro-frame intro-frame-'+index}><img src={localImage(photo)} alt=""/><figcaption><span>0{index+1} / {label}</span><span>旧址当代实景</span></figcaption></figure>)}</div>
  <div className="intro-brand"><div className="intro-emblem"><BrandMark/></div><p className="intro-prelude">烽火初燃 · 山河回响</p><h2>{[...'烽火陇原'].map((word,index)=><span key={word} style={{'--letter':index}}><b>{word}</b></span>)}</h2><p className="intro-motto">山河有信，精神不息。</p><p className="intro-english">THE ECHOES OF LONGYUAN</p></div>
  <div className="intro-footer"><span>甘肃红色文化数字展馆</span><span>历史有迹 · 信念有声</span></div>
  <div className="intro-time" aria-hidden="true"/>
 </section>;
}
