import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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
    private authService: AuthService,
    private usuarioService: UsuarioService
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

  async iniciarSesion(): Promise<void> {
    if (this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
      return;
    }

    const email = (this.formularioLogin.value.email ?? '').trim();
    const password = this.formularioLogin.value.password ?? '';

    try {
      const ok = await this.authService.login(email, password);

      if (!ok) {
        this.loginError = true;
        return;
      }

      const session = this.authService.getCurrentUser();
      if (!session) {
        this.loginError = true;
        return;
      }

      // Si es usuario normal, carga perfil para el header/membresía
      if (session.role === 'usuario') {
        const perfil = await this.usuarioService.getById(session.id);
        this.usuarioService.setCurrentUser(perfil ?? null);
        this.router.navigate(['/perfil']); // o ['/'] si prefieres home
        return;
      }

      // Si es admin, no hay perfil de UsuarioI (por tu seed)
      this.usuarioService.setCurrentUser(null);
      this.router.navigate(['/admin']);
    } catch {
      this.loginError = true;
    }
  }
}
