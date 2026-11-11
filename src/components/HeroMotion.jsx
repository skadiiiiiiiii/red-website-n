import {useEffect} from 'react';
import {useCinematic} from './CinematicExperience.jsx';
export default function HeroMotion(){
 const {busy,reduced}=useCinematic();
 useEffect(()=>{
  const el=document.querySelector('.hero');
  if(!el||reduced||busy!=='idle')return;
  let raf=0,visible=true;
  const update=()=>{raf=0;if(visible&&!document.hidden&&innerWidth>1024)el.style.setProperty('--parallax',Math.min(scrollY,innerHeight)*.08+'px')};
  const scroll=()=>{if(!raf&&visible)raf=requestAnimationFrame(update)};
  const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(!visible){cancelAnimationFrame(raf);raf=0}else scroll()});io.observe(el);
  window.addEventListener('scroll',scroll,{passive:true});
  return()=>{cancelAnimationFrame(raf);io.disconnect();window.removeEventListener('scroll',scroll)};
 },[busy,reduced]);
 return null;
}
