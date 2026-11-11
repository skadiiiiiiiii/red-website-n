import {artwork} from './artwork.js';
// Verified summaries. Dates use only the precision supported by the cited source.
import landArt from '../assets/land.svg';
import townArt from '../assets/town.svg';
import paperArt from '../assets/paper.svg';
import fieldArt from '../assets/field.svg';
export const sources = {
 nanliang: {title:'孕育了革命的陕甘边根据地', publisher:'秦风网 · 学习时报', url:'https://www.qinfeng.gov.cn/info/1064/232272.htm'},
 hadapu: {title:'百年瞬间丨中央红军长征来到哈达铺', publisher:'共产党员网', url:'https://www.12371.cn/2021/02/22/VIDE1613964001034993.shtml'},
 bangluo: {title:'长征中的会议：榜罗镇会议', publisher:'共产党员网', url:'https://fuwu.12371.cn/2012/06/11/ARTI1339400564382590_13.shtml'},
 reunion: {title:'红军长征中的会师', publisher:'中华人民共和国国防部', url:'https://www.mod.gov.cn/gfbw/gfjy_index/js_214151/16418521.html'},
 liu: {title:'群众领袖、民族英雄——刘志丹', publisher:'共产党员网 · 新华社', url:'https://www.12371.cn/2018/10/08/ARTI1538985320173299.shtml'},
 spirit: {title:'南梁精神孕育形成的历史揭示了什么？', publisher:'共产党员网 · 学习时报', url:'https://www.12371.cn/2021/07/10/ARTI1625883809985282.shtml'},
 memoir: {title:'难忘的教诲——纪念刘志丹同志九十诞辰', publisher:'共产党员网', url:'https://news.12371.cn/2013/10/14/ARTI1381714968861366.shtml'},
 school: {title:'学院简介及专业介绍（2021）', publisher:'甘肃农业大学农学院', url:'https://nxy.gsau.edu.cn/info/1989/6479.htm'},
};
export const illustrations={
 ...artwork,
 land:{src:landArt,caption:'陇原山河 · 原创意象插画，非历史照片'},
 town:{src:townArt,caption:'会合之地 · 原创建筑意象，非旧址复原'},
 paper:{src:paperArt,caption:'文献之页 · 原创文献意象，非历史原件'},
 field:{src:fieldArt,caption:'大地生长 · 原创农田意象'}
};
export const events=[
 {id:'nanliang',date:'1934.11.07',year:'1934',period:'根据地建设',title:'南梁建政',place:'甘肃 · 华池南梁',short:'陕甘边区苏维埃政府在南梁荔园堡成立。',background:'陕甘边革命力量在艰难斗争中逐步建立根据地。',process:'1934年11月7日，陕甘边区苏维埃政府在南梁成立，习仲勋当选政府主席，刘志丹任军事委员会主席。',meaning:'这段历史见证了西北革命根据地的政权建设。',image:'land',sourceIds:['nanliang'],x:530,y:145},
 {id:'hadapu',date:'1935.09',year:'1935',period:'长征北上',title:'哈达铺的方向',place:'甘肃 · 宕昌哈达铺',short:'休整、补给与报纸中的消息，为北上带来新的方向。',background:'长途行军后，红军需要补给与休整。',process:'1935年9月，中央红军在哈达铺休整，并通过报纸了解陕北红军和根据地的消息。',meaning:'哈达铺是理解长征北上决策的重要地点。',image:'paper',sourceIds:['hadapu'],x:285,y:295},
 {id:'bangluo',date:'1935.09.27',year:'1935',period:'长征北上',title:'榜罗镇会议',place:'甘肃 · 通渭榜罗镇',short:'以陕北作为长征落脚点的战略方向进一步明确。',background:'陕甘支队继续北上，需要明确建立根据地的具体目的地。',process:'1935年9月27日，陕甘支队抵达榜罗镇。会议确定了保卫和扩大陕北根据地的战略决策。',meaning:'为此后北上行动明确了目标。',image:'land',sourceIds:['bangluo'],x:340,y:245},
 {id:'huining',date:'1936.10.09',year:'1936',period:'胜利会师',title:'会宁会师',place:'甘肃 · 会宁',short:'红一、红四方面军在会宁会师。',background:'红军各部克服困难，向会合目标推进。',process:'1936年10月9日，红军总部和红四方面军总指挥部到达会宁，与红一方面军部队会师。',meaning:'会宁成为长征会师的重要历史坐标。',image:'town',sourceIds:['reunion'],x:365,y:207},
 {id:'jiangtai',date:'1936.10.22',year:'1936',period:'胜利会师',title:'将台堡会师',place:'今宁夏 · 西吉将台堡',short:'红二方面军总指挥部及第2军团与红一方面军主力会师。',background:'获悉会宁会师消息后，红二方面军继续北进。',process:'1936年10月22日，红二方面军总指挥部及第2军团在将台堡与红一方面军主力会师。',meaning:'三大主力红军胜利会师，长征胜利结束。将台堡今属宁夏，与甘肃会宁为不同地点。',image:'town',sourceIds:['reunion'],x:440,y:210}
];
export const people=[
 {id:'liu',name:'刘志丹',role:'陕甘革命根据地的创建者之一',background:'在大革命失败后的西北革命斗争中，参与领导渭华起义，随后在陕甘边开展兵运与武装斗争。',deeds:'1931年与谢子长等组建西北反帝同盟军，参与开辟以照金、南梁为中心的陕甘边革命根据地。此后推动陕北、陕甘边两块根据地的联系与发展，为北上红军提供落脚的基础。',spirit:'联系群众 · 顾全大局',sourceIds:['liu']},
 {id:'xie',name:'谢子长',role:'陕甘革命斗争的重要领导者',background:'与刘志丹、习仲勋等共同探索西北革命道路，在陕北与陕甘边的革命实践中推进武装力量的联合。',deeds:'1934年7月，谢子长等率领的陕北游击队与刘志丹、习仲勋等领导的红军部队会合。双方协同决策、相互支援，为两地革命力量的发展创造条件。',spirit:'坚定信念 · 心系人民',sourceIds:['spirit']},
 {id:'xi',name:'习仲勋',role:'陕甘边区苏维埃政府主席',background:'参与创建以南梁为中心的陕甘边革命根据地，开展群众组织与地方政权建设工作。',deeds:'1934年在南梁当选陕甘边区苏维埃政府主席。根据地建设将经济发展、文化教育与群众生活联系起来，通过具体政策巩固革命的社会基础。',spirit:'实事求是 · 扎根群众',sourceIds:['nanliang']}
];
export const archives=[
 ...events.map(e=>({...e,category:'革命历史事件',summary:e.short,images:[e.image,e.image==='paper'?'land':'paper']})),
 {id:'liu-profile',title:'刘志丹人物档案',date:'陕甘革命时期',place:'陕甘边',category:'革命人物',summary:'从人物经历理解根据地建设与群众工作。',background:people[0].background,process:people[0].deeds,meaning:'人物阅读启示：在共同目标中理解纪律、团结与担当。',images:['land','paper'],sourceIds:['liu']},
 {id:'hadapu-site',title:'哈达铺：历史发生的地方',date:'1935年9月（相关事件）',place:'甘肃 · 宕昌哈达铺',category:'革命遗址',summary:'从哈达铺旧址线索，阅读长征中的补给与信息。',background:'哈达铺与中央红军长征北上的历史紧密相连。',process:'邮政代办所与旧报纸，是了解红军在此获取信息的重要线索。',meaning:'遗址阅读让地理空间与历史决策建立联系。',images:['town','paper'],sourceIds:['hadapu']},
 {id:'memoir',title:'难忘的教诲',date:'纪念刘志丹九十诞辰',place:'文献索引 · 陕甘革命史',category:'历史文献',summary:'习仲勋纪念刘志丹的文章索引，可前往权威来源阅读。',background:'这是一篇回忆性纪念文章，不是家书。',process:'文章回顾与刘志丹共事的经历。本馆提供题名与阅读入口，不制作原件仿真。',meaning:'将回忆性文献与人物年表对照阅读，有助于理解历史细节。',images:['paper','land'],sourceIds:['memoir']},
 {id:'nanliang-spirit',title:'南梁精神：从群众中来',date:'形成于陕甘边革命实践',place:'甘肃 · 南梁',category:'红色精神',summary:'联系群众、坚定信念，在革命实践中理解精神传承。',background:'南梁精神形成于陕甘边区党与人民共同奋斗的历史中。',process:'根据地通过发展经济、兴办教育等措施回应群众需要。',meaning:'当代阅读启示：把服务人民落实到日常行动。',images:['land','field'],sourceIds:['spirit']}
];
export const letter={
 title:'寄给山河，也寄给明天',label:'当代青年原创致敬文字 · 本站创作 · 非历史家书',
 salutation:'致走在陇原大地上的你：',
 paragraphs:['我想把今天学到的知识，带到一块真实的土地上。去观察一株作物怎样生长，也去倾听种植它的人有怎样的期盼。','山河记得来路，我们继续走向远方。愿每一次认真记录、每一次求证、每一次伸手相助，都成为青春留下的回答。','不必等到宏大的时刻。把眼前的事做好，把身边的人放在心上，就是我写给这片土地的信。'],
 signature:'一位当代青年的致敬 · 本站原创'
};
export const youthPlaces=[
 {id:'zhangye',name:'张掖',x:210,y:120,theme:'农业科技创新',title:'让每一滴水，都抵达生长',text:'以河西地域为观察窗口，关注节水、土壤与作物生长。学习建议：记录灌溉方式，思考资源利用与农业生产的关系。',action:'行动提案 / 制作一份节水观察笔记'},
 {id:'lanzhou',name:'兰州',x:365,y:218,theme:'青年理想',title:'从校园出发，带着问题走向田野',text:'围绕农学学习与乡土观察，把课堂问题整理成实践计划。先学习调查方法，再用可靠记录回应真实需要。',action:'行动提案 / 为田野调查准备问题清单'},
 {id:'dingxi',name:'定西',x:412,y:267,theme:'乡村振兴',title:'把技术讲清，把需求听懂',text:'关注农业生产与乡村生活的连接。以通俗语言整理科学知识，同时尊重种植者的经验与实际条件。',action:'行动提案 / 完成一份易读的农业科普'},
 {id:'qingyang',name:'庆阳',x:555,y:215,theme:'服务基层',title:'以倾听，理解一片土地',text:'在红色文化学习与乡土访谈中，关注群众需求。做好资料核实、访谈授权与记录整理，让服务从认真倾听开始。',action:'行动提案 / 整理一份经同意的乡土口述'},
 {id:'longnan',name:'陇南',x:420,y:350,theme:'青年志愿服务',title:'让知识走近更多人',text:'可以从社区阅读、数字工具辅导与文化讲解练习做起。尊重服务对象的时间，以可持续的小行动回应身边需要。',action:'行动提案 / 设计一次社区志愿服务'}
];
export const aboutSections=[
 ['01','创作理念','让记忆成为可以走近的空间。烽火陇原以甘肃红色历史为线索，将档案阅读、时间探索与青年表达连接起来。这是参赛创作项目，不是政府、纪念馆或学校的官方网站。'],
 ['02','红色表达','以山河承载记忆，以行动延续精神。历史内容采用来源可追溯的简要转述；当代寄语与历史档案明确区分。'],
 ['03','设计思路','沿用黑色、旧纸白与深绛红的视觉关系。档案页强调检索与编号，时间轴强调行进与节点，精神页以信件传递情绪，青年页通过地域观察转向当下。'],
 ['04','技术架构','React 与 Vite 构建，HashRouter 管理静态路由。CSS Variables 统一视觉，Intersection Observer 触发显现，requestAnimationFrame 更新滚动进度。SVG 构建原创意象与示意地图。'],
 ['05','内容来源','主要参考国防部网站、共产党员网、秦风网所载党史资料，以及甘肃农业大学农学院公开介绍。各档案、时间节点与人物附对应来源，文字为简要整理，不代替原始史料。'],
 ['06','图像与史料','场馆实景、人物肖像和历史照片附有来源。用于叙述背景的插画按图注标为意象或情境插画，历史文献请查阅档案所附原文。'],
 ['07','使用与隐私','青年寄语仅存于当前浏览器，不上传、不公开，也不会跨设备同步。清除浏览器数据会移除寄语。可在页面逐条删除；浏览器禁止存储时会显示提示。'],
];


events.forEach(e=>{e.image="plate_"+e.id});
archives.forEach(a=>{const key="cover_"+a.id.replaceAll("-","_");a.images=[key, artwork["plate_"+a.id]?"plate_"+a.id:"paper"];});
