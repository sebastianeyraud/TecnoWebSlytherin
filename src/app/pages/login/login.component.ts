import { Component } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  public formularioLogin: FormGroup = new
  FormGroup({
    email: new FormControl(null),
    password: new FormControl(null)
  })

  public iniciarSesion():void{
    if (this.formularioLogin.invalid) {
      console.log('Está malo el formulario')
      this.formularioLogin.markAllAsTouched();
      return;
    }

    const usuario = this.formularioLogin.value as User;
    this.authService.login(usuario).then(ok => {
      if (ok) {
        this.router.navigateByUrl('');
      } else {
        alert('Credenciales incorrectas');
      }
    });
  }

}
