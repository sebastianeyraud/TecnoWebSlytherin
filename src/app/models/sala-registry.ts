import { Sala } from "./sala.model";

export class SalaRegistry {
  private static salas: Sala[] = [];

  // Registrar salas desde JSON
  static registerSalas(salas: Sala[]) {
    this.salas.push(...salas);
  }

  // Limpiar salas (por si recargas datos)
  static clear() {
    this.salas = [];
  }

  // 🔥 Buscar sala por nombre (lo que necesitas)
  static getByName(nombre: string): Sala | undefined {
    return this.salas.find(s => s.getNombre() === nombre);
  }

  // Por si quieres todas
  static getAll(): Sala[] {
    return this.salas;
  }
}