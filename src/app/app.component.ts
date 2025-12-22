import { Component } from '@angular/core';
import { IndexedDBService } from './services/indexed-db.service';
import { AuthService } from './services/auth.service';
import { UsuarioService } from './services/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AMC_TecWeb';
  dbLista = false;

  constructor(
    private dbService: IndexedDBService,
    private auth: AuthService,
    private usuarioService: UsuarioService
  ) {
    this.inicializarDB();
  }

  async inicializarDB(): Promise<void> {
    try {
      await this.dbService.dbReady;
      this.dbLista = true; // la DB ya está lista → mostramos la app

      // ✅ 1.2 Restaurar usuario desde sesión
      if (this.auth.isLoggedIn()) {
        const session = this.auth.getCurrentUser();

        if (session?.role === 'usuario') {
          const perfil = await this.usuarioService.getById(session.id);
          this.usuarioService.setCurrentUser(perfil ?? null);
        } else {
          // admin u otro rol: no hay perfil UsuarioI asociado
          this.usuarioService.setCurrentUser(null);
        }
      } else {
        this.usuarioService.setCurrentUser(null);
      }
    } catch (err) {
      console.error('Error inicializando DB:', err);
      // estado consistente aunque falle algo
      this.usuarioService.setCurrentUser(null);
    }
  }
}
