import { AplicableA } from "../aplicable-a";
import { TipoPromocion } from "../tipo-promocion";

export interface PromocionI {
    id: number;
    codigo: string;
    nombre: string;
    descripcion: string;
    tipo: TipoPromocion;
    valor: number;
    aplicable_a: AplicableA;
    fecha_inicio: Date;
    fecha_fin: Date;
    activo: boolean;
    created_at: Date;
    updated_at: Date;
}
