import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/interfaces/user';

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
    if (
      !this.registroData.nombre ||
      !this.registroData.email ||
      !this.registroData.confirmEmail ||
      !this.registroData.password ||
      !this.registroData.confirmPassword
    ) {
      this.registroError = 'Todos los campos son obligatorios.';
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.registroData.email)) {
      this.registroError = 'El email no tiene un formato válido.';
      return;
    }

    if (this.registroData.email !== this.registroData.confirmEmail) {
      this.registroError = 'Los correos electrónicos no coinciden.';
      return;
    }

    // Validar contraseña mínima de 8 caracteres
    if (this.registroData.password.length < 8) {
      this.registroError = 'La contraseña debe tener al menos 8 caracteres.';
      return;
    }

    if (this.registroData.password !== this.registroData.confirmPassword) {
      this.registroError = 'Las contraseñas no coinciden.';
      return;
    }

    try {
      // Pasamos solo los datos mínimos al AuthService
      const nuevoUsuario: Omit<User, 'id'> = {
        nombre: this.registroData.nombre,
        email: this.registroData.email,
        password: this.registroData.password,
        rol: 'usuario'
      };

      // AuthService genera id y crea perfil en IndexedDB
      await this.authService.registrar(nuevoUsuario as User);

      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      this.router.navigate(['/login']);

    } catch (error: any) {
      this.registroError = error.message || 'Error en el registro.';
    }
  }
}