export interface Sabor {
  id: string;
  nombre: string;
  disponible: boolean;
  color: string;
}

export interface Tamano {
  id: string;
  nombre: string;
  precio: number;
}

export interface Combo {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  disponible: boolean;
}

export interface FresasConCrema {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  disponible: boolean;
}

export interface MenuData {
  sabores: Sabor[];
  tamanoVasos: Tamano[];
  combos: Combo[];
  fresasConCrema: FresasConCrema[];
  fechaActualizacion: string;
}

export const saboresPorDefecto: Sabor[] = [
  { id: "1", nombre: "Vainilla", disponible: true, color: "#FFF8DC" },
  { id: "2", nombre: "Chocolate", disponible: true, color: "#8B4513" },
  { id: "3", nombre: "Fresa", disponible: true, color: "#FF6B6B" },
  { id: "4", nombre: "Menta", disponible: true, color: "#98FB98" },
  { id: "5", nombre: "Mango", disponible: true, color: "#FFD700" },
  { id: "6", nombre: "Limón", disponible: true, color: "#ADFF2F" },
  { id: "7", nombre: "Coco", disponible: true, color: "#FFFAF0" },
  { id: "8", nombre: "Nuez", disponible: true, color: "#DEB887" },
  { id: "9", nombre: "Caramelo", disponible: true, color: "#DAA520" },
  { id: "10", nombre: "Cookies & Cream", disponible: true, color: "#F5F5DC" },
  { id: "11", nombre: "Tiramisú", disponible: true, color: "#D2B48C" },
  { id: "12", nombre: "Pistache", disponible: true, color: "#93C572" },
];

export const tamanoPorDefecto: Tamano[] = [
  { id: "1", nombre: "Cono Pequeño", precio: 2.5 },
  { id: "2", nombre: "Cono Grande", precio: 3.5 },
  { id: "3", nombre: "Vaso Pequeño", precio: 3.0 },
  { id: "4", nombre: "Vaso Mediano", precio: 4.0 },
  { id: "5", nombre: "Vaso Grande", precio: 5.0 },
  { id: "6", nombre: "Pote 1/4 Libra", precio: 4.5 },
  { id: "7", nombre: "Pote 1/2 Libra", precio: 7.0 },
  { id: "8", nombre: "Pote 1 Libra", precio: 12.0 },
];

export const combosPorDefecto: Combo[] = [
  {
    id: "1",
    nombre: "Combo Familiar",
    descripcion: "4 conos grandes + 2 vasos medianos",
    precio: 18.0,
    disponible: true,
  },
  {
    id: "2",
    nombre: "Combo Pareja",
    descripcion: "2 vasos medianos + topping gratis",
    precio: 9.0,
    disponible: true,
  },
  {
    id: "3",
    nombre: "Combo Kids",
    descripcion: "1 cono pequeño + 1 vaso pequeño",
    precio: 5.0,
    disponible: true,
  },
];

export const fresasConCremaPorDefecto: FresasConCrema[] = [
  {
    id: "1",
    nombre: "Fresas con Crema Personal",
    descripcion: "Porción individual con fresas frescas y crema batida",
    precio: 5.0,
    disponible: true,
  },
  {
    id: "2",
    nombre: "Fresas con Crema para Compartir",
    descripcion: "Porción grande con fresas frescas y crema batida",
    precio: 9.0,
    disponible: true,
  },
];

export const menuPorDefecto: MenuData = {
  sabores: saboresPorDefecto,
  tamanoVasos: tamanoPorDefecto,
  combos: combosPorDefecto,
  fresasConCrema: fresasConCremaPorDefecto,
  fechaActualizacion: new Date().toISOString(),
};
