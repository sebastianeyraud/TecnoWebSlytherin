import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PromocionI } from '../../models/interfaces/promocion-i';

@Component({
  selector: 'app-formulario-promocion',
  templateUrl: './formulario-promocion.component.html',
  styleUrls: ['./formulario-promocion.component.css']
})
export class FormularioPromocionComponent implements OnInit, OnChanges {

  @Input() promocion?: PromocionI;
  @Output() save = new EventEmitter<PromocionI>();
  @Output() close = new EventEmitter<void>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      nombre: ['', Validators.required],
      descripcion: [''],
      tipo: ['PORCENTAJE', Validators.required],
      valor: [0, Validators.required],
      activo: [true],
      aplicable_a: ['COMPRA', Validators.required]
    });
  }

  // 👇 ESTO ES LO QUE TE FALTABA
  ngOnChanges(changes: SimpleChanges): void {

    // si el form aún no existe, no hacemos nada
    if (!this.form) return;

    if (changes['promocion'] && this.promocion) {
      this.form.patchValue(this.promocion);
    }

    if (changes['promocion'] && !this.promocion) {
      this.form.reset({
        tipo: 'PORCENTAJE',
        activo: true,
        aplicable_a: 'COMPRA',
        valor: 0
      });
    }
  }


  submit() {
    if (this.form.invalid) return;

    this.save.emit({
      ...this.promocion,
      ...this.form.value
    });
  }
}