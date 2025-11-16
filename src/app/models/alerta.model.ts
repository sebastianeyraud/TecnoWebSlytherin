import { Funcion } from "./funcion.model";
import { Promocion } from "./promocion.model";
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
    this.tipo = TipoAlerta.AVISO;
    this.dirigida_a = dirigida_a;
    this.created_at = new Date();
  }

  // ----------- GETTERS -----------

  public getTitulo(): string {return this.titulo;}
  public getMensaje(): string {return this.mensaje;}
  public getTipo(): TipoAlerta {return this.tipo;}
  public getDirigidaA(): string {return this.dirigida_a;}
  public getCreatedAt(): Date {return this.created_at;}

}
