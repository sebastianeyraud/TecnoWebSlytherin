import { Funcion } from "./funcion.model";

export class Pelicula {
  private titulo: string;
  private funciones: Funcion[];
  private sinopsis: string;
  private duracion_min: number;
  private genero: string;
  private clasificacion: string;
  private poster_url: string;
  private created_at: Date;
  private casting: string[];

  constructor(
    titulo: string,
    funciones: Funcion[],
    sinopsis: string,
    duracion_min: number,
    genero: string,
    clasificacion: string,
    poster_url: string,
    casting: string[] = []
  ) {
    this.titulo = titulo;
    this.funciones = [];
    this.sinopsis = sinopsis;
    this.duracion_min = duracion_min;
    this.genero = genero;
    this.clasificacion = clasificacion;
    this.poster_url = poster_url;
    this.casting = casting;
    this.created_at = new Date();
  }

  // ---------- GETTERS (1 línea) ----------
  getTitulo = () => this.titulo;
  getFunciones = () => this.funciones;
  getSinopsis = () => this.sinopsis;
  getDuracionMin = () => this.duracion_min;
  getGenero = () => this.genero;
  getClasificacion = () => this.clasificacion;
  getPosterUrl = () => this.poster_url;
  getCreatedAt = () => this.created_at;
  getCasting = () => this.casting;

  // ---------- SETTERS (1 línea) ----------
  setTitulo = (v: string) => this.titulo = v;
  setSinopsis = (v: string) => this.sinopsis = v;
  setDuracionMin = (v: number) => this.duracion_min = v;
  setGenero = (v: string) => this.genero = v;
  setClasificacion = (v: string) => this.clasificacion = v;
  setPosterUrl = (v: string) => this.poster_url = v;
  setCasting = (v: string[]) => this.casting = v;

  // Añadir actores
  addActor = (actor: string) => this.casting.push(actor);
  addFuncion = (f:Funcion) => this.funciones.push(f);
}
