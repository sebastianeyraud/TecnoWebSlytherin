import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  heroData$: Observable<any> | undefined;

  constructor() { }

  ngOnInit(): void {
    this.heroData$ = of({
      titulo: 'Wicked',
      subtitulo: 'Disfruta de tu pelicula',
      imagenFondo: 'linear-gradient(90deg, #501634 0%, #7d2252 100%)' 
    }).pipe(
      delay(2000) 
    );
  }

  pagar(): void {
    alert('Procesando pago seguro...');
  }
}