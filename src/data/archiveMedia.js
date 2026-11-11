import {localImage,recordImages} from './exhibits.js';
import {personResearchPhoto} from './researchPortraits.js';
import {sceneArt} from './sceneArt.js';

const sites={
 nanliang:'/museums/nanliang',
 'nanliang-spirit':'/museums/nanliang',
 bangluo:'/museums/bangluo',
 hadapu:'/museums/hadapu',
 'hadapu-site':'/museums/hadapu',
 huining:'/museums/huining',
};

export function archiveMedia(id){
 const photos=recordImages[sites[id]];
 if(photos){
  const ordered=id==='hadapu-site'?[...photos].reverse():photos;
  return ordered.map(photo=>({src:localImage(photo),caption:photo.alt,photo}));
 }
 if(id==='liu-profile'){
  const photo=personResearchPhoto('liu-zhidan');
  if(photo)return [{src:localImage(photo),caption:photo.alt,photo}];
 }
 const contextual=['nanliang-spirit','liu-profile'].includes(id);
 const art=sceneArt[contextual?'nanliang':id];
 return art?[contextual?{...art,caption:'陕甘边根据地的山地与窑洞意象 · 情境插画'}:art]:[];
}
