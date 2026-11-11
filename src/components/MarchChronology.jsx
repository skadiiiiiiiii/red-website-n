import {readCopy} from '../data/siteCopy.js';
import {Link,useSearchParams} from 'react-router-dom';
import {sceneArt} from '../data/sceneArt.js';
import {illustrations} from '../data/content.js';
import {byPath,recordImages,localImage} from '../data/exhibits.js';
import {ImageCredit} from './ExhibitDetail.jsx';
import ArchiveImage from './ArchiveImage.jsx';

const stops=[
 {id:'lazikou',date:'1935.09.16—17',title:'突破腊子口',place:'甘南 · 迭部',path:'/history/lazikou',art:'land',text:'中央红军在峡谷隘口受阻。正面作战与侧背穿插打开通道，部队随后继续北上。'},
 {id:'hadapu',date:'1935.09',title:'哈达铺休整',place:'陇南 · 宕昌',path:'/history/landing',photo:'/museums/hadapu',text:'红军各部先后抵达哈达铺。休整期间获得的陕北根据地和红军消息，为选择落脚地区提供了线索。'},
 {id:'bangluo',date:'1935.09.27',title:'榜罗镇会议',place:'定西 · 通渭',path:'/history/landing',art:'plate_bangluo',text:'陕甘支队抵达榜罗镇。中央进一步明确以陕北作为长征落脚地的战略方向。'},
 {id:'huining',date:'1936.10.09',title:'会宁会师',place:'白银 · 会宁',path:'/history/huining',photo:'/museums/huining',text:'红军总部和红四方面军总指挥部抵达会宁，与红一方面军部队会师。次日举行庆祝大会。'},
 {id:'jiangtai',date:'1936.10.22',title:'将台堡会师',place:'今宁夏 · 西吉',path:'/history/huining',art:'plate_jiangtai',text:'红二方面军总指挥部到达将台堡，与红一方面军部队会师。会宁与将台堡是不同地点的会合。'},
];

export default function MarchChronology(){
 const [params,setParams]=useSearchParams();
 const index=Math.max(0,stops.findIndex(stop=>stop.id===params.get('stop')));
 const stop=stops[index];
 const copy=readCopy();
 const photo=recordImages[stop.photo??('/museums/'+stop.id)]?.[0];
 const art=sceneArt[stop.id]??illustrations[stop.art];
 const source=byPath.get(stop.path)?.sources.find(source=>source.id===({lazikou:'gan',hadapu:'hadapu',bangluo:'bangluo',huining:'reunion',jiangtai:'reunion'})[stop.id]);
 function select(i){
  if(i<0||i>=stops.length)return;
  const next=new URLSearchParams(params);
  next.set('stop',stops[i].id);
  setParams(next,{replace:true});
 }
 return <section className="march-exhibit" aria-label="红军长征时间轴">
  <header><p className="exhibit-count">THE LONG MARCH / 陇原关键节点</p><h2>从隘口到会师</h2><p>按历史时间展开。前段是中央红军入甘与落脚决策，后段是各路红军陆续会师。</p></header>
  <div className="march-layout">
   <div className="march-rail">
    <div className="march-steps" style={{'--march-step':index}} aria-label="历史节点" onKeyDown={e=>{
     if(e.key==='ArrowUp'||e.key==='ArrowDown'){
      e.preventDefault();
      const target=Math.max(0,Math.min(stops.length-1,index+(e.key==='ArrowUp'?-1:1)));
      select(target);e.currentTarget.querySelectorAll('button')[target]?.focus();
     }
    }}>
     <i className="march-traveller" aria-hidden="true"/>
     {stops.map((item,i)=><button type="button" key={item.id} onClick={()=>select(i)} aria-pressed={i===index}>
      <span className="march-dot"/><time>{item.date}</time><strong>{item.title}</strong><small>{copy[item.id]}</small>
     </button>)}
    </div>
   </div>
   <article className="march-panel" key={stop.id} aria-live="polite">
    <figure><ArchiveImage key={stop.id} loading="eager" src={photo?localImage(photo):art.src} alt={photo?.alt??art.caption}/><figcaption>{photo?<ImageCredit image={photo}/>:art.caption}</figcaption></figure>
    <div className="march-story"><span className="exhibit-entry-label">{stop.date} / {stop.place}</span><h3>{stop.title}</h3><p>{copy[stop.id]}</p>
     <Link to={stop.path} state={{returnTo:'/map?'+params}}>读完整专题 ↗</Link>{source&&<a href={source.url} target="_blank" rel="noreferrer">核对资料 ↗</a>}
    </div>
   </article>
  </div>
  <div className="march-controls"><button onClick={()=>select(index-1)} disabled={index===0}>← 上一站</button><span>{index+1} / {stops.length}</span><button onClick={()=>select(index+1)} disabled={index===stops.length-1}>下一站 →</button></div>
 </section>;
}
