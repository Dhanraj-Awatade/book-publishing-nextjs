import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse) {
  const data = await req.json();

  console.log(data);

  return NextResponse.json({ status: "success" });
}
