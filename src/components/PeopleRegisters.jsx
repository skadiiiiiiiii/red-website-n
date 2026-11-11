import {Link} from 'react-router-dom';
import {byPath,peopleRegisters} from '../data/exhibits.js';

export default function PeopleRegisters({query,theme,region,level}) {
 const term=query.trim();
 if(region||level)return null;
 const groups=peopleRegisters.filter(group=>!theme||group.theme===theme);
 return <div className="people-registers">{groups.map(group=>{
  const entries=group.entries.filter(entry=>!term||[entry.name,entry.place,entry.detail,group.title].join(' ').includes(term));
  if(!entries.length)return null;
  return <section key={group.id} className="people-register">
   <span className="exhibit-count">MEMORIAL REGISTER / 已收录名录</span>
   <h2 id={'register-'+group.id}>{group.title}</h2><p className="exhibit-note">{group.note}</p>
   <table aria-labelledby={'register-'+group.id}>
    <thead><tr><th scope="col">姓名</th><th scope="col">地点与事迹</th><th scope="col">史料</th></tr></thead>
    <tbody>{entries.map(entry=><tr key={entry.name}>
     <th scope="row">{entry.to&&byPath.has(entry.to)?<Link to={entry.to}>{entry.name} ↗</Link>:entry.name}</th>
     <td>{entry.place} · {entry.detail}</td>
     <td>{(entry.refs??[]).map(id=>{const source=group.sources.find(item=>item.id===id);return source&&<a key={id} href={source.url} target="_blank" rel="noreferrer" aria-label={entry.name+'的资料：'+source.title}>出处 ↗</a>})}</td>
    </tr>)}</tbody>
   </table>
  </section>;
 })}</div>;
}
