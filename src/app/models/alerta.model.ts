import { TipoAlerta } from "./tipo-alerta";

export class Alerta {
  private titulo: string;
  private mensaje: string;
  private tipo: TipoAlerta;
  private dirigida_a: string;
  private created_at: Date;

  constructor(
    titulo: string,
    mensaje: string,
    tipo: TipoAlerta,
    dirigida_a: string = "todos"
  ) {
    this.titulo = titulo;
    this.mensaje = mensaje;
    this.tipo = tipo;
    this.dirigida_a = dirigida_a;
    this.created_at = new Date();
  }

  // ----------- GETTERS -----------

  public getTitulo(): string {return this.titulo;}
  public getMensaje(): string {return this.mensaje;}
  public getTipo(): TipoAlerta {return this.tipo;}
  public getDirigidaA(): string {return this.dirigida_a;}
  public getCreatedAt(): Date {return this.created_at;}

  // ----------- SETTERS -----------

  public setTitulo(titulo: string): void {this.titulo = titulo;}
  public setMensaje(mensaje: string): void {this.mensaje = mensaje;}
  public setTipo(tipo: TipoAlerta): void {this.tipo = tipo;}
  public setDirigidaA(destino: string): void {this.dirigida_a = destino;}

}
