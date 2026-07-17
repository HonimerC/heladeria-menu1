import { NextResponse } from "next/server";
import { menuPorDefecto, MenuData } from "@/lib/data";

const MENU_KEY = "heladeria-menu1-data";

async function kvGet(): Promise<MenuData | null> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  const res = await fetch(`${url}/get/${MENU_KEY}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const json = await res.json();
  if (!json.result) return null;
  return typeof json.result === "string" ? JSON.parse(json.result) : json.result;
}

async function kvSet(data: MenuData): Promise<void> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) throw new Error("Variables KV no configuradas");

  const res = await fetch(`${url}/set/${MENU_KEY}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "text/plain",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`KV set failed (${res.status}): ${err}`);
  }
}

export async function GET() {
  try {
    const data = await kvGet();
    return NextResponse.json(data || menuPorDefecto);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("GET error:", message);
    return NextResponse.json(menuPorDefecto);
  }
}

export async function PUT(request: Request) {
  try {
    const data: MenuData = await request.json();
    data.fechaActualizacion = new Date().toISOString();

    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;

    if (!url || !token) {
      return NextResponse.json(
        { error: "Variables KV_REST_API_URL y KV_REST_API_TOKEN no configuradas" },
        { status: 500 }
      );
    }

    await kvSet(data);
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("PUT error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
