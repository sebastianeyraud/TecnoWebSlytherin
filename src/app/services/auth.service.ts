import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

const TOKEN_KEY = 'auth_token';
const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsIn...'; //token

const USUARIOS_VALIDOS = [
  { email: 'guillermo.pino@cine.com', pass: '123guillermo', nombre: 'Guillermo Pino' },
  { email: 'tomas.carvajal@cine.com',  pass: '123tomas', nombre: 'Tomas Carvajal' },
  { email: 'sebastain.eyraud@cine.com', pass: '123sebastian', nombre: 'Sebastian Eyraud' },
  { email: 'mayling.alvarez@cine.com',  pass: '123mayling', nombre: 'Mayling Alvarez' },
  { email: 'hilda.albarracin@cine.com', pass: '123hilda', nombre: 'Hilda Albarracin' }
];

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  login(email: string, password: string): Observable<boolean> {
    
    // 👇 CAMBIO 2: Buscamos si existe un usuario que coincida con AMBOS datos
    const usuarioEncontrado = USUARIOS_VALIDOS.find(u => u.email === email && u.pass === password);

    // Si usuarioEncontrado tiene datos, es verdadero. Si es undefined, es falso.
    if (usuarioEncontrado) {
      return of(true).pipe(
        tap(() => {
          localStorage.setItem(TOKEN_KEY, MOCK_TOKEN);
          console.log(`Bienvenido, ${usuarioEncontrado.nombre}`); // Opcional: ver quién entró
          this.router.navigate(['/membresia']);
        })
      );
    } else {
      return of(false); // No se encontró nadie con ese email Y esa contraseña
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    this.router.navigate(['/login']);
  }
}