import {collectedImages} from './collectedImages.js';
const reunionHall = {
  path: 'images/v2/huining-reunion-hall.jpg',
  originalPath: 'images/v2/huining-reunion-hall-original.jpg',
  alt: '会宁文庙内红军长征会师联欢会举行处，2012年实景',
  credit: 'DarthVachel / Wikimedia Commons',
  source: 'https://commons.wikimedia.org/wiki/File:长征会师联欢会举行处.jpg',
  license: 'CC BY-SA 3.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  width: 1280,
  height: 960,
  processing: 'Wikimedia 1280 像素缩放版，未修复',
};

const huiningMemorial = {
  path: 'images/v2/huining-memorial.jpg',
  originalPath: 'images/v2/huining-memorial-original.jpg',
  alt: '会宁红军长征胜利纪念馆建筑和馆前广场，2012年实景',
  credit: 'DarthVachel / Wikimedia Commons',
  source: 'https://commons.wikimedia.org/wiki/File:会师纪念馆.jpg',
  license: 'CC BY-SA 3.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  width: 1280,
  height: 960,
  processing: 'Wikimedia 1280 像素缩放版，未修复',
};

const hadapuPostOffice = {
  path: 'images/v2/hadapu-post-office.jpg',
  alt: '哈达铺会议旧址的邮政代办所木门与门牌，2026年实景',
  credit: 'N509FZ / Wikimedia Commons',
  source: 'https://commons.wikimedia.org/wiki/File:Hadapu_Post_Office_(20260202170444).jpg',
  license: 'CC BY-SA 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  width: 1280,
  height: 853,
  processing: 'Wikimedia 1280 像素缩放版，未修复',
};

const hadapuConference = {
  path: 'images/v2/hadapu-cadre-conference.jpg',
  alt: '哈达铺红军干部会议会址关帝庙临街外景，2026年实景',
  credit: 'N509FZ / Wikimedia Commons',
  source: 'https://commons.wikimedia.org/wiki/File:Hadapu_Red_Army_Cadre_Conference_site_(20260202165723).jpg',
  license: 'CC BY-SA 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
  width: 1280,
  height: 853,
  processing: 'Wikimedia 1280 像素缩放版，未修复',
};

const lanzhouOffice = {
  path: 'images/v2/lanzhou-office-exterior.jpg',
  alt: '从酒泉路对面望向八路军兰州办事处旧址，2013年实景',
  credit: 'Zhangzhugang / Wikimedia Commons',
  source: 'https://commons.wikimedia.org/wiki/File:Lanzhou_Balujun_Banshichu_Jiuzhi_2013.12.29_12-58-20.jpg',
  license: 'CC BY-SA 3.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
  width: 1280,
  height: 853,
  processing: 'Wikimedia 1280 像素缩放版，未修复',
};

export const recordImages = {
 ...collectedImages,
  '/history/huining': [reunionHall],
  '/history/landing': [hadapuPostOffice],
  '/history/west-route-army': [...collectedImages['/museums/gaotai'], ...collectedImages['/museums/liyuankou']],
  '/history/lanzhou-resistance': [lanzhouOffice],
  '/museums/huining': [huiningMemorial, reunionHall],
  '/museums/hadapu': [hadapuConference, hadapuPostOffice],
  '/museums/lanzhou-office': [lanzhouOffice],
};
