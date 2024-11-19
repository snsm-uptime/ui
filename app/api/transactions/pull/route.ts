// /app/api/transactions/pull/route.ts

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Simulate a response (replace with actual logic)
  return NextResponse.json({
    message: "Transactions pulled successfully",
    data: { start_date: body.start_date, end_date: body.end_date },
  });
}
