import { Component, OnInit } from '@angular/core';
// Importa el servicio modificado
import { AuthService } from '../../services/auth.service'; 
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // 1. Propiedad que contendrá el Observable
  isLoggedIn$!: Observable<boolean>; 

  constructor(
    private authService: AuthService, 
    private router: Router
  ) { }

  ngOnInit() {
    // 2. Obtiene la referencia del Observable
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  onLogout(): void {
    // Llama al método del servicio que también notifica el cambio de estado.
    this.authService.logout();
  }
}