import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const model = searchParams.get("model")?.trim() || "corolla"; // default
  const year = searchParams.get("year")?.trim();

  const query = new URLSearchParams();
  query.append("model", model);
  if (year && !isNaN(Number(year))) query.append("year", year);

  const apiKey = process.env.API_NINJAS_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not set" }, { status: 500 });
  }

  try {
    const res = await fetch(`https://api.api-ninjas.com/v1/cars?${query}`, {
      headers: { "X-Api-Key": apiKey },
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: text }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
