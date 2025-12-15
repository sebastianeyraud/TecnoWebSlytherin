import { User } from "./interfaces/user";
import { AdminI } from "./interfaces/admin-i";

export class Admin implements User, AdminI{
    id: number;
    nombre: string;
    email: string;
    password: string;
    rol: "usuario" | "admin"

    constructor(nombre:string,email:string,pw:string,id:number){
        this.nombre = nombre
        this.email = email
        this.password = pw
        this.rol = "admin"
        this.id=id
    }
}
