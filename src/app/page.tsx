"use client";

import { useEffect, useState } from "react";
import { MenuData, menuPorDefecto } from "@/lib/data";
import { playWelcome } from "@/lib/sounds";

export default function Home() {
  const [menuData, setMenuData] = useState<MenuData>(menuPorDefecto);
  const [cargando, setCargando] = useState(true);
  const [sonidoActivo, setSonidoActivo] = useState(false);
  const [seccion, setSeccion] = useState<"menu" | "precios">("menu");

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => { setMenuData(data); setCargando(false); })
      .catch(() => { setMenuData(menuPorDefecto); setCargando(false); });
  }, []);

  const handleSonido = () => { if (!sonidoActivo) { playWelcome(); setSonidoActivo(true); } };

  const saboresDisp = menuData.sabores.filter((s) => s.disponible);
  const saboresAgot = menuData.sabores.filter((s) => !s.disponible);
  const hoy = new Date().toLocaleDateString("es-VE", { weekday: "long" });
  const horarioHoy = menuData.horarios?.find((h) => h.dia.toLowerCase() === hoy.toLowerCase());
  const abrirWhatsApp = () => { window.open(`https://wa.me/${menuData.contacto?.whatsapp || ""}`, "_blank"); };

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center grain" style={{ background: "var(--bg)" }}>
        <div className="text-center">
          <div className="text-7xl mb-4 animate-float">🍦</div>
          <p className="text-lg" style={{ color: "var(--text-light)" }}>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grain" style={{ background: "var(--bg)" }}>
      {/* Hero */}
      <section className="gradient-hero px-5 pt-10 pb-12 text-center" onClick={handleSonido}>
        <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "var(--accent)" }}>
          Helados Artesanales
        </p>
        <h1 className="text-5xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)", color: "var(--text)" }}>
          HeladeríaMenu1
        </h1>
        <p className="text-sm leading-relaxed max-w-xs mx-auto mb-6" style={{ color: "var(--text-light)" }}>
          Helados hechos a mano todos los días con ingredientes frescos, naturales y mucho amor.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setSeccion("menu")}
            className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-all"
            style={{ background: "var(--accent)", fontFamily: "var(--font-body)" }}
          >
            Ver menú
          </button>
          <button
            onClick={() => setSeccion("precios")}
            className="px-6 py-2.5 rounded-full text-sm font-semibold border-2 transition-all"
            style={{ borderColor: "var(--accent)", color: "var(--accent)", background: "transparent", fontFamily: "var(--font-body)" }}
          >
            Precios
          </button>
        </div>
        {horarioHoy && (
          <p className="text-[11px] mt-5" style={{ color: "var(--text-light)" }}>
            🕐 {horarioHoy.abierto ? `${horarioHoy.horaApertura} — ${horarioHoy.horaCierre}` : "Cerrado hoy"}
          </p>
        )}
      </section>

      <main className="max-w-md mx-auto px-5 pb-10">
        {seccion === "menu" ? (
          <div className="space-y-10">
            {/* Sabores */}
            <section className="pt-8">
              <h2 className="section-title text-3xl">Nuestros Sabores</h2>
              <p className="section-subtitle">Elegí tu favorito o combiná varios</p>
              <div className="grid grid-cols-3 gap-3">
                {saboresDisp.map((sabor) => (
                  <div key={sabor.id} className="sabor-card">
                    {sabor.imagen ? (
                      <img src={sabor.imagen} alt={sabor.nombre} className="w-14 h-14 rounded-full mx-auto mb-2 object-cover border-2 border-white shadow" />
                    ) : (
                      <div className="sabor-icon" style={{ backgroundColor: sabor.color }}>
                        🍨
                      </div>
                    )}
                    <p className="text-sm font-semibold" style={{ color: "var(--text)", fontFamily: "var(--font-heading)" }}>{sabor.nombre}</p>
                    <p className="text-[10px] mt-0.5 leading-tight" style={{ color: "var(--text-light)" }}>{sabor.descripcion}</p>
                  </div>
                ))}
              </div>
              {saboresAgot.length > 0 && (
                <p className="text-center text-[10px] mt-3" style={{ color: "var(--text-light)" }}>
                  Agotados: {saboresAgot.map((s) => s.nombre).join(", ")}
                </p>
              )}
            </section>

            {/* Fresas con Crema */}
            <section>
              <h2 className="section-title text-2xl">Fresas con Crema</h2>
              <p className="section-subtitle">Fresas frescas con crema batida</p>
              <div className="space-y-2">
                {menuData.fresasConCrema.filter((f) => f.disponible).map((fresas) => (
                  <div key={fresas.id} className="extra-row">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0" style={{ background: "var(--peach-light)" }}>🍓</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{fresas.nombre}</p>
                      <p className="text-[10px]" style={{ color: "var(--text-light)" }}>{fresas.descripcion}</p>
                    </div>
                    <span className="price-badge">Bs {fresas.precio.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Combos */}
            <section>
              <h2 className="section-title text-2xl">Combos del Día</h2>
              <p className="section-subtitle">Aprovechá nuestras promociones</p>
              <div className="space-y-3">
                {menuData.combos.filter((c) => c.disponible).map((combo) => (
                  <div key={combo.id} className="sabor-card !p-4 text-left">
                    <div className="flex justify-between items-center">
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-bold" style={{ color: "var(--text)", fontFamily: "var(--font-heading)" }}>{combo.nombre}</p>
                        <p className="text-[11px] mt-0.5" style={{ color: "var(--text-light)" }}>{combo.descripcion}</p>
                      </div>
                      <span className="price-badge ml-3">Bs {combo.precio.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        ) : (
          /* Precios */
          <section className="pt-8 space-y-8">
            <div>
              <h2 className="section-title text-3xl">Tamaños y Precios</h2>
              <p className="section-subtitle">Elegí el tamaño perfecto</p>
              <div className="sabor-card !p-0 overflow-hidden">
                {menuData.tamanoVasos.map((tamano, i) => (
                  <div key={tamano.id} className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: i < menuData.tamanoVasos.length - 1 ? "1px solid rgba(74,55,40,0.06)" : "none" }}>
                    <span className="text-sm" style={{ color: "var(--text)" }}>{tamano.nombre}</span>
                    <span className="font-bold text-sm" style={{ color: "var(--accent)" }}>Bs {tamano.precio.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="section-title text-2xl">Fresas con Crema</h2>
              <p className="section-subtitle">Precios por tamaño</p>
              <div className="sabor-card !p-0 overflow-hidden">
                {menuData.fresasConCrema.filter((f) => f.disponible).map((fresas, i, arr) => (
                  <div key={fresas.id} className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(74,55,40,0.06)" : "none" }}>
                    <span className="text-sm" style={{ color: "var(--text)" }}>{fresas.nombre}</span>
                    <span className="font-bold text-sm" style={{ color: "var(--accent)" }}>Bs {fresas.precio.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t px-5 py-10" style={{ borderColor: "rgba(74,55,40,0.08)", background: "var(--bg-card)" }}>
        <div className="max-w-md mx-auto space-y-6 text-center">
          <div>
            <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--text)" }}>HeladeríaMenu1</h3>
            <p className="text-xs" style={{ color: "var(--text-light)" }}>Heladería artesanal con sabores que alegran el día.</p>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--text)" }}>Horario</h4>
            <div className="space-y-1 inline-block text-left">
              {menuData.horarios?.filter((h) => h.abierto).map((h, i, arr) => {
                const mismaHora = i > 0 && arr[i - 1].horaApertura === h.horaApertura && arr[i - 1].horaCierre === h.horaCierre;
                if (mismaHora) return null;
                const siguientes = arr.slice(i).filter((x) => x.horaApertura === h.horaApertura && x.horaCierre === h.horaCierre);
                const dias = siguientes.map((x) => x.dia.substring(0, 3));
                return (
                  <div key={h.dia} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-light)" }}>
                    <span className="w-3.5 h-3.5 flex-shrink-0 opacity-40">🕐</span>
                    <span>{dias.length > 2 ? `${dias[0]} — ${dias[dias.length - 1]}` : dias.join(", ")}: {h.horaApertura} a {h.horaCierre}</span>
                  </div>
                );
              })}
              {menuData.horarios?.filter((h) => !h.abierto).map((h) => (
                <div key={h.dia} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-light)" }}>
                  <span className="w-3.5 h-3.5 flex-shrink-0 opacity-40">🕐</span>
                  <span>{h.dia.substring(0, 3)}: Cerrado</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-2" style={{ fontFamily: "var(--font-heading)", color: "var(--text)" }}>Contacto</h4>
            <div className="space-y-1.5 inline-block text-left">
              <div className="flex items-center gap-2 text-xs" style={{ color: "var(--text-light)" }}>
                <span className="w-3.5 h-3.5 flex-shrink-0 opacity-40">📞</span>
                <span>{menuData.contacto?.telefono}</span>
              </div>
              <button onClick={abrirWhatsApp} className="flex items-center gap-2 text-xs font-semibold" style={{ color: "var(--accent)" }}>
                <span className="w-3.5 h-3.5 flex-shrink-0">💬</span>
                <span>WhatsApp</span>
              </button>
            </div>
          </div>

          <div className="pt-4 border-t" style={{ borderColor: "rgba(74,55,40,0.08)" }}>
            <p className="text-[10px]" style={{ color: "var(--text-light)" }}>© 2026 HeladeríaMenu1. Hecho con mucho amor y helado.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
