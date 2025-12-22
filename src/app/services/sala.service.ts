import { Injectable } from '@angular/core';
import { IndexedDBService } from './indexed-db.service';
import { SalaI } from '../models/interfaces/sala-i';
import { AsientoI } from '../models/interfaces/asiento-i';

@Injectable({
  providedIn: 'root'
})
export class SalaService {
  private store = 'salas';

  constructor(private db: IndexedDBService) {}

  add(item: SalaI): Promise<number> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store, 'readwrite').add(item);
      req.onsuccess = () => resolve(req.result as number);
      req.onerror = () => reject(req.error);
    });
  }

  getAll(): Promise<SalaI[]> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store).getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  getById(id: number): Promise<SalaI | undefined> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store).get(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  update(item: SalaI): Promise<void> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store, 'readwrite').put(item);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store, 'readwrite').delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }

  async updateAsiento(salaId: number, asiento: AsientoI): Promise<void> {
    const sala = await this.getById(salaId); // SalaService.getById
    if (!sala) throw new Error('Sala no encontrada');

    // Buscar el asiento en la sala y actualizarlo
    const index = sala.asientos.findIndex(a => a.fila === asiento.fila && a.numero === asiento.numero);
    if (index >= 0) {
      sala.asientos[index] = asiento;
    } else {
      sala.asientos.push(asiento); // O manejar error si no existe
    }

    await this.update(sala); // SalaService.update
  }

  async deleteAsiento(salaId: number, fila: string, numero: number): Promise<void> {
    const sala = await this.getById(salaId);
    if (!sala) throw new Error('Sala no encontrada');

    sala.asientos = sala.asientos.filter(a => !(a.fila === fila && a.numero === numero));
    await this.update(sala);
  }


}