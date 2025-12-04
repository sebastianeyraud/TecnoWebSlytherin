import { Injectable } from '@angular/core';
import { Alerta } from '../models/alerta.model';
import { TipoAlerta } from '../models/tipo-alerta';
import { Funcion } from '../models/funcion.model';
import { Promocion } from '../models/promocion.model';
import { Usuario } from '../models/usuario.model';
import { DataService } from './data.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor(private dataService: DataService) { }

  async send(alert: Alerta): Promise<boolean> {
    try {
      // Obtener usuarios desde backend
      const usuariosRaw = await firstValueFrom(this.dataService.getUsuarios());
      const usuarios: Usuario[] = usuariosRaw.map((u: any) => Usuario.fromJSON(u));

      // Añadir alerta a cada usuario
      for (const u of usuarios) {
        u.addAlerta(alert);
        // Guardar de vuelta usando PUT para no duplicar
        await firstValueFrom(this.dataService.updateUsuario(u.getEmail(), u.toJSON()));
      }

      return true;
    } catch (e) {
      console.error('Error sending alert:', e);
      return false;
    }
  }

  alertNormal(titulo: string, mensaje: string, tipo: TipoAlerta.AVISO, dirigida_a: string): void {
    const alerta = new Alerta(titulo, mensaje, tipo, dirigida_a);
    this.send(alerta);
  }

  alertFuncion(funcion: Funcion): void {
    const alerta = new Alerta(
      funcion.getPelicula().getTitulo(),
      'Estreno de ' + funcion.getPelicula().getTitulo() + ' día:' + funcion.getStartTime(),
      TipoAlerta.ESTRENO,
      'todos',
    );
    this.send(alerta);
  }

  alertPromo(promo: Promocion): void {
    const alerta = new Alerta(
      promo.getNombre(),
      'Nueva promoción: ' + promo.getDescripcion(),
      TipoAlerta.PROMOCION,
      'todos',
    );
    this.send(alerta);
  }

}