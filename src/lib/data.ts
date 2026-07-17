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

export interface Horario {
  dia: string;
  abierto: boolean;
  horaApertura: string;
  horaCierre: string;
}

export interface Contacto {
  telefono: string;
  whatsapp: string;
}

export interface MenuData {
  sabores: Sabor[];
  tamanoVasos: Tamano[];
  combos: Combo[];
  fresasConCrema: FresasConCrema[];
  horarios: Horario[];
  contacto: Contacto;
  fechaActualizacion: string;
}

export const saboresPorDefecto: Sabor[] = [
  { id: "1", nombre: "Fresasamva", disponible: true, color: "#FF6B6B" },
  { id: "2", nombre: "Arequipe", disponible: true, color: "#D2691E" },
  { id: "3", nombre: "Choco Mani", disponible: true, color: "#8B4513" },
  { id: "4", nombre: "Fresa Oreo", disponible: true, color: "#FF4500" },
  { id: "5", nombre: "Galleta Maria", disponible: true, color: "#DEB887" },
  { id: "6", nombre: "Choco Oreo", disponible: true, color: "#2F1B14" },
  { id: "7", nombre: "Choco Crunch", disponible: true, color: "#6B3A2A" },
  { id: "8", nombre: "Piel de Limon", disponible: true, color: "#FFD700" },
  { id: "9", nombre: "Guanabana", disponible: true, color: "#F5F5DC" },
  { id: "10", nombre: "Pie de Parchita", disponible: true, color: "#FF8C00" },
  { id: "11", nombre: "Mante Oreo", disponible: true, color: "#4A3728" },
  { id: "12", nombre: "Torta Suiza", disponible: true, color: "#D2B48C" },
];

export const tamanoPorDefecto: Tamano[] = [
  { id: "1", nombre: "Cono Pequeño", precio: 2.0 },
  { id: "2", nombre: "Cono Grande", precio: 3.0 },
  { id: "3", nombre: "Vaso Pequeño", precio: 2.5 },
  { id: "4", nombre: "Vaso Mediano", precio: 3.5 },
  { id: "5", nombre: "Vaso Grande", precio: 5.0 },
  { id: "6", nombre: "Pote 1/4 Libra", precio: 4.0 },
  { id: "7", nombre: "Pote 1/2 Libra", precio: 6.0 },
  { id: "8", nombre: "Pote 1 Libra", precio: 10.0 },
];

export const combosPorDefecto: Combo[] = [
  {
    id: "1",
    nombre: "Combo Familiar",
    descripcion: "4 conos grandes + 2 vasos medianos",
    precio: 15.0,
    disponible: true,
  },
  {
    id: "2",
    nombre: "Combo Pareja",
    descripcion: "2 vasos medianos + topping gratis",
    precio: 7.0,
    disponible: true,
  },
  {
    id: "3",
    nombre: "Combo Kids",
    descripcion: "1 cono pequeño + 1 vaso pequeño",
    precio: 4.0,
    disponible: true,
  },
];

export const fresasConCremaPorDefecto: FresasConCrema[] = [
  {
    id: "1",
    nombre: "Fresas con Crema Vaso Pequeño",
    descripcion: "Porción individual con fresas frescas y crema batida",
    precio: 3.0,
    disponible: true,
  },
  {
    id: "2",
    nombre: "Fresas con Crema Vaso Mediano",
    descripcion: "Porción mediana con fresas frescas y crema batida",
    precio: 5.0,
    disponible: true,
  },
  {
    id: "3",
    nombre: "Fresas con Crema Vaso Grande",
    descripcion: "Porción grande con fresas frescas y crema batida",
    precio: 7.0,
    disponible: true,
  },
  {
    id: "4",
    nombre: "Fresas con Crema Taza",
    descripcion: "Porción en taza con fresas frescas y crema batida",
    precio: 4.0,
    disponible: true,
  },
];

export const horariosPorDefecto: Horario[] = [
  { dia: "Lunes", abierto: true, horaApertura: "10:00", horaCierre: "21:00" },
  { dia: "Martes", abierto: true, horaApertura: "10:00", horaCierre: "21:00" },
  { dia: "Miércoles", abierto: true, horaApertura: "10:00", horaCierre: "21:00" },
  { dia: "Jueves", abierto: true, horaApertura: "10:00", horaCierre: "21:00" },
  { dia: "Viernes", abierto: true, horaApertura: "10:00", horaCierre: "22:00" },
  { dia: "Sábado", abierto: true, horaApertura: "10:00", horaCierre: "22:00" },
  { dia: "Domingo", abierto: true, horaApertura: "11:00", horaCierre: "20:00" },
];

export const contactoPorDefecto: Contacto = {
  telefono: "+58 000-000-0000",
  whatsapp: "580000000000",
};

export const menuPorDefecto: MenuData = {
  sabores: saboresPorDefecto,
  tamanoVasos: tamanoPorDefecto,
  combos: combosPorDefecto,
  fresasConCrema: fresasConCremaPorDefecto,
  horarios: horariosPorDefecto,
  contacto: contactoPorDefecto,
  fechaActualizacion: new Date().toISOString(),
};
