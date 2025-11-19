// import { Observable, of } from 'rxjs'; El profe lo usó, pero creo que si vamos de login a principal siempre, no es necesario
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private credenciales = new Map<string, string[]>([
    ['user', ['user', 'user']],
    ['admin', ['admin', 'admin']],
  ]);

  constructor() {}

  login(user: User): boolean {
    const datos = this.credenciales.get(user.email);

    if (datos) {
      const [contraseña, rol] = datos;

      if (user.password === contraseña) {
        if (rol === 'admin') {
          console.log('Admin autenticado');
          // Crear token y guardar sesión
          let token: string = btoa(user.email + user.password);
          sessionStorage.setItem('token',token);
          return true;
        } else {
          console.log('Usuario normal autenticado');
          // Crear token y guardar sesión
          let token: string = btoa(user.email + user.password);
          sessionStorage.setItem('token',token);
          return true;
        }
      } else {
        console.log('Contraseña incorrecta');
      }
    } else {
      console.log('No registrado');
    }
    return false;
  }

  public registrar(user: User): void {
    this.credenciales.set(user.email, [user.password, user.rol]);
  }

  public isLogged():boolean{
    if(sessionStorage.getItem('token')){
        return true;
      }
      console.log('no hay nadie sesionado iniciao')
      return false;
  }
}

// Luego en login, hacer una clase simple para 'probar usuario' y aquí comparamos
// si pasa la autenticación, crear la instancia de cada uno guardar en localstorage
// después de eso pruebo con login

// si funciona, paso a ver los guards