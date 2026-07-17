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
    setFecha(
      now.toLocaleDateString("es-VE", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);

  const handleSonido = () => {
    if (!sonidoActivo) {
      playWelcome();
      setSonidoActivo(true);
    }
  };

  const saboresDisponibles = menuData.sabores.filter((s) => s.disponible);
  const saboresAgotados = menuData.sabores.filter((s) => !s.disponible);

  const hoy = new Date().toLocaleDateString("es-VE", { weekday: "long" });
  const horarioHoy = menuData.horarios?.find(
    (h) => h.dia.toLowerCase() === hoy.toLowerCase()
  );

  const abrirWhatsApp = () => {
    const num = menuData.contacto?.whatsapp || "";
    window.open(`https://wa.me/${num}`, "_blank");
  };

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "linear-gradient(135deg, #ffe4f0 0%, #f3e8ff 50%, #fff8e1 100%)" }}>
        <div className="text-center">
          <div className="text-7xl sm:text-8xl mb-6 animate-float">🍦</div>
          <p className="text-xl sm:text-2xl font-bold gradient-text" style={{ fontFamily: "var(--font-fredoka)" }}>
            Cargando sabores...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #ffe4f0 0%, #f3e8ff 50%, #fff8e1 100%)" }}>
      {/* Header */}
      <header className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #e91e8c, #ff6eb4, #a855f7)" }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-3 left-6 text-4xl sm:text-6xl animate-float">🍦</div>
          <div className="absolute top-6 right-8 text-3xl sm:text-5xl animate-float" style={{ animationDelay: "0.5s" }}>🍨</div>
          <div className="absolute bottom-3 left-1/3 text-3xl sm:text-4xl animate-float" style={{ animationDelay: "1s" }}>🍓</div>
          <div className="absolute bottom-6 right-1/4 text-3xl sm:text-5xl animate-float" style={{ animationDelay: "1.5s" }}>🎂</div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 py-8 sm:py-12 text-center text-white">
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight drop-shadow-lg mb-2 sm:mb-3"
            style={{ fontFamily: "var(--font-fredoka)" }}
            onClick={handleSonido}
          >
            🍦 HeladeríaMenu1
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-pink-100 font-light" style={{ fontFamily: "var(--font-poppins)" }}>
            Los mejores sabores de la ciudad
          </p>
          <p className="mt-2 sm:mt-3 text-pink-200 text-xs sm:text-sm glass rounded-full px-3 sm:px-4 py-1 inline-block">
            {fecha}
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-6 sm:py-10 space-y-10 sm:space-y-14">
        {/* Horario del día */}
        {horarioHoy && (
          <div className="glass rounded-2xl p-4 sm:p-6 text-center shadow-lg border border-pink-100">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
              <span className="text-xl sm:text-2xl">🕐</span>
              <h2 className="text-lg sm:text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)", color: "#e91e8c" }}>
                Horario de Hoy
              </h2>
            </div>
            {horarioHoy.abierto ? (
              <p className="text-base sm:text-lg" style={{ fontFamily: "var(--font-poppins)" }}>
                <span className="font-semibold text-green-600">Abierto</span>{" "}
                de <span className="font-bold">{horarioHoy.horaApertura}</span> a{" "}
                <span className="font-bold">{horarioHoy.horaCierre}</span>
              </p>
            ) : (
              <p className="text-base sm:text-lg font-semibold text-red-500">Cerrado hoy</p>
            )}
          </div>
        )}

        {/* Sabores del día */}
        <section>
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <span className="text-3xl sm:text-4xl">🍨</span>
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ fontFamily: "var(--font-fredoka)", color: "#e91e8c" }}
            >
              Sabores del Día
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {saboresDisponibles.map((sabor) => (
              <div
                key={sabor.id}
                className="glass rounded-2xl p-3 sm:p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <div
                  className="w-10 h-10 sm:w-14 sm:h-14 rounded-full mx-auto mb-2 sm:mb-3 shadow-lg border-3 border-white"
                  style={{ backgroundColor: sabor.color, borderWidth: "3px" }}
                />
                <p
                  className="font-semibold text-gray-800 text-xs sm:text-base"
                  style={{ fontFamily: "var(--font-fredoka)" }}
                >
                  {sabor.nombre}
                </p>
                <p className="text-green-500 text-[10px] sm:text-xs font-medium mt-1">✓ Disponible</p>
              </div>
            ))}
          </div>
          {saboresAgotados.length > 0 && (
            <div className="mt-4 sm:mt-6">
              <p className="text-xs sm:text-sm text-gray-400 font-medium mb-2" style={{ fontFamily: "var(--font-poppins)" }}>
                Agotados hoy:
              </p>
              <div className="flex flex-wrap gap-2">
                {saboresAgotados.map((sabor) => (
                  <span
                    key={sabor.id}
                    className="px-3 sm:px-4 py-1 sm:py-2 rounded-full bg-gray-100 text-gray-400 text-xs sm:text-sm line-through"
                    style={{ fontFamily: "var(--font-poppins)" }}
                  >
                    {sabor.nombre}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Tamaños y Precios */}
        <section>
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <span className="text-3xl sm:text-4xl">📏</span>
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ fontFamily: "var(--font-fredoka)", color: "#a855f7" }}
            >
              Tamaños y Precios
            </h2>
          </div>
          <div className="glass rounded-2xl shadow-lg overflow-hidden border border-purple-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left" style={{ fontFamily: "var(--font-poppins)" }}>
                <thead>
                  <tr style={{ background: "linear-gradient(135deg, #a855f7, #e91e8c)" }}>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-lg">Tamaño</th>
                    <th className="px-4 sm:px-6 py-3 sm:py-4 font-semibold text-white text-sm sm:text-lg text-right">Precio (Bs)</th>
                  </tr>
                </thead>
                <tbody>
                  {menuData.tamanoVasos.map((tamano, index) => (
                    <tr
                      key={tamano.id}
                      className={index % 2 === 0 ? "bg-purple-50/50" : "bg-white"}
                    >
                      <td className="px-4 sm:px-6 py-3 sm:py-4 font-medium text-gray-800 text-sm sm:text-base">{tamano.nombre}</td>
                      <td className="px-4 sm:px-6 py-3 sm:py-4 text-right font-bold text-purple-600 text-sm sm:text-lg">
                        Bs {tamano.precio.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Combos del día */}
        <section>
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <span className="text-3xl sm:text-4xl">🎉</span>
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ fontFamily: "var(--font-fredoka)", color: "#ff9a56" }}
            >
              Combos del Día
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {menuData.combos
              .filter((c) => c.disponible)
              .map((combo) => (
                <div
                  key={combo.id}
                  className="rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-white"
                  style={{ background: "linear-gradient(135deg, #ff9a56, #e91e8c)" }}
                >
                  <h3 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                    {combo.nombre}
                  </h3>
                  <p className="mt-2 text-pink-100 text-xs sm:text-sm" style={{ fontFamily: "var(--font-poppins)" }}>
                    {combo.descripcion}
                  </p>
                  <p className="mt-3 sm:mt-4 text-3xl sm:text-4xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                    Bs {combo.precio.toFixed(2)}
                  </p>
                </div>
              ))}
          </div>
          {menuData.combos.filter((c) => c.disponible).length === 0 && (
            <p className="text-gray-400 text-center py-6" style={{ fontFamily: "var(--font-poppins)" }}>
              No hay combos disponibles hoy
            </p>
          )}
        </section>

        {/* Fresas con Crema */}
        <section>
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <span className="text-3xl sm:text-4xl">🍓</span>
            <h2
              className="text-2xl sm:text-3xl font-bold"
              style={{ fontFamily: "var(--font-fredoka)", color: "#e91e8c" }}
            >
              Fresas con Crema
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {menuData.fresasConCrema
              .filter((f) => f.disponible)
              .map((fresas) => (
                <div
                  key={fresas.id}
                  className="rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-white"
                  style={{ background: "linear-gradient(135deg, #ff4500, #e91e8c)" }}
                >
                  <h3 className="text-lg sm:text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                    {fresas.nombre}
                  </h3>
                  <p className="mt-2 text-pink-100 text-xs sm:text-sm" style={{ fontFamily: "var(--font-poppins)" }}>
                    {fresas.descripcion}
                  </p>
                  <p className="mt-3 sm:mt-4 text-2xl sm:text-3xl font-bold" style={{ fontFamily: "var(--font-fredoka)" }}>
                    Bs {fresas.precio.toFixed(2)}
                  </p>
                </div>
              ))}
          </div>
          {menuData.fresasConCrema.filter((f) => f.disponible).length === 0 && (
            <p className="text-gray-400 text-center py-6" style={{ fontFamily: "var(--font-poppins)" }}>
              No hay fresas con crema disponibles hoy
            </p>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="text-white py-8 sm:py-10" style={{ background: "linear-gradient(135deg, #1a1a2e, #16213e)" }}>
        <div className="max-w-5xl mx-auto px-4 text-center space-y-5 sm:space-y-6">
          {/* Contacto */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
              📞 Contáctanos
            </h3>
            <p className="text-gray-300 text-sm sm:text-base" style={{ fontFamily: "var(--font-poppins)" }}>
              Teléfono: {menuData.contacto?.telefono || "No disponible"}
            </p>
            <button
              onClick={abrirWhatsApp}
              className="mt-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm sm:text-base"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", fontFamily: "var(--font-fredoka)" }}
            >
              💬 WhatsApp
            </button>
          </div>

          {/* Horarios */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
              🕐 Horarios de Atención
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 max-w-md mx-auto text-xs sm:text-sm" style={{ fontFamily: "var(--font-poppins)" }}>
              {menuData.horarios?.map((h) => (
                <div key={h.dia} className="flex justify-between text-gray-300">
                  <span className="font-medium">{h.dia}</span>
                  <span>
                    {h.abierto ? `${h.horaApertura} - ${h.horaCierre}` : "Cerrado"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <p className="text-gray-500 text-xs sm:text-sm" style={{ fontFamily: "var(--font-poppins)" }}>
              HeladeríaMenu1 — Menú actualizado diariamente
            </p>
            <p className="text-gray-600 text-[10px] sm:text-xs mt-1">Precios en Bolívares (Bs)</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
