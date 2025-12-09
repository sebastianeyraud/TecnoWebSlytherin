import { Component, OnInit } from '@angular/core';
import { ReservaI } from 'src/app/models/interfaces/reserva-i';
import { EstadoReserva } from 'src/app/models/estado-reserva';
import { PromocionI } from 'src/app/models/interfaces/promocion-i';
import { AplicableA } from 'src/app/models/aplicable-a';
import { TipoPromocion } from 'src/app/models/tipo-promocion';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
/**
 * - sacar de localstorage y mostrar v
 * - seleccionar v
 * - calcular precio (Observable) v
 * - confirmar compra v
 * - crear boleta/boleto v
 * - guardar compra con boleto/boleta en historial de usuario
 * - *compra no hecha, cuidao al cerrar
 */
export class CompraComponent implements OnInit{

  constructor(private auth: AuthService,
    private UsuarioService: UsuarioService
  ){}

  reservas: ReservaI[] = [];
  promociones: PromocionI[] = [];

  // Para seleccionar reservas y promociones
  reservaSeleccionadaIds: number[] = []; // array de IDs de reservas seleccionadas
  promoSeleccionadaId?: number;          // ID de la promoción seleccionada

  private reservaSeleccionadaIds$ = new BehaviorSubject<number[]>([]);
  private promoSeleccionadaId$ = new BehaviorSubject<number | null>(null);

  total$: Observable<number> = combineLatest([
    this.reservaSeleccionadaIds$,
    this.promoSeleccionadaId$
  ]).pipe(
    map(([reservaIds, promoId]) => {
      let subtotal = 0;

      // Sumar precio de reservas (ejemplo: 100 por reserva)
      reservaIds.forEach(id => {
        const r = this.reservas.find(res => res.id === id);
        if (r) {
          subtotal += r.asientos_etiquetas.length * 100; // precio por asiento
        }
      });

      // Aplicar promoción si existe
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

      return subtotal;
    })
  );

  ngOnInit(): void {
    this.initReservas();
    this.initPromociones();

    // Cargar desde localStorage
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
  }

  onPromoChange(id: number) {
    this.promoSeleccionadaId$.next(id);
  }


  private initReservas() {
    const reservasKey = 'reservas';
    if (!localStorage.getItem(reservasKey)) {
      const reservasSeed: ReservaI[] = [
        {
          id: 1,
          funcion_id: 101,
          asientos_etiquetas: ['A1', 'A2'],
          created_at: new Date(),
          expires_at: new Date(Date.now() + 1000 * 60 * 15), // expira en 15 min
          status: EstadoReserva.ACTIVA,
        },
        {
          id: 2,
          funcion_id: 102,
          asientos_etiquetas: ['B3', 'B4', 'B5'],
          created_at: new Date(),
          expires_at: new Date(Date.now() + 1000 * 60 * 20),
          status: EstadoReserva.CONFIRMADA,
        },
      ];
      localStorage.setItem(reservasKey, JSON.stringify(reservasSeed));
      console.log('Reservas de prueba creadas en localStorage');
    }
  }

  private initPromociones() {
    const promocionesKey = 'promociones';
    if (!localStorage.getItem(promocionesKey)) {
      const promocionesSeed: PromocionI[] = [
        {
          id: 1,
          codigo: 'PROMO10',
          nombre: 'Descuento 10%',
          descripcion: '10% de descuento en todas las películas',
          tipo: TipoPromocion.PORCENTAJE,
          valor: 10,
          aplicable_a: AplicableA.COMPRA,
          fecha_inicio: new Date(),
          fecha_fin: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 días
          activo: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 2,
          codigo: 'PROMO5',
          nombre: 'Descuento $5',
          descripcion: '$5 de descuento en entradas VIP',
          tipo: TipoPromocion.MONTO,
          valor: 5,
          aplicable_a: AplicableA.BOLETO,
          fecha_inicio: new Date(),
          fecha_fin: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15), // 15 días
          activo: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ];
      localStorage.setItem(promocionesKey, JSON.stringify(promocionesSeed));
      console.log('Promociones de prueba creadas en localStorage');
    }
  }

  async confirmarCompra() {
    const usuarioActual = this.auth.getCurrentUser();
    if (!usuarioActual) {
      alert('No se encontró el usuario logueado.');
      return;
    }

    const usuarioId = usuarioActual.id; // ahora tienes el id numérico

    // Validar reservas seleccionadas
    if (this.reservaSeleccionadaIds$.getValue().length === 0) {
      alert('Debe seleccionar al menos una reserva');
      return;
    }

    let subtotal = 0;
    const boletos: BoletoI[] = [];

    // Generar boletos y subtotal
    this.reservaSeleccionadaIds$.getValue().forEach(reservaId => {
      const reserva = this.reservas.find(r => r.id === reservaId);
      if (!reserva) return;

      const precioPorAsiento = 100;
      subtotal += precioPorAsiento * reserva.asientos_etiquetas.length;

      const boleto: BoletoI = {
        id: Date.now() + Math.random(),
        compra_id: '', // se asignará luego
        funcion_id: reserva.funcion_id,
        asiento_id: reserva.asientos_etiquetas.map(a => parseInt(a.replace(/\D/g, ''))),
        usuario_id: usuarioId,
        precio: precioPorAsiento,
        promocion_id: this.promoSeleccionadaId$.getValue() ? [this.promoSeleccionadaId$.getValue()!] : [],
        estado: EstadoBoleto.EMITIDO,
        fecha_emision: new Date(),
      };

      boletos.push(boleto);
    });

    const impuestos = subtotal * 0.19;
    let total = subtotal + impuestos;

    const promoId = this.promoSeleccionadaId$.getValue();
    const promocionesAplicadas: number[] = [];
    if (promoId) {
      const promo = this.promociones.find(p => p.id === promoId);
      if (promo && promo.activo) {
        promocionesAplicadas.push(promo.id);
        if (promo.tipo === TipoPromocion.PORCENTAJE) {
          total *= (1 - promo.valor / 100);
        } else if (promo.tipo === TipoPromocion.MONTO) {
          total -= promo.valor;
        }
      }
    }

    // Crear compra
    const compra: CompraI = {
      id: Date.now(),
      reserva: this.reservaSeleccionadaIds$.getValue(),
      subtotal,
      impuestos,
      total,
      promociones_aplicadas: promocionesAplicadas,
      estado: EstadoCompra.COMPLETADA,
      created_at: new Date(),
    };

    // Asociar compra_id a cada boleto
    boletos.forEach(b => (b.compra_id = compra.id.toString()));

    // Guardar en usuario
    const usuarioService = new UsuarioService(this.auth['dbService']); // inyecta IndexedDBService
    const usuario = await usuarioService.getById(usuarioId);

    if (!usuario) {
      alert('Usuario no encontrado en DB');
      return;
    }

    // Asegurarse que existan los arrays
    if (!usuario.compras) usuario.compras = [];
    if (!usuario.boletos) usuario.boletos = [];

    usuario.compras.push(compra);
    usuario.boletos.push(...boletos);

    await usuarioService.update(usuario);

    alert(`Compra confirmada! Total: ${total.toFixed(2)}`);

    // Limpiar selección
    this.reservaSeleccionadaIds$.next([]);
    this.promoSeleccionadaId$.next(null);
  }

}