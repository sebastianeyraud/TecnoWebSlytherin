import { User } from "./user";

export class Admin implements User{
    nombre: string;
    email: string;
    password: string;
    rol: "usuario" | "admin"

    constructor(nombre:string,email:string,pw:string){
        this.nombre = nombre
        this.email = email
        this.password = pw
        this.rol = "admin"
    }
}
