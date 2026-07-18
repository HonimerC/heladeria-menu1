export interface Sabor {
  id: string;
  nombre: string;
  descripcion: string;
  detalles: string;
  disponible: boolean;
  color: string;
  imagen: string;
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
  detalles: string;
  precio: number;
  disponible: boolean;
  imagen: string;
}

export interface FresasConCrema {
  id: string;
  nombre: string;
  descripcion: string;
  detalles: string;
  precio: number;
  disponible: boolean;
  imagen: string;
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
  { id: "1", nombre: "Fresasamva", descripcion: "Fresa natural con un toque cremoso", detalles: "", disponible: true, color: "#f9a8a8", imagen: "" },
  { id: "2", nombre: "Arequipe", descripcion: "Dulce de leche artesanal", detalles: "", disponible: true, color: "#d4a574", imagen: "" },
  { id: "3", nombre: "Choco Maní", descripcion: "Chocolate con maní crocante", detalles: "", disponible: true, color: "#8B6F47", imagen: "" },
  { id: "4", nombre: "Fresa Oreo", descripcion: "Fresa con galleta Oreo triturada", detalles: "", disponible: true, color: "#e88d8d", imagen: "" },
  { id: "5", nombre: "Galleta María", descripcion: "Base de galleta María con crema", detalles: "", disponible: true, color: "#dcc9a3", imagen: "" },
  { id: "6", nombre: "Choco Oreo", descripcion: "Chocolate intenso con Oreo", detalles: "", disponible: true, color: "#5c4033", imagen: "" },
  { id: "7", nombre: "Choco Crunch", descripcion: "Chocolate con trozos crocantes", detalles: "", disponible: true, color: "#7a5c3e", imagen: "" },
  { id: "8", nombre: "Piel de Limón", descripcion: "Limón fresco con ralladura natural", detalles: "", disponible: true, color: "#f0e68c", imagen: "" },
  { id: "9", nombre: "Guanábana", descripcion: "Guanábana tropical cremosa", detalles: "", disponible: true, color: "#f5f0dc", imagen: "" },
  { id: "10", nombre: "Pie de Parchita", descripcion: "Maracuyá con base de galleta", detalles: "", disponible: true, color: "#f4a460", imagen: "" },
  { id: "11", nombre: "Mante Oreo", descripcion: "Mantequilla de maní con Oreo", detalles: "", disponible: true, color: "#6b4e3d", imagen: "" },
  { id: "12", nombre: "Torta Suiza", descripcion: "Chocolate suizo con trozos de torta", detalles: "", disponible: true, color: "#c4a882", imagen: "" },
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
  { id: "1", nombre: "Combo Familiar", descripcion: "4 conos grandes + 2 vasos medianos", detalles: "Incluye toppings a elegir para cada porción. Ideal para compartir en familia.", precio: 15.0, disponible: true, imagen: "" },
  { id: "2", nombre: "Combo Pareja", descripcion: "2 vasos medianos + topping gratis", detalles: "Perfecto para una cita dulce. Elige tu sabor favorito con un topping incluido.", precio: 7.0, disponible: true, imagen: "" },
  { id: "3", nombre: "Combo Kids", descripcion: "1 cono pequeño + 1 vaso pequeño", detalles: "Porción especial para los más pequeños con dos sabores a elegir.", precio: 4.0, disponible: true, imagen: "" },
];

export const fresasConCremaPorDefecto: FresasConCrema[] = [
  { id: "1", nombre: "Vaso Pequeño", descripcion: "Porción individual con fresas frescas", detalles: "Fresas frescas cortadas a mano con crema batida natural.", precio: 3.0, disponible: true, imagen: "" },
  { id: "2", nombre: "Vaso Mediano", descripcion: "Porción mediana generosa", detalles: "Doble porción de fresas con crema batida. Perfecta para compartir.", precio: 5.0, disponible: true, imagen: "" },
  { id: "3", nombre: "Vaso Grande", descripcion: "Para compartir con amigos", detalles: "La porción más grande con fresas frescas y crema abundante.", precio: 7.0, disponible: true, imagen: "" },
  { id: "4", nombre: "Taza", descripcion: "Presentación especial en taza", detalles: "Servida en taza de cerámica con fresas decorativas y crema artesanal.", precio: 4.0, disponible: true, imagen: "" },
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
