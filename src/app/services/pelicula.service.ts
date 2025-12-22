import { Injectable } from '@angular/core';
import { IndexedDBService } from './indexed-db.service';
import { PeliculaI } from '../models/interfaces/pelicula-i';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PeliculaService {
  private peliculasSubject = new BehaviorSubject<PeliculaI[]>([]);
  peliculas$ = this.peliculasSubject.asObservable();
  private store = 'peliculas';

  constructor(private db: IndexedDBService) {}

  // =====================
  // Traer todas y actualizar observable
  // =====================
  async getAll(): Promise<PeliculaI[]> {
    const peliculas = await new Promise<PeliculaI[]>((resolve, reject) => {
      const req = this.db.getStore(this.store).getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });

    this.peliculasSubject.next(peliculas); // actualiza observable
    return peliculas;
  }

  async add(item: PeliculaI): Promise<number> {
    const id = await new Promise<number>((resolve, reject) => {
      const req = this.db.getStore(this.store, 'readwrite').add(item);
      req.onsuccess = () => resolve(req.result as number);
      req.onerror = () => reject(req.error);
    });

    await this.getAll(); // refresca observable
    return id;
  }

  async update(item: PeliculaI): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      const req = this.db.getStore(this.store, 'readwrite').put(item);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });

    await this.getAll(); // refresca observable
  }

  async delete(id: number): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      const req = this.db.getStore(this.store, 'readwrite').delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });

    await this.getAll(); // refresca observable
  }

  async getById(id: number): Promise<PeliculaI | undefined> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store).get(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }
}