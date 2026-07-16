"use client";

import { useEffect, useState } from "react";
import { MenuData, Sabor, Tamano, Combo, FresasConCrema, menuPorDefecto } from "@/lib/data";

export default function AdminPage() {
  const [menuData, setMenuData] = useState<MenuData>(menuPorDefecto);
  const [guardado, setGuardado] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [activeTab, setActiveTab] = useState<"sabores" | "tamanos" | "combos" | "fresas">("sabores");

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
  }, []);

  const handleGuardar = async () => {
    try {
      const res = await fetch("/api/menu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuData),
      });
      if (res.ok) {
        setGuardado(true);
        setTimeout(() => setGuardado(false), 2000);
      }
    } catch {
      alert("Error al guardar. Intenta de nuevo.");
    }
  };

  const handleReset = async () => {
    if (confirm("¿Restablecer el menú a los valores por defecto? Se perderán los cambios.")) {
      const data = menuPorDefecto;
      data.fechaActualizacion = new Date().toISOString();
      await fetch("/api/menu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setMenuData(data);
    }
  };

  // --- Sabores ---
  const toggleSabor = (id: string) => {
    setMenuData((prev) => ({
      ...prev,
      sabores: prev.sabores.map((s) =>
        s.id === id ? { ...s, disponible: !s.disponible } : s
      ),
    }));
  };

  const agregarSabor = () => {
    const nuevo: Sabor = {
      id: Date.now().toString(),
      nombre: "Nuevo Sabor",
      disponible: true,
      color: "#FFB6C1",
    };
    setMenuData((prev) => ({ ...prev, sabores: [...prev.sabores, nuevo] }));
  };

  const editarSabor = (id: string, campo: keyof Sabor, valor: string | boolean) => {
    setMenuData((prev) => ({
      ...prev,
      sabores: prev.sabores.map((s) =>
        s.id === id ? { ...s, [campo]: valor } : s
      ),
    }));
  };

  const eliminarSabor = (id: string) => {
    setMenuData((prev) => ({
      ...prev,
      sabores: prev.sabores.filter((s) => s.id !== id),
    }));
  };

  // --- Tamaños ---
  const agregarTamano = () => {
    const nuevo: Tamano = {
      id: Date.now().toString(),
      nombre: "Nuevo Tamaño",
      precio: 0,
    };
    setMenuData((prev) => ({ ...prev, tamanoVasos: [...prev.tamanoVasos, nuevo] }));
  };

  const editarTamano = (id: string, campo: keyof Tamano, valor: string | number) => {
    setMenuData((prev) => ({
      ...prev,
      tamanoVasos: prev.tamanoVasos.map((t) =>
        t.id === id ? { ...t, [campo]: valor } : t
      ),
    }));
  };

  const eliminarTamano = (id: string) => {
    setMenuData((prev) => ({
      ...prev,
      tamanoVasos: prev.tamanoVasos.filter((t) => t.id !== id),
    }));
  };

  // --- Combos ---
  const toggleCombo = (id: string) => {
    setMenuData((prev) => ({
      ...prev,
      combos: prev.combos.map((c) =>
        c.id === id ? { ...c, disponible: !c.disponible } : c
      ),
    }));
  };

  const agregarCombo = () => {
    const nuevo: Combo = {
      id: Date.now().toString(),
      nombre: "Nuevo Combo",
      descripcion: "Descripción del combo",
      precio: 0,
      disponible: true,
    };
    setMenuData((prev) => ({ ...prev, combos: [...prev.combos, nuevo] }));
  };

  const editarCombo = (id: string, campo: keyof Combo, valor: string | number | boolean) => {
    setMenuData((prev) => ({
      ...prev,
      combos: prev.combos.map((c) =>
        c.id === id ? { ...c, [campo]: valor } : c
      ),
    }));
  };

  const eliminarCombo = (id: string) => {
    setMenuData((prev) => ({
      ...prev,
      combos: prev.combos.filter((c) => c.id !== id),
    }));
  };

  // --- Fresas con Crema ---
  const toggleFresas = (id: string) => {
    setMenuData((prev) => ({
      ...prev,
      fresasConCrema: prev.fresasConCrema.map((f) =>
        f.id === id ? { ...f, disponible: !f.disponible } : f
      ),
    }));
  };

  const agregarFresas = () => {
    const nuevo: FresasConCrema = {
      id: Date.now().toString(),
      nombre: "Nueva Fresas con Crema",
      descripcion: "Descripción",
      precio: 0,
      disponible: true,
    };
    setMenuData((prev) => ({ ...prev, fresasConCrema: [...prev.fresasConCrema, nuevo] }));
  };

  const editarFresas = (id: string, campo: keyof FresasConCrema, valor: string | number | boolean) => {
    setMenuData((prev) => ({
      ...prev,
      fresasConCrema: prev.fresasConCrema.map((f) =>
        f.id === id ? { ...f, [campo]: valor } : f
      ),
    }));
  };

  const eliminarFresas = (id: string) => {
    setMenuData((prev) => ({
      ...prev,
      fresasConCrema: prev.fresasConCrema.filter((f) => f.id !== id),
    }));
  };

  const tabs = [
    { id: "sabores" as const, label: "Sabores", icon: "🍨" },
    { id: "tamanos" as const, label: "Tamaños", icon: "📏" },
    { id: "combos" as const, label: "Combos", icon: "🎉" },
    { id: "fresas" as const, label: "Fresas con Crema", icon: "🍓" },
  ];

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">⚙️</div>
          <p className="text-gray-500 text-lg">Cargando panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold">⚙️ Panel de Administración</h1>
              <p className="text-purple-200 text-sm mt-1">
                HeladeríaMenu1 — Actualiza el menú diariamente
              </p>
            </div>
            <a
              href="/"
              className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Ver Menú
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Botones de acción */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={handleGuardar}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
          >
            {guardado ? "✓ Guardado!" : "💾 Guardar Cambios"}
          </button>
          <button
            onClick={handleReset}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all"
          >
            🔄 Restablecer
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 rounded-xl font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-gray-50 shadow"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Contenido Sabores */}
        {activeTab === "sabores" && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Sabores del Día</h2>
              <button
                onClick={agregarSabor}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
              >
                + Agregar Sabor
              </button>
            </div>
            <div className="space-y-3">
              {menuData.sabores.map((sabor) => (
                <div
                  key={sabor.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    sabor.disponible
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-gray-50 opacity-70"
                  }`}
                >
                  <input
                    type="color"
                    value={sabor.color}
                    onChange={(e) => editarSabor(sabor.id, "color", e.target.value)}
                    className="w-10 h-10 rounded-full cursor-pointer border-2 border-white shadow"
                  />
                  <input
                    type="text"
                    value={sabor.nombre}
                    onChange={(e) => editarSabor(sabor.id, "nombre", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-medium"
                  />
                  <button
                    onClick={() => toggleSabor(sabor.id)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      sabor.disponible
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-300 text-gray-600 hover:bg-gray-400"
                    }`}
                  >
                    {sabor.disponible ? "✓ Disponible" : "✗ Agotado"}
                  </button>
                  <button
                    onClick={() => eliminarSabor(sabor.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contenido Tamaños */}
        {activeTab === "tamanos" && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Tamaños y Precios (USD)</h2>
              <button
                onClick={agregarTamano}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
              >
                + Agregar Tamaño
              </button>
            </div>
            <div className="space-y-3">
              {menuData.tamanoVasos.map((tamano) => (
                <div
                  key={tamano.id}
                  className="flex items-center gap-4 p-4 rounded-xl border-2 border-indigo-100 bg-indigo-50"
                >
                  <input
                    type="text"
                    value={tamano.nombre}
                    onChange={(e) => editarTamano(tamano.id, "nombre", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-medium"
                  />
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500 font-bold">$</span>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={tamano.precio}
                      onChange={(e) =>
                        editarTamano(tamano.id, "precio", parseFloat(e.target.value) || 0)
                      }
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-bold text-indigo-600"
                    />
                  </div>
                  <button
                    onClick={() => eliminarTamano(tamano.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                  >
                    🗑
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contenido Combos */}
        {activeTab === "combos" && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Combos del Día</h2>
              <button
                onClick={agregarCombo}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
              >
                + Agregar Combo
              </button>
            </div>
            <div className="space-y-4">
              {menuData.combos.map((combo) => (
                <div
                  key={combo.id}
                  className={`p-5 rounded-xl border-2 transition-all ${
                    combo.disponible
                      ? "border-yellow-200 bg-yellow-50"
                      : "border-gray-200 bg-gray-50 opacity-70"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <input
                      type="text"
                      value={combo.nombre}
                      onChange={(e) => editarCombo(combo.id, "nombre", e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-bold"
                    />
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500 font-bold">$</span>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        value={combo.precio}
                        onChange={(e) =>
                          editarCombo(combo.id, "precio", parseFloat(e.target.value) || 0)
                        }
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-bold text-yellow-600"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={combo.descripcion}
                      onChange={(e) => editarCombo(combo.id, "descripcion", e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm text-gray-600"
                      placeholder="Descripción del combo"
                    />
                    <button
                      onClick={() => toggleCombo(combo.id)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        combo.disponible
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-gray-300 text-gray-600 hover:bg-gray-400"
                      }`}
                    >
                      {combo.disponible ? "✓ Visible" : "✗ Oculto"}
                    </button>
                    <button
                      onClick={() => eliminarCombo(combo.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contenido Fresas con Crema */}
        {activeTab === "fresas" && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Fresas con Crema</h2>
              <button
                onClick={agregarFresas}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
              >
                + Agregar Opción
              </button>
            </div>
            <div className="space-y-4">
              {menuData.fresasConCrema.map((fresas) => (
                <div
                  key={fresas.id}
                  className={`p-5 rounded-xl border-2 transition-all ${
                    fresas.disponible
                      ? "border-red-200 bg-red-50"
                      : "border-gray-200 bg-gray-50 opacity-70"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <input
                      type="text"
                      value={fresas.nombre}
                      onChange={(e) => editarFresas(fresas.id, "nombre", e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-bold"
                    />
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500 font-bold">$</span>
                      <input
                        type="number"
                        step="0.5"
                        min="0"
                        value={fresas.precio}
                        onChange={(e) =>
                          editarFresas(fresas.id, "precio", parseFloat(e.target.value) || 0)
                        }
                        className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-bold text-red-600"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="text"
                      value={fresas.descripcion}
                      onChange={(e) => editarFresas(fresas.id, "descripcion", e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm text-gray-600"
                      placeholder="Descripción"
                    />
                    <button
                      onClick={() => toggleFresas(fresas.id)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                        fresas.disponible
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-gray-300 text-gray-600 hover:bg-gray-400"
                      }`}
                    >
                      {fresas.disponible ? "✓ Visible" : "✗ Oculto"}
                    </button>
                    <button
                      onClick={() => eliminarFresas(fresas.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                    >
                      🗑
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
