import BrandMark from './BrandMark.jsx';
import {useEffect,useState,useRef} from 'react';
import {Link,NavLink,useLocation} from 'react-router-dom';
const navItems = [
 ['HOME','首页','/','01'], ['HISTORY','红色陇原','/history','02'], ['HEROES','英烈人物','/people','03'],
 ['MUSEUMS','旧址场馆','/museums','04'], ['MAP','红色地图','/map','05'], ['ABOUT','关于本站','/about','06'],
];

const sections=['top','featured','history','legacy'];
const chapterByRoute={'/':'top'};
export default function Navigation(){
 const [open,setOpen]=useState(false),[chapter,setChapter]=useState('top'),location=useLocation(),toggle=useRef(null);
 const [overHero,setOverHero]=useState(true);
 const shell=useRef(null);
 const home=location.pathname==='/';
 useEffect(()=>setOpen(false),[location.pathname]);
 useEffect(()=>{
  if(home)return;
  let frame=0;
  const update=()=>{frame=0;const mast=document.querySelector('.exhibit-masthead,.exhibit-heading');const end=mast?mast.getBoundingClientRect().bottom:450-window.scrollY;const p=Math.max(0,Math.min(1,(250-end)/160));shell.current?.style.setProperty('--nav-paper',p);shell.current?.classList.toggle('nav-reading',p>.5)};
  const scroll=()=>{if(!frame)frame=requestAnimationFrame(update)};update();window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',scroll);return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);window.removeEventListener('resize',scroll)};
 },[home,location.pathname]);
 useEffect(()=>{
  if(!home)return;
  const hero=document.getElementById('top');
  if(!hero)return;
  const observer=new IntersectionObserver(([entry])=>setOverHero(entry.isIntersecting),{rootMargin:'-90px 0px 0px'});
  observer.observe(hero);
  return ()=>observer.disconnect();
 },[home]);
 useEffect(()=>{
  if(!home)return;
  setChapter('top');
  const observer=new IntersectionObserver(entries=>{
   const active=entries.find(entry=>entry.isIntersecting);
   if(active)setChapter(active.target.id);
  },{rootMargin:'-26% 0px -58% 0px'});
  sections.forEach(id=>{const el=document.getElementById(id);if(el)observer.observe(el)});
  return ()=>observer.disconnect();
 },[home]);
 useEffect(()=>{const close=e=>{if(e.key==='Escape'&&open){setOpen(false);toggle.current?.focus()}};document.addEventListener('keydown',close);return()=>document.removeEventListener('keydown',close)},[open]);
 function scroll(id){setOpen(false);document.getElementById(id)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 function sectionLink(id,label,cls){return <Link key={id} to={'/?section='+id} className={cls+(home&&chapter===id?' active':'')} aria-current={home&&chapter===id?'location':undefined} onClick={e=>{if(home&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey){e.preventDefault();scroll(id)}else setOpen(false)}}>{label}</Link>;}
 return <header ref={shell} className={'nav-shell '+(home?(overHero&&!open?'nav-shell-over-hero':''):'nav-shell-inner')}>
  <Link to="/" className="brand" onClick={()=>{setOpen(false);if(home)scroll('top')}}><BrandMark/><span><b>烽火陇原</b><small>THE ECHOES OF LONGYUAN</small></span></Link>
  <button ref={toggle} className={'menu-toggle '+(open?'is-open':'')} onClick={()=>setOpen(!open)} aria-label="切换导航" aria-expanded={open} aria-controls="main-navigation"><i/><i/></button>
  <nav id="main-navigation" aria-label="主导航" className={'nav-links '+(open?'is-open':'')}>
   {navItems.map(([en,zh,path,num])=>{
    const id=chapterByRoute[path];
    const label=<><span className="nav-num">{num}</span><span className="nav-copy"><b>{path==='/timeline'?'HISTORY':en}</b><small>{path==='/timeline'?'历史回顾':path==='/legacy'?'精神传承':zh}</small></span></>;
    return home&&id?sectionLink(id,label,'nav-item'):<NavLink key={path} to={path} end={path==='/'} onClick={()=>setOpen(false)} className={({isActive})=>'nav-item '+(isActive?'active':'')}>{label}</NavLink>;
   })}
   <NavLink to="/search" className="nav-item exhibit-nav-search" onClick={()=>setOpen(false)}>检索 ⌕</NavLink>
  </nav>
 </header>;
}
