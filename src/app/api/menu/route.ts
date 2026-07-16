import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { menuPorDefecto, MenuData } from "@/lib/data";

function getRedis() {
  return new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });
}

const MENU_KEY = "heladeria-menu1-data";

export async function GET() {
  try {
    const data = await getRedis().get<MenuData>(MENU_KEY);
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

    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;

    if (!url || !token) {
      return NextResponse.json(
        { error: "Variables de entorno no configuradas", url: !!url, token: !!token },
        { status: 500 }
      );
    }

    await getRedis().set(MENU_KEY, data);
    return NextResponse.json({ success: true, data });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("PUT error:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
