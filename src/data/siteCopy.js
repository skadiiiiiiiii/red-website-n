import defaults from './siteCopy.json';
export {defaults};
export const fields={prologueTitle:'首页 · 序章标题',prologueBody:'首页 · 序章正文',lazikou:'长征 · 腊子口',hadapu:'长征 · 哈达铺',bangluo:'长征 · 榜罗镇',huining:'长征 · 会宁',jiangtai:'长征 · 将台堡'};
export const storageKey='longyuan.copy.preview.v1';
export const isLocal=()=>['127.0.0.1','localhost','[::1]'].includes(window.location.hostname);
export function readCopy(){
 try{
  const saved=isLocal()?JSON.parse(localStorage.getItem(storageKey)||'{}'):{};
  return Object.fromEntries(Object.entries(defaults).map(([key,value])=>[key,typeof saved?.[key]==='string'?saved[key]:value]));
 }catch{return {...defaults}}
}
