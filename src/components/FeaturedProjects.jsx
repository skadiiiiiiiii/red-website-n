import {sceneArt} from '../data/sceneArt.js';
import {recordImages,localImage} from '../data/exhibits.js';
import {Link} from 'react-router-dom';
import {archives,illustrations} from '../data/content.js';
import ArchiveImage from './ArchiveImage.jsx';
import Reveal from './Reveal.jsx';
const features=[['huining','REUNION / HUINING','huining'],['hadapu','A NEW DIRECTION','landing'],['nanliang-spirit','ROOTED IN THE PEOPLE','nanliang']];
export default function FeaturedProjects(){return <section id="featured" className="featured section-pad"><div className="section-kicker"><span>02 / FEATURED ARCHIVES</span><span>精选专题</span></div><h2>山河为卷，<br/><em>信念为章。</em></h2>{features.map(([id,en,topic],i)=>{const a=archives.find(a=>a.id===id);const image=recordImages['/history/'+topic]?.[0];const art=sceneArt[topic]??illustrations[a.images[0]];return <Reveal key={id} className={'feature-editorial feature-'+i}><Link to={'/archives?id='+id} className="feature-visual" aria-label={'查阅'+a.title}><ArchiveImage src={image?localImage(image):art.src} alt={image?.alt??art.caption}/><span>0{i+1} / {a.place} · {image?'实景':'情境插画'}</span></Link><div className="feature-description"><span className="eyebrow">{en}</span><h3>{a.title}</h3><p>{a.summary}</p><Link to={'/history/'+topic} className="text-link">深入阅读专题 ↗</Link></div></Reveal>})}</section>}
