import { Injectable } from '@angular/core';
import { Pelicula } from '../models/pelicula.model';
import { DataService } from './data.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private dataService: DataService) { }

  // Listar todas las películas
  async getPeliculas(): Promise<Pelicula[]> {
    const peliculasRaw = await firstValueFrom(this.dataService.getPeliculas());
    return peliculasRaw.map((p: any) => Pelicula.fromJSON ? Pelicula.fromJSON(p) : p);
  }

  // Agregar una nueva película
  async addPelicula(pelicula: Pelicula): Promise<void> {
    await firstValueFrom(this.dataService.addPelicula(pelicula.toJSON()));
  }

  // Actualizar película existente (por título)
  async updatePelicula(titulo: string, pelicula: Pelicula): Promise<void> {
    await firstValueFrom(this.dataService.updatePelicula
      ? this.dataService.updatePelicula(titulo, pelicula.toJSON())
      : this.dataService.addPelicula(pelicula.toJSON())
    );
  }

  // Buscar película por título
  async getPeliculaByTitulo(titulo: string): Promise<Pelicula | undefined> {
    const peliculas = await this.getPeliculas();
    return peliculas.find(p => p.getTitulo() === titulo);
  }
}
