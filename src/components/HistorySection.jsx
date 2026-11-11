import {Link} from 'react-router-dom';
import {sceneArt} from '../data/sceneArt.js';
import {localImage,recordImages} from '../data/exhibits.js';
import {archiveMedia} from '../data/archiveMedia.js';
import {events,illustrations} from '../data/content.js';
import ArchiveImage from './ArchiveImage.jsx';
import Reveal from './Reveal.jsx';

export default function HistorySection(){
 return <section id="history" className="timeline section-pad">
  <div className="section-kicker"><span>03 / HISTORY</span><span>历史回顾</span></div>
  <div className="timeline-title"><h2>时间向前，<br/><em>回声仍在。</em></h2><Link to="/timeline" className="text-link">展开完整长卷 <b>↗</b></Link></div>
  <ol className="history-rail">{events.map((event,i)=>{
   const art=sceneArt[event.id]??illustrations[event.image];
   const photo=archiveMedia(event.id)[0]?.photo;
   return <li key={event.id} className={event.id==='huining'?'history-key':''}><Reveal>
    <Link className="history-card" to={'/archives?id='+event.id}>
     <div className="history-date"><strong>{event.year}</strong><span>0{i+1} / {event.date}</span></div>
     <div className="history-image"><ArchiveImage src={photo?localImage(photo):art.src} alt={photo?.alt??art.caption}/><span className="history-media-kind">{photo?"当代实景":"原创插画"}</span></div>
     <span className="history-place">{event.place}</span><h3>{event.title}</h3><p>{event.short}</p>
     <span className="history-open">查阅档案 ↗</span>
    </Link>
   </Reveal></li>
  })}</ol>
 </section>
}
