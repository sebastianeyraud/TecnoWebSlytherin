import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  // Usamos 'template' en línea en vez de 'templateUrl' para evitar errores de archivo no encontrado
  template: '<p>Componente Usuario (Desactivado)</p>',
  // Usamos 'styles' vacío para no depender de un CSS
  styles: []
})
export class UsuarioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}