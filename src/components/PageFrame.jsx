import { Link } from 'react-router-dom';
export default function PageFrame({number,english,title,intro,children,className=''}) {
 return <main className={'exhibit-page '+className}><header className="exhibit-heading"><div className="exhibit-meta"><Link to="/">← 返回首页</Link><span>LONGYUAN / EXHIBITION {number}</span></div><div className="exhibit-title"><div><span className="eyebrow">{english}</span><h1 tabIndex="-1">{title}</h1></div><p>{intro}</p></div><div className="heading-rule"><span>{number}</span><i/><span>山河有信，精神不息。</span></div></header>{children}</main>
}
