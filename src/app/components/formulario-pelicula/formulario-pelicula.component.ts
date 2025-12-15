import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PeliculaI } from 'src/app/models/interfaces/pelicula-i';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})

export class PeliculaFormComponent {
  @Input() pelicula?: PeliculaI; // si viene, es edición
  @Input() visible: boolean = false; // controlar visibilidad
  @Output() save = new EventEmitter<PeliculaI>();
  @Output() close = new EventEmitter<void>();

  formData: Partial<PeliculaI> = {};

  ngOnChanges(): void {
    // inicializar formData con los valores de la película si existe
    this.formData = this.pelicula ? { ...this.pelicula } : {};
  }

  onSubmit() {
    if (!this.formData.titulo) {
      alert('El título es obligatorio');
      return;
    }

    // completar campos mínimos si se agrega
    const peliculaFinal: PeliculaI = {
      id: this.formData.id || Date.now(),
      titulo: this.formData.titulo!,
      sinopsis: this.formData.sinopsis || '',
      duracion_min: this.formData.duracion_min || 0,
      genero: this.formData.genero || '',
      clasificacion: this.formData.clasificacion || '',
      poster_url: this.formData.poster_url || '',
      banner: this.formData.banner || '',
      trailer: this.formData.trailer || '',
      estreno: this.formData.estreno || new Date(),
      casting: this.formData.casting || [],
      funciones: this.formData.funciones || [],
      created_at: this.formData.created_at || new Date(),
    };

    this.save.emit(peliculaFinal);
  }

  onClose() {
    this.close.emit();
  }
}
