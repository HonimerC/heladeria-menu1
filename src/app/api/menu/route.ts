import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";
import { menuPorDefecto, MenuData } from "@/lib/data";

const MENU_KEY = "heladeria-menu1-data";

export async function GET() {
  try {
    const data = await kv.get<MenuData>(MENU_KEY);
    return NextResponse.json(data || menuPorDefecto);
  } catch {
    return NextResponse.json(menuPorDefecto);
  }
}

export async function PUT(request: Request) {
  try {
    const data: MenuData = await request.json();
    data.fechaActualizacion = new Date().toISOString();
    await kv.set(MENU_KEY, data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al guardar" },
      { status: 500 }
    );
  }
}
