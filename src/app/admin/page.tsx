"use client";

import { useEffect, useState } from "react";
import { MenuData, Sabor, Tamano, Combo, FresasConCrema, Horario, menuPorDefecto } from "@/lib/data";
import { playSuccess, playClick, playToggle } from "@/lib/sounds";

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
      .catch(() => { setMenuData(menuPorDefecto); setCargando(false); });
  }, []);

  const handleGuardar = async () => {
    playClick();
    try {
      const res = await fetch("/api/menu", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(menuData) });
      if (res.ok) { playSuccess(); setGuardado(true); setTimeout(() => setGuardado(false), 2500); }
    } catch { alert("Error al guardar. Intenta de nuevo."); }
  };

  const handleReset = async () => {
    if (!confirm("¿Restablecer el menú a los valores por defecto?")) return;
    const data = { ...menuPorDefecto, fechaActualizacion: new Date().toISOString() };
    await fetch("/api/menu", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setMenuData(data);
    playSuccess();
  };

  const toggleSabor = (id: string) => {
    const sabor = menuData.sabores.find((s) => s.id === id);
    playToggle(!sabor?.disponible);
    setMenuData((prev) => ({ ...prev, sabores: prev.sabores.map((s) => (s.id === id ? { ...s, disponible: !s.disponible } : s)) }));
  };

  const agregarSabor = () => {
    playClick();
    const nuevo: Sabor = { id: Date.now().toString(), nombre: "Nuevo Sabor", descripcion: "", detalles: "", disponible: true, color: "#f9a8a8", imagen: "" };
    setMenuData((prev) => ({ ...prev, sabores: [...prev.sabores, nuevo] }));
  };

  const editarSabor = (id: string, campo: keyof Sabor, valor: string | boolean) => {
    setMenuData((prev) => ({ ...prev, sabores: prev.sabores.map((s) => (s.id === id ? { ...s, [campo]: valor } : s)) }));
  };

  const eliminarSabor = (id: string) => { playClick(); setMenuData((prev) => ({ ...prev, sabores: prev.sabores.filter((s) => s.id !== id) })); };

  const agregarTamano = () => { playClick(); const nuevo: Tamano = { id: Date.now().toString(), nombre: "Nuevo Tamaño", precio: 0 }; setMenuData((prev) => ({ ...prev, tamanoVasos: [...prev.tamanoVasos, nuevo] })); };
  const editarTamano = (id: string, campo: keyof Tamano, valor: string | number) => setMenuData((prev) => ({ ...prev, tamanoVasos: prev.tamanoVasos.map((t) => (t.id === id ? { ...t, [campo]: valor } : t)) }));
  const eliminarTamano = (id: string) => { playClick(); setMenuData((prev) => ({ ...prev, tamanoVasos: prev.tamanoVasos.filter((t) => t.id !== id) })); };

  const toggleCombo = (id: string) => { const combo = menuData.combos.find((c) => c.id === id); playToggle(!combo?.disponible); setMenuData((prev) => ({ ...prev, combos: prev.combos.map((c) => (c.id === id ? { ...c, disponible: !c.disponible } : c)) })); };
  const agregarCombo = () => { playClick(); const nuevo: Combo = { id: Date.now().toString(), nombre: "Nuevo Combo", descripcion: "Descripción", detalles: "", precio: 0, disponible: true, imagen: "" }; setMenuData((prev) => ({ ...prev, combos: [...prev.combos, nuevo] })); };
  const editarCombo = (id: string, campo: keyof Combo, valor: string | number | boolean) => setMenuData((prev) => ({ ...prev, combos: prev.combos.map((c) => (c.id === id ? { ...c, [campo]: valor } : c)) }));
  const eliminarCombo = (id: string) => { playClick(); setMenuData((prev) => ({ ...prev, combos: prev.combos.filter((c) => c.id !== id) })); };

  const toggleFresas = (id: string) => { const fresa = menuData.fresasConCrema.find((f) => f.id === id); playToggle(!fresa?.disponible); setMenuData((prev) => ({ ...prev, fresasConCrema: prev.fresasConCrema.map((f) => (f.id === id ? { ...f, disponible: !f.disponible } : f)) })); };
  const agregarFresas = () => { playClick(); const nuevo: FresasConCrema = { id: Date.now().toString(), nombre: "Nueva Fresas con Crema", descripcion: "Descripción", detalles: "", precio: 0, disponible: true, imagen: "" }; setMenuData((prev) => ({ ...prev, fresasConCrema: [...prev.fresasConCrema, nuevo] })); };
  const editarFresas = (id: string, campo: keyof FresasConCrema, valor: string | number | boolean) => setMenuData((prev) => ({ ...prev, fresasConCrema: prev.fresasConCrema.map((f) => (f.id === id ? { ...f, [campo]: valor } : f)) }));
  const eliminarFresas = (id: string) => { playClick(); setMenuData((prev) => ({ ...prev, fresasConCrema: prev.fresasConCrema.filter((f) => f.id !== id) })); };

  const editarHorario = (dia: string, campo: keyof Horario, valor: string | boolean) => { if (campo === "abierto") playToggle(valor as boolean); setMenuData((prev) => ({ ...prev, horarios: prev.horarios.map((h) => (h.dia === dia ? { ...h, [campo]: valor } : h)) })); };
  const editarContacto = (campo: "telefono" | "whatsapp", valor: string) => setMenuData((prev) => ({ ...prev, contacto: { ...prev.contacto, [campo]: valor } }));

  const tabs = [
    { id: "sabores" as const, label: "Sabores", icon: "🍨" },
    { id: "tamanos" as const, label: "Tamaños", icon: "📏" },
    { id: "combos" as const, label: "Combos", icon: "🎉" },
    { id: "fresas" as const, label: "Fresas", icon: "🍓" },
    { id: "horarios" as const, label: "Horarios", icon: "🕐" },
    { id: "contacto" as const, label: "Contacto", icon: "📞" },
  ];

  if (cargando) {
    return (
      <div className="min-h-screen flex items-center justify-center grain" style={{ background: "var(--bg)" }}>
        <div className="text-center">
          <div className="text-7xl mb-4 animate-float">⚙️</div>
          <p className="text-lg" style={{ color: "var(--text-light)" }}>Cargando panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <header className="text-white" style={{ background: "var(--accent)" }}>
        <div className="max-w-3xl mx-auto px-4 py-4 sm:py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>⚙️ Panel Admin</h1>
              <p className="text-white/70 text-xs mt-0.5">Actualiza el menú diariamente</p>
            </div>
            <a href="/" className="bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-full text-xs font-medium transition-colors">Ver Menú</a>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-5">
        {/* Botones */}
        <div className="flex gap-3 mb-5">
          <button onClick={handleGuardar} className="text-white px-5 py-2.5 rounded-full font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105 text-sm" style={{ background: "#6aab73", fontFamily: "var(--font-body)" }}>
            {guardado ? "✓ ¡Guardado!" : "💾 Guardar"}
          </button>
          <button onClick={handleReset} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2.5 rounded-full font-semibold transition-all text-sm" style={{ fontFamily: "var(--font-body)" }}>
            🔄 Reset
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { playClick(); setActiveTab(tab.id); }}
              className="px-3 sm:px-4 py-2 rounded-full font-medium transition-all text-xs sm:text-sm"
              style={{
                fontFamily: "var(--font-body)",
                background: activeTab === tab.id ? "var(--accent)" : "var(--bg-card)",
                color: activeTab === tab.id ? "white" : "var(--text-light)",
                boxShadow: activeTab === tab.id ? "0 2px 8px rgba(194,124,94,0.3)" : "0 1px 4px rgba(74,55,40,0.06)",
              }}
            >
              <span className="hidden sm:inline">{tab.icon} {tab.label}</span>
              <span className="sm:hidden">{tab.icon}</span>
            </button>
          ))}
        </div>

        {/* Sabores */}
        {activeTab === "sabores" && (
          <div className="rounded-2xl shadow-sm p-4 sm:p-5" style={{ background: "var(--bg-card)", border: "1px solid rgba(74,55,40,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text)" }}>Sabores del Día</h2>
              <button onClick={agregarSabor} className="text-white px-3 py-1.5 rounded-full font-medium text-xs" style={{ background: "var(--accent)", fontFamily: "var(--font-body)" }}>
                + Agregar
              </button>
            </div>
            <div className="space-y-3">
              {menuData.sabores.map((sabor) => (
                <div key={sabor.id} className="p-3 sm:p-4 rounded-xl border transition-all" style={{ borderColor: sabor.disponible ? "var(--mint)" : "rgba(74,55,40,0.1)", background: sabor.disponible ? "var(--mint-light)" : "rgba(74,55,40,0.03)", opacity: sabor.disponible ? 1 : 0.6 }}>
                  <div className="flex items-center gap-2 sm:gap-3 mb-2">
                    <input type="color" value={sabor.color} onChange={(e) => editarSabor(sabor.id, "color", e.target.value)} className="w-8 h-8 sm:w-9 sm:h-9 rounded-full cursor-pointer border-2 border-white shadow flex-shrink-0" />
                    <input type="text" value={sabor.nombre} onChange={(e) => editarSabor(sabor.id, "nombre", e.target.value)} className="flex-1 min-w-0 px-3 py-2 border rounded-full focus:ring-2 outline-none font-semibold text-sm" style={{ borderColor: "rgba(74,55,40,0.12)", fontFamily: "var(--font-body)", color: "var(--text)" }} />
                    <button onClick={() => toggleSabor(sabor.id)} className="w-9 h-9 rounded-full font-medium text-xs transition-colors flex-shrink-0 flex items-center justify-center" style={{ background: sabor.disponible ? "var(--accent)" : "rgba(74,55,40,0.15)", color: sabor.disponible ? "white" : "var(--text-light)" }}>
                      {sabor.disponible ? "✓" : "✗"}
                    </button>
                    <button onClick={() => eliminarSabor(sabor.id)} className="w-9 h-9 rounded-full bg-red-100 hover:bg-red-200 text-red-500 text-xs flex-shrink-0 flex items-center justify-center transition-colors">🗑</button>
                  </div>
                  <input type="text" value={sabor.descripcion} onChange={(e) => editarSabor(sabor.id, "descripcion", e.target.value)} className="w-full px-3 py-1.5 border rounded-full text-xs outline-none" style={{ borderColor: "rgba(74,55,40,0.1)", color: "var(--text-light)" }} placeholder="Descripción del sabor" />
                  <input type="text" value={sabor.detalles} onChange={(e) => editarSabor(sabor.id, "detalles", e.target.value)} className="w-full px-3 py-1.5 border rounded-full text-xs outline-none mt-2" style={{ borderColor: "rgba(74,55,40,0.1)", color: "var(--text-light)" }} placeholder="Detalles adicionales (para vista previa)" />
                  <input type="text" value={sabor.imagen} onChange={(e) => editarSabor(sabor.id, "imagen", e.target.value)} className="w-full px-3 py-1.5 border rounded-full text-xs outline-none mt-2" style={{ borderColor: "rgba(74,55,40,0.1)", color: "var(--text-light)" }} placeholder="URL de imagen (opcional)" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tamaños */}
        {activeTab === "tamanos" && (
          <div className="rounded-2xl shadow-sm p-4 sm:p-5" style={{ background: "var(--bg-card)", border: "1px solid rgba(74,55,40,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text)" }}>Tamaños y Precios (Bs)</h2>
              <button onClick={agregarTamano} className="text-white px-3 py-1.5 rounded-full font-medium text-xs" style={{ background: "var(--accent)", fontFamily: "var(--font-body)" }}>+ Agregar</button>
            </div>
            <div className="space-y-2">
              {menuData.tamanoVasos.map((tamano) => (
                <div key={tamano.id} className="flex items-center gap-3 p-3 rounded-xl border" style={{ borderColor: "var(--peach-light)", background: "var(--peach-light)" }}>
                  <input type="text" value={tamano.nombre} onChange={(e) => editarTamano(tamano.id, "nombre", e.target.value)} className="flex-1 min-w-0 px-3 py-2 border rounded-full focus:ring-2 outline-none font-medium text-sm" style={{ borderColor: "rgba(74,55,40,0.1)", color: "var(--text)" }} />
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <span className="font-medium text-xs" style={{ color: "var(--text-light)" }}>Bs</span>
                    <input type="number" step="0.5" min="0" value={tamano.precio} onChange={(e) => editarTamano(tamano.id, "precio", parseFloat(e.target.value) || 0)} className="w-20 px-2 py-2 border rounded-full focus:ring-2 outline-none font-bold text-sm" style={{ borderColor: "rgba(74,55,40,0.1)", color: "var(--accent)" }} />
                  </div>
                  <button onClick={() => eliminarTamano(tamano.id)} className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-500 text-xs flex-shrink-0 flex items-center justify-center transition-colors">🗑</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Combos */}
        {activeTab === "combos" && (
          <div className="rounded-2xl shadow-sm p-4 sm:p-5" style={{ background: "var(--bg-card)", border: "1px solid rgba(74,55,40,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text)" }}>Combos del Día</h2>
              <button onClick={agregarCombo} className="text-white px-3 py-1.5 rounded-full font-medium text-xs" style={{ background: "var(--accent)", fontFamily: "var(--font-body)" }}>+ Agregar</button>
            </div>
            <div className="space-y-3">
              {menuData.combos.map((combo) => (
                <div key={combo.id} className="p-4 rounded-xl border transition-all" style={{ borderColor: combo.disponible ? "var(--mint)" : "rgba(74,55,40,0.1)", background: combo.disponible ? "var(--mint-light)" : "rgba(74,55,40,0.03)", opacity: combo.disponible ? 1 : 0.6 }}>
                  <div className="flex items-center gap-3 mb-2">
                    <input type="text" value={combo.nombre} onChange={(e) => editarCombo(combo.id, "nombre", e.target.value)} className="flex-1 px-3 py-2 border rounded-full focus:ring-2 outline-none font-bold text-sm" style={{ borderColor: "rgba(74,55,40,0.1)", color: "var(--text)" }} />
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="font-medium text-xs" style={{ color: "var(--text-light)" }}>Bs</span>
                      <input type="number" step="0.5" min="0" value={combo.precio} onChange={(e) => editarCombo(combo.id, "precio", parseFloat(e.target.value) || 0)} className="w-20 px-2 py-2 border rounded-full focus:ring-2 outline-none font-bold text-sm" style={{ borderColor: "rgba(74,55,40,0.1)", color: "var(--accent)" }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="text" value={combo.descripcion} onChange={(e) => editarCombo(combo.id, "descripcion", e.target.value)} className="flex-1 px-3 py-1.5 border rounded-full text-xs outline-none" style={{ borderColor: "rgba(74,55,40,0.1)", color: "var(--text-light)" }} placeholder="Descripción" />
                    <button onClick={() => toggleCombo(combo.id)} className="w-8 h-8 rounded-full font-medium text-xs flex items-center justify-center transition-colors" style={{ background: combo.disponible ? "var(--accent)" : "rgba(74,55,40,0.15)", color: combo.disponible ? "white" : "var(--text-light)" }}>{combo.disponible ? "✓" : "✗"}</button>
                    <button onClick={() => eliminarCombo(combo.id)} className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-500 text-xs flex items-center justify-center transition-colors">🗑</button>
                  </div>
                  <input type="text" value={combo.detalles} onChange={(e) => editarCombo(combo.id, "detalles", e.target.value)} className="w-full px-3 py-1.5 border rounded-full text-xs outline-none mt-2" style={{ borderColor: "rgba(74,55,40,0.1)", color: "var(--text-light)" }} placeholder="Detalles adicionales (para vista previa)" />
                  <input type="text" value={combo.imagen} onChange={(e) => editarCombo(combo.id, "imagen", e.target.value)} className="w-full px-3 py-1.5 border rounded-full text-xs outline-none mt-2" style={{ borderColor: "rgba(74,55,40,0.1)", color: "var(--text-light)" }} placeholder="URL de imagen (opcional)" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fresas con Crema */}
        {activeTab === "fresas" && (
          <div className="rounded-2xl shadow-sm p-4 sm:p-5" style={{ background: "var(--bg-card)", border: "1px solid rgba(74,55,40,0.06)" }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text)" }}>Fresas con Crema</h2>
              <button onClick={agregarFresas} className="text-white px-3 py-1.5 rounded-full font-medium text-xs" style={{ background: "var(--accent)", fontFamily: "var(--font-body)" }}>+ Agregar</button>
            </div>
            <div className="space-y-3">
              {menuData.fresasConCrema.map((fresas) => (
                <div key={fresas.id} className="p-4 rounded-xl border transition-all" style={{ borderColor: fresas.disponible ? "var(--peach)" : "rgba(74,55,40,0.1)", background: fresas.disponible ? "var(--peach-light)" : "rgba(74,55,40,0.03)", opacity: fresas.disponible ? 1 : 0.6 }}>
                  <div className="flex items-center gap-3 mb-2">
                    <input type="text" value={fresas.nombre} onChange={(e) => editarFresas(fresas.id, "nombre", e.target.value)} className="flex-1 px-3 py-2 border rounded-full focus:ring-2 outline-none font-bold text-sm" style={{ borderColor: "rgba(74,55,40,0.1)", color: "var(--text)" }} />
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <span className="font-medium text-xs" style={{ color: "var(--text-light)" }}>Bs</span>
                      <input type="number" step="0.5" min="0" value={fresas.precio} onChange={(e) => editarFresas(fresas.id, "precio", parseFloat(e.target.value) || 0)} className="w-20 px-2 py-2 border rounded-full focus:ring-2 outline-none font-bold text-sm" style={{ borderColor: "rgba(74,55,40,0.1)", color: "var(--accent)" }} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="text" value={fresas.descripcion} onChange={(e) => editarFresas(fresas.id, "descripcion", e.target.value)} className="flex-1 px-3 py-1.5 border rounded-full text-xs outline-none" style={{ borderColor: "rgba(74,55,40,0.1)", color: "var(--text-light)" }} placeholder="Descripción" />
                    <button onClick={() => toggleFresas(fresas.id)} className="w-8 h-8 rounded-full font-medium text-xs flex items-center justify-center transition-colors" style={{ background: fresas.disponible ? "var(--accent)" : "rgba(74,55,40,0.15)", color: fresas.disponible ? "white" : "var(--text-light)" }}>{fresas.disponible ? "✓" : "✗"}</button>
                    <button onClick={() => eliminarFresas(fresas.id)} className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-500 text-xs flex items-center justify-center transition-colors">🗑</button>
                  </div>
                  <input type="text" value={fresas.detalles} onChange={(e) => editarFresas(fresas.id, "detalles", e.target.value)} className="w-full px-3 py-1.5 border rounded-full text-xs outline-none mt-2" style={{ borderColor: "rgba(74,55,40,0.1)", color: "var(--text-light)" }} placeholder="Detalles adicionales (para vista previa)" />
                  <input type="text" value={fresas.imagen} onChange={(e) => editarFresas(fresas.id, "imagen", e.target.value)} className="w-full px-3 py-1.5 border rounded-full text-xs outline-none mt-2" style={{ borderColor: "rgba(74,55,40,0.1)", color: "var(--text-light)" }} placeholder="URL de imagen (opcional)" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Horarios */}
        {activeTab === "horarios" && (
          <div className="rounded-2xl shadow-sm p-4 sm:p-5" style={{ background: "var(--bg-card)", border: "1px solid rgba(74,55,40,0.06)" }}>
            <div className="mb-4">
              <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text)" }}>Horarios de Atención</h2>
              <p className="text-xs mt-1" style={{ color: "var(--text-light)" }}>Configura apertura y cierre</p>
            </div>
            <div className="space-y-2">
              {menuData.horarios?.map((horario) => (
                <div key={horario.dia} className="flex items-center gap-3 p-3 rounded-xl border transition-all" style={{ borderColor: horario.abierto ? "var(--mint)" : "rgba(74,55,40,0.1)", background: horario.abierto ? "var(--mint-light)" : "rgba(74,55,40,0.03)", opacity: horario.abierto ? 1 : 0.6 }}>
                  <span className="font-semibold w-24 text-sm" style={{ fontFamily: "var(--font-heading)", color: "var(--text)" }}>{horario.dia}</span>
                  <div className="flex items-center gap-2 flex-1">
                    <input type="time" value={horario.horaApertura} onChange={(e) => editarHorario(horario.dia, "horaApertura", e.target.value)} className="flex-1 px-2 py-1.5 border rounded-full text-xs outline-none" style={{ borderColor: "rgba(74,55,40,0.1)" }} disabled={!horario.abierto} />
                    <span className="text-xs" style={{ color: "var(--text-light)" }}>a</span>
                    <input type="time" value={horario.horaCierre} onChange={(e) => editarHorario(horario.dia, "horaCierre", e.target.value)} className="flex-1 px-2 py-1.5 border rounded-full text-xs outline-none" style={{ borderColor: "rgba(74,55,40,0.1)" }} disabled={!horario.abierto} />
                  </div>
                  <button onClick={() => editarHorario(horario.dia, "abierto", !horario.abierto)} className="px-3 py-1.5 rounded-full font-medium text-xs transition-colors" style={{ background: horario.abierto ? "var(--accent)" : "rgba(74,55,40,0.15)", color: horario.abierto ? "white" : "var(--text-light)" }}>
                    {horario.abierto ? "✓ Abierto" : "✗ Cerrado"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contacto */}
        {activeTab === "contacto" && (
          <div className="rounded-2xl shadow-sm p-4 sm:p-5" style={{ background: "var(--bg-card)", border: "1px solid rgba(74,55,40,0.06)" }}>
            <div className="mb-4">
              <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)", color: "var(--text)" }}>Información de Contacto</h2>
              <p className="text-xs mt-1" style={{ color: "var(--text-light)" }}>Teléfono y WhatsApp</p>
            </div>
            <div className="space-y-4 max-w-lg">
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-light)" }}>📞 Teléfono</label>
                <input type="text" value={menuData.contacto?.telefono || ""} onChange={(e) => editarContacto("telefono", e.target.value)} className="w-full px-4 py-2.5 border rounded-full focus:ring-2 outline-none text-sm" style={{ borderColor: "rgba(74,55,40,0.12)", fontFamily: "var(--font-body)", color: "var(--text)" }} placeholder="+58 000-000-0000" />
              </div>
              <div>
                <label className="block text-xs font-medium mb-1" style={{ color: "var(--text-light)" }}>💬 WhatsApp (sin +)</label>
                <input type="text" value={menuData.contacto?.whatsapp || ""} onChange={(e) => editarContacto("whatsapp", e.target.value)} className="w-full px-4 py-2.5 border rounded-full focus:ring-2 outline-none text-sm" style={{ borderColor: "rgba(74,55,40,0.12)", fontFamily: "var(--font-body)", color: "var(--text)" }} placeholder="580000000000" />
                <p className="text-[10px] mt-1" style={{ color: "var(--text-light)" }}>Ejemplo: 584141234567</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
