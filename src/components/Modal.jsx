import { useEffect, useRef, useId } from 'react';
export default function Modal({title,onClose,children,className='',onKeyDown}) {
 const ref=useRef(null),id=useId();
 useEffect(()=>{const el=ref.current;const previous=document.activeElement;el.showModal();const old=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{el.close();document.body.style.overflow=old;if(previous?.isConnected)previous.focus()}},[]);
 return <dialog ref={ref} aria-labelledby={id} onKeyDown={onKeyDown} className={'modal '+className} onCancel={e=>{e.preventDefault();e.stopPropagation();onClose()}} onClick={e=>{if(e.target===ref.current){const r=ref.current.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)onClose()}}}><header className="modal-bar"><span id={id}>{title}</span><button className="square-button" aria-label="关闭" onClick={onClose}>×</button></header>{children}</dialog>
}
