import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Pelicula } from 'src/app/models/pelicula.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css'],

})
export class DetallePeliculaComponent implements AfterViewInit {

  pelicula!: Pelicula;
  trailerPlaying = false;
  trailerUrl!: SafeResourceUrl;
  funcionesAgrupadas: any[] = [];

  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
    private dataService: DataService,
    private sanitizer: DomSanitizer) {}

  selectedTab: 'info' | 'horario' = 'info';
  isFavorite = false;
  selectTab(tab: 'info' | 'horario') {
    this.selectedTab = tab;
  }
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }
  @ViewChild('actorTrack') actorTrack!: ElementRef<HTMLDivElement>;

  ngOnInit() {
    const titulo = decodeURIComponent(this.route.snapshot.paramMap.get('titulo')!);

    this.dataService.getPeliculas().subscribe(pelis => {
      const raw = pelis.find(p => p.titulo === titulo);
      if (raw) {
        this.pelicula = Pelicula.fromJSON(raw);
        this.agruparFunciones();
      } else {
        console.warn('No se encontró la película:', titulo);
      }
    });
  }


  get actores() {
    return this.pelicula?.getCasting() ?? [];
  }

  ngAfterViewInit(): void {}

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

  playTrailer() {
    const url = this.pelicula.getTrailer() + "?autoplay=1";

    this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.trailerPlaying = true;
  }

  agruparFunciones() {
  const mapa = new Map<string, any>();

  for (const f of this.pelicula.getFunciones()) {

    const salaNombre = f.getSala().getNombre();
    const formato = f.getFormato();

    if (!mapa.has(salaNombre)) {
      mapa.set(salaNombre, {
        sala: salaNombre,
        funciones: [],
        formatos: new Set()
      });
    }

    const grupo = mapa.get(salaNombre);
    grupo.funciones.push(f);
    grupo.formatos.add(formato);
  }

  this.funcionesAgrupadas = Array.from(mapa.values())
    .map(g => ({
      ...g,
      formatos: Array.from(g.formatos)
    }));
}}