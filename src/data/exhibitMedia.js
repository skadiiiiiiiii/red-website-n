import {recordImages} from './v2Images.js';
import {sceneArt} from './sceneArt.js';
import oldStreet from '../assets/bangluo-village.jpg';
import loess from '../assets/hero-loess.jpg';

const street={src:oldStreet,caption:'陇原旧街意象 · 情境插画'};
const hills={src:loess,caption:'黄土山地意象 · 情境插画'};
const caves={...sceneArt.nanliang,caption:'陇东窑洞意象 · 情境插画'};
const corridor=sceneArt['west-route-army'];
const memorialIds=['gaotai','linze','gao-jincheng','lanzhou-martyrs','huining-martyrs'];
const museumArt={
 liangdang:street,minzhou:street,ejie:street,cirina:street,jieshipu:street,taozhou:street,
 shanchengbao:hills,helianwan:caves,liyuankou:corridor,gulang:corridor,aili:street,
};
const historyArt={'lanzhou-battle':hills,shanchengbao:hills,sparks:street};

export function exhibitPhotos(record){
 const path=record.path==='/history/lanzhou-resistance'?'/museums/lanzhou-office':record.path;
 return recordImages[path];
}

export function exhibitIllustration(record){
 if(record.group==='museums'){
  if(memorialIds.includes(record.id))return sceneArt.memorial;
  if(record.id==='old-well'||record.id==='wang-jinxi')return sceneArt.oilfield;
  return museumArt[record.id]??sceneArt[record.id];
 }
 if(record.group==='history')return historyArt[record.id]??sceneArt[record.id];
}
