import type { z } from "zod";
import { normalizeMeetings,normalizeResults,normalizeSessions } from "../domain/normalize";
import type { Meeting,ResultRow,Session } from "../domain/models";
import { driversSchema,meetingsSchema,sessionResultsSchema,sessionsSchema } from "./schemas";
export class GatewayError extends Error { constructor(message:string,public readonly status?:number){super(message);} }
type Fetcher=typeof fetch;
async function request<T>(resource:string,params:Record<string,string|number>,schema:z.ZodType<T>,fetcher:Fetcher):Promise<T> {
const query=new URLSearchParams(Object.entries(params).map(([k,v])=>[k,String(v)])),res=await fetcher(`/api/openf1/${resource}?${query}`);
if(!res.ok)throw new GatewayError("Não foi possível obter os dados.",res.status);
const json:unknown=await res.json(),parsed=schema.safeParse(json); if(!parsed.success)throw new GatewayError("A resposta da fonte de dados está em formato inesperado."); return parsed.data;
}
export async function getMeetings(year:number,fetcher:Fetcher=fetch):Promise<Meeting[]>{return normalizeMeetings(await request("meetings",{year},meetingsSchema,fetcher));}
export async function getSessions(meetingKey:number,fetcher:Fetcher=fetch):Promise<Session[]>{return normalizeSessions(await request("sessions",{meeting_key:meetingKey},sessionsSchema,fetcher));}
export async function getSessionResults(sessionKey:number,fetcher:Fetcher=fetch):Promise<ResultRow[]>{const results=await request("session_result",{session_key:sessionKey},sessionResultsSchema,fetcher);const drivers=await request("drivers",{session_key:sessionKey},driversSchema,fetcher);return normalizeResults(results,drivers);}
