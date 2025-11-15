export class Funcion {
  private id: string;
  private pelicula_id: string;
  private sala_id: string;
  private start_time: Date;
  private end_time: Date;
  private formato: string;
  private precio_base: number;
  private disponible: boolean;
  private created_at: Date;
  private updated_at: Date;

  constructor(
    id: string,
    pelicula_id: string,
    sala_id: string,
    start_time: Date,
    end_time: Date,
    formato: string,
    precio_base: number,
    disponible: boolean = true
  ) {
    this.id = id;
    this.pelicula_id = pelicula_id;
    this.sala_id = sala_id;
    this.start_time = start_time;
    this.end_time = end_time;
    this.formato = formato;
    this.precio_base = precio_base;
    this.disponible = disponible;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  // ---------- GETTERS (1 línea) ----------
  getId = () => this.id;
  getPeliculaId = () => this.pelicula_id;
  getSalaId = () => this.sala_id;
  getStartTime = () => this.start_time;
  getEndTime = () => this.end_time;
  getFormato = () => this.formato;
  getPrecioBase = () => this.precio_base;
  getDisponible = () => this.disponible;
  getCreatedAt = () => this.created_at;
  getUpdatedAt = () => this.updated_at;

  // ---------- SETTERS (1 línea) ----------
  setPeliculaId = (v: string) => this.pelicula_id = v;
  setSalaId = (v: string) => this.sala_id = v;
  setStartTime = (v: Date) => { this.start_time = v; this.touch(); };
  setEndTime = (v: Date) => { this.end_time = v; this.touch(); };
  setFormato = (v: string) => { this.formato = v; this.touch(); };
  setPrecioBase = (v: number) => { this.precio_base = v; this.touch(); };
  setDisponible = (v: boolean) => { this.disponible = v; this.touch(); };

  // Actualiza updated_at
  private touch() { this.updated_at = new Date(); }
}
