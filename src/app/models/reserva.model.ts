import { Funcion } from "./funcion.model";
import { Sala } from "./sala.model";
import { EstadoReserva } from "./estado-reserva";

export class Reserva {
  private funcion_id: Funcion;
  private sala: Sala;
  private asientos_etiquetas: string[];   // SOLO strings
  private created_at: Date;
  private expires_at: Date;
  private status: EstadoReserva;

  constructor(
    funcion: Funcion,
    sala: Sala,
    etiquetasAsientos: string[],
    duracionReservaMin: number = 10
  ) {
    this.funcion_id = funcion;
    this.sala = sala;
    this.asientos_etiquetas = etiquetasAsientos;

    this.created_at = new Date();
    this.expires_at = new Date(Date.now() + duracionReservaMin * 60000);
    this.status = EstadoReserva.ACTIVA;
  }

  // ------- GETTERS (una línea) -------
  getFuncion = () => this.funcion_id;
  getSala = () => this.sala;
  getAsientosEtiquetas = () => this.asientos_etiquetas;
  getCreatedAt = () => this.created_at;
  getExpiresAt = () => this.expires_at;
  getStatus = () => this.status;

  // ------- SETTERS (una línea) -------
  setFuncion = (f: Funcion) => this.funcion_id = f;
  setSala = (s: Sala) => this.sala = s;
  setAsientosEtiquetas = (a: string[]) => this.asientos_etiquetas = a;
  setCreatedAt = (d: Date) => this.created_at = d;
  setExpiresAt = (d: Date) => this.expires_at = d;
  setStatus = (s: EstadoReserva) => this.status = s;

  // ------- EXPIRAR -------
  expirar(): void {
    this.status = EstadoReserva.EXPIRADA;
  }
}
