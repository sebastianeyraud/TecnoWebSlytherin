import { User } from "./user";
import { Membresia } from "./membresia";

export class Usuario implements User{
    nombre: string;
    email: string;
    password: string;
    rol: "usuario" | "admin";

    private apellido?: string
    private telefono?: string
    private membresia: Membresia
    private created_at: Date

    constructor(email:string,password:string){
        this.rol = "usuario"
        this.nombre = email.split('@')[0]
        this.email = email
        this.password = password
        this.membresia = Membresia.NONE

        this.created_at = new Date();
    }

    // ------ GETTERS ---------

    public getNombre(): string {
        return this.nombre;
    }

    public getEmail(): string {
        return this.email;
    }

    public getPassword(): string {
        return this.password;
    }

    public getRol(): string {
        return this.rol;
    }

    public getApellido(): string | undefined{
        return this.apellido;
    }

    public getTelefono(): string | undefined{
        return this.telefono;
    }

    public getMembresia(): Membresia {
        return this.membresia;
    }

    public getCreatedAt(): Date {
        return this.created_at;
    }

    // ----------- SETTERS -----------

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public setRol(rol: "usuario" | "admin"): void {
        this.rol = rol;
    }

    public setApellido(apellido: string): void {
        this.apellido = apellido;
    }

    public setTelefono(telefono: string): void {
        this.telefono = telefono;
    }

    public setMembresia(membresia: Membresia): void {
        this.membresia = membresia;
    }
}
