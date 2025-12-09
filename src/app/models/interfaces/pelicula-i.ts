export interface PeliculaI {
  id: number;
  titulo: string;
  funciones: number[];
  sinopsis: string;
  duracion_min: number;
  genero: string;
  clasificacion: string;
  poster_url: string;
  created_at: Date;
  casting: number[];
  estreno: Date;
  banner: string;
  trailer : string;
}
