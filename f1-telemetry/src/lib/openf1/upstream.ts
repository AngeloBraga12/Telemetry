import "server-only";
const BASE_URL=process.env.OPENF1_BASE_URL??"https://api.openf1.org/v1";
const MAX_PER_MINUTE=Number(process.env.OPENF1_MAX_PER_MINUTE??30);
const MIN_SPACING_MS=340,CACHE_TTL_MS=600000,CACHE_MAX_ENTRIES=200;
const int=/^\d{1,9}$/,year=/^20\d{2}$/;
export const ALLOWED:Record<string,Record<string,RegExp>>={meetings:{year},sessions:{meeting_key:int,session_key:int,year},drivers:{session_key:int},session_result:{session_key:int}};
export class UpstreamError extends Error { constructor(message:string,public readonly status:number){super(message);} }
export function buildUpstreamUrl(resource:string,params:URLSearchParams):string {const rules=ALLOWED[resource];if(!rules)throw new UpstreamError("Recurso não permitido",404);const url=new URL(`${BASE_URL}/${resource}`);for(const [key,value] of params){const rule=rules[key];if(!rule||!rule.test(value))throw new UpstreamError(`Parâmetro inválido: ${key}`,400);url.searchParams.set(key,value);}return url.toString();}
const cache=new Map<string,{expires:number;body:string}>(),inflight=new Map<string,Promise<string>>(),recent:number[]=[];
let lastStart=0,queue:Promise<void>=Promise.resolve();
function schedule():Promise<void>{const turn=queue.then(async()=>{const now=Date.now();while(recent.length&&now-(recent[0] as number)>60000)recent.shift();if(recent.length>=MAX_PER_MINUTE)throw new UpstreamError("Limite de requisições atingido",429);const wait=Math.max(0,lastStart+MIN_SPACING_MS-now);if(wait)await new Promise(r=>setTimeout(r,wait));lastStart=Date.now();recent.push(lastStart);});queue=turn.catch(()=>undefined);return turn;}
export async function fetchUpstream(resource:string,params:URLSearchParams):Promise<string>{const url=buildUpstreamUrl(resource,params),hit=cache.get(url);if(hit&&hit.expires>Date.now())return hit.body;const pending=inflight.get(url);if(pending)return pending;const request=(async()=>{await schedule();const res=await fetch(url,{headers:{Accept:"application/json"},cache:"no-store"});if(!res.ok)throw new UpstreamError("Falha ao consultar a fonte de dados",res.status===429?429:502);const body=await res.text();if(cache.size>=CACHE_MAX_ENTRIES)cache.delete(cache.keys().next().value as string);cache.set(url,{expires:Date.now()+CACHE_TTL_MS,body});return body;})().finally(()=>inflight.delete(url));inflight.set(url,request);return request;}
