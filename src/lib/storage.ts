import { MenuData, menuPorDefecto } from "./data";

const STORAGE_KEY = "heladeria-menu1";

export function getMenuData(): MenuData {
  if (typeof window === "undefined") {
    return menuPorDefecto;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // Si hay error, usar datos por defecto
  }
  return menuPorDefecto;
}

export function saveMenuData(data: MenuData): void {
  if (typeof window === "undefined") return;

  data.fechaActualizacion = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetMenuData(): MenuData {
  if (typeof window === "undefined") {
    return menuPorDefecto;
  }

  localStorage.removeItem(STORAGE_KEY);
  return menuPorDefecto;
}
