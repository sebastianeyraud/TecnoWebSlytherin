import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Usuario } from '../models/usuario.model';
import { DataService } from './data.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly STORAGE_KEY = 'myapp_session';

  // Credenciales fakes para admin
  private credenciales = new Map<string, string[]>([
    ['admin', ['admin', 'admin']]
  ]);

  constructor(private dataService: DataService) {}

  // LOGIN
  async login(user: User): Promise<boolean> {
    if (user.rol === 'admin') {
      // login admin con credenciales fakes
      const datos = this.credenciales.get(user.email);
      if (!datos) {
        console.log('Admin no registrado');
        return false;
      }
      const [passwordStored] = datos;
      if (user.password !== passwordStored) {
        console.log('Contraseña incorrecta');
        return false;
      }

      // token solo con email y rol
      const payload = { email: user.email, role: 'admin' };
      localStorage.setItem(this.STORAGE_KEY, btoa(JSON.stringify(payload)));
      return true;
    } else {
      // login usuario desde backend
      try {
        const usuariosRaw = await firstValueFrom(this.dataService.getUsuarios());
        const usuarioEncontrado = usuariosRaw.find((u: any) => u.email === user.email);

        if (!usuarioEncontrado) {
          console.log('Usuario no registrado');
          return false;
        }

        if (usuarioEncontrado.password !== user.password) {
          console.log('Contraseña incorrecta');
          return false;
        }

        // Token simple: solo el correo
        const token = btoa(JSON.stringify({ email: usuarioEncontrado.email }));
        localStorage.setItem(this.STORAGE_KEY, token);
        return true;
      } catch (e) {
        console.error('Error login usuario', e);
        return false;
      }
    }
  }

  // REGISTRO
  async registrar(user: Usuario): Promise<void> {
    // primero verificamos si ya existe en backend
    const usuariosRaw = await firstValueFrom(this.dataService.getUsuarios());
    if (usuariosRaw.some((u: any) => u.email === user.getEmail())) {
      throw new Error('Usuario ya registrado');
    }

    // guardar en backend
    await firstValueFrom(this.dataService.addUsuario(user.toJSON()));
  }

  // Obtener todos los usuarios desde backend
  async getAllUsuarios(): Promise<Usuario[]> {
    const usuariosRaw = await firstValueFrom(this.dataService.getUsuarios());
    return usuariosRaw.map((u: any) => Usuario.fromJSON(u));
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
    } catch (e) {
      console.warn('Token inválido', e);
      return false;
    }
  }

  // Obtener usuario actual (solo email)
  getCurrentUser(): { email: string } | null {
    const token = localStorage.getItem(this.STORAGE_KEY);
    if (!token) return null;
    try {
      const decoded = JSON.parse(atob(token));
      return { email: decoded.email };
    } catch {
      return null;
    }
  }
}