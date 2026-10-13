import { NextResponse, type NextRequest } from "next/server";
import { UpstreamError, fetchUpstream } from "@/lib/openf1/upstream";
export const dynamic="force-dynamic";
export async function GET(request:NextRequest,{params}:{params:Promise<{resource:string}>}) {
const {resource}=await params;
try { const body=await fetchUpstream(resource,request.nextUrl.searchParams); return new NextResponse(body,{headers:{"Content-Type":"application/json","Cache-Control":"public, s-maxage=600, stale-while-revalidate=3600"}}); }
catch(error) { const status=error instanceof UpstreamError?error.status:500; const message=error instanceof UpstreamError?error.message:"Erro interno"; return NextResponse.json({error:message},{status}); }
}
