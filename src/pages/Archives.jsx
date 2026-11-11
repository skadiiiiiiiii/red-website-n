import ArchiveImage from '../components/ArchiveImage.jsx';
import {useState,useEffect} from 'react';
import {useSearchParams} from 'react-router-dom';
import PageFrame from '../components/PageFrame.jsx';
import Modal from '../components/Modal.jsx';
import Sources from '../components/Sources.jsx';
import Lightbox from '../components/Lightbox.jsx';
import {archiveMedia} from '../data/archiveMedia.js';
import {ImageCredit} from '../components/ExhibitDetail.jsx';
import {archives} from '../data/content.js';
const categories=['全部','革命历史事件','革命人物','革命遗址','历史文献','红色精神'];
export default function Archives(){
 const [params,setParams]=useSearchParams(),[lightbox,setLightbox]=useState(null);
 const category=params.get('type')||'全部',query=params.get('q')||'';
 const selected=archives.find(a=>a.id===params.get('id'));
 const gallery=selected?archiveMedia(selected.id):[];
 useEffect(()=>setLightbox(null),[selected?.id]);
 const update=(key,value)=>{const next=new URLSearchParams(params);value?next.set(key,value):next.delete(key);setParams(next,{replace:key!=='id'})};
 const results=archives.filter(a=>(category==='全部'||a.category===category)&&[a.title,a.category,a.summary].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
 return <PageFrame number="02" english="ARCHIVES / THE RECORD ROOM" title="红色档案" intro="循着一页文献、一处旧址、一段往事，走进陇原深处的记忆。" className="archives-page">
 {params.get('id')&&!selected&&<div className="empty-state" role="status">此档案编号不存在。<button className="outline-button" onClick={()=>update('id','')}>返回档案索引</button></div>}
 <section className="archive-tools"><div className="filter-tabs" aria-label="档案分类">{categories.map(c=><button key={c} aria-pressed={category===c} onClick={()=>update('type',c==='全部'?'':c)}>{c}</button>)}</div><label className="archive-search"><span>检索档案</span><input type="search" value={query} onChange={e=>update('q',e.target.value)} placeholder="标题、分类、摘要…" maxLength={100}/><b aria-hidden="true">⌕</b></label></section>
 <div className="result-meta" role="status"><span>INDEX / {String(results.length).padStart(2,'0')} RECORDS</span><span>图像与史料来源见各档案</span></div>
 <section className="archive-grid" aria-label="档案检索结果">{results.map(a=>{const cover=archiveMedia(a.id)[0];return <button className="archive-card" key={a.id} onClick={()=>update('id',a.id)}><div className="archive-card-image">{cover&&<ArchiveImage src={cover.src} alt="" loading="lazy"/>}<span>LY / {String(archives.indexOf(a)+1).padStart(3,'0')}</span><b>查阅 ↗</b></div><div className="archive-card-copy"><span>{a.category} / {a.date}</span><h2>{a.title}</h2><p>{a.summary}</p></div></button>})}</section>
 {!results.length&&<div className="empty-state"><h2>尚未找到相关档案</h2><p>试试“会宁”“南梁”，或清除分类条件。</p><button className="outline-button" onClick={()=>setParams({})}>清除筛选</button></div>}
 {selected&&<Modal title={'档案 / '+selected.category} onClose={()=>update('id','')}><article className="archive-detail"><span className="eyebrow">{selected.date} / {selected.place}</span><h2>{selected.title}</h2><p className="detail-lead">{selected.summary}</p>{gallery.length>0&&<div className="detail-gallery">{gallery.map((item,i)=><figure key={item.src}><button onClick={()=>setLightbox(i)} aria-label={'放大图片：'+item.caption}><ArchiveImage src={item.src} alt={item.caption} loading="eager"/></button><figcaption>{item.caption}{item.photo&&<ImageCredit image={item.photo}/>}</figcaption></figure>)}</div>}{[['历史背景',selected.background],['事件经过 / 资料内容',selected.process],['历史意义 / 阅读启示',selected.meaning]].map(([title,text])=><section key={title}><h3>{title}</h3><p>{text}</p></section>)}<Sources ids={selected.sourceIds}/></article>{lightbox!==null&&gallery[lightbox]&&<Lightbox key={selected.id} images={gallery} start={lightbox} onClose={()=>setLightbox(null)}/>}</Modal>}
 </PageFrame>
}
