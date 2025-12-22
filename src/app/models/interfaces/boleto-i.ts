import { EstadoBoleto } from "../estado-boleto";

export interface BoletoI {
    id: number;
    compra_id: number;
    funcion_id: number;
    asiento_id: number[];
    usuario_id: number;
    precio: number;
    promocion_id?: number[];
    estado: EstadoBoleto;
    fecha_emision: Date;
}
