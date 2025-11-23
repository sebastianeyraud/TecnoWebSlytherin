import { Component, OnInit } from '@angular/core';
// Asegúrate de que la ruta al servicio sea correcta
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-login',                    // Antes: app-usuario
  templateUrl: './login.component.html',    // Antes: ./usuario.component.html
  styleUrls: ['./login.component.css']      // Antes: ./usuario.component.css
})
export class LoginComponent implements OnInit { // Antes: UsuarioComponent

  // Objeto para vincular a los inputs del formulario
  loginData = {
    email: '',
    password: ''
  };
  loginError = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Si ya tiene sesión activa, redirigir inmediatamente (opcional)
    if (this.authService.isLoggedIn()) {
      // La redirección se puede manejar con un Guard o aquí
    }
  }

  /**
   * Envía las credenciales al AuthService.
   */
  onSubmit(): void {
    this.loginError = false;
    
    // Llamar al servicio de autenticación pasando email y password por separado
    this.authService.login(this.loginData.email, this.loginData.password)
      .subscribe(success => {
        if (!success) {
          this.loginError = true;
          // El servicio se encarga de la navegación si es exitoso
        }
      });
  }
}