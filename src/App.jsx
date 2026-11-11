import {useEffect} from 'react';
import {Route,Routes,useLocation,Link} from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import ScrollUI from './components/ScrollUI.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Archives from './pages/Archives.jsx';
import Timeline from './pages/Timeline.jsx';
import Legacy from './pages/Legacy.jsx';
import Youth from './pages/Youth.jsx';
import About from './pages/About.jsx';
import ExhibitIndex from './components/ExhibitIndex.jsx';
import ExhibitDetail from './components/ExhibitDetail.jsx';
import RedMap from './components/RedMap.jsx';
import {byPath,exhibitGroups} from './data/exhibits.js';
import {navItems} from './data/chapters.js';
export default function App(){
 const loc=useLocation();
 useEffect(()=>{document.title=(byPath.get(loc.pathname)?.title||exhibitGroups[loc.pathname.slice(1)]?.title||({'/map':'红色地图','/search':'全馆检索'})[loc.pathname]||navItems.find(n=>n[2]===loc.pathname)?.[1]||'页面未找到')+' · 烽火陇原';},[loc.pathname]);
 useEffect(()=>{const section=new URLSearchParams(loc.search).get('section');const id=section==='contact'?'ending':section;if(loc.pathname==='/'&&['top','featured','history','legacy','ending'].includes(id)){const frame=requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({behavior:'instant'}));return()=>cancelAnimationFrame(frame)}},[loc.pathname,loc.search]);
 return <><ScrollUI/><Navigation/><div className={'route-view '+(loc.pathname==='/'?'home-exhibition':'inner-exhibition')} key={loc.pathname}><Routes><Route path="/" element={<Home/>}/><Route path="/archives" element={<Archives/>}/><Route path="/timeline" element={<Timeline/>}/><Route path="/legacy" element={<Legacy/>}/><Route path="/youth" element={<Youth/>}/><Route path="/about" element={<About/>}/>{Object.keys(exhibitGroups).map(group=><Route key={group} path={group}><Route index element={<ExhibitIndex group={group}/>}/><Route path=":slug" element={<ExhibitDetail group={group}/>}/></Route>)}<Route path="/map" element={<RedMap/>}/><Route path="/search" element={<ExhibitIndex/>}/><Route path="*" element={<main className="placeholder"><span>404 / PAGE NOT FOUND</span><h1>此页未归档</h1><p>请检查地址，或返回首页继续浏览。</p><Link to="/">返回首页 ↗</Link></main>}/></Routes></div><Footer/></>
}
