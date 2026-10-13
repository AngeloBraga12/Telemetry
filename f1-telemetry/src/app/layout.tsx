import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
const plex=IBM_Plex_Sans({subsets:["latin"],weight:["400","500","600"],display:"swap"});
export const metadata:Metadata={title:"Telemetria F1",description:"Sessões, tempos e telemetria de Fórmula 1 a partir dos dados da OpenF1."};
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="pt-BR"><body className={plex.className}><Providers>{children}</Providers></body></html>; }
