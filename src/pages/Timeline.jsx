import {archiveMedia} from '../data/archiveMedia.js';
import ArchiveImage from '../components/ArchiveImage.jsx';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import PageFrame from '../components/PageFrame.jsx';
import Sources from '../components/Sources.jsx';
import {events,illustrations} from '../data/content.js';
const periods=['全部时期','根据地建设','长征北上','胜利会师'];
export default function Timeline(){
 const [period,setPeriod]=useState('全部时期'),[selected,setSelected]=useState(events[0].id);
 const list=events.filter(e=>period==='全部时期'||e.period===period),index=Math.max(0,list.findIndex(e=>e.id===selected)),event=list[index];
 const media=archiveMedia(event.id)[0]??illustrations[event.image];
 function filter(p){setPeriod(p);setSelected(events.find(e=>p==='全部时期'||e.period===p).id)}
 return <PageFrame number="03" english="TIMELINE / ACROSS THE YEARS" title="时光长卷" intro="从根据地的星火，到长征的会合。选择一个坐标，让时间展开。" className="chronicle-page">
 <div className="filter-tabs period-filter" aria-label="历史时期">{periods.map(p=><button key={p} aria-pressed={period===p} onClick={()=>filter(p)}>{p}</button>)}</div>
 <section className="chronicle-stage" key={event.id}><div className="chronicle-image"><ArchiveImage src={media.src} alt={media.caption}/><span>{media.caption}</span><b>{event.year}</b></div><article className="chronicle-story" aria-live="polite"><span className="eyebrow">{event.date} / {event.place}</span><h2>{event.title}</h2><p className="detail-lead">{event.short}</p><p>{event.process}</p><p>{event.meaning}</p><Link to={'/archives?id='+event.id} className="text-link">查阅对应档案 <b>↗</b></Link><Sources ids={event.sourceIds}/></article></section>
 <div className="chronicle-controls"><button className="outline-button" disabled={index===0} onClick={()=>setSelected(list[index-1].id)}>← 上一节点</button><span aria-live="polite">{String(index+1).padStart(2,'0')} / {String(list.length).padStart(2,'0')}</span><button className="outline-button" disabled={index===list.length-1} onClick={()=>setSelected(list[index+1].id)}>下一节点 →</button></div>
 <div className="time-scroll" aria-label="历史节点">{list.map((e,i)=><button key={e.id} className={event.id===e.id?'selected':''} aria-pressed={event.id===e.id} onClick={()=>setSelected(e.id)}><span className="rail-date">{e.date}</span><i/><b>{e.title}</b><small>{e.place}</small></button>)}</div>
 <section className="route-section"><div><span className="eyebrow">HISTORICAL COORDINATES</span><h2>山河中的<br/>历史坐标</h2><p>地点关系示意，非精确地图。虚线表示哈达铺至榜罗镇两个节点的先后关系，不代表完整行军路线；南梁与会师节点分别标示。</p></div><svg viewBox="0 0 650 390" role="img" aria-label={'历史地点示意，当前高亮'+event.place}><path className="map-land" d="M40 80 180 50 240 115 300 105 355 175 460 115 570 110 600 190 520 250 440 270 420 355 310 350 270 290 260 190 180 170Z"/><path className="map-route" d="M285 295Q300 260 340 245"/>{events.map(e=><g key={e.id} className={e.id===event.id?'map-point selected':'map-point'} transform={'translate('+e.x+' '+e.y+')'}><circle r={e.id===event.id?10:5}/><text x="15" y={e.id==='huining'?-10:4}>{e.title.replace('的方向','').replace('建政','')}</text></g>)}<text x="40" y="365" className="map-note">示意图 · 非测绘地图 · 不表示行政边界</text></svg></section>
 </PageFrame>
}
