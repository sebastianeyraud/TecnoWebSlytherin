import { Injectable } from '@angular/core';
import { User } from '../models/interfaces/user';
import { Usuario } from '../models/usuario.model';
import { IndexedDBService } from './indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'myapp_session';

  constructor(private dbService: IndexedDBService) {}

  // LOGIN
  async login(email: string, password: string): Promise<boolean> {
    await this.dbService.dbReady;
    const store = this.dbService.getStore('users');

    // Buscar usuario por email usando un cursor
    return new Promise(resolve => {
      const index = store.index('email');
      const req = index.get(email);

      req.onsuccess = (event: any) => {
        const user = event.target.result;

        if (!user || user.password !== password) {
          resolve(false);
          return;
        }

        const payload = { id: user.id, email: user.email, role: user.rol };
        localStorage.setItem(this.STORAGE_KEY, btoa(JSON.stringify(payload)));

        resolve(true);
      };

      req.onerror = () => resolve(false);
    });
  }



  // REGISTRO
  async registrar(user: Usuario): Promise<void> {
    await this.dbService.dbReady;
    const store = this.dbService.getStore('users', 'readwrite');

    // Verificar si ya existe usando índice email
    const existing = await new Promise((resolve, reject) => {
      const index = store.index('email');
      const req = index.get(user.getEmail());

      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });

    if (existing) {
      throw new Error('Usuario ya registrado');
    }

    // Guardar usuario
    return new Promise((resolve, reject) => {
      const req = store.add(user.toJSON());

      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  }


  // Obtener todos los usuarios
  async getAllUsuarios(): Promise<Usuario[]> {
    await this.dbService.dbReady;
    const store = this.dbService.getStore('users');
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result.map((u: any) => Usuario.fromJSON(u)));
      request.onerror = () => reject(request.error);
    });
  }

  // LOGOUT
  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // ¿Está logueado?
  isLogged(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }

  // Es admin
  isAdmin(): boolean {
    const token = localStorage.getItem(this.STORAGE_KEY);
    if (!token) return false;
    try {
      const decoded = JSON.parse(atob(token));
      return decoded.role === 'admin';
    } catch {
      return false;
    }
  }

  // Obtener usuario actual (solo email)
  getCurrentUser(): { id: number; email: string; role: string } | null {
    const token = localStorage.getItem(this.STORAGE_KEY);
    if (!token) return null;
    try {
      const decoded = JSON.parse(atob(token));
      return {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role
      };
    } catch {
      return null;
    }
  }
}