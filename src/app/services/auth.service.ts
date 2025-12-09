import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { Usuario } from '../models/usuario.model';

const STORAGE_KEY = 'myapp_session';

// Lista de usuarios hardcodeada
const USUARIOS_VALIDOS = [
  { email: 'guillermo.pino@cine.com', pass: '123guillermo', nombre: 'Guillermo Pino' },
  { email: 'tomas.carvajal@cine.com', pass: '123tomas', nombre: 'Tomas Carvajal' },
  { email: 'sebastain.eyraud@cine.com', pass: '123sebastian', nombre: 'Sebastian Eyraud' },
  { email: 'mayling.alvarez@cine.com', pass: '123mayling', nombre: 'Mayling Alvarez' },
  { email: 'hilda.albarracin@cine.com', pass: '123hilda', nombre: 'Hilda Albarracin' }
];

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();

  // Credenciales especiales para admin
  private credenciales = new Map<string, string[]>([
    ['admin', ['admin', 'admin']],
    ['user', ['user', 'usuario']]
  ]);

  constructor(private router: Router) {}

  /**
   * Login principal: valida contra lista hardcodeada o credenciales admin.
   */
  async login(user: User): Promise<boolean> {
    if (user.rol === 'admin') {
      const datos = this.credenciales.get(user.email);
      if (!datos || user.password !== datos[0]) {
        console.log('Admin no válido');
        this.loggedInSubject.next(false);
        return false;
      }
      const payload = { email: user.email, role: 'admin' };
      localStorage.setItem(STORAGE_KEY, btoa(JSON.stringify(payload)));
      this.loggedInSubject.next(true);
      return true;
    } else {
      // 🔎 Buscar en la lista hardcodeada
      const usuarioEncontrado = USUARIOS_VALIDOS.find(
        u => u.email === user.email && u.pass === user.password
      );

      if (!usuarioEncontrado) {
        console.log('Usuario o contraseña incorrecta');
        this.loggedInSubject.next(false);
        return false;
      }

      // Generar token simple
      const token = btoa(JSON.stringify({ email: usuarioEncontrado.email, role: 'usuario' }));
      localStorage.setItem(STORAGE_KEY, token);
      this.loggedInSubject.next(true);
      console.log(`Bienvenido, ${usuarioEncontrado.nombre}`);
      return true;
    }
  }

  /**
   * Registro: opcional, aquí podrías agregar usuarios a la lista o backend.
   * En este caso, como la lista es hardcodeada, no se usa.
   */
  async registrar(user: Usuario): Promise<void> {
    console.warn('Registro no implementado en modo hardcodeado');
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this.loggedInSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLogged(): boolean {
    return this.loggedInSubject.value;
  }

  isAdmin(): boolean {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) return false;
    try {
      const decoded = JSON.parse(atob(token));
      return decoded.role === 'admin';
    } catch (e) {
      console.warn('Token inválido', e);
      return false;
    }
  }

  getCurrentUser(): { email: string; role?: string } | null {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) return null;
    try {
      return JSON.parse(atob(token));
    } catch {
      return null;
    }
  }
}
