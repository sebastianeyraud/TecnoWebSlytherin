import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Usuario } from 'src/app/models/usuario.model'; // tu modelo de Usuario

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  registroData = {
    nombre: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
  };

  registroError: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  async onSubmit() {
    this.registroError = '';

    // Validaciones básicas
    if (!this.registroData.nombre || !this.registroData.email || !this.registroData.confirmEmail || !this.registroData.password || !this.registroData.confirmPassword) {
      this.registroError = 'Todos los campos son obligatorios.';
      return;
    }

    if (this.registroData.email !== this.registroData.confirmEmail) {
      this.registroError = 'Los correos electrónicos no coinciden.';
      return;
    }

    if (this.registroData.password !== this.registroData.confirmPassword) {
      this.registroError = 'Las contraseñas no coinciden.';
      return;
    }

    try {
      // Crear instancia de Usuario usando tu modelo
      const nuevoUsuario = new Usuario(
        this.registroData.nombre,
        this.registroData.email,
        this.registroData.password
      );

      // Guardar en backend usando AuthService
      await this.authService.registrar(nuevoUsuario);

      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      this.router.navigate(['/login']);
    } catch (error: any) {
      this.registroError = error.message || 'Error en el registro.';
    }
  }
}
