import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asientos',
  templateUrl: './asientos.component.html',
  styleUrls: ['./asientos.component.css']
})
export class AsientosComponent implements OnInit {

  // --- 1. DATOS DE PELÍCULAS ---
  peliculas = [
    { nombre: 'Avengers: Endgame', precio: 10 },
    { nombre: 'Joker', precio: 12 },
    { nombre: 'Toy Story 4', precio: 8 },
    { nombre: 'The Lion King', precio: 9 }
  ];

  // Película seleccionada por defecto (la primera)
  peliculaSeleccionada = this.peliculas[0];

  // --- 2. DATOS DE ASIENTOS ---
  // Aquí guardaremos las filas generadas dinámicamente
  filas: any[] = [];

  // Variables para el resumen
  cantidadSeleccionada: number = 0;
  totalPagar: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.generarAsientos();
    // (Opcional) Ocupamos algunos al azar para probar
    this.ocuparAsientosAleatorios();
    this.actualizarTotales();
  }

  // Genera 6 filas (A-F) con 8 asientos cada una
  generarAsientos() {
    const letras = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    this.filas = letras.map(letra => {
      return {
        letra: letra,
        asientos: Array(8).fill(0).map((_, i) => ({
          id: `${letra}${i + 1}`, // Ej: A1, A2
          estado: 'libre' // Estados: 'libre', 'seleccionado', 'ocupado'
        }))
      };
    });
  }

  // Simula asientos ocupados (puedes borrar esto si los traes de BD)
  ocuparAsientosAleatorios() {
    this.filas.forEach(fila => {
      fila.asientos.forEach((asiento: any) => {
        if (Math.random() < 0.2) { // 20% de probabilidad de estar ocupado
          asiento.estado = 'ocupado';
        }
      });
    });
  }

  // --- EVENTOS ---

  // Cuando cambia el select de película
  onCambioPelicula(event: any) {
    const precio = Number(event.target.value);
    const peli = this.peliculas.find(p => p.precio === precio);
    if (peli) {
      this.peliculaSeleccionada = peli;
      this.actualizarTotales();
    }
  }

  // Cuando haces clic en un asiento
  toggleAsiento(asiento: any) {
    if (asiento.estado === 'ocupado') return;

    if (asiento.estado === 'libre') {
      asiento.estado = 'seleccionado';
    } else {
      asiento.estado = 'libre';
    }
    this.actualizarTotales();
  }

  // Calcula totales
  actualizarTotales() {
    let contador = 0;
    this.filas.forEach(fila => {
      contador += fila.asientos.filter((a: any) => a.estado === 'seleccionado').length;
    });

    this.cantidadSeleccionada = contador;
    this.totalPagar = contador * this.peliculaSeleccionada.precio;
  }
}