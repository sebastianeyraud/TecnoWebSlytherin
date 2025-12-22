import { Injectable } from '@angular/core';
import { IndexedDBService } from './indexed-db.service';
import { BoletoI } from '../models/interfaces/boleto-i';

@Injectable({
  providedIn: 'root'
})
export class BoletoService {
  private store = 'boletos';

  constructor(private db: IndexedDBService) {}

  add(item: BoletoI): Promise<number> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store, 'readwrite').add(item);
      req.onsuccess = () => resolve(req.result as number);
      req.onerror = () => reject(req.error);
    });
  }

  getAll(): Promise<BoletoI[]> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store).getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  getById(id: number): Promise<BoletoI | undefined> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store).get(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  update(item: BoletoI): Promise<void> {
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