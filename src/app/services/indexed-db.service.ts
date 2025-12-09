import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private dbName = 'AMC_DB';
  private dbVersion = 2;
  private db!: IDBDatabase;
  public dbReady!: Promise<void>;

  constructor() {
    this.initDB();
  }

  private initDB(): void {
    this.dbReady = new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onupgradeneeded = (event: any) => {
        const db: IDBDatabase = event.target.result;
        const tx: IDBTransaction = event.target.transaction;

        // Crear stores
        this.createStore(db, 'peliculas', 'id');
        this.createStore(db, 'casting', 'id');
        this.createStore(db, 'funciones', 'id');
        this.createStore(db, 'cines', 'id');
        this.createStore(db, 'salas', 'id');
        this.createStore(db, 'usuarios_perfil', 'id');
        this.createStore(db, 'admins', 'id');

        if (!db.objectStoreNames.contains('users')) {
          const store = db.createObjectStore('users', { keyPath: 'email' });
          store.createIndex('rol', 'rol', { unique: false });
          store.createIndex('id', 'id', { unique: true });
        }

        // Seed usando la transacción del onupgradeneeded
        this.seedInitialData(tx);
      };

      request.onsuccess = (event: any) => {
        this.db = event.target.result;
        console.log('IndexedDB lista');
        resolve();
      };

      request.onerror = (event: any) => {
        console.error('Error abriendo IndexedDB', event);
        reject('Error abriendo IndexedDB');
      };
    });
  }

  private createStore(db: IDBDatabase, name: string, key: string) {
    if (!db.objectStoreNames.contains(name)) {
      db.createObjectStore(name, { keyPath: key });
    }
  }

  // ============================================
  // Seed inicial usando la transacción de onupgradeneeded
  // ============================================
  private seedInitialData(tx: IDBTransaction) {
    // ---- USERS ----
    const users = [
      { id: 1, nombre: "Administrador", email: "admin@cine.com", password: "1234", rol: "admin" },
      { id: 2, nombre: "Ana", email: "ana@mail.com", password: "hola", rol: "usuario" }
    ];
    const storeUsers = tx.objectStore('users');
    users.forEach(u => storeUsers.add(u));

    // ---- ADMINS ----
    const admins = [{ id: 1 }];
    const storeAdmins = tx.objectStore('admins');
    admins.forEach(a => storeAdmins.add(a));

    // ---- USUARIO PERFIL ----
    const usuariosPerfil = [
      { id: 2, apellido: "Pérez", telefono: "555-1234", membresia: "INSIDER", created_at: new Date(), historial: [], notificaciones: [], p_favoritas: [1] }
    ];
    const storePerfil = tx.objectStore('usuarios_perfil');
    usuariosPerfil.forEach(u => storePerfil.add(u));

    // ---- PELICULAS ----
    const peliculas = [
      {
        id: 1,
        titulo: 'Inception',
        sinopsis: 'Un ladrón que roba secretos entrando en los sueños.',
        duracion_min: 148,
        genero: 'Ciencia Ficción',
        clasificacion: 'PG-13',
        poster_url: 'https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg',
        banner: 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
        trailer: 'https://www.youtube.com/embed/YoHD9XEInc0',
        estreno: '2010-07-16',
        casting: [1, 2, 3],
        funciones: [1, 2, 3]
      }
    ];
    const storePeliculas = tx.objectStore('peliculas');
    peliculas.forEach(p => storePeliculas.add(p));

    // ---- CASTING ----
    const casting = [
      { id: 1, nombre: 'Leonardo DiCaprio', foto: 'X.jpg' },
      { id: 2, nombre: 'Joseph Gordon-Levitt', foto: 'Y.jpg' },
      { id: 3, nombre: 'Elliot Page', foto: 'Z.jpg' }
    ];
    const storeCasting = tx.objectStore('casting');
    casting.forEach(c => storeCasting.add(c));

    // ---- FUNCIONES ----
    const funciones = [
      { id: 1, pelicula_id: 1, sala_id: 1, formato: '2D', start_time: '2025-02-02T18:00', end_time: '2025-02-02T20:30', precio_base: 5500, disponible: true }
    ];
    const storeFunciones = tx.objectStore('funciones');
    funciones.forEach(f => storeFunciones.add(f));

    // ---- CINES ----
    const cines = [
      { id: 1, nombre: 'Cinepolis Centro', direccion: '123', ciudad: 'Ciudad', telefono: '555-1111' }
    ];
    const storeCines = tx.objectStore('cines');
    cines.forEach(c => storeCines.add(c));

    // ---- SALAS ----
    const salas = [
      { id: 1, cine_id: 1, nombre: "Sala 1", tipo: "VIP", capacidad: 6, plano_url: "", asientos: [{ disponible: true, sala: 1, fila: "A", numero: 1, tipo_asiento: "VIP", activo: true }] }
    ];
    const storeSalas = tx.objectStore('salas');
    salas.forEach(s => storeSalas.add(s));

    console.log('Seeds cargados correctamente');
  }

  // ============================================
  // Acceso a stores
  // ============================================
  public getDB(): IDBDatabase {
    return this.db;
  }

  public getStore(storeName: string, mode: IDBTransactionMode = 'readonly'): IDBObjectStore {
    if (!this.db) throw new Error('DB no inicializada');
    return this.db.transaction(storeName, mode).objectStore(storeName);
  }
}