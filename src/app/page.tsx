"use client";

import { useEffect, useState } from "react";
import { MenuData, menuPorDefecto } from "@/lib/data";

export default function Home() {
  const [menuData, setMenuData] = useState<MenuData>(menuPorDefecto);
  const [fecha, setFecha] = useState("");
  const [cargando, setCargando] = useState(true);

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

  const saboresDisponibles = menuData.sabores.filter((s) => s.disponible);
  const saboresAgotados = menuData.sabores.filter((s) => !s.disponible);

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🍦</div>
          <p className="text-gray-500 text-lg">Cargando menú...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 text-white shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
            🍦 HeladeríaMenu1
          </h1>
          <p className="mt-2 text-pink-100 text-lg">Los mejores sabores de la ciudad</p>
          <p className="mt-1 text-pink-200 text-sm capitalize">{fecha}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-10">
        {/* Sabores del día */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">🍨</span>
            <h2 className="text-2xl font-bold text-gray-800">Sabores del Día</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {saboresDisponibles.map((sabor) => (
              <div
                key={sabor.id}
                className="rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow border border-white/60 backdrop-blur-sm bg-white/70"
              >
                <div
                  className="w-10 h-10 rounded-full mx-auto mb-2 shadow-inner border-2 border-white"
                  style={{ backgroundColor: sabor.color }}
                />
                <p className="text-center font-medium text-gray-800 text-sm">{sabor.nombre}</p>
                <p className="text-center text-green-600 text-xs font-semibold mt-1">✓ Disponible</p>
              </div>
            ))}
          </div>
          {saboresAgotados.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 font-medium mb-2">Agotados hoy:</p>
              <div className="flex flex-wrap gap-2">
                {saboresAgotados.map((sabor) => (
                  <span
                    key={sabor.id}
                    className="px-3 py-1 rounded-full bg-gray-200 text-gray-500 text-sm line-through"
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
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">📏</span>
            <h2 className="text-2xl font-bold text-gray-800">Tamaños y Precios</h2>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md overflow-hidden border border-white/60">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white">
                  <th className="px-5 py-3 font-semibold">Tamaño</th>
                  <th className="px-5 py-3 font-semibold text-right">Precio</th>
                </tr>
              </thead>
              <tbody>
                {menuData.tamanoVasos.map((tamano, index) => (
                  <tr
                    key={tamano.id}
                    className={index % 2 === 0 ? "bg-pink-50/50" : "bg-white"}
                  >
                    <td className="px-5 py-3 font-medium text-gray-800">{tamano.nombre}</td>
                    <td className="px-5 py-3 text-right font-bold text-pink-600">
                      ${tamano.precio.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Combos del día */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">🎉</span>
            <h2 className="text-2xl font-bold text-gray-800">Combos del Día</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuData.combos
              .filter((c) => c.disponible)
              .map((combo) => (
                <div
                  key={combo.id}
                  className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow text-white"
                >
                  <h3 className="text-xl font-bold">{combo.nombre}</h3>
                  <p className="mt-2 text-yellow-100 text-sm">{combo.descripcion}</p>
                  <p className="mt-4 text-3xl font-extrabold">
                    ${combo.precio.toFixed(2)}
                  </p>
                </div>
              ))}
          </div>
          {menuData.combos.filter((c) => c.disponible).length === 0 && (
            <p className="text-gray-400 text-center py-6">No hay combos disponibles hoy</p>
          )}
        </section>

        {/* Fresas con Crema */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">🍓</span>
            <h2 className="text-2xl font-bold text-gray-800">Fresas con Crema</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {menuData.fresasConCrema
              .filter((f) => f.disponible)
              .map((fresas) => (
                <div
                  key={fresas.id}
                  className="bg-gradient-to-br from-red-400 to-pink-400 rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow text-white"
                >
                  <h3 className="text-xl font-bold">{fresas.nombre}</h3>
                  <p className="mt-2 text-red-100 text-sm">{fresas.descripcion}</p>
                  <p className="mt-4 text-3xl font-extrabold">
                    ${fresas.precio.toFixed(2)}
                  </p>
                </div>
              ))}
          </div>
          {menuData.fresasConCrema.filter((f) => f.disponible).length === 0 && (
            <p className="text-gray-400 text-center py-6">
              No hay fresas con crema disponibles hoy
            </p>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center py-6 mt-10">
        <p className="text-sm">HeladeríaMenu1 — Menú actualizado diariamente</p>
        <p className="text-xs mt-1">Precios en dólares (USD)</p>
      </footer>
    </div>
  );
}
