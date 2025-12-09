import { EstadoBoleto } from "../estado-boleto";

export interface BoletoI {
    compra_id: string;
    funcion_id: string;
    asiento_id: string;
    usuario_id: string;
    precio: number;
    promocion_id?: string;
    estado: EstadoBoleto;
    fecha_emision: Date;
}
