import {useId} from 'react';

export default function BrandMark(){
 const id=useId();
 const gold=id+'-gold', enamel=id+'-enamel', flame=id+'-flame';
 return <svg className="brand-emblem" viewBox="0 0 64 64" aria-hidden="true">
  <defs>
   <linearGradient id={gold} x2=".75" y2="1"><stop stopColor="#fff1c5"/><stop offset=".42" stopColor="#d6ac63"/><stop offset="1" stopColor="#815222"/></linearGradient>
   <linearGradient id={enamel} x2=".8" y2="1"><stop stopColor="#a6333f"/><stop offset=".55" stopColor="#621321"/><stop offset="1" stopColor="#350d18"/></linearGradient>
   <linearGradient id={flame} x2=".2" y2="1"><stop stopColor="#fff7e5"/><stop offset="1" stopColor="#e2aa50"/></linearGradient>
  </defs>
  <path d="M32 4 57 18v29L32 62 7 47V18Z" fill="#230810"/>
  <path className="brand-outline" d="M32 2 57 17v29L32 60 7 46V17Z" fill={`url(#${enamel})`} stroke={`url(#${gold})`} strokeWidth="1.7"/>
  <path d="M32 7 52 19v24L32 55 12 43V19Z" fill="none" stroke="#f5d393" opacity=".35"/>
  <path className="brand-ridge" d="m15 41 11-12 6 6 8-10 9 16Z" fill="#36101a" stroke={`url(#${gold})`} strokeWidth="1.65" strokeLinejoin="round"/>
  <path d="m18 39 8-8 6 6 8-10 6 10" fill="none" stroke="#fff4d6" strokeWidth="1.1" strokeLinecap="round"/>
  <path className="brand-flame" d="M32 12c2 6 6 7 6 12a6 6 0 0 1-12 0c0-3 2-5 3-6 0 3 1 4 2 4 1-3 1-6 1-10Z" fill={`url(#${flame})`}/>
  <path d="M21 46h22m-16 4h10" stroke="#ddb675" opacity=".75"/>
 </svg>;
}
