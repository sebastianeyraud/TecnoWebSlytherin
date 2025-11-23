import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

// Credenciales y Token Ficticios para la simulación
const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibG9naW4tc2luLWRiIiwiaWF0IjoxNjU2Nzg5MDc5fQ.ABCD123456';
const MOCK_EMAIL = 'admin@cine.com';
const MOCK_PASS = '123456';
const TOKEN_KEY = 'auth_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
    // Al iniciar, verificar si ya hay un token guardado
  }

  /**
   * Simula el proceso de Login y generación de Token
   */
  login(email: string, password: string): Observable<boolean> {
    // 1. SIMULACIÓN DE VERIFICACIÓN DE CREDENCIALES
    if (email === MOCK_EMAIL && password === MOCK_PASS) {
      // 2. Si las credenciales son válidas, guardar el token y redirigir
      return of(true).pipe(
        tap(() => {
          localStorage.setItem(TOKEN_KEY, MOCK_TOKEN);
          // Redirigir a la página principal o protegida
          this.router.navigate(['/membresias']); 
        })
      );
    } else {
      // 3. Login fallido
      return of(false); 
    }
  }

  /**
   * Comprueba si existe un token válido almacenado.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Cierra la sesión: elimina el token y redirige a login.
   */
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}