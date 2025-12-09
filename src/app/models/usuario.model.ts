import { User } from "./interfaces/user";
import { Membresia } from "./membresia";

export class Usuario implements User{
    nombre: string;
    email: string;
    password: string;
    rol: "usuario" | "admin";
    id: number;

    private apellido?: string
    private telefono?: string
    private membresia: Membresia
    private created_at: Date
    private historial: number[]
    private notificaciones: number[]

    constructor(email:string,password:string, id:number, nombre?: string){
        this.rol = "usuario"
        this.nombre = nombre ?? email.split('@')[0]
        this.email = email
        this.password = password
        this.membresia = Membresia.NONE

        this.created_at = new Date();
        this.historial = [];
        this.notificaciones = [];
        this.id=id;
    }


    toJSON() {
        return {
            nombre: this.nombre,
            email: this.email,
            rol: this.rol,
            apellido: this.apellido,
            telefono: this.telefono,
            membresia: this.membresia,
            createdAt: this.created_at.toISOString(),

            historial: this.historial,          // si Compra es serializable, esto funciona
            notificaciones: this.notificaciones // idem
        };
    }

    static fromJSON(obj: any): Usuario {
        const u = new Usuario(obj.email, "",obj.id); // password NO se guarda

        u.nombre = obj.nombre;
        u.rol = obj.rol || "usuario";
        u.apellido = obj.apellido;
        u.telefono = obj.telefono;
        u.membresia = obj.membresia ?? Membresia.NONE;

        u.created_at = obj.createdAt ? new Date(obj.createdAt) : new Date();

        // Recuperar listas
        u.historial = Array.isArray(obj.historial) ? obj.historial : [];
        u.notificaciones = Array.isArray(obj.notificaciones) ? obj.notificaciones : [];

        return u;
    }

    // ------ GETTERS ---------

    public getNombre(): string { return this.nombre; }
    public getEmail(): string { return this.email; }
    public getPassword(): string { return this.password; }
    public getRol(): "usuario" | "admin" { return this.rol; }

    public getApellido(): string | undefined { return this.apellido; }
    public getTelefono(): string | undefined { return this.telefono; }

    public getMembresia(): Membresia { return this.membresia; }

    public getCreatedAt(): Date { return this.created_at; }

    public getHistorial(): number[] { return this.historial; }
    public getNotificaciones(): number[] { return this.notificaciones; }

    // ----------- SETTERS -----------

    public setNombre(nombre: string): void { this.nombre = nombre; }
    public setEmail(email: string): void { this.email = email; }
    public setPassword(password: string): void { this.password = password; }
    public setRol(rol: "usuario" | "admin"): void { this.rol = rol; }
    public setApellido(apellido: string): void { this.apellido = apellido; }
    public setTelefono(telefono: string): void { this.telefono = telefono; }
    public setMembresia(m: Membresia): void { this.membresia = m; }

    // -------------------------------------------------
    public addCompra(c: number): void {
        this.historial.push(c);
    }

    public addAlerta(a: number): void {
        this.notificaciones.push(a);
    }
}
