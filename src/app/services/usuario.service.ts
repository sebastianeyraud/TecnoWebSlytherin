import { Injectable } from '@angular/core';
import { IndexedDBService } from './indexed-db.service';
import { UsuarioI } from '../models/interfaces/usuario-i';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private store = 'usuarios_perfil';
  private currentUserSubject = new BehaviorSubject<UsuarioI | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private db: IndexedDBService) {}

  add(item: UsuarioI): Promise<number> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store, 'readwrite').add(item);
      req.onsuccess = () => resolve(req.result as number);
      req.onerror = () => reject(req.error);
    });
  }

  getAll(): Promise<UsuarioI[]> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store).getAll();
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  getById(id: number): Promise<UsuarioI | undefined> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store).get(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  update(item: UsuarioI): Promise<void> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store, 'readwrite').put(item);
      req.onsuccess = () => {
        resolve();
        // Aquí avisamos que el usuario cambió
        this.setCurrentUser(item);
      };
      req.onerror = () => reject(req.error);
    });
  }

  setCurrentUser(user: UsuarioI | null) {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): UsuarioI | null {
    return this.currentUserSubject.getValue();
  }

  delete(id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const req = this.db.getStore(this.store, 'readwrite').delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }
}