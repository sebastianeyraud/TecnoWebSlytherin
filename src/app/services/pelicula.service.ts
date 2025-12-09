import { Injectable } from '@angular/core';
import { IndexedDBService } from './indexed-db.service';
import { PeliculaI } from '../models/interfaces/pelicula-i';
import { Actor } from '../models/interfaces/actor';
import { FuncionI } from '../models/interfaces/funcion-i';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private store = 'peliculas';

  constructor(private db: IndexedDBService) {}

  add(item: PeliculaI): Promise<number> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store, 'readwrite').add(item);
      req.onsuccess = () => resolve(req.result as number);
      req.onerror = () => reject(req.error);
    });
  }

  getAll(): Promise<PeliculaI[]> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store).getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  getById(id: number): Promise<PeliculaI | undefined> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store).get(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  update(item: PeliculaI): Promise<void> {
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
}