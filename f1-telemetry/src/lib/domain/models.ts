export interface Meeting {key:number;name:string;circuit:string;country:string;startsAt:string;cancelled:boolean;}
export interface Session {key:number;meetingKey:number;name:string;type:string;startsAt:string;cancelled:boolean;isQualifying:boolean;}
export type ResultStatus="classified"|"dnf"|"dns"|"dsq";
export type TimeValue=number|string|null;
export interface ResultRow {position:number|null;driverNumber:number;acronym:string|null;fullName:string|null;team:string|null;teamColour:string|null;status:ResultStatus;laps:number|null;durations:TimeValue[];gaps:TimeValue[];}
