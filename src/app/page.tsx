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
      .then((data) => {
        setMenuData(data);
        setCargando(false);
      })
      .catch(() => {
        setMenuData(menuPorDefecto);
        setCargando(false);
      });
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
      <div className="min-h-screen flex items-center justify-center px-4 bg-[#FFF5F9]">
        <div className="text-center">
          <div className="text-7xl sm:text-8xl mb-4 animate-float">🍦</div>
          <p className="text-xl font-bold text-pink-500" style={{ fontFamily: "var(--font-fredoka)" }}>Cargando sabores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF5F9]">
      {/* Header */}
      <header className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-rose-400 to-fuchsia-500">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-3 left-6 text-5xl animate-float">🍦</div>
          <div className="absolute top-5 right-8 text-4xl animate-float" style={{ animationDelay: "0.5s" }}>🍨</div>
          <div className="absolute bottom-2 left-1/3 text-3xl animate-float" style={{ animationDelay: "1s" }}>🍓</div>
        </div>
        <div className="relative max-w-lg mx-auto px-4 py-10 text-center text-white" onClick={handleSonido}>
          <div className="inline-block bg-white/20 rounded-full px-4 py-1 mb-3">
            <p className="text-xs text-pink-100">{fecha}</p>
          </div>
          <h1 className="text-5xl font-bold mb-1 drop-shadow-lg" style={{ fontFamily: "var(--font-fredoka)" }}>HeladeríaMenu1</h1>
          <p className="text-lg text-pink-100" style={{ fontFamily: "var(--font-poppins)" }}>Los mejores sabores de la ciudad</p>
          {horarioHoy && (
            <div className="mt-4 inline-block bg-white/20 rounded-2xl px-5 py-2">
              <p className="text-sm" style={{ fontFamily: "var(--font-poppins)" }}>
                {horarioHoy.abierto ? (
                  <>🕐 Abierto: <span className="font-bold">{horarioHoy.horaApertura} - {horarioHoy.horaCierre}</span></>
                ) : (
                  <span className="text-red-200 font-semibold">Cerrado hoy</span>
                )}
              </p>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6 space-y-8">
        {/* Sabores */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🍨</span>
            <h2 className="text-2xl font-bold text-pink-500" style={{ fontFamily: "var(--font-fredoka)" }}>Sabores del Día</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {saboresDisponibles.map((sabor) => (
              <div key={sabor.id} className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-md transition-all text-center border border-pink-50">
                <div className="w-12 h-12 rounded-full mx-auto mb-2 shadow-md border-2 border-white" style={{ backgroundColor: sabor.color }} />
                <p className="font-medium text-gray-800 text-xs leading-tight" style={{ fontFamily: "var(--font-fredoka)" }}>{sabor.nombre}</p>
                <p className="text-green-500 text-[10px] mt-0.5">✓</p>
              </div>
            ))}
          </div>
          {saboresAgotados.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-gray-400 mb-1">Agotados:</p>
              <div className="flex flex-wrap gap-1.5">
                {saboresAgotados.map((sabor) => (
                  <span key={sabor.id} className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-400 text-[10px] line-through">{sabor.nombre}</span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Tamaños */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">📏</span>
            <h2 className="text-2xl font-bold text-purple-500" style={{ fontFamily: "var(--font-fredoka)" }}>Tamaños y Precios</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-purple-50">
            {menuData.tamanoVasos.map((tamano, index) => (
              <div key={tamano.id} className={`flex items-center justify-between px-4 py-3 ${index !== 0 ? "border-t border-purple-50" : ""} ${index % 2 === 0 ? "bg-purple-50/30" : ""}`}>
                <span className="font-medium text-gray-700 text-sm" style={{ fontFamily: "var(--font-poppins)" }}>{tamano.nombre}</span>
                <span className="font-bold text-purple-600" style={{ fontFamily: "var(--font-fredoka)" }}>Bs {tamano.precio.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Combos */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🎉</span>
            <h2 className="text-2xl font-bold text-orange-500" style={{ fontFamily: "var(--font-fredoka)" }}>Combos del Día</h2>
          </div>
          <div className="space-y-3">
            {menuData.combos.filter((c) => c.disponible).map((combo) => (
              <div key={combo.id} className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-2xl p-4 text-white shadow-md">
                <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>{combo.nombre}</h3>
                <p className="text-pink-100 text-xs mt-1" style={{ fontFamily: "var(--font-poppins)" }}>{combo.descripcion}</p>
                <p className="text-2xl font-bold mt-2" style={{ fontFamily: "var(--font-fredoka)" }}>Bs {combo.precio.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fresas con Crema */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl">🍓</span>
            <h2 className="text-2xl font-bold text-red-500" style={{ fontFamily: "var(--font-fredoka)" }}>Fresas con Crema</h2>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {menuData.fresasConCrema.filter((f) => f.disponible).map((fresas) => (
              <div key={fresas.id} className="bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl p-4 text-white shadow-md flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>{fresas.nombre}</h3>
                  <p className="text-pink-100 text-[11px] mt-0.5" style={{ fontFamily: "var(--font-poppins)" }}>{fresas.descripcion}</p>
                </div>
                <span className="text-xl font-bold ml-3 flex-shrink-0" style={{ fontFamily: "var(--font-fredoka)" }}>Bs {fresas.precio.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-8">
        <div className="max-w-lg mx-auto px-4 text-center space-y-4">
          <div>
            <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>📞 Contáctanos</h3>
            <p className="text-gray-300 text-sm">{menuData.contacto?.telefono}</p>
            <button onClick={abrirWhatsApp} className="mt-2 px-5 py-2 rounded-full font-bold text-white text-sm bg-green-500 hover:bg-green-600 transition-colors" style={{ fontFamily: "var(--font-fredoka)" }}>
              💬 WhatsApp
            </button>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>🕐 Horarios</h3>
            <div className="text-xs text-gray-300 space-y-0.5">
              {menuData.horarios?.map((h) => (
                <div key={h.dia} className="flex justify-between max-w-xs mx-auto">
                  <span>{h.dia}</span>
                  <span>{h.abierto ? `${h.horaApertura} - ${h.horaCierre}` : "Cerrado"}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-3 border-t border-gray-800">
            <p className="text-gray-500 text-xs">HeladeríaMenu1 — Precios en Bolívares (Bs)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
