"use client";

import { useEffect, useState } from "react";
import { MenuData, Sabor, Tamano, Combo, FresasConCrema, Horario, menuPorDefecto } from "@/lib/data";

export default function AdminPage() {
  const [menuData, setMenuData] = useState<MenuData>(menuPorDefecto);
  const [guardado, setGuardado] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [activeTab, setActiveTab] = useState<"sabores" | "tamanos" | "combos" | "fresas" | "horarios" | "contacto">("sabores");

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        if (!data.horarios) data.horarios = menuPorDefecto.horarios;
        if (!data.contacto) data.contacto = menuPorDefecto.contacto;
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
        setTimeout(() => setGuardado(false), 2500);
      }
    } catch {
      alert("Error al guardar. Intenta de nuevo.");
    }
  };

  const handleReset = async () => {
    if (confirm("¿Restablecer el menú a los valores por defecto?")) {
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
      sabores: prev.sabores.map((s) => (s.id === id ? { ...s, disponible: !s.disponible } : s)),
    }));
  };

  const agregarSabor = () => {
    const nuevo: Sabor = { id: Date.now().toString(), nombre: "Nuevo Sabor", disponible: true, color: "#FFB6C1" };
    setMenuData((prev) => ({ ...prev, sabores: [...prev.sabores, nuevo] }));
  };

  const editarSabor = (id: string, campo: keyof Sabor, valor: string | boolean) => {
    setMenuData((prev) => ({
      ...prev,
      sabores: prev.sabores.map((s) => (s.id === id ? { ...s, [campo]: valor } : s)),
    }));
  };

  const eliminarSabor = (id: string) => {
    setMenuData((prev) => ({ ...prev, sabores: prev.sabores.filter((s) => s.id !== id) }));
  };

  // --- Tamaños ---
  const agregarTamano = () => {
    const nuevo: Tamano = { id: Date.now().toString(), nombre: "Nuevo Tamaño", precio: 0 };
    setMenuData((prev) => ({ ...prev, tamanoVasos: [...prev.tamanoVasos, nuevo] }));
  };

  const editarTamano = (id: string, campo: keyof Tamano, valor: string | number) => {
    setMenuData((prev) => ({
      ...prev,
      tamanoVasos: prev.tamanoVasos.map((t) => (t.id === id ? { ...t, [campo]: valor } : t)),
    }));
  };

  const eliminarTamano = (id: string) => {
    setMenuData((prev) => ({ ...prev, tamanoVasos: prev.tamanoVasos.filter((t) => t.id !== id) }));
  };

  // --- Combos ---
  const toggleCombo = (id: string) => {
    setMenuData((prev) => ({
      ...prev,
      combos: prev.combos.map((c) => (c.id === id ? { ...c, disponible: !c.disponible } : c)),
    }));
  };

  const agregarCombo = () => {
    const nuevo: Combo = { id: Date.now().toString(), nombre: "Nuevo Combo", descripcion: "Descripción", precio: 0, disponible: true };
    setMenuData((prev) => ({ ...prev, combos: [...prev.combos, nuevo] }));
  };

  const editarCombo = (id: string, campo: keyof Combo, valor: string | number | boolean) => {
    setMenuData((prev) => ({
      ...prev,
      combos: prev.combos.map((c) => (c.id === id ? { ...c, [campo]: valor } : c)),
    }));
  };

  const eliminarCombo = (id: string) => {
    setMenuData((prev) => ({ ...prev, combos: prev.combos.filter((c) => c.id !== id) }));
  };

  // --- Fresas con Crema ---
  const toggleFresas = (id: string) => {
    setMenuData((prev) => ({
      ...prev,
      fresasConCrema: prev.fresasConCrema.map((f) => (f.id === id ? { ...f, disponible: !f.disponible } : f)),
    }));
  };

  const agregarFresas = () => {
    const nuevo: FresasConCrema = { id: Date.now().toString(), nombre: "Nueva Fresas con Crema", descripcion: "Descripción", precio: 0, disponible: true };
    setMenuData((prev) => ({ ...prev, fresasConCrema: [...prev.fresasConCrema, nuevo] }));
  };

  const editarFresas = (id: string, campo: keyof FresasConCrema, valor: string | number | boolean) => {
    setMenuData((prev) => ({
      ...prev,
      fresasConCrema: prev.fresasConCrema.map((f) => (f.id === id ? { ...f, [campo]: valor } : f)),
    }));
  };

  const eliminarFresas = (id: string) => {
    setMenuData((prev) => ({ ...prev, fresasConCrema: prev.fresasConCrema.filter((f) => f.id !== id) }));
  };

  // --- Horarios ---
  const editarHorario = (dia: string, campo: keyof Horario, valor: string | boolean) => {
    setMenuData((prev) => ({
      ...prev,
      horarios: prev.horarios.map((h) => (h.dia === dia ? { ...h, [campo]: valor } : h)),
    }));
  };

  // --- Contacto ---
  const editarContacto = (campo: "telefono" | "whatsapp", valor: string) => {
    setMenuData((prev) => ({
      ...prev,
      contacto: { ...prev.contacto, [campo]: valor },
    }));
  };

  const tabs = [
    { id: "sabores" as const, label: "Sabores", icon: "🍨" },
    { id: "tamanos" as const, label: "Tamaños", icon: "📏" },
    { id: "combos" as const, label: "Combos", icon: "🎉" },
    { id: "fresas" as const, label: "Fresas con Crema", icon: "🍓" },
    { id: "horarios" as const, label: "Horarios", icon: "🕐" },
    { id: "contacto" as const, label: "Contacto", icon: "📞" },
  ];

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #e0e7ff, #f3e8ff, #ffe4f0)" }}>
        <div className="text-center">
          <div className="text-8xl mb-6 animate-float">⚙️</div>
          <p className="text-2xl font-bold gradient-text" style={{ fontFamily: "var(--font-fredoka)" }}>Cargando panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 50%, #ffe4f0 100%)" }}>
      {/* Header */}
      <header className="text-white shadow-lg" style={{ background: "linear-gradient(135deg, #6c5ce7, #a855f7, #e91e8c)" }}>
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold" style={{ fontFamily: "var(--font-fredoka)" }}>⚙️ Panel Admin</h1>
              <p className="text-purple-200 text-sm mt-1" style={{ fontFamily: "var(--font-poppins)" }}>
                HeladeríaMenu1 — Actualiza el menú diariamente
              </p>
            </div>
            <a href="/" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-medium transition-colors">
              Ver Menú
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Botones de acción */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button onClick={handleGuardar} className="text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #00b894, #00cec9)", fontFamily: "var(--font-fredoka)" }}>
            {guardado ? "✓ ¡Guardado!" : "💾 Guardar Cambios"}
          </button>
          <button onClick={handleReset} className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all" style={{ fontFamily: "var(--font-fredoka)" }}>
            🔄 Restablecer
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 rounded-xl font-semibold transition-all text-sm ${
                activeTab === tab.id
                  ? "text-white shadow-lg scale-105"
                  : "glass text-gray-700 hover:bg-white/80 shadow"
              }`}
              style={{
                fontFamily: "var(--font-fredoka)",
                ...(activeTab === tab.id ? { background: "linear-gradient(135deg, #6c5ce7, #e91e8c)" } : {}),
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Sabores */}
        {activeTab === "sabores" && (
          <div className="glass rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)", color: "#6c5ce7" }}>Sabores del Día</h2>
              <button onClick={agregarSabor} className="text-white px-4 py-2 rounded-xl font-medium text-sm" style={{ background: "linear-gradient(135deg, #6c5ce7, #a855f7)", fontFamily: "var(--font-fredoka)" }}>
                + Agregar
              </button>
            </div>
            <div className="space-y-3">
              {menuData.sabores.map((sabor) => (
                <div key={sabor.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${sabor.disponible ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50 opacity-70"}`}>
                  <input type="color" value={sabor.color} onChange={(e) => editarSabor(sabor.id, "color", e.target.value)} className="w-10 h-10 rounded-full cursor-pointer border-2 border-white shadow" />
                  <input type="text" value={sabor.nombre} onChange={(e) => editarSabor(sabor.id, "nombre", e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none font-medium" />
                  <button onClick={() => toggleSabor(sabor.id)} className={`px-4 py-2 rounded-xl font-medium text-sm transition-colors ${sabor.disponible ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-300 text-gray-600 hover:bg-gray-400"}`}>
                    {sabor.disponible ? "✓" : "✗"}
                  </button>
                  <button onClick={() => eliminarSabor(sabor.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl text-sm">🗑</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tamaños */}
        {activeTab === "tamanos" && (
          <div className="glass rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)", color: "#a855f7" }}>Tamaños y Precios (Bs)</h2>
              <button onClick={agregarTamano} className="text-white px-4 py-2 rounded-xl font-medium text-sm" style={{ background: "linear-gradient(135deg, #a855f7, #e91e8c)", fontFamily: "var(--font-fredoka)" }}>
                + Agregar
              </button>
            </div>
            <div className="space-y-3">
              {menuData.tamanoVasos.map((tamano) => (
                <div key={tamano.id} className="flex items-center gap-4 p-4 rounded-xl border-2 border-purple-100 bg-purple-50">
                  <input type="text" value={tamano.nombre} onChange={(e) => editarTamano(tamano.id, "nombre", e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none font-medium" />
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500 font-bold">Bs</span>
                    <input type="number" step="0.5" min="0" value={tamano.precio} onChange={(e) => editarTamano(tamano.id, "precio", parseFloat(e.target.value) || 0)} className="w-24 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none font-bold text-purple-600" />
                  </div>
                  <button onClick={() => eliminarTamano(tamano.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl text-sm">🗑</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Combos */}
        {activeTab === "combos" && (
          <div className="glass rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)", color: "#ff9a56" }}>Combos del Día</h2>
              <button onClick={agregarCombo} className="text-white px-4 py-2 rounded-xl font-medium text-sm" style={{ background: "linear-gradient(135deg, #ff9a56, #e91e8c)", fontFamily: "var(--font-fredoka)" }}>
                + Agregar
              </button>
            </div>
            <div className="space-y-4">
              {menuData.combos.map((combo) => (
                <div key={combo.id} className={`p-5 rounded-xl border-2 transition-all ${combo.disponible ? "border-orange-200 bg-orange-50" : "border-gray-200 bg-gray-50 opacity-70"}`}>
                  <div className="flex items-center gap-4 mb-3">
                    <input type="text" value={combo.nombre} onChange={(e) => editarCombo(combo.id, "nombre", e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none font-bold" />
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500 font-bold">Bs</span>
                      <input type="number" step="0.5" min="0" value={combo.precio} onChange={(e) => editarCombo(combo.id, "precio", parseFloat(e.target.value) || 0)} className="w-24 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none font-bold text-orange-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input type="text" value={combo.descripcion} onChange={(e) => editarCombo(combo.id, "descripcion", e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-sm text-gray-600" placeholder="Descripción" />
                    <button onClick={() => toggleCombo(combo.id)} className={`px-4 py-2 rounded-xl font-medium text-sm transition-colors ${combo.disponible ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-300 text-gray-600 hover:bg-gray-400"}`}>
                      {combo.disponible ? "✓ Visible" : "✗ Oculto"}
                    </button>
                    <button onClick={() => eliminarCombo(combo.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl text-sm">🗑</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fresas con Crema */}
        {activeTab === "fresas" && (
          <div className="glass rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)", color: "#e91e8c" }}>Fresas con Crema</h2>
              <button onClick={agregarFresas} className="text-white px-4 py-2 rounded-xl font-medium text-sm" style={{ background: "linear-gradient(135deg, #e91e8c, #ff6eb4)", fontFamily: "var(--font-fredoka)" }}>
                + Agregar
              </button>
            </div>
            <div className="space-y-4">
              {menuData.fresasConCrema.map((fresas) => (
                <div key={fresas.id} className={`p-5 rounded-xl border-2 transition-all ${fresas.disponible ? "border-pink-200 bg-pink-50" : "border-gray-200 bg-gray-50 opacity-70"}`}>
                  <div className="flex items-center gap-4 mb-3">
                    <input type="text" value={fresas.nombre} onChange={(e) => editarFresas(fresas.id, "nombre", e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none font-bold" />
                    <div className="flex items-center gap-1">
                      <span className="text-gray-500 font-bold">Bs</span>
                      <input type="number" step="0.5" min="0" value={fresas.precio} onChange={(e) => editarFresas(fresas.id, "precio", parseFloat(e.target.value) || 0)} className="w-24 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none font-bold text-pink-600" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input type="text" value={fresas.descripcion} onChange={(e) => editarFresas(fresas.id, "descripcion", e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none text-sm text-gray-600" placeholder="Descripción" />
                    <button onClick={() => toggleFresas(fresas.id)} className={`px-4 py-2 rounded-xl font-medium text-sm transition-colors ${fresas.disponible ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-300 text-gray-600 hover:bg-gray-400"}`}>
                      {fresas.disponible ? "✓ Visible" : "✗ Oculto"}
                    </button>
                    <button onClick={() => eliminarFresas(fresas.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl text-sm">🗑</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Horarios */}
        {activeTab === "horarios" && (
          <div className="glass rounded-2xl shadow-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)", color: "#6c5ce7" }}>Horarios de Atención</h2>
              <p className="text-gray-500 text-sm mt-1" style={{ fontFamily: "var(--font-poppins)" }}>Configura los horarios de apertura y cierre de cada día</p>
            </div>
            <div className="space-y-3">
              {menuData.horarios?.map((horario) => (
                <div key={horario.dia} className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${horario.abierto ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50 opacity-70"}`}>
                  <span className="font-bold text-gray-700 w-32" style={{ fontFamily: "var(--font-fredoka)" }}>{horario.dia}</span>
                  <input type="time" value={horario.horaApertura} onChange={(e) => editarHorario(horario.dia, "horaApertura", e.target.value)} className="px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" disabled={!horario.abierto} />
                  <span className="text-gray-500 font-medium">a</span>
                  <input type="time" value={horario.horaCierre} onChange={(e) => editarHorario(horario.dia, "horaCierre", e.target.value)} className="px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none" disabled={!horario.abierto} />
                  <button onClick={() => editarHorario(horario.dia, "abierto", !horario.abierto)} className={`px-4 py-2 rounded-xl font-medium text-sm transition-colors ${horario.abierto ? "bg-green-500 text-white hover:bg-green-600" : "bg-gray-300 text-gray-600 hover:bg-gray-400"}`}>
                    {horario.abierto ? "✓ Abierto" : "✗ Cerrado"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contacto */}
        {activeTab === "contacto" && (
          <div className="glass rounded-2xl shadow-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold" style={{ fontFamily: "var(--font-fredoka)", color: "#e91e8c" }}>Información de Contacto</h2>
              <p className="text-gray-500 text-sm mt-1" style={{ fontFamily: "var(--font-poppins)" }}>Actualiza el número de teléfono y WhatsApp</p>
            </div>
            <div className="space-y-4 max-w-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "var(--font-poppins)" }}>📞 Teléfono</label>
                <input type="text" value={menuData.contacto?.telefono || ""} onChange={(e) => editarContacto("telefono", e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none text-lg" placeholder="+58 000-000-0000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" style={{ fontFamily: "var(--font-poppins)" }}>💬 WhatsApp (número sin +)</label>
                <input type="text" value={menuData.contacto?.whatsapp || ""} onChange={(e) => editarContacto("whatsapp", e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-lg" placeholder="580000000000" />
                <p className="text-xs text-gray-400 mt-1">Ejemplo: 584141234567</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
