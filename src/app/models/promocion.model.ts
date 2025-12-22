import { TipoPromocion } from "./tipo-promocion";
import { AplicableA } from "./aplicable-a";

export class Promocion {
  private codigo: string;
  private nombre: string;
  private descripcion: string;
  private tipo: TipoPromocion;
  private valor: number;
  private aplicable_a: AplicableA;
  private fecha_inicio: Date;
  private fecha_fin: Date;
  private activo: boolean;
  private created_at: Date;
  private updated_at: Date;

  constructor(
    codigo: string,
    nombre: string,
    descripcion: string,
    tipo: TipoPromocion,
    valor: number,
    aplicable_a: AplicableA,
    fecha_inicio: Date,
    fecha_fin: Date,
    activo: boolean = true
  ) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.tipo = tipo;
    this.valor = valor;
    this.aplicable_a = aplicable_a;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.activo = activo;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  // ---------- GETTERS (1 línea) ----------
  getCodigo = () => this.codigo;
  getNombre = () => this.nombre;
  getDescripcion = () => this.descripcion;
  getTipo = () => this.tipo;
  getValor = () => this.valor;
  getAplicableA = () => this.aplicable_a;
  getFechaInicio = () => this.fecha_inicio;
  getFechaFin = () => this.fecha_fin;
  isActiva = () => this.activo;
  getCreatedAt = () => this.created_at;
  getUpdatedAt = () => this.updated_at;

  // ---------- SETTERS (1 línea) ----------
  setCodigo = (v: string) => this.codigo = v;
  setNombre = (v: string) => this.nombre = v;
  setDescripcion = (v: string) => this.descripcion = v;
  setTipo = (v: TipoPromocion) => this.tipo = v;
  setValor = (v: number) => this.valor = v;
  setAplicableA = (v: AplicableA) => this.aplicable_a = v;
  setFechaInicio = (v: Date) => this.fecha_inicio = v;
  setFechaFin = (v: Date) => this.fecha_fin = v;
  setActiva = (v: boolean) => this.activo = v;
  setUpdatedAt = (v: Date) => this.updated_at = v;
}
