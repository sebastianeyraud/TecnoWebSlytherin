
export class Pelicula {
  private titulo: string;
  private funciones: number[];
  private sinopsis: string;
  private duracion_min: number;
  private genero: string;
  private clasificacion: string;
  private poster_url: string;
  private created_at: Date;
  private casting: number[];
  private estreno: Date;
  private banner: string;
  private trailer : string;

  constructor(
    titulo: string,
    funciones: number[] = [],
    sinopsis: string,
    duracion_min: number,
    genero: string,
    clasificacion: string,
    poster_url: string,
    casting: number[] = [],
    estreno: Date,
    banner: string,
    trailer : string
  ) {
    this.titulo = titulo;
    this.funciones = funciones;
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
  setCasting = (v: number[]) => this.casting = v;
  setEstreno = (v: Date) => this.estreno = v;
  setBanner = (v: string) => this.banner = v;
  setTrailer = (v:string) => this.trailer = v;

  addActor = (actor: number) => this.casting.push(actor);
  addFuncion = (f: number) => this.funciones.push(f);

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
    const p = new Pelicula(
      obj.titulo,
      obj.funciones ?? [],
      obj.sinopsis,
      obj.duracion_min,
      obj.genero,
      obj.clasificacion,
      obj.poster_url,
      obj.casting ?? [],
      new Date(obj.estreno),
      obj.banner,
      obj.trailer
    );

    p.created_at = obj.created_at ? new Date(obj.created_at) : new Date();

    return p;
  }
}

