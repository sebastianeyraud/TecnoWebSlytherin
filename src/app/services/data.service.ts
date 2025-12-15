import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DataService {
  private apiUsuarios = 'http://localhost:3000/usuarios';
  private apiPeliculas = 'http://localhost:3000/peliculas';
  private apiSalas = 'http://localhost:3000/salas';

  constructor(private http: HttpClient) {}

  // -------- Usuarios --------
  getUsuarios() {
    return this.http.get<any[]>(this.apiUsuarios);
  }

  addUsuario(usuario: any) {
    return this.http.post(this.apiUsuarios, usuario);
  }

  updateUsuario(email: string, usuario: any) {
    return this.http.put(`http://localhost:3000/usuarios/${email}`, usuario);
  }


  // -------- Peliculas --------
  getPeliculas() {
    return this.http.get<any[]>(this.apiPeliculas);
  }

  addPelicula(pelicula: any) {
    return this.http.post(this.apiPeliculas, pelicula);
  }

  updatePelicula(titulo: string, pelicula: any) {
    return this.http.put(`http://localhost:3000/peliculas/${encodeURIComponent(titulo)}`, pelicula);
  }

  // -------- Salas --------
  getSalas() {
    return this.http.get<any[]>(this.apiSalas);
  }

  addSala(sala: any) {
    return this.http.post(this.apiSalas, sala);
  }
}