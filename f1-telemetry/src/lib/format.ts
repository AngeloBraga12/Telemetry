export const EMPTY="—";
function pad(n:number,width:number):string{return String(n).padStart(width,"0");}
export function formatDuration(seconds:number|null|undefined):string {if(seconds==null||!Number.isFinite(seconds)||seconds<0)return EMPTY;const totalMs=Math.round(seconds*1000),ms=totalMs%1000,totalSec=Math.floor(totalMs/1000),s=totalSec%60,m=Math.floor(totalSec/60)%60,h=Math.floor(totalSec/3600);if(h>0)return `${h}:${pad(m,2)}:${pad(s,2)}.${pad(ms,3)}`;if(m>0)return `${m}:${pad(s,2)}.${pad(ms,3)}`;return `${s}.${pad(ms,3)}`;}
export function formatGap(value:number|string|null|undefined):string {if(value==null)return EMPTY;if(typeof value==="string")return value.trim()===""?EMPTY:value;if(!Number.isFinite(value)||value===0)return EMPTY;return `+${value.toFixed(3)}`;}
