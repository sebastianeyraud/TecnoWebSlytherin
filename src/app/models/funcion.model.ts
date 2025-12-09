
export class Funcion {
  private sala: number;
  private start_time: Date;
  private end_time: Date;
  private formato: string;
  private precio_base: number;
  private disponible: boolean;
  private created_at: Date;
  private updated_at: Date;

  constructor(
    sala: number,
    start_time: Date,
    end_time: Date,
    formato: string,
    precio_base: number,
    disponible: boolean = true
  ) {
    this.sala = sala;
    this.start_time = start_time;
    this.end_time = end_time;
    this.formato = formato;
    this.precio_base = precio_base;
    this.disponible = disponible;
    this.created_at = new Date();
    this.updated_at = new Date();

  }

  // ---------- GETTERS (1 línea) ----------
  getSala = () => this.sala;
  getStartTime = () => this.start_time;
  getEndTime = () => this.end_time;
  getFormato = () => this.formato;
  getPrecioBase = () => this.precio_base;
  getDisponible = () => this.disponible;
  getCreatedAt = () => this.created_at;
  getUpdatedAt = () => this.updated_at;

  // ---------- SETTERS (1 línea) ----------
  setSala = (v: number) => this.sala = v;
  setStartTime = (v: Date) => { this.start_time = v; this.touch(); };
  setEndTime = (v: Date) => { this.end_time = v; this.touch(); };
  setFormato = (v: string) => { this.formato = v; this.touch(); };
  setPrecioBase = (v: number) => { this.precio_base = v; this.touch(); };
  setDisponible = (v: boolean) => { this.disponible = v; this.touch(); };

  // Actualiza updated_at
  private touch() { this.updated_at = new Date(); }
}
