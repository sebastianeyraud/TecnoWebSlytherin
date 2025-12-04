import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service'; // ajusta la ruta si es necesario
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$; // observable desde el servicio
  }

  onLogout(): void {
    this.authService.logout();
  }
}
