export const MESSAGE_KEY='longyuan.youth.messages.v1';
export function readMessages(storage){
 try {const value=JSON.parse(storage.getItem(MESSAGE_KEY)||'[]');if(!Array.isArray(value))return [];
 return value.filter(v=>v&&typeof v.id==='string'&&typeof v.text==='string'&&v.text.trim()&&v.text.length<=160&&typeof v.date==='string').slice(0,50);
 } catch {return []}
}
export function writeMessages(storage,items){storage.setItem(MESSAGE_KEY,JSON.stringify(items.slice(0,50)))}

