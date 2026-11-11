import {useEffect,useRef,useState} from 'react';
import poster from '../assets/hero-loess.jpg';
import {useCinematic} from './CinematicExperience.jsx';
// Set enabled to true after placing a licensed video in public/videos/hero.mp4.
export const heroMedia={enabled:false,video:'videos/hero.mp4'};
export default function HeroVideo(){
 const {busy}=useCinematic();
 const ref=useRef(null),[failed,setFailed]=useState(false),[reduce,setReduce]=useState(true);
 useEffect(()=>{const mq=matchMedia('(prefers-reduced-motion: reduce)');const sync=()=>setReduce(mq.matches);sync();mq.addEventListener('change',sync);return()=>mq.removeEventListener('change',sync)},[]);
 useEffect(()=>{
  const video=ref.current;if(!video)return;
  let visible=true;
  const sync=()=>{if(reduce||busy!=='idle'||!visible||document.hidden)video.pause();else video.play()?.catch(()=>{})};
  const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()});observer.observe(video);
  document.addEventListener('visibilitychange',sync);sync();
  return()=>{observer.disconnect();document.removeEventListener('visibilitychange',sync);video.pause()};
 },[reduce,busy,failed]);
 return <div className="hero-media" aria-hidden="true"><img src={poster} alt=""/>{heroMedia.enabled&&!failed&&!reduce&&<video ref={ref} src={import.meta.env.BASE_URL+heroMedia.video} poster={poster} muted loop autoPlay playsInline preload="metadata" onError={()=>setFailed(true)}/>}<div className="hero-tint"/></div>
}
