import {useState} from 'react';
export default function ArchiveImage({src,alt='',loading='lazy',...props}){
 const [failedSrc,setFailedSrc]=useState(null);
 if(failedSrc===src)return <span className="image-fallback" role="img" aria-label={alt||'档案图像暂不可用'}><b>LY / ARCHIVE</b><span>图像暂不可用</span><small>文字档案仍可阅读</small></span>;
 return <img key={src} src={src} alt={alt} loading={loading} decoding="async" width="1000" height="640" onError={()=>setFailedSrc(src)} {...props}/>;
}
