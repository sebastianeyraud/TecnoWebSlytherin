import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formularioLogin: FormGroup;
  loginError = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    // private authService: AuthService, // si ya lo tienes, descomenta y úsalo abajo
  ) {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // opcional: al escribir, oculta el mensaje de error
    this.formularioLogin.valueChanges.subscribe(() => {
      this.loginError = false;
    });
  }

  iniciarSesion(): void {
    if (this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
      return;
    }

    const { email, password } = this.formularioLogin.value;

    // Si tienes AuthService:
    // this.authService.login(email, password).subscribe({
    //   next: () => this.router.navigate(['/']),
    //   error: () => (this.loginError = true),
    // });

    // Placeholder mínimo si aún no conectas backend:
    if (email && password) {
      this.router.navigate(['/']);
    } else {
      this.loginError = true;
    }
  }
}
