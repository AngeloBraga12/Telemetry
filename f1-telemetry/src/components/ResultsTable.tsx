import type { ResultRow, Session } from "@/lib/domain/models";
import { EMPTY, formatDuration, formatGap } from "@/lib/format";
const STATUS_LABEL = { classified:"", dnf:"DNF", dns:"DNS", dsq:"DSQ" } as const;
const PHASES=["Q1","Q2","Q3"];
function timeCell(value:number|string|null):string { return typeof value==="string"?value:formatDuration(value); }
export function ResultsTable({session,rows}:{session:Session;rows:ResultRow[]}) {
if(!rows.length)return <p className="note">A fonte ainda não publicou o resultado desta sessão.</p>;
const phases=session.isQualifying?PHASES:[session.type==="Race"?"Tempo":"Melhor volta"], hasLaps=rows.some(r=>r.laps!=null);
return <div className="table-wrap" tabIndex={0} role="region" aria-label={`Resultado: ${session.name}`}><table className="results"><caption>Resultado da sessão. Tempos em minutos:segundos.milésimos; diferenças em segundos para o líder, conforme a fonte.</caption><thead><tr><th scope="col" className="num">Pos.</th><th scope="col">Piloto</th><th scope="col">Equipe</th>{hasLaps&&<th scope="col" className="num">Voltas</th>}{phases.map(p=><th scope="col" className="num" key={p}>{p}</th>)}<th scope="col" className="num">{session.isQualifying?"Dif. (Q mais avançado)":"Dif. líder"}</th></tr></thead><tbody>{rows.map(r=>{const lastGap=[...r.gaps].reverse().find(g=>g!=null)??null;return <tr key={r.driverNumber}><td className="num">{r.position??EMPTY}</td><td><span className="swatch" style={r.teamColour?{backgroundColor:`#${r.teamColour}`}:undefined} aria-hidden="true"/><span className="driver">{r.acronym??`#${r.driverNumber}`}</span>{" "}<span className="muted">{r.fullName??""}</span>{r.status!=="classified"&&<span className="tag">{STATUS_LABEL[r.status]}</span>}</td><td>{r.team??EMPTY}</td>{hasLaps&&<td className="num">{r.laps??EMPTY}</td>}{phases.map((_,i)=><td className="num" key={i}>{timeCell(r.durations[i]??null)}</td>)}<td className="num">{formatGap(lastGap)}</td></tr>})}</tbody></table></div>;
}
