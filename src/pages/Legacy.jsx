import PortraitPlaceholder from '../components/PortraitPlaceholder.jsx';
import {personResearchPhoto} from '../data/researchPortraits.js';
import {localImage} from '../data/exhibits.js';
import ArchiveImage from '../components/ArchiveImage.jsx';
import {ImageCredit} from '../components/ExhibitDetail.jsx';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import PageFrame from '../components/PageFrame.jsx';
import Sources from '../components/Sources.jsx';
import {people,letter} from '../data/content.js';
export default function Legacy(){
 const [active,setActive]=useState(0),[open,setOpen]=useState(false),person=people[active];
 const slug=({liu:'liu-zhidan',xie:'xie-zichang',xi:'xi-zhongxun'})[person.id];
 const portrait=personResearchPhoto(slug);
 return <PageFrame number="04" english="LEGACY / THE HUMAN THREAD" title="精神谱系" intro="记住名字，也读懂名字背后，对土地与人民的深情。" className="lineage-page">
 <section className="person-section"><div className="person-index"><span className="eyebrow">01 / 革命人物</span>{people.map((p,i)=><button key={p.id} aria-pressed={active===i} onClick={()=>setActive(i)}><small>0{i+1}</small>{p.name}<span>↗</span></button>)}</div><article className="person-record" key={person.id}>{portrait?<figure className="legacy-portrait"><ArchiveImage src={localImage(portrait)} alt={portrait.alt} width={portrait.width} height={portrait.height}/><figcaption><ImageCredit image={portrait}/></figcaption></figure>:<div className="legacy-record-label"><PortraitPlaceholder/><Link to={'/people/'+slug}>阅读完整档案 ↗</Link></div>}<div className="person-story"><span className="eyebrow">PERSONNEL RECORD / 0{active+1}</span><h2>{person.name}</h2><p className="person-role">{person.role}</p><h3>历史背景</h3><p>{person.background}</p><h3>主要事迹</h3><p>{person.deeds}</p><p className="spirit-tag">{person.spirit}</p><Sources ids={person.sourceIds}/><Link className="text-link" to={'/people/'+slug}>查看完整人物档案 ↗</Link></div></article></section>
 <section className="letter-section"><div className="letter-heading"><span className="eyebrow">02 / 以书信，回应历史</span><h2>纸短，<br/><em>山河长。</em></h2><p>历史家书承载真实的个人记忆。本期先以一封当代致敬信开启阅读；真实家书将待出处与使用权限核实后再收录。</p><span className="content-label">{letter.label}</span></div><div className={'letter-experience '+(open?'letter-open':'')}><button className="envelope" aria-expanded={open} aria-controls="tribute-letter" onClick={()=>setOpen(!open)}><span className="envelope-flap"/><span className="envelope-address">致 / 明天的你</span><span className="wax-seal">信</span><span className="envelope-hint">{open?'合上信件 ↑':'轻启此信 ↓'}</span></button><article id="tribute-letter" className="letter-paper" hidden={!open}><span className="letter-type">{letter.label}</span><h3>{letter.title}</h3><p>{letter.salutation}</p>{letter.paragraphs.map((p,i)=><p key={p} style={{'--delay':(i*.2+.5)+'s'}}>{p}</p>)}<p className="letter-signature">{letter.signature}</p></article></div></section>
 <section className="spirit-section"><span className="eyebrow">03 / 革命精神 · 当代阅读</span><div className="spirit-columns">{[['信念','在艰难中保持方向。读历史，也学习如何面对现实中的困难。'],['人民','把具体的人放在心上。让知识与能力回应身边真实的需要。'],['求实','从事实出发，让每一次判断有依据，让每一份行动能落地。']].map(([title,text],i)=><article key={title}><span>0{i+1}</span><h2>{title}</h2><p>{text}</p></article>)}</div><Sources ids={['spirit']}/></section>
 <section className="inherit-banner"><div><span className="eyebrow">04 / 精神传承</span><h2>下一封信，写在大地上。</h2><p>把历史阅读中的思考，变成青年服务家乡的行动。</p></div><Link className="outline-button" to="/youth">走向青年回响 ↗</Link></section>
 </PageFrame>
}
