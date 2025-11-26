import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, BehaviorSubject } from 'rxjs'; 
import { tap } from 'rxjs/operators';

const TOKEN_KEY = 'auth_token';
const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsIn...'; //token

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

  constructor(private router: Router) { }

  // 👇 Método auxiliar para verificar la existencia del token (¡Se mantiene!)
  private checkTokenExistence(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }

  // 1. PROPIEDAD CLAVE: BehaviorSubject para rastrear el estado
  // El valor inicial llama al método auxiliar para evitar la duplicidad
  private loggedIn = new BehaviorSubject<boolean>(this.checkTokenExistence()); 
  
  // Expone el estado como un Observable ($)
  isLoggedIn$ = this.loggedIn.asObservable(); 

  login(email: string, password: string): Observable<boolean> {
    
    const usuarioEncontrado = USUARIOS_VALIDOS.find(u => u.email === email && u.pass === password);

    if (usuarioEncontrado) {
      return of(true).pipe(
        tap(() => {
          localStorage.setItem(TOKEN_KEY, MOCK_TOKEN);
          console.log(`Bienvenido, ${usuarioEncontrado.nombre}`);
          
          // NOTIFICAR: Si el login es exitoso, cambia el estado a TRUE
          this.loggedIn.next(true); 
          
          //Cuando inicia sesión, redirige a home
          this.router.navigate(['/home']);
        })
      );
    } else {
      return of(false);
    }
  }

  // 2. MÉTODO SÍNCRONO para Guards/Login (¡Se mantiene!)
  isLoggedIn(): boolean {
    return this.checkTokenExistence();
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    
    // NOTIFICAR: Al cerrar sesión, cambia el estado a FALSE
    this.loggedIn.next(false); 

    this.router.navigate(['/login']);
  }
}