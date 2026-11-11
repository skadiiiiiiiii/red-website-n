import {historyRecords} from './v2History.js';

import {peopleRecords,peopleRegisters} from './v2People.js';
import {museumRecords} from './v2Museums.js';
import {recordImages} from './v2Images.js';
export {peopleRegisters,recordImages};
export const exhibitGroups = {
 history:{title:'红色陇原', english:'HISTORY', number:'01', description:'从根据地建设、长征会师到河西走廊，循着时间和地点阅读陇原革命历史。', records:historyRecords},
 people:{title:'英烈人物', english:'HEROES', number:'02', description:'从个人生平进入共同的历史。每份档案列出所依据的资料及关联专题。', records:peopleRecords},
 museums:{title:'旧址场馆', english:'MUSEUMS', number:'03', description:'辨认历史发生的场所与今天的纪念空间，循场馆回读历史。', records:museumRecords},
};
export const levels = {important:'重要专题',secondary:'专题补充',reference:'延伸阅读'};
export const exhibits = Object.entries(exhibitGroups).flatMap(([group,meta]) =>
 meta.records.map(record => ({...record,group,path:'/'+group+'/'+record.id})));
export const byPath = new Map(exhibits.map(record => [record.path,record]));
export function relatedRecords(record) {
 const paths = new Set(record.related ?? []);
 for (const entry of exhibits) if (entry.related?.includes(record.path)) paths.add(entry.path);
 paths.delete(record.path);
 return [...paths].map(path=>byPath.get(path)).filter(Boolean);
}
export function matchesRecord(record, search) {
 const text=[record.title,record.subtitle,record.summary,record.region,record.district,record.theme,record.address,...(record.sections??[]).flatMap(part=>[part.title,part.text])].filter(Boolean).join(' ').toLowerCase();
 return search.trim().toLowerCase().split(/\s+/).every(word=>text.includes(word));
}
export const localImage = image => import.meta.env.BASE_URL + image.path;
