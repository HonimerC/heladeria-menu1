"use client";

interface PreviewModalProps {
  imagen: string;
  color: string;
  nombre: string;
  descripcion: string;
  detalles: string;
  precio?: number;
  onClose: () => void;
}

export default function PreviewModal({ imagen, color, nombre, descripcion, detalles, precio, onClose }: PreviewModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative w-full sm:max-w-sm bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Imagen / Icono */}
        <div className="relative w-full h-56 sm:h-64 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${color}40, ${color}20)` }}>
          {imagen ? (
            <img src={imagen} alt={nombre} className="w-full h-full object-cover" />
          ) : (
            <span className="text-8xl">🍦</span>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-gray-600 text-sm font-bold shadow"
          >
            ✕
          </button>
        </div>

        {/* Contenido */}
        <div className="px-6 py-5">
          <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-heading)", color: "var(--text)" }}>
            {nombre}
          </h2>
          <p className="text-sm mb-3" style={{ color: "var(--text-light)" }}>
            {descripcion}
          </p>
          {detalles && (
            <p className="text-xs leading-relaxed mb-4 p-3 rounded-xl" style={{ background: "var(--cream)", color: "var(--text)" }}>
              {detalles}
            </p>
          )}
          {precio !== undefined && (
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs" style={{ color: "var(--text-light)" }}>Precio</span>
              <span className="text-lg font-bold" style={{ color: "var(--accent)" }}>Bs {precio.toFixed(2)}</span>
            </div>
          )}
          <button
            onClick={onClose}
            className="w-full mt-5 py-3 rounded-full text-sm font-semibold text-white transition-all"
            style={{ background: "var(--accent)", fontFamily: "var(--font-body)" }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
