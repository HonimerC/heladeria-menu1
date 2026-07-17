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
    setFecha(now.toLocaleDateString("es-VE", { weekday: "long", year: "numeric", month: "long", day: "numeric" }));
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
      {/* Header pink with drip */}
      <div className="drip">
        <header className="bg-[#ffb6c1] pb-10 pt-8 px-4 text-center" onClick={handleSonido}>
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#1a1a2e] leading-tight" style={{ fontFamily: "var(--font-fredoka)" }}>
              HeladeríaMenu1
            </h1>
            <p className="text-[#1a1a2e]/70 text-sm mt-1" style={{ fontFamily: "var(--font-poppins)" }}>Los mejores sabores de la ciudad</p>
            <div className="mt-3 inline-block bg-[#1a1a2e]/10 rounded-full px-4 py-1">
              <p className="text-[11px] text-[#1a1a2e]/60 capitalize">{fecha}</p>
            </div>
            {horarioHoy && (
              <div className="mt-2">
                <p className="text-xs text-[#1a1a2e]/70">
                  {horarioHoy.abierto ? `🕐 ${horarioHoy.horaApertura} - ${horarioHoy.horaCierre}` : "Cerrado hoy"}
                </p>
              </div>
            )}
          </div>
        </header>
      </div>

      <main className="max-w-md mx-auto px-5 py-8 space-y-10">
        {/* Sabores */}
        <section>
          <h2 className="text-2xl font-bold text-[#ffb6c1] text-center mb-1" style={{ fontFamily: "var(--font-fredoka)" }}>
            Sabores del Día
          </h2>
          <hr className="chalk-divider mb-4" />
          <div className="space-y-0">
            {saboresDisponibles.map((sabor) => (
              <div key={sabor.id} className="menu-row group">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: sabor.color }} />
                  <span className="text-[#f5f0e8] text-sm font-medium" style={{ fontFamily: "var(--font-poppins)" }}>{sabor.nombre}</span>
                </div>
              </div>
            ))}
          </div>
          {saboresAgotados.length > 0 && (
            <div className="mt-3">
              <p className="text-[10px] text-[#f5f0e8]/30 mb-1">Agotados:</p>
              <div className="flex flex-wrap gap-1.5">
                {saboresAgotados.map((sabor) => (
                  <span key={sabor.id} className="text-[#f5f0e8]/20 text-[10px] line-through">{sabor.nombre}</span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Tamaños y Precios */}
        <section>
          <h2 className="text-2xl font-bold text-[#ffb6c1] text-center mb-1" style={{ fontFamily: "var(--font-fredoka)" }}>
            Tamaños y Precios
          </h2>
          <hr className="chalk-divider mb-3" />
          <div className="space-y-0">
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
          <h2 className="text-2xl font-bold text-[#ffb6c1] text-center mb-1" style={{ fontFamily: "var(--font-fredoka)" }}>
            Combos del Día
          </h2>
          <hr className="chalk-divider mb-4" />
          <div className="space-y-3">
            {menuData.combos.filter((c) => c.disponible).map((combo) => (
              <div key={combo.id} className="bg-[#f5f0e8]/5 rounded-2xl p-4 border border-[#f5f0e8]/10">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#ffb6c1]" style={{ fontFamily: "var(--font-fredoka)" }}>{combo.nombre}</h3>
                    <p className="text-[#f5f0e8]/50 text-xs mt-0.5" style={{ fontFamily: "var(--font-poppins)" }}>{combo.descripcion}</p>
                  </div>
                  <span className="text-xl font-bold text-[#ffb6c1] ml-3" style={{ fontFamily: "var(--font-fredoka)" }}>Bs {combo.precio.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fresas con Crema */}
        <section>
          <h2 className="text-2xl font-bold text-[#ffb6c1] text-center mb-1" style={{ fontFamily: "var(--font-fredoka)" }}>
            Fresas con Crema
          </h2>
          <hr className="chalk-divider mb-3" />
          <div className="space-y-0">
            {menuData.fresasConCrema.filter((f) => f.disponible).map((fresas) => (
              <div key={fresas.id} className="menu-row">
                <span className="text-[#f5f0e8] text-sm" style={{ fontFamily: "var(--font-poppins)" }}>{fresas.nombre}</span>
                <span className="dots" />
                <span className="text-[#ffb6c1] font-bold text-sm" style={{ fontFamily: "var(--font-fredoka)" }}>Bs {fresas.precio.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Contacto */}
        <section className="text-center space-y-4 pt-4">
          <hr className="chalk-divider" />
          <div>
            <p className="text-[#f5f0e8]/40 text-xs mb-2" style={{ fontFamily: "var(--font-poppins)" }}>{menuData.contacto?.telefono}</p>
            <button onClick={abrirWhatsApp} className="bg-[#ffb6c1] text-[#1a1a2e] px-6 py-2 rounded-full font-bold text-sm hover:bg-[#ff69b4] transition-colors" style={{ fontFamily: "var(--font-fredoka)" }}>
              💬 WhatsApp
            </button>
          </div>
          <div>
            <p className="text-[#f5f0e8]/30 text-[10px]" style={{ fontFamily: "var(--font-poppins)" }}>
              HeladeríaMenu1 — Precios en Bolívares
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
