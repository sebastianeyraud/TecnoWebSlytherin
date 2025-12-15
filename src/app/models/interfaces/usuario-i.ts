import { Membresia } from "../membresia"

export interface UsuarioI {
    id: number;
    apellido?: string
    telefono?: string
    membresia: Membresia
    created_at: Date
    historial: number[],
    notificaciones: number[],
    p_favoritas: number[]
}
