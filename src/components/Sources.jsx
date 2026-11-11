import { sources } from '../data/content.js';
export default function Sources({ids}) {return <aside className="sources"><span>资料来源 / REFERENCES</span>{ids.map(id=><a key={id} href={sources[id].url} target="_blank" rel="noopener noreferrer">{sources[id].publisher} · {sources[id].title} ↗</a>)}</aside>}
