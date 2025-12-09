import { Injectable } from '@angular/core';
import { IndexedDBService } from './indexed-db.service';
import { Actor } from '../models/interfaces/actor';
import { PeliculaI } from '../models/interfaces/pelicula-i';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  private store = 'casting';
  actoresPelicula: Actor[] = [];

  async cargarActores(pelicula: PeliculaI) {
    const allActores = await this.getAll();
    this.actoresPelicula = pelicula.casting
      .map(id => allActores.find(a => a.id === id))
      .filter(a => a != null) as Actor[];
  }


  constructor(private db: IndexedDBService) {}

  add(item: Actor): Promise<number> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store, 'readwrite').add(item);
      req.onsuccess = () => resolve(req.result as number);
      req.onerror = () => reject(req.error);
    });
  }

  getAll(): Promise<Actor[]> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store).getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  getById(id: number): Promise<Actor | undefined> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store).get(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  update(item: Actor): Promise<void> {
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