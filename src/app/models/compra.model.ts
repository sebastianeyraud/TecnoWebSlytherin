import { Reserva } from "./reserva.model";
import { Promocion } from "./promocion.model";
import { EstadoCompra } from "./estado-compra";

export class Compra {
  private reserva_id: Reserva[];
  private subtotal: number;
  private impuestos: number;
  private total: number;
  private promociones_aplicadas: Promocion[];
  private estado: EstadoCompra;
  private created_at: Date;

  constructor(
    reserva_id: Reserva[] = [],
    subtotal: number = 0,
    impuestos: number = 0,
    total: number = 0,
    promociones: Promocion[] = [],
    estado: EstadoCompra = EstadoCompra.PENDIENTE
  ) {
    this.reserva_id = reserva_id;
    this.subtotal = subtotal;
    this.impuestos = impuestos;
    this.total = total;
    this.promociones_aplicadas = promociones;
    this.estado = estado;
    this.created_at = new Date();
  }

  // ---------- GETTERS  ----------
  getReservas = () => this.reserva_id;
  getSubtotal = () => this.subtotal;
  getImpuestos = () => this.impuestos;
  getTotal = () => this.total;
  getPromociones = () => this.promociones_aplicadas;
  getEstado = () => this.estado;
  getCreatedAt = () => this.created_at;

  // ---------- SETTERS  ----------
  setReservas = (v: Reserva[]) => this.reserva_id = v;
  setSubtotal = (v: number) => this.subtotal = v;
  setImpuestos = (v: number) => this.impuestos = v;
  setTotal = (v: number) => this.total = v;
  setPromociones = (v: Promocion[]) => this.promociones_aplicadas = v;
  setEstado = (v: EstadoCompra) => this.estado = v;

  // Métodos útiles
  addReserva = (r: Reserva) => this.reserva_id.push(r);
  addPromocion = (p: Promocion) => this.promociones_aplicadas.push(p);
}
