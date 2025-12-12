import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PeliculaService } from 'src/app/services/pelicula.service';
import { ActorService } from 'src/app/services/actor.service';
import { FuncionService } from 'src/app/services/funcion.service';
import { PeliculaI } from 'src/app/models/interfaces/pelicula-i';
import { Actor } from 'src/app/models/interfaces/actor';
import { FuncionI } from 'src/app/models/interfaces/funcion-i';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.css']
})
export class DetallePeliculaComponent implements OnInit, AfterViewInit {

  pelicula!: PeliculaI;
  actores: Actor[] = [];
  funciones: FuncionI[] = [];
  trailerUrl!: SafeResourceUrl;
  funcionesAgrupadas: any[] = [];
  diasDisponibles: string[] = [];
  trailerPlaying = false;
  cargando = true;
  showForm: boolean = false;

  selectedTab: 'info' | 'horario' = 'info';
  peliculas: PeliculaI[] = [];
  private subscription!: Subscription;

  @ViewChild('actorTrack') actorTrack!: ElementRef<HTMLDivElement>;

  constructor(
    private route: ActivatedRoute,
    private peliculaService: PeliculaService,
    private actorService: ActorService,
    private funcionService: FuncionService,
    private sanitizer: DomSanitizer,
    public auth: AuthService
  ) {}

  ngOnInit() {
    const titulo = decodeURIComponent(this.route.snapshot.paramMap.get('titulo')!);

    this.subscription = this.peliculaService.peliculas$.subscribe(pelis => {
      if (!pelis.length) return; 

      this.peliculas = pelis;
      const raw = pelis.find(p => p.titulo === titulo);

      if (!raw) {
        console.warn('No se encontró la película:', titulo);
        this.cargando = false;
        return;
      }

      this.pelicula = raw;
      this.loadActoresYFunciones();
    });

    this.peliculaService.getAll(); // carga async desde IndexedDB
  }


  ngAfterViewInit(): void {}

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private async loadActoresYFunciones() {
    const [allActores, allFunciones] = await Promise.all([
      this.actorService.getAll(),
      this.funcionService.getAll()
    ]);

    this.actores = (this.pelicula.casting ?? [])
      .map(id => allActores.find(a => a.id === id))
      .filter(a => a != null) as Actor[];

    this.funciones = (this.pelicula.funciones ?? [])
      .map(id => allFunciones.find(f => f.id === id))
      .filter(f => f != null) as FuncionI[];

    const diasSet = new Set<string>();
    this.funciones.forEach(f => {
      const dia = new Date(f.start_time).toLocaleDateString('es-ES', { weekday: 'long' });
      diasSet.add(dia.charAt(0).toUpperCase() + dia.slice(1));
    });
    this.diasDisponibles = Array.from(diasSet);

    const salasMap: Record<number, any> = {};
    this.funciones.forEach(f => {
      if (!salasMap[f.sala]) {
        salasMap[f.sala] = { sala: f.sala, funciones: [], formatos: new Set<string>() };
      }
      salasMap[f.sala].funciones.push(f);
      salasMap[f.sala].formatos.add(f.formato);
    });

    this.funcionesAgrupadas = Object.values(salasMap).map(grupo => ({
      ...grupo,
      formatos: Array.from(grupo.formatos)
    }));

    this.cargando = false;
  }

  playTrailer() {
    if (!this.pelicula.trailer) return;
    this.trailerUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.pelicula.trailer + '?autoplay=1');
    this.trailerPlaying = true;
  }

  selectTab(tab: 'info' | 'horario') {
    this.selectedTab = tab;
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

  isFavorite = false;
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
  }

  editarPelicula(p: PeliculaI) {
    this.pelicula = { ...p };
    this.showForm = true;
  }

  async onSavePelicula(pelicula: PeliculaI) {
    await this.peliculaService.update(pelicula);
    this.showForm = false;
  }
}