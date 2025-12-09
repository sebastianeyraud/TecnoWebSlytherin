import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin!: FormGroup;
  loginError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * Método principal para iniciar sesión usando el formulario reactivo.
   */
  async iniciarSesion(): Promise<void> {
    if (this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
      return;
    }

    const { email, password } = this.formularioLogin.value;

    try {
      const ok = await this.authService.login(email, password);

      if (ok) {
        this.router.navigateByUrl('/').then(() => {
          // Después de navegar, forzamos recarga para actualizar el header
          window.location.reload();
        });
      } else {
        this.loginError = true;
        alert('Credenciales incorrectas');
      }

    } catch (error: any) {
      this.loginError = true;
      alert(error.message || 'Error iniciando sesión');
    }
  }
}