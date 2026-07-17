"use client";

import { useEffect, useState } from "react";
import { MenuData, menuPorDefecto } from "@/lib/data";
import { playWelcome } from "@/lib/sounds";

export default function Home() {
  const [menuData, setMenuData] = useState<MenuData>(menuPorDefecto);
  const [fecha, setFecha] = useState("");
  const [cargando, setCargando] = useState(true);
  const [sonidoActivo, setSonidoActivo] = useState(false);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => { setMenuData(data); setCargando(false); })
      .catch(() => { setMenuData(menuPorDefecto); setCargando(false); });
    const now = new Date();
    setFecha(now.toLocaleDateString("es-VE", { weekday: "long", month: "long", day: "numeric" }));
  }, []);

  const handleSonido = () => {
    if (!sonidoActivo) { playWelcome(); setSonidoActivo(true); }
  };

  const saboresDisponibles = menuData.sabores.filter((s) => s.disponible);
  const saboresAgotados = menuData.sabores.filter((s) => !s.disponible);
  const hoy = new Date().toLocaleDateString("es-VE", { weekday: "long" });
  const horarioHoy = menuData.horarios?.find((h) => h.dia.toLowerCase() === hoy.toLowerCase());
  const abrirWhatsApp = () => { window.open(`https://wa.me/${menuData.contacto?.whatsapp || ""}`, "_blank"); };

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a2e]">
        <div className="text-center">
          <div className="text-7xl mb-4 animate-float">🍦</div>
          <p className="text-xl font-bold text-[#ffb6c1]" style={{ fontFamily: "var(--font-fredoka)" }}>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] grain">
      {/* Header rosa con derrite */}
      <div className="drip">
        <header className="bg-[#ffb6c1] pb-10 pt-6 px-4 text-center" onClick={handleSonido}>
          <h1 className="text-4xl font-bold text-[#1a1a2e] leading-tight" style={{ fontFamily: "var(--font-fredoka)" }}>
            HeladeríaMenu1
          </h1>
          <p className="text-[#1a1a2e]/60 text-xs mt-1" style={{ fontFamily: "var(--font-poppins)" }}>Los mejores sabores de la ciudad</p>
          {horarioHoy && (
            <p className="text-[10px] text-[#1a1a2e]/50 mt-2">
              {horarioHoy.abierto ? `🕐 ${horarioHoy.horaApertura} - ${horarioHoy.horaCierre}` : "Cerrado hoy"}
            </p>
          )}
        </header>
      </div>

      <main className="max-w-md mx-auto px-5 pt-6 pb-8 space-y-8">
        {/* Sabores - GRID grande para aprovechar espacio */}
        <section>
          <h2 className="text-xl font-bold text-[#ffb6c1] text-center mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
            Sabores del Día
          </h2>
          <div className="grid grid-cols-3 gap-2.5">
            {saboresDisponibles.map((sabor) => (
              <div key={sabor.id} className="bg-[#f5f0e8]/5 rounded-xl p-3 text-center border border-[#f5f0e8]/8 hover:bg-[#f5f0e8]/10 transition-colors">
                <div className="w-10 h-10 rounded-full mx-auto mb-1.5 shadow-lg border-2 border-[#f5f0e8]/20" style={{ backgroundColor: sabor.color }} />
                <p className="text-[#f5f0e8] text-[11px] font-medium leading-tight" style={{ fontFamily: "var(--font-fredoka)" }}>
                  {sabor.nombre}
                </p>
              </div>
            ))}
          </div>
          {saboresAgotados.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5 justify-center">
              {saboresAgotados.map((sabor) => (
                <span key={sabor.id} className="text-[#f5f0e8]/15 text-[9px] line-through">{sabor.nombre}</span>
              ))}
            </div>
          )}
        </section>

        {/* Tamaños y Precios */}
        <section>
          <h2 className="text-xl font-bold text-[#ffb6c1] text-center mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
            Tamaños y Precios
          </h2>
          <hr className="chalk-divider mb-2" />
          <div>
            {menuData.tamanoVasos.map((tamano) => (
              <div key={tamano.id} className="menu-row">
                <span className="text-[#f5f0e8] text-sm" style={{ fontFamily: "var(--font-poppins)" }}>{tamano.nombre}</span>
                <span className="dots" />
                <span className="text-[#ffb6c1] font-bold text-sm" style={{ fontFamily: "var(--font-fredoka)" }}>Bs {tamano.precio.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Combos */}
        <section>
          <h2 className="text-xl font-bold text-[#ffb6c1] text-center mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
            Combos del Día
          </h2>
          <hr className="chalk-divider mb-3" />
          <div className="space-y-2">
            {menuData.combos.filter((c) => c.disponible).map((combo) => (
              <div key={combo.id} className="bg-[#f5f0e8]/5 rounded-xl p-3 border border-[#f5f0e8]/8">
                <div className="flex justify-between items-center">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-[#ffb6c1] truncate" style={{ fontFamily: "var(--font-fredoka)" }}>{combo.nombre}</h3>
                    <p className="text-[#f5f0e8]/40 text-[10px] truncate" style={{ fontFamily: "var(--font-poppins)" }}>{combo.descripcion}</p>
                  </div>
                  <span className="text-lg font-bold text-[#ffb6c1] ml-2 flex-shrink-0" style={{ fontFamily: "var(--font-fredoka)" }}>Bs {combo.precio.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fresas con Crema */}
        <section>
          <h2 className="text-xl font-bold text-[#ffb6c1] text-center mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
            Fresas con Crema
          </h2>
          <hr className="chalk-divider mb-2" />
          <div>
            {menuData.fresasConCrema.filter((f) => f.disponible).map((fresas) => (
              <div key={fresas.id} className="menu-row">
                <span className="text-[#f5f0e8] text-sm" style={{ fontFamily: "var(--font-poppins)" }}>{fresas.nombre}</span>
                <span className="dots" />
                <span className="text-[#ffb6c1] font-bold text-sm" style={{ fontFamily: "var(--font-fredoka)" }}>Bs {fresas.precio.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer contacto */}
        <div className="text-center pt-4 border-t border-[#f5f0e8]/10 space-y-3">
          <button onClick={abrirWhatsApp} className="bg-[#ffb6c1] text-[#1a1a2e] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#ff69b4] transition-colors" style={{ fontFamily: "var(--font-fredoka)" }}>
            💬 WhatsApp
          </button>
          <p className="text-[#f5f0e8]/25 text-[10px]" style={{ fontFamily: "var(--font-poppins)" }}>
            {menuData.contacto?.telefono}
          </p>
          <div className="text-[#f5f0e8]/15 text-[9px] space-y-0.5">
            {menuData.horarios?.map((h) => (
              <div key={h.dia} className="flex justify-between max-w-[200px] mx-auto">
                <span>{h.dia}</span>
                <span>{h.abierto ? `${h.horaApertura}-${h.horaCierre}` : "Cerrado"}</span>
              </div>
            ))}
          </div>
          <p className="text-[#f5f0e8]/10 text-[8px]">HeladeríaMenu1 — Precios en Bolívares</p>
        </div>
      </main>
    </div>
  );
}
