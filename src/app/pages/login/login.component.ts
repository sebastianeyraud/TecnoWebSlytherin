import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/models/user'; // importa la interfaz correcta

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
  iniciarSesion(): void {
    if (this.formularioLogin.invalid) {
      console.log('Formulario inválido');
      this.formularioLogin.markAllAsTouched();
      return;
    }

    // Construimos el objeto User completo
    const usuario: User = {
      email: this.formularioLogin.get('email')?.value,
      password: this.formularioLogin.get('password')?.value,
      nombre: '', // valor por defecto o real si lo tienes
      rol: 'usuario' // asigna el rol según tu lógica
    };

    console.log(usuario);

    this.authService.login(usuario).then((ok: boolean) => {
      if (ok) {
        this.router.navigateByUrl('/dashboard'); // Ajusta la ruta según tu app
      } else {
        alert('Credenciales incorrectas');
      }
    });
  }

  /**
   * Alternativa si decides usar loginData en lugar del formulario reactivo.
   * Este método no es necesario si usas iniciarSesion().
   */
  onSubmit(): void {
    this.loginError = false;

    const usuario: User = {
      email: this.formularioLogin.get('email')?.value,
      password: this.formularioLogin.get('password')?.value,
      nombre: '', // valor por defecto
      rol: 'usuario'
    };

    this.authService.login(usuario).then((success: boolean) => {
      if (!success) {
        this.loginError = true;
      }
    });
  }
}
