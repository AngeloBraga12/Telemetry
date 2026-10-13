"use client";
import { useMemo,useState } from "react";
import { ResultsTable } from "@/components/ResultsTable";
import { SessionPicker,seasonYears } from "@/components/SessionPicker";
import { useMeetings,useSessionResults,useSessions } from "@/lib/queries";
export default function Home() {
const years=useMemo(()=>seasonYears(new Date().getFullYear()),[]),[year,setYear]=useState(years[0] as number),[meetingKey,setMeetingKey]=useState<number|null>(null),[sessionKey,setSessionKey]=useState<number|null>(null);
const meetings=useMeetings(year),sessions=useSessions(meetingKey),session=sessions.data?.find(s=>s.key===sessionKey)??null,results=useSessionResults(sessionKey);
return <div className="shell"><header className="masthead"><h1>Telemetria F1</h1><p>Dados: OpenF1, projeto independente e não oficial. Tempos e resultados exibidos como fornecidos pela fonte.</p></header><SessionPicker years={years} year={year} onYear={y=>{setYear(y);setMeetingKey(null);setSessionKey(null)}} meetings={meetings} meetingKey={meetingKey} onMeeting={k=>{setMeetingKey(k);setSessionKey(null)}} sessions={sessions} sessionKey={sessionKey} onSession={setSessionKey}/><main className="stage" aria-live="polite">{!session&&<p className="note">Escolha uma etapa e uma sessão para ver o resultado.</p>}{session&&<><h2>{session.name}</h2>{results.isLoading&&<p className="note" role="status">Carregando resultado…</p>}{results.isError&&<p className="note error" role="alert">Falha ao carregar o resultado desta sessão.</p>}{results.data&&<ResultsTable session={session} rows={results.data}/>}</>}</main></div>;
}
