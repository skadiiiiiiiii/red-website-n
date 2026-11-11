import { useLocation } from 'react-router-dom';
import { navItems } from '../data/chapters.js';
export default function Placeholder(){const path=useLocation().pathname; const [en,zh]=navItems.find(x=>x[2]===path)?.slice(0,2)||['ARCHIVE','档案'];return <main className="placeholder"><span>LONGYUAN ARCHIVE / IN PREPARATION</span><h1>{zh}</h1><p>{en} — 第二阶段内容正在整理归档。</p><a href="#/">返回首页 ↗</a></main>}
