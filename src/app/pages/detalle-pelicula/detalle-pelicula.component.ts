import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent implements AfterViewInit {

  selectedTab: 'info' | 'horario' = 'info';

  selectTab(tab: 'info' | 'horario') {
    this.selectedTab = tab;
  }

  @ViewChild('actorTrack') actorTrack!: ElementRef<HTMLDivElement>;

  actores = [
    { nombre: 'CYNTHIA ERIVO',      foto: 'assets/ce.jpeg' },
    { nombre: 'JONATHAN BAILEY',    foto: 'assets/JB.jpeg' },
    { nombre: 'ARIANA GRANDE',      foto: 'assets/ag.jpeg' },
    { nombre: 'ETHAN SLATER',       foto: 'assets/es.jpeg' },
    { nombre: 'MICHELLE YEOH',      foto: 'assets/my.jpeg' },
    { nombre: 'MARISSA BODE',       foto: 'assets/mb.jpeg' },
    { nombre: 'JEFF GOLDBLUM',      foto: 'assets/jg.jpeg' },
    { nombre: 'BOWEN YANG',         foto: 'assets/by.jpeg' },
    { nombre: 'PETER DINKLAGE',     foto: 'assets/pd.jpeg' },
    { nombre: 'X1',     foto: 'assets/xd.jpeg' },
    { nombre: 'X2',     foto: 'assets/uwu.jpeg' },
  ];

  ngAfterViewInit(): void {
  }

  scrollActors(direction: number) {
    if (!this.actorTrack) return;

    const container = this.actorTrack.nativeElement;

    const firstCard = container.firstElementChild as HTMLElement | null;
    const step = firstCard ? firstCard.clientWidth + 12 : 140;

    container.scrollBy({
      left: direction * step * 3,
      behavior: 'smooth'
    });
  }
}
