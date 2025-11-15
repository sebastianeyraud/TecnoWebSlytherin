import { TipoAsiento } from "./tipo-asiento";
import { Sala } from "./sala.model";

export class Asiento {
  private disponible: boolean;
  private sala: Sala;
  private fila: string;
  private numero: number;
  private etiqueta?: string;
  private tipo_asiento: TipoAsiento;
  private coordenadas_preview?: any; // JSON opcional
  private activo: boolean;

  constructor(
    sala: Sala,
    fila: string,
    numero: number,
    tipo_asiento: TipoAsiento = TipoAsiento.ESTANDAR,
    disponible: boolean = true,
    activo: boolean = true,
    etiqueta?: string,
    coordenadas_preview?: any
  ) {
    this.sala = sala;
    this.fila = fila;
    this.numero = numero;

    this.etiqueta = etiqueta ?? `${fila}${numero}`;
    this.tipo_asiento = tipo_asiento;
    this.coordenadas_preview = coordenadas_preview;

    this.disponible = disponible;
    this.activo = activo;
  }

  // ------------ GETTERS ------------

  public getSalaId(): Sala {return this.sala;}
  public getFila(): string {return this.fila;}
  public getNumero(): number {return this.numero;}
  public getEtiqueta(): string | undefined {return this.etiqueta;}
  public getTipoAsiento(): TipoAsiento {return this.tipo_asiento;}
  public getCoordenadasPreview(): any {return this.coordenadas_preview;}
  public isDisponible(): boolean {return this.disponible;}
  public isActivo(): boolean {return this.activo;}

  // ------------ SETTERS ------------

  public setFila(fila: string): void {this.fila = fila;}
  public setNumero(numero: number): void {this.numero = numero;}
  public setEtiqueta(etiqueta: string): void {this.etiqueta = etiqueta;}
  public setTipoAsiento(tipo: TipoAsiento): void {this.tipo_asiento = tipo;}
  public setCoordenadasPreview(coords: any): void {this.coordenadas_preview = coords;}
  public setDisponible(valor: boolean): void {this.disponible = valor;}
  public setActivo(valor: boolean): void {this.activo = valor;}

}
