import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router para la navegación

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'] // Asegúrate de que este sea el nombre correcto de tu archivo CSS/SCSS
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

  constructor(private router: Router) { } // Inyecta el Router

  onSubmit() {
    this.registroError = ''; // Limpiar errores anteriores

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

    // Aquí iría la lógica para enviar los datos al backend
    console.log('Datos de registro:', this.registroData);

    // Si el registro es exitoso, podrías redirigir al usuario al login o a una página de bienvenida
    // Por ahora, simulamos un registro exitoso y redirigimos a /login
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    this.router.navigate(['/login']); // Redirige al usuario a la página de login
  }
}