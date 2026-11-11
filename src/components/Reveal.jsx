import { useEffect, useRef, useState } from 'react';
import {useCinematic} from './CinematicExperience.jsx';
export default function Reveal({children,className=''}) { const ref=useRef(null); const [seen,setSeen]=useState(false);const {busy}=useCinematic(); useEffect(()=>{if(busy!=='idle'||seen)return;const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setSeen(true);io.disconnect()}},{threshold:.12}); if(ref.current)io.observe(ref.current); return()=>io.disconnect()},[busy,seen]); return <div ref={ref} className={`${className} reveal ${seen?'shown':''}`}>{children}</div> }
