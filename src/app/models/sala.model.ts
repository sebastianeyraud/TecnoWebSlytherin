import { Cine } from "./cine.model";

export class Sala {
  private cine: Cine;
  private nombre: string;
  private tipo?: string;
  private capacidad: number;
  private plano_url?: string;

  constructor(
    cine: Cine,
    nombre: string,
    capacidad: number,
    tipo?: string,
    plano_url?: string
  ) {
    this.cine = cine;
    this.nombre = nombre;
    this.capacidad = capacidad;
    this.tipo = tipo;
    this.plano_url = plano_url;
  }

  // -------- GETTERS (una línea) --------
  getCine = () => this.cine;
  getNombre = () => this.nombre;
  getTipo = () => this.tipo;
  getCapacidad = () => this.capacidad;
  getPlanoUrl = () => this.plano_url;

  // -------- SETTERS (una línea) --------
  setCine = (c: Cine) => this.cine = c;
  setNombre = (n: string) => this.nombre = n;
  setTipo = (t?: string) => this.tipo = t;
  setCapacidad = (c: number) => this.capacidad = c;
  setPlanoUrl = (p?: string) => this.plano_url = p;
}
