import { Reserva } from "./reserva.model";
import { Promocion } from "./promocion.model";
import { EstadoCompra } from "./estado-compra";

export class Compra {
  private id: number;
  private reserva: number[];
  private subtotal: number;
  private impuestos: number;
  private total: number;
  private promociones_aplicadas: number[];
  private estado: EstadoCompra;
  private created_at: Date;

  constructor(
    id:number,
    reserva_id: number[] = [],
    subtotal: number = 0,
    impuestos: number = 0,
    total: number = 0,
    promociones: number[] = [],
    estado: EstadoCompra = EstadoCompra.PENDIENTE
  ) {
    this.reserva = reserva_id;
    this.subtotal = subtotal;
    this.impuestos = impuestos;
    this.total = total;
    this.promociones_aplicadas = promociones;
    this.estado = estado;
    this.created_at = new Date();
    this.id = id;
  }

  // ---------- GETTERS  ----------
  getReservas = () => this.reserva;
  getSubtotal = () => this.subtotal;
  getImpuestos = () => this.impuestos;
  getTotal = () => this.total;
  getPromociones = () => this.promociones_aplicadas;
  getEstado = () => this.estado;
  getCreatedAt = () => this.created_at;
  getId = () => this.id;

  // ---------- SETTERS  ----------
  setReservas = (v: number[]) => this.reserva = v;
  setSubtotal = (v: number) => this.subtotal = v;
  setImpuestos = (v: number) => this.impuestos = v;
  setTotal = (v: number) => this.total = v;
  setPromociones = (v: number[]) => this.promociones_aplicadas = v;
  setEstado = (v: EstadoCompra) => this.estado = v;

  // Métodos útiles
  addReserva = (r: number) => this.reserva.push(r);
  addPromocion = (p: number) => this.promociones_aplicadas.push(p);
}
