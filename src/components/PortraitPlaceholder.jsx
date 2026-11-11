export default function PortraitPlaceholder(){
 return <figure className="portrait-placeholder" role="img" aria-label="档案标记，暂无人物照片">
  <svg viewBox="0 0 80 100" aria-hidden="true">
   <path d="M13 13h54v74H13z" fill="none" stroke="#b58a59" opacity=".5"/>
   <path d="M23 22h23l11 11v45H23zM46 22v11h11M31 47h18M31 56h18M31 65h13" fill="none" stroke="#dfc29b" strokeWidth="1.2"/>
   <path d="M13 23V13h10m34 74h10V77" fill="none" stroke="#dfc29b"/>
  </svg>
 </figure>;
}
