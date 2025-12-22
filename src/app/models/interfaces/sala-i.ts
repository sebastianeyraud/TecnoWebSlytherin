import { AsientoI } from "./asiento-i";

export interface SalaI {
  id: number;
  cine: number;
  nombre: string;
  tipo?: string;
  capacidad: number;
  plano_url?: string;
  asientos: AsientoI[];
}
