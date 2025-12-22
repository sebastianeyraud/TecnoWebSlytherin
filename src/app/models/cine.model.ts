export class Cine {
  private nombre: string;
  private direccion: string;
  private ciudad: string;
  private telefono?: string;

  constructor(
    nombre: string,
    direccion: string,
    ciudad: string,
    telefono?: string
  ) {
    this.nombre = nombre;
    this.direccion = direccion;
    this.ciudad = ciudad;
    this.telefono = telefono;
  }

  // ------ GETTERS (1 línea) ------
  getNombre = () => this.nombre;
  getDireccion = () => this.direccion;
  getCiudad = () => this.ciudad;
  getTelefono = () => this.telefono;

  // ------ SETTERS (1 línea) ------
  setNombre = (v: string) => this.nombre = v;
  setDireccion = (v: string) => this.direccion = v;
  setCiudad = (v: string) => this.ciudad = v;
  setTelefono = (v?: string) => this.telefono = v;
}
