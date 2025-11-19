import { EstadoBoleto } from "./estado-boleto";

export class Boleto {
  private compra_id: string;
  private funcion_id: string;
  private asiento_id: string;
  private usuario_id: string;
  private precio: number;
  private promocion_id?: string;
  private estado: EstadoBoleto;
  private fecha_emision: Date;

  constructor(
    compra_id: string,
    funcion_id: string,
    asiento_id: string,
    usuario_id: string,
    precio: number,
    promocion_id?: string,
    estado: EstadoBoleto = EstadoBoleto.EMITIDO
  ) {
    this.compra_id = compra_id;
    this.funcion_id = funcion_id;
    this.asiento_id = asiento_id;
    this.usuario_id = usuario_id;
    this.precio = precio;
    this.promocion_id = promocion_id;
    this.estado = estado;

    this.fecha_emision = new Date();
  }

  // ---------- GETTERS ----------

  getCompraId = () => this.compra_id;
  getFuncionId = () => this.funcion_id;
  getAsientoId = () => this.asiento_id;
  getUsuarioId = () => this.usuario_id;
  getPrecio = () => this.precio;
  getPromocionId = () => this.promocion_id;
  getEstado = () => this.estado;
  getFechaEmision = () => this.fecha_emision;

  // ---------- SETTERS ----------

  setCompraId = (v: string) => this.compra_id = v;
  setFuncionId = (v: string) => this.funcion_id = v;
  setAsientoId = (v: string) => this.asiento_id = v;
  setUsuarioId = (v: string) => this.usuario_id = v;
  setPrecio = (v: number) => this.precio = v;
  setPromocionId = (v: string | undefined) => this.promocion_id = v;
  setEstado = (v: EstadoBoleto) => this.estado = v;
}
