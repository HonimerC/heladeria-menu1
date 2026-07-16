import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { menuPorDefecto, MenuData } from "@/lib/data";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

const MENU_KEY = "heladeria-menu1-data";

export async function GET() {
  try {
    const data = await redis.get<MenuData>(MENU_KEY);
    return NextResponse.json(data || menuPorDefecto);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(menuPorDefecto);
  }
}

export async function PUT(request: Request) {
  try {
    const data: MenuData = await request.json();
    data.fechaActualizacion = new Date().toISOString();
    await redis.set(MENU_KEY, data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Error al guardar" },
      { status: 500 }
    );
  }
}
