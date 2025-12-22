// src/app/pages/perfil/perfil.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  // Define la variable que controlará la visibilidad
  // Inicialmente True para mostrar.
  mostrarBotonMembresia: boolean = true; 
  mostrarBotonReservas: boolean = true;
  
  constructor() { }

  ngOnInit(): void {
    // Aquí puedes establecer la lógica para cambiar estas variables si es necesario
    // Por ejemplo: if (usuario.esAdmin) { this.mostrarBotonMembresia = false; }
  }
}