import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs'; 
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { Usuario } from '../models/usuario.model';
import { DataService } from './data.service';
import { firstValueFrom } from 'rxjs';

const TOKEN_KEY = 'auth_token';
const STORAGE_KEY = 'myapp_session';
const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsIn...'; // token de prueba

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

  private credenciales = new Map<string, string[]>([
    ['admin', ['admin', 'admin']],
    ['user', ['user', 'usuario']]
  ]);

  constructor(private router: Router, private dataService: DataService) {}

  private checkTokenExistence(): boolean {
    return !!localStorage.getItem(TOKEN_KEY) || !!localStorage.getItem(STORAGE_KEY);
  }

  loginLegacy(email: string, password: string): Observable<boolean> {
    const usuarioEncontrado = USUARIOS_VALIDOS.find(u => u.email === email && u.pass === password);

    if (usuarioEncontrado) {
      return of(true).pipe(
        tap(() => {
          localStorage.setItem(TOKEN_KEY, MOCK_TOKEN);
          console.log(`Bienvenido, ${usuarioEncontrado.nombre}`);
          this.loggedInSubject.next(true);
          this.router.navigate(['/home']);
        })
      );
    } else {
      return of(false);
    }
  }

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
      try {
        const usuariosRaw = await firstValueFrom(this.dataService.getUsuarios());
        const usuarioEncontrado = usuariosRaw.find((u: any) => u.email === user.email);
        if (!usuarioEncontrado || usuarioEncontrado.password !== user.password) {
          console.log('Usuario o contraseña incorrecta');
          this.loggedInSubject.next(false);
          return false;
        }
        const token = btoa(JSON.stringify({ email: usuarioEncontrado.email }));
        localStorage.setItem(STORAGE_KEY, token);
        this.loggedInSubject.next(true);
        return true;
      } catch (e) {
        console.error('Error login usuario', e);
        this.loggedInSubject.next(false);
        return false;
      }
    }
  }

  async registrar(user: Usuario): Promise<void> {
    const usuariosRaw = await firstValueFrom(this.dataService.getUsuarios());
    if (usuariosRaw.some((u: any) => u.email === user.getEmail())) {
      throw new Error('Usuario ya registrado');
    }
    await firstValueFrom(this.dataService.addUsuario(user.toJSON()));
  }

  async getAllUsuarios(): Promise<Usuario[]> {
    const usuariosRaw = await firstValueFrom(this.dataService.getUsuarios());
    return usuariosRaw.map((u: any) => Usuario.fromJSON(u));
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
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

  getCurrentUser(): { email: string } | null {
    const token = localStorage.getItem(STORAGE_KEY);
    if (!token) return null;
    try {
      const decoded = JSON.parse(atob(token));
      return { email: decoded.email };
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }
}