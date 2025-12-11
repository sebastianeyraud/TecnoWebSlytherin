import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReservaI } from 'src/app/models/interfaces/reserva-i';
import { EstadoReserva } from 'src/app/models/estado-reserva';
import { PromocionI } from 'src/app/models/interfaces/promocion-i';
import { AplicableA } from 'src/app/models/aplicable-a';
import { TipoPromocion } from 'src/app/models/tipo-promocion';
import { EstadoCompra } from 'src/app/models/estado-compra';
import { CompraI } from 'src/app/models/interfaces/compra-i';
import { BoletoI } from 'src/app/models/interfaces/boleto-i';
import { EstadoBoleto } from 'src/app/models/estado-boleto';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  reservas: ReservaI[] = [];
  promociones: PromocionI[] = [];

  reservaSeleccionadaIds: number[] = [];
  promoSeleccionadaId?: number;

  public reservaSeleccionadaIds$ = new BehaviorSubject<number[]>([]);
  public promoSeleccionadaId$ = new BehaviorSubject<number | null>(null);

  total$: Observable<number> = combineLatest([
    this.reservaSeleccionadaIds$,
    this.promoSeleccionadaId$
  ]).pipe(
    map(([reservaIds, promoId]) => {
      let subtotal = 0;

      reservaIds.forEach(id => {
        const r = this.reservas.find(res => res.id === id);
        if (r) {
          subtotal += r.asientos_etiquetas.length * 100;
        }
      });

      if (promoId) {
        const promo = this.promociones.find(p => p.id === promoId);
        if (promo && promo.activo) {
          if (promo.tipo === TipoPromocion.PORCENTAJE) {
            subtotal *= (1 - promo.valor / 100);
          } else if (promo.tipo === TipoPromocion.MONTO) {
            subtotal -= promo.valor;
          }
        }
      }
      return Math.max(0, subtotal);
    })
  );

  constructor(
    private auth: AuthService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.initReservas();
    this.initPromociones();
    this.cargarDatosLocalStorage();
  }

  formatoTarjeta(event: any) {
    const input = event.target;
    let value = input.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    input.value = value;
  }

  formatoFecha(event: any) {
    const input = event.target;
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
  }

  cargarDatosLocalStorage() {
    const reservasRaw = localStorage.getItem('reservas');
    this.reservas = reservasRaw
      ? JSON.parse(reservasRaw).map((r: any) => ({
          ...r,
          created_at: new Date(r.created_at),
          expires_at: new Date(r.expires_at),
        }))
      : [];

    const promocionesRaw = localStorage.getItem('promociones');
    this.promociones = promocionesRaw
      ? JSON.parse(promocionesRaw).map((p: any) => ({
          ...p,
          fecha_inicio: new Date(p.fecha_inicio),
          fecha_fin: new Date(p.fecha_fin),
          created_at: new Date(p.created_at),
          updated_at: new Date(p.updated_at),
        }))
      : [];
  }

  onReservaChange(reserva: ReservaI, event: any) {
    let current = this.reservaSeleccionadaIds$.getValue();
    if (event.target.checked) {
      if (!current.includes(reserva.id)) current.push(reserva.id);
    } else {
      current = current.filter(id => id !== reserva.id);
    }
    this.reservaSeleccionadaIds$.next([...current]);
    this.reservaSeleccionadaIds = [...current];
  }

  onPromoChange(id: number) {
    if (this.promoSeleccionadaId$.getValue() === id) {
      this.promoSeleccionadaId$.next(null);
      this.promoSeleccionadaId = undefined;
    } else {
      this.promoSeleccionadaId$.next(id);
      this.promoSeleccionadaId = id;
    }
  }

  private initReservas() {
    const reservasKey = 'reservas';
    if (!localStorage.getItem(reservasKey)) {
      const reservasSeed: ReservaI[] = [
        {
          id: 1, funcion_id: 101, asientos_etiquetas: ['A1', 'A2'],
          created_at: new Date(), expires_at: new Date(Date.now() + 1000 * 60 * 15),
          status: EstadoReserva.ACTIVA,
        },
        {
          id: 2, funcion_id: 102, asientos_etiquetas: ['B3', 'B4', 'B5'],
          created_at: new Date(), expires_at: new Date(Date.now() + 1000 * 60 * 20),
          status: EstadoReserva.CONFIRMADA,
        },
      ];
      localStorage.setItem(reservasKey, JSON.stringify(reservasSeed));
    }
  }

  private initPromociones() {
    const promocionesKey = 'promociones';
    if (!localStorage.getItem(promocionesKey)) {
      const promocionesSeed: PromocionI[] = [
        {
          id: 1, codigo: 'PROMO10', nombre: 'Descuento 10%', descripcion: '10% OFF en todo',
          tipo: TipoPromocion.PORCENTAJE, valor: 10, aplicable_a: AplicableA.COMPRA,
          fecha_inicio: new Date(), fecha_fin: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
          activo: true, created_at: new Date(), updated_at: new Date(),
        },
        {
          id: 2, codigo: 'VIP5', nombre: 'Descuento $5', descripcion: '$5 OFF VIP',
          tipo: TipoPromocion.MONTO, valor: 5, aplicable_a: AplicableA.BOLETO,
          fecha_inicio: new Date(), fecha_fin: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
          activo: true, created_at: new Date(), updated_at: new Date(),
        },
      ];
      localStorage.setItem(promocionesKey, JSON.stringify(promocionesSeed));
    }
  }

  async confirmarCompra() {
    const usuarioActual = this.auth.getCurrentUser();
    if (!usuarioActual) {
      alert('No se encontró el usuario logueado.');
      return;
    }

    const usuarioId = usuarioActual.id;

    if (usuarioActual.role !== 'admin') {
      const usuarioPerfil = await this.usuarioService.getById(usuarioId);
      if (!usuarioPerfil) {
        alert('Usuario no encontrado en la base de datos.');
        return;
      }
    }

    if (this.reservaSeleccionadaIds$.getValue().length === 0) {
      alert('Debe seleccionar al menos una reserva para continuar.');
      return;
    }

    let subtotal = 0;
    const boletos: BoletoI[] = [];
    const boletosIds: number[] = [];

    this.reservaSeleccionadaIds$.getValue().forEach(reservaId => {
      const reserva = this.reservas.find(r => r.id === reservaId);
      if (!reserva) return;

      const precioPorAsiento = 100;
      subtotal += precioPorAsiento * reserva.asientos_etiquetas.length;

      const boletoId = Date.now() + Math.floor(Math.random() * 10000);

      const boleto: BoletoI = {
        id: boletoId,
        compra_id: 0,
        funcion_id: reserva.funcion_id,
        asiento_id: reserva.asientos_etiquetas.map(a => parseInt(a.replace(/\D/g, '')) || 0),
        usuario_id: usuarioId,
        precio: precioPorAsiento,
        promocion_id: this.promoSeleccionadaId$.getValue() ? [this.promoSeleccionadaId$.getValue()!] : [],
        estado: EstadoBoleto.EMITIDO,
        fecha_emision: new Date()
      };

      boletos.push(boleto);
      boletosIds.push(boletoId);
    });

    const impuestos = subtotal * 0.19;
    let total = subtotal + impuestos;

    const promoId = this.promoSeleccionadaId$.getValue();
    const promocionesAplicadas: number[] = [];

    if (promoId) {
      const promo = this.promociones.find(p => p.id === promoId);
      if (promo && promo.activo) {
        promocionesAplicadas.push(promo.id);
        if (promo.tipo === TipoPromocion.PORCENTAJE) total *= (1 - promo.valor / 100);
        else if (promo.tipo === TipoPromocion.MONTO) total -= promo.valor;
      }
    }

    const compraId = Date.now();
    const compra: CompraI = {
      id: compraId,
      reserva: this.reservaSeleccionadaIds$.getValue(),
      subtotal,
      impuestos,
      total,
      promociones_aplicadas: promocionesAplicadas,
      estado: EstadoCompra.COMPLETADA,
      created_at: new Date(),
      boletos: boletosIds
    };

    boletos.forEach(b => b.compra_id = compraId);

    const usuario = await this.usuarioService.getById(usuarioId);
    if (usuario) {
      if (!usuario.historial) usuario.historial = [];
      usuario.historial.push(compraId);
      await this.usuarioService.update(usuario);
    }

    alert(`¡Compra confirmada!\nTotal final: $${total.toFixed(2)}`);

    this.reservaSeleccionadaIds$.next([]);
    this.promoSeleccionadaId$.next(null);
    this.reservaSeleccionadaIds = [];
    this.promoSeleccionadaId = undefined;
  }
}
