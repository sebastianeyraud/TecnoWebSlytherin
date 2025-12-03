import { Funcion } from "./funcion.model";
import { Actor } from "./actor";
import { SalaRegistry } from "./sala-registry";
import { FuncionJSON } from './funcion-json';

export class Pelicula {
  private titulo: string;
  private funciones: Funcion[];
  private sinopsis: string;
  private duracion_min: number;
  private genero: string;
  private clasificacion: string;
  private poster_url: string;
  private created_at: Date;
  private casting: Actor[];
  private estreno: Date;
  private banner: string;
  private trailer : string;

  constructor(
    titulo: string,
    funciones: Funcion[],
    sinopsis: string,
    duracion_min: number,
    genero: string,
    clasificacion: string,
    poster_url: string,
    casting: Actor[] = [],
    estreno: Date,
    banner: string,
    trailer : string
  ) {
    this.titulo = titulo;
    this.funciones = funciones ?? []; // <- ahora sí usa el parámetro
    this.sinopsis = sinopsis;
    this.duracion_min = duracion_min;
    this.genero = genero;
    this.clasificacion = clasificacion;
    this.poster_url = poster_url;
    this.casting = casting;
    this.created_at = new Date();
    this.estreno = estreno;
    this.banner = banner
    this.trailer = trailer
  }

  getTitulo = () => this.titulo;
  getFunciones = () => this.funciones;
  getSinopsis = () => this.sinopsis;
  getDuracionMin = () => this.duracion_min;
  getGenero = () => this.genero;
  getClasificacion = () => this.clasificacion;
  getPosterUrl = () => this.poster_url;
  getCreatedAt = () => this.created_at;
  getCasting = () => this.casting;
  getEstreno = () => this.estreno;
  getBanner = () => this.banner;
  getTrailer = () => this.trailer;

  setTitulo = (v: string) => this.titulo = v;
  setSinopsis = (v: string) => this.sinopsis = v;
  setDuracionMin = (v: number) => this.duracion_min = v;
  setGenero = (v: string) => this.genero = v;
  setClasificacion = (v: string) => this.clasificacion = v;
  setPosterUrl = (v: string) => this.poster_url = v;
  setCasting = (v: Actor[]) => this.casting = v;
  setEstreno = (v: Date) => this.estreno = v;
  setBanner = (v: string) => this.banner = v;
  setTrailer = (v:string) => this.trailer = v;

  addActor = (actor: Actor) => this.casting.push(actor);
  addFuncion = (f: Funcion) => this.funciones.push(f);

  toJSON() {
    return {
      titulo: this.titulo,
      funciones: this.funciones,
      sinopsis: this.sinopsis,
      duracion_min: this.duracion_min,
      genero: this.genero,
      clasificacion: this.clasificacion,
      poster_url: this.poster_url,
      created_at: this.created_at.toISOString(),
      casting: this.casting,
      estreno: this.estreno,
      banner: this.banner,
      trailer: this.trailer
    };
  }

  static fromJSON(obj: any): Pelicula {

    // --- Casting ---
    const casting: Actor[] = (obj.casting ?? []).map((a: any) => ({
      nombre: a.nombre,
      foto: a.foto
    }));

    // --- Funciones ---
    const funcionesJSON: FuncionJSON[] = obj.funciones ?? [];

    const funciones: Funcion[] = funcionesJSON
      .map((f) => {
        const sala = SalaRegistry.getByName(f.sala.nombre);

        if (!sala) {
          console.warn("⚠️ Sala no encontrada:", f.sala.nombre);
          return null;
        }

        return new Funcion(
          sala,
          new Date(f.start_time),
          new Date(f.end_time),
          f.formato,
          f.precio_base,
          f.disponible
        );
      })
      .filter((f): f is Funcion => f !== null);


    // --- Crear pelicula ---
    const p = new Pelicula(
      obj.titulo,
      funciones,
      obj.sinopsis,
      obj.duracion_min,
      obj.genero,
      obj.clasificacion,
      obj.poster_url,
      casting,
      new Date(obj.estreno),
      obj.banner,
      obj.trailer
    );

    p.created_at = obj.created_at ? new Date(obj.created_at) : new Date();

    return p;
  }
}

