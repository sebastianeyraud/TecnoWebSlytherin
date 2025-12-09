import { Component } from '@angular/core';
import { IndexedDBService } from './services/indexed-db.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AMC_TecWeb';
  dbLista = false;

  constructor(private dbService: IndexedDBService) {
    this.inicializarDB();
  }

  async inicializarDB() {
    try {
      await this.dbService.dbReady;
      this.dbLista = true; // la DB ya está lista → mostramos la app
    } catch (err) {
      console.error('Error inicializando DB:', err);
    }
  }
}

