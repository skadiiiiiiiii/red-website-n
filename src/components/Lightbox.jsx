import ArchiveImage from './ArchiveImage.jsx';
import {useState} from 'react';
import Modal from './Modal.jsx';
export default function Lightbox({images,start=0,onClose}) {
 const [index,setIndex]=useState(start),item=images[index];
 const move=delta=>setIndex(i=>(i+delta+images.length)%images.length);
 return <Modal title="图像阅览" onClose={onClose} className="lightbox" onKeyDown={e=>{if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}if(e.key==='ArrowRight'){e.preventDefault();move(1)}}}><div><ArchiveImage key={item.src} loading="eager" src={item.src} alt={item.caption}/><div className="lightbox-controls"><button disabled={images.length<2} onClick={()=>move(-1)} aria-label="上一张">← 上一张</button><p aria-live="polite">{index+1} / {images.length} · {item.caption}</p><button disabled={images.length<2} onClick={()=>move(1)} aria-label="下一张">下一张 →</button></div></div></Modal>
}
