import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/interfaces/user';
import { UsuarioI } from '../models/interfaces/usuario-i';
import { IndexedDBService } from './indexed-db.service';
import { Membresia } from '../models/membresia';

const STORAGE_KEY = 'myapp_session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private dbService: IndexedDBService, private router: Router) {
    const hasSession = !!localStorage.getItem(STORAGE_KEY);
    this.loggedInSubject.next(hasSession);
  }

  async login(email: string, password: string): Promise<boolean> {
    await this.dbService.dbReady;
    const store = this.dbService.getStore('users');

    return new Promise(resolve => {
      const index = store.index('email');
      const req = index.get(email);

      req.onsuccess = (event: any) => {
        const user: User = event.target.result;

        if (!user || user.password !== password) {
          resolve(false);
          return;
        }

        const payload = { id: user.id, email: user.email, role: user.rol };
        localStorage.setItem(STORAGE_KEY, btoa(JSON.stringify(payload)));

        this.loggedInSubject.next(true);
        resolve(true);
      };

      req.onerror = () => resolve(false);
    });
  }

  async registrar(userData: { nombre: string; email: string; password: string; rol: 'usuario' | 'admin' }): Promise<User> {
    await this.dbService.dbReady;

    // 1️⃣ Crear User
    const nuevoUser: User = {
      id: Date.now(),
      nombre: userData.nombre,
      email: userData.email,
      password: userData.password,
      rol: userData.rol
    };

    const userStore = this.dbService.getStore('users', 'readwrite');

    // Verificar si ya existe el email
    const existing = await new Promise((resolve, reject) => {
      const index = userStore.index('email');
      const req = index.get(nuevoUser.email);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });

    if (existing) throw new Error('Usuario ya registrado');

    // Guardar User
    await new Promise((resolve, reject) => {
      const req = userStore.add(nuevoUser);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });

    // 2️⃣ Crear perfil vacío según rol con manejo de errores
    const storePerfil = this.dbService.getStore('usuarios_perfil', 'readwrite');

    try {
      if (nuevoUser.rol === 'usuario') {
        const nuevoUsuarioI: UsuarioI = {
          id: nuevoUser.id,
          apellido: '',
          telefono: '',
          membresia: Membresia.NONE,
          created_at: new Date(),
          historial: [],
          notificaciones: [],
          p_favoritas: []
        };

        await new Promise((resolve, reject) => {
          const req = storePerfil.add(nuevoUsuarioI);
          req.onsuccess = () => resolve(true);
          req.onerror = () => reject(req.error);
        });

      } else if (nuevoUser.rol === 'admin') {
        const nuevoAdmin = { id: nuevoUser.id };
        await new Promise((resolve, reject) => {
          const req = storePerfil.add(nuevoAdmin);
          req.onsuccess = () => resolve(true);
          req.onerror = () => reject(req.error);
        });
      }
    } catch (perfilError) {
      // Si falla la creación del perfil, eliminamos el User para no dejarlo huérfano
      await new Promise((resolve, reject) => {
        const req = userStore.delete(nuevoUser.id);
        req.onsuccess = () => resolve(true);
        req.onerror = () => reject(req.error);
      });
      throw new Error('Error creando el perfil del usuario');
    }

    return nuevoUser;
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {
    return this.loggedInSubject.value;
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  isAdmin(): boolean {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) return false;
    try {
      const decoded = JSON.parse(atob(token));
      return decoded.role === 'admin';
    } catch {
      return false;
    }
  }

  getCurrentUser(): { id: number; email: string; role: string } | null {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) return null;
    try {
      const decoded = JSON.parse(atob(token));
      return { id: decoded.id, email: decoded.email, role: decoded.role };
    } catch {
      return null;
    }
  }
}