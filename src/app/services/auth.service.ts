import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'myapp_session';
  private credenciales = new Map<string, string[]>([
    ['user', ['user', 'usuario']],
    ['admin', ['admin', 'admin']],
  ]);

  constructor() {}

  login(user: User): boolean {
    const datos = this.credenciales.get(user.email);
    if (!datos) {
      console.log('No registrado');
      return false;
    }

    const [passwordStored, role] = datos;
    if (user.password !== passwordStored) {
      console.log('Contraseña incorrecta');
      return false;
    }

    if (role === 'admin') {
      const payload = { email: user.email, role };
      const token = btoa(JSON.stringify(payload));
      localStorage.setItem(this.STORAGE_KEY, token);
      return true;
    } else {
      let safePayload: any = null;
      if (user instanceof Usuario && typeof (user as any).toJSON === 'function') {
        safePayload = (user as any).toJSON();
      } else {
        safePayload = {
          nombre: (user as any).nombre ?? user.email.split('@')[0],
          email: user.email,
          rol: (user as any).rol ?? 'usuario',
        };
      }

      const token = btoa(JSON.stringify(safePayload));
      localStorage.setItem(this.STORAGE_KEY, token);
      return true;
    }

    return false;
  }

  registrar(user: User): void {
    if (this.credenciales.has(user.email)) {
      throw new Error('Usuario ya registrado');
    }

    // Guardado en credenciales "fake"
    this.credenciales.set(user.email, [user.password, user.rol || 'user']);

    // -----------------------------
    // GUARDAR EN LA LISTA DE USUARIOS
    // -----------------------------
    const raw = localStorage.getItem('usuarios');
    const arr = raw ? JSON.parse(raw) : [];

    // guardar en formato JSON, no como clase
    arr.push((user as any).toJSON ? (user as any).toJSON() : user);

    localStorage.setItem('usuarios', JSON.stringify(arr));
  }

  getAllUsuarios(): any[] {
    const raw = localStorage.getItem('usuarios');
    return raw ? JSON.parse(raw) : [];
  }

  logout(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  isLogged(): boolean {
    return !!localStorage.getItem(this.STORAGE_KEY);
  }

  isAdmin(): boolean {
    const token = localStorage.getItem(this.STORAGE_KEY);
    if (!token) return false;
    try {
      const decoded = atob(token);
      const obj = JSON.parse(decoded) as { email?: string; role?: string };
      return obj.role === 'admin';
    } catch (e) {
      console.warn('Token inválido', e);
      return false;
    }
  }

  //Debería ir acá?
  getCurrentUser(): any | null {
    const token = localStorage.getItem(this.STORAGE_KEY);
    if (!token) return null;
    try {
      const decoded = atob(token);
      return JSON.parse(decoded);
    } catch {
      return null;
    }
  }
}
