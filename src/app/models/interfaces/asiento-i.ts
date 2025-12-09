import { TipoAsiento } from "../tipo-asiento";

export interface AsientoI {
    disponible: boolean;
    sala: number;
    fila: string;
    numero: number;
    etiqueta?: string;
    tipo_asiento: TipoAsiento;
    coordenadas_preview?: any;
    activo: boolean;
}
