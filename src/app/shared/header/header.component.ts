import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Observable } from 'rxjs';
import { UsuarioI } from 'src/app/models/interfaces/usuario-i';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  currentUser$!: Observable<UsuarioI | null>; // ahora viene del servicio

  constructor(private auth: AuthService, private usuarioS: UsuarioService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.isLoggedIn$;
    this.currentUser$ = this.usuarioS.currentUser$; // suscripción directa al observable del servicio
  }

  onLogout(): void {
    this.auth.logout();
    this.usuarioS.setCurrentUser(null); // actualizamos observable del servicio
  }
}
