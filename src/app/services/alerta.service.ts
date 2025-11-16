import { Injectable } from '@angular/core';
import { Alerta } from '../models/alerta.model';
import { TipoAlerta } from '../models/tipo-alerta';
import { Funcion } from '../models/funcion.model';
import { Promocion } from '../models/promocion.model';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor() { }

  alertNormal(
    titulo: string,
    mensaje: string,
    tipo: TipoAlerta.AVISO,
    dirigida_a: string
  ):void {
    this.send(new Alerta(titulo,mensaje,tipo,dirigida_a))
  }

  alertFuncion(funcion:Funcion):void {
    this.send(new Alerta(
      funcion.getPelicula().getTitulo(),
      'Estreno de '+funcion.getPelicula().getTitulo()+' día:'+funcion.getStartTime(),
      TipoAlerta.ESTRENO,
      'todos',
    ))
  }

  alertPromo(promo:Promocion):void{
    this.send(new Alerta(
      promo.getNombre(),
      'Nueva promoción: '+promo.getDescripcion(),
      TipoAlerta.PROMOCION,
      'todos',
    ))
  }

  send(alert: Alerta): boolean {
    try {
      // obtener usuarios
      const raw = localStorage.getItem('usuarios');
      const arr = raw ? JSON.parse(raw) : [];

      // recorrer y añadir alerta
      arr.forEach((u: any) => {
        if (!u.notificaciones) u.notificaciones = [];
        u.notificaciones.push(alert);
      });

      // guardar de vuelta
      localStorage.setItem('usuarios', JSON.stringify(arr));

      return true;
    } catch (e) {
      console.error('Error sending alert:', e);
      return false;
    }
  }

}