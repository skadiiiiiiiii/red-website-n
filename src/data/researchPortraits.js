import {collectedImages} from './collectedImages.js';
export function personResearchPhoto(id){return collectedImages['/people/'+id]?.[0]??null;}
