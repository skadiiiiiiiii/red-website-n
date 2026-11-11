import {events} from './content.js';
export const navItems = [
 ['HOME','首页','/','01'],['ARCHIVES','红色档案','/archives','02'],['TIMELINE','时光长卷','/timeline','03'],
 ['LEGACY','精神谱系','/legacy','04'],['YOUTH','青年回响','/youth','05'],['ABOUT','关于本站','/about','06']
];
export const moments=events.filter(e=>['nanliang','hadapu','huining'].includes(e.id)).map(e=>({year:e.year,title:e.title,text:e.short,place:e.place}));

