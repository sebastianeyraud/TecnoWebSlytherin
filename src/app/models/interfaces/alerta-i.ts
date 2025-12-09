import { TipoAlerta } from "../tipo-alerta";

export interface AlertaI {
    id: number;
    titulo: string;
    mensaje: string;
    tipo: TipoAlerta;
    dirigida_a: string;
    created_at: Date;
}
