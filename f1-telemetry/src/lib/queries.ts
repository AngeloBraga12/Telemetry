"use client";
import { useQuery } from "@tanstack/react-query";
import { getMeetings,getSessionResults,getSessions } from "./openf1/gateway";
export const useMeetings=(year:number)=>useQuery({queryKey:["meetings",year],queryFn:()=>getMeetings(year)});
export const useSessions=(meetingKey:number|null)=>useQuery({queryKey:["sessions",meetingKey],queryFn:()=>getSessions(meetingKey as number),enabled:meetingKey!=null});
export const useSessionResults=(sessionKey:number|null)=>useQuery({queryKey:["session-results",sessionKey],queryFn:()=>getSessionResults(sessionKey as number),enabled:sessionKey!=null});
