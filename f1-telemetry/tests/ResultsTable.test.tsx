import {render,screen} from "@testing-library/react";
import {describe,expect,it} from "vitest";
import {ResultsTable} from "@/components/ResultsTable";
import type {ResultRow,Session} from "@/lib/domain/models";
const race:Session={key:1,meetingKey:1,name:"Race",type:"Race",startsAt:"2026-01-01T00:00:00Z",cancelled:false,isQualifying:false};
const row:ResultRow={position:1,driverNumber:1,acronym:"VER",fullName:"Max VERSTAPPEN",team:"Red Bull Racing",teamColour:"3671C6",status:"classified",laps:57,durations:[5025.4],gaps:[0]};
describe("ResultsTable",()=>{it("shows empty state",()=>{render(<ResultsTable session={race} rows={[]}/>);expect(screen.getByText(/ainda não publicou/i)).toBeInTheDocument();});it("renders formatted time and driver",()=>{render(<ResultsTable session={race} rows={[row]}/>);expect(screen.getByText("1:23:45.400")).toBeInTheDocument();expect(screen.getByText("VER")).toBeInTheDocument();});it("falls back to car number",()=>{render(<ResultsTable session={race} rows={[{...row,acronym:null,fullName:null}]}/>);expect(screen.getByText("#1")).toBeInTheDocument();});it("shows Q1-Q3 in qualifying",()=>{const q:Session={...race,name:"Qualifying",type:"Qualifying",isQualifying:true};render(<ResultsTable session={q} rows={[{...row,durations:[80.1,79.2,78.3],gaps:[0,0,0]}]}/>);expect(screen.getByRole("columnheader",{name:"Q3"})).toBeInTheDocument();});});
