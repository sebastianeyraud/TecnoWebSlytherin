import { EstadoReserva } from "../estado-reserva";

export interface ReservaI {
    id: number;
    funcion_id: number;
    asientos_etiquetas: string[];
    created_at: Date;
    expires_at: Date;
    status: EstadoReserva;
}
