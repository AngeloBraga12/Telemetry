import { z } from "zod";
const hexColour=z.string().regex(/^[0-9A-Fa-f]{6}$/);
export const meetingSchema=z.object({meeting_key:z.number().int(),meeting_name:z.string(),meeting_official_name:z.string().nullish(),circuit_short_name:z.string(),country_name:z.string(),location:z.string(),date_start:z.string(),date_end:z.string(),is_cancelled:z.boolean().nullish(),year:z.number().int()});
export const sessionSchema=z.object({session_key:z.number().int(),meeting_key:z.number().int(),session_name:z.string(),session_type:z.string(),date_start:z.string(),date_end:z.string(),is_cancelled:z.boolean().nullish(),year:z.number().int()});
export const driverSchema=z.object({session_key:z.number().int(),driver_number:z.number().int(),name_acronym:z.string(),full_name:z.string(),team_name:z.string().nullish(),team_colour:hexColour.nullish()});
const durationValue=z.union([z.number(),z.string()]).nullable();
export const sessionResultSchema=z.object({session_key:z.number().int(),driver_number:z.number().int(),position:z.number().int().nullish(),number_of_laps:z.number().int().nullish(),dnf:z.boolean().nullish(),dns:z.boolean().nullish(),dsq:z.boolean().nullish(),duration:z.union([durationValue,z.array(durationValue)]).nullish(),gap_to_leader:z.union([durationValue,z.array(durationValue)]).nullish()});
export const meetingsSchema=z.array(meetingSchema),sessionsSchema=z.array(sessionSchema),driversSchema=z.array(driverSchema),sessionResultsSchema=z.array(sessionResultSchema);
export type ApiMeeting=z.infer<typeof meetingSchema>; export type ApiSession=z.infer<typeof sessionSchema>; export type ApiDriver=z.infer<typeof driverSchema>; export type ApiSessionResult=z.infer<typeof sessionResultSchema>;
