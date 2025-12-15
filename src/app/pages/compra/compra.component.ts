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

  reservaSeleccionadaIds$ = new BehaviorSubject<number[]>([]);
  promoSeleccionadaId$ = new BehaviorSubject<number | null>(null);

  total$: Observable<number> = combineLatest([
    this.reservaSeleccionadaIds$,
    this.promoSeleccionadaId$
  ]).pipe(
    map(([reservaIds, promoId]) => {
      let subtotal = 0;

      reservaIds.forEach(id => {
        const r = this.reservas.find(res => res.id === id);
        if (r) subtotal += r.asientos_etiquetas.length * 100;
      });

      if (promoId) {
        const promo = this.promociones.find(p => p.id === promoId);
        if (promo?.activo) {
          if (promo.tipo === TipoPromocion.PORCENTAJE) {
            subtotal *= (1 - promo.valor / 100);
          } else {
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
    input.value = value.trim();
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
    this.reservas = reservasRaw ? JSON.parse(reservasRaw) : [];

    const promocionesRaw = localStorage.getItem('promociones');
    this.promociones = promocionesRaw ? JSON.parse(promocionesRaw) : [];
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
    if (!localStorage.getItem('reservas')) {
      localStorage.setItem('reservas', JSON.stringify([]));
    }
  }

  private initPromociones() {
    if (!localStorage.getItem('promociones')) {
      localStorage.setItem('promociones', JSON.stringify([]));
    }
  }

  async confirmarCompra() {
    if (this.reservaSeleccionadaIds.length === 0) {
      alert('Selecciona al menos una reserva');
      return;
    }

    alert('¡Compra confirmada! 🎉');
    this.reservaSeleccionadaIds = [];
    this.reservaSeleccionadaIds$.next([]);
    this.promoSeleccionadaId$.next(null);
  }
}
