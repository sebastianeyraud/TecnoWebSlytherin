import { EstadoCompra } from "../estado-compra";

export interface CompraI {
  id: number;
  reserva: number[];
  subtotal: number;
  impuestos: number;
  total: number;
  promociones_aplicadas: number[];
  estado: EstadoCompra;
  created_at: Date;
  boletos: number[];
}
