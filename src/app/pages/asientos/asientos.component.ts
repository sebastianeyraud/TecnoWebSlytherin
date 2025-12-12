import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-asientos',
  templateUrl: './asientos.component.html',
  styleUrls: ['./asientos.component.css']
})
export class AsientosComponent implements OnInit, OnDestroy {

  peliculas = [
    { nombre: 'Avengers: Endgame', precio: 10 },
    { nombre: 'Joker', precio: 12 },
    { nombre: 'Toy Story 4', precio: 8 },
    { nombre: 'The Lion King', precio: 9 }
  ];

  peliculaSeleccionada = this.peliculas[0];
  filas: any[] = [];
  cantidad: number = 0;
  total: number = 0;

  peliculaTitulo: string = '';
  sala: string = '';
  hora: string = '';

  // 🔥 TEMPORIZADOR
  timer: number = 120; // 2 minutos
  interval: any;
  tiempoExpirado: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.peliculaTitulo = this.route.snapshot.paramMap.get('titulo') || '';
    this.sala = this.route.snapshot.queryParamMap.get('sala') || '';
    this.hora = this.route.snapshot.queryParamMap.get('hora') || '';

    this.generarAsientos();
    this.simularEstados(); 
    this.actualizarTotales();

    this.iniciarTemporizador(); // 🔥 inicia cuenta regresiva
  }

  iniciarTemporizador() {
    this.interval = setInterval(() => {
      this.timer--;

      if (this.timer <= 0) {
        clearInterval(this.interval);
        this.tiempoExpirado = true;

        setTimeout(() => {
          this.router.navigate(['/detalle-pelicula']);
        }, 2000);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  generarAsientos() {
    const letras = ['A','B','C','D','E','F','G','H']; 
    const columnas = 12;

    this.filas = letras.map(letra => {
      return {
        letra: letra,
        asientos: Array(columnas).fill(0).map((_, i) => ({
          id: `${letra}${i + 1}`,
          ocupado: false,
          seleccionado: false,
          discapacitado: false
        }))
      };
    });
  }

  simularEstados() {
    const fijosDiscapacitados = ['A4', 'A5', 'A6', 'A7', 'A8', 'A9'];

    this.filas.forEach(fila => {
      fila.asientos.forEach((asiento: any) => {
        if (fijosDiscapacitados.includes(asiento.id)) {
          asiento.discapacitado = true;
          return; 
        }
        if (Math.random() < 0.15) { 
          asiento.ocupado = true;
        }
      });
    });
  }

  cambiarPelicula(e: any) {
    const precio = +e.target.value;
    this.peliculaSeleccionada = this.peliculas.find(p => p.precio === precio) || this.peliculas[0];
    this.actualizarTotales();
  }

  seleccionarAsiento(asiento: any) {
    if (asiento.ocupado) return;
    
    asiento.seleccionado = !asiento.seleccionado;
    this.actualizarTotales();
  }

  actualizarTotales() {
    let contador = 0;
    this.filas.forEach(fila => {
      contador += fila.asientos.filter((a: any) => a.seleccionado).length;
    });
    this.cantidad = contador;
    this.total = contador * this.peliculaSeleccionada.precio;
  }
}
