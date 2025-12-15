import { Injectable } from '@angular/core';
import { AlertaI } from '../models/interfaces/alerta-i';
import { TipoAlerta } from '../models/tipo-alerta';
import { FuncionI } from '../models/interfaces/funcion-i';
import { PromocionI } from '../models/interfaces/promocion-i';
import { IndexedDBService } from './indexed-db.service';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor(private indexedDB: IndexedDBService) {}

  // =========================
  // Enviar alerta a todos los usuarios
  // =========================
  async send(alert: AlertaI): Promise<boolean> {
    try {
      await this.indexedDB.dbReady;

      // Guardamos la alerta en 'alertas'
      const storeAlertas = this.indexedDB.getStore('alertas', 'readwrite');
      const id = Date.now(); // id único simple
      const alertaConId: AlertaI = { ...alert, id };
      storeAlertas.add(alertaConId);

      // Añadimos el id de la alerta a cada usuario
      const storeUsuarios = this.indexedDB.getStore('usuarios_perfil', 'readwrite');
      const request = storeUsuarios.openCursor();
      return new Promise((resolve, reject) => {
        request.onsuccess = (event: any) => {
          const cursor = event.target.result;
          if (cursor) {
            const user = cursor.value;
            user.notificaciones = user.notificaciones || [];
            user.notificaciones.push(id);
            cursor.update(user).onsuccess = () => cursor.continue();
          } else {
            resolve(true);
          }
        };
        request.onerror = (e) => reject(e);
      });

    } catch (e) {
      console.error('Error enviando alerta:', e);
      return false;
    }
  }

  // =========================
  // Alertas predefinidas
  // =========================
  alertNormal(titulo: string, mensaje: string, tipo: TipoAlerta, dirigida_a: string): void {
    const alerta: AlertaI = {
      id: Date.now(),
      created_at: new Date(),
      titulo: titulo,
      mensaje: mensaje,
      tipo: tipo,
      dirigida_a: dirigida_a
    };

    this.send(alerta);
  }

  alertFuncion(funcion: FuncionI & { pelicula?: { titulo: string } }): void {
    const tituloPelicula = funcion.pelicula?.titulo ?? 'Película';
    const alerta: AlertaI = {
      id: Date.now(),               // id único
      created_at: new Date(),       // fecha actual
      titulo: tituloPelicula,       // título de la alerta
      mensaje: `Estreno de ${tituloPelicula} día: ${new Date(funcion.start_time).toLocaleString()}`,
      tipo: TipoAlerta.ESTRENO,
      dirigida_a: 'todos'
    };

    this.send(alerta);
  }

  alertPromo(promo: PromocionI & { nombre: string; descripcion: string }): void {
    const alerta: AlertaI = {
      id: Date.now(),                  // id único
      created_at: new Date(),          // fecha de creación
      titulo: promo.nombre,            // título de la alerta
      mensaje: `Nueva promoción: ${promo.descripcion}`,  // mensaje
      tipo: TipoAlerta.PROMOCION,     // tipo de alerta
      dirigida_a: 'todos'              // destinatarios
    };

    this.send(alerta);
  }
}