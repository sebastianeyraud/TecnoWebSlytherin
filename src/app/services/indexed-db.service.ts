import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndexedDBService {
  private dbName = 'AMC_DB_V2';
  private dbVersion = 30;
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
          const store = db.createObjectStore('users', { keyPath: 'id' });
          store.createIndex('rol', 'rol', { unique: false });
          store.createIndex('email', 'email', { unique: true });
        } else {
          // Si el store existe (versión vieja), obtén el store y crea índices faltantes
          const store = tx.objectStore('users');
          if (!store.indexNames.contains('email')) {
            store.createIndex('email', 'email', { unique: true });
          }
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
    users.forEach(u => storeUsers.put(u));

    // ---- ADMINS ----
    const admins = [{ id: 1 }];
    const storeAdmins = tx.objectStore('admins');
    admins.forEach(a => storeAdmins.put(a));

    // ---- USUARIO PERFIL ----
    const usuariosPerfil = [
      { id: 2, apellido: "Pérez", telefono: "555-1234", membresia: "INSIDER", created_at: new Date(), historial: [], notificaciones: [], p_favoritas: [1] }
    ];
    const storePerfil = tx.objectStore('usuarios_perfil');
    usuariosPerfil.forEach(u => storePerfil.put(u));

    // ---- PELICULAS ----
    const peliculas = [
      {
        id: 1,
        titulo: 'Inception',
        sinopsis: 'Dom Cobb es un ladrón capaz de adentrarse en los sueños de la gente y hacerse con sus secretos. Sin embargo, ahora tiene que llevar a cabo una misión diferente a lo que ha hecho siempre: realizar una incepción para implantar una idea en el subconsciente de una persona. El plan se complica debido a la intervención de alguien que parece predecir cada uno de los movimientos de Cobb, alguien a quien solo él puede enfrentarse.',
        duracion_min: 148,
        genero: 'Ciencia Ficción',
        clasificacion: '18+',
        poster_url: 'https://image.tmdb.org/t/p/original/tXQvtRWfkUUnWJAn2tN3jERIUG.jpg',
        banner: 'https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
        trailer: 'https://www.youtube.com/watch?v=RV9L7ui9Cn8',
        estreno: '2010-07-16',
        casting: [1, 2, 3],
        funciones: [1, 2, 3]
      },
      {
        id: 2,
        titulo: 'Interstellar',
        sinopsis: 'Un grupo de científicos y exploradores, encabezados por Cooper, se embarcan en un viaje espacial para encontrar un lugar con las condiciones necesarias para reemplazar a la Tierra y comenzar una nueva vida allí. La Tierra está llegando a su fin y este grupo necesita encontrar un planeta más allá de nuestra galaxia que garantice el futuro de la raza humana.',
        duracion_min: 169,
        genero: 'Ciencia Ficción',
        clasificacion: '18+',
        poster_url: 'https://image.tmdb.org/t/p/original/cQuuBjG78j4b2r1dFpAjnjbUplv.jpg',
        banner: 'https://image.tmdb.org/t/p/original/Ys8UIGWJpd2TMuQk8fU77W3mBz.jpg',
        trailer: 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
        estreno: '2014-11-07',
        casting: [4, 5],
        funciones: [4, 5]
      },
      {
        id: 3,
        titulo: 'Wicked',
        sinopsis: 'Ambientada en la Tierra de Oz, mucho antes de la llegada de Dorothy Gale desde Kansas. Elphaba es una joven incomprendida por su inusual color verde que aún no ha descubierto su verdadero poder. Glinda es una popular joven marcada por sus privilegios y su ambición que aún no ha descubierto su verdadera pasión. Las dos se conocen como estudiantes de la Universidad Shiz, en la fantástica Tierra de Oz, y forjan una insólita pero profunda amistad',
        duracion_min: 160,
        genero: 'Musical',
        clasificacion: '7+',
        poster_url: 'https://image.tmdb.org/t/p/original/hDQXqvmmikekQ15uxhisBDwEA63.jpg',
        banner: 'https://image.tmdb.org/t/p/original/uKb22E0nlzr914bA9KyA5CVCOlV.jpg',
        trailer: 'https://www.youtube.com/watch?v=6COmYeLsz4c',
        estreno: '2014-11-07',
        casting: [6, 7],
        funciones: [7, 8, 9 ]
      }
    ];
    const storePeliculas = tx.objectStore('peliculas');
    peliculas.forEach(p => storePeliculas.put(p));

    // ---- CASTING ----
    const casting = [
      { id: 1, nombre: 'Leonardo DiCaprio', foto: 'https://media.themoviedb.org/t/p/w300_and_h450_face/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg' },
      { id: 2, nombre: 'Joseph Gordon-Levitt', foto: 'https://media.themoviedb.org/t/p/w300_and_h450_face/z2FA8js799xqtfiFjBTicFYdfk.jpg' },
      { id: 3, nombre: 'Elliot Page', foto: 'https://media.themoviedb.org/t/p/w300_and_h450_face/nXO8DE4biVXY4UDYP0NdIY1zvXS.jpg' },
      { id: 4, nombre: 'Matthew McConaughey', foto: 'https://media.themoviedb.org/t/p/w300_and_h450_face/lCySuYjhXix3FzQdS4oceDDrXKI.jpg' },
      { id: 5, nombre: 'Anne Hathaway', foto: 'https://media.themoviedb.org/t/p/w300_and_h450_face/s6tflSD20MGz04ZR2R1lZvhmC4Y.jpg' },
      { id: 6, nombre: 'Cynthia Erivo', foto: 'https://media.themoviedb.org/t/p/w300_and_h450_face/gIAXqZwZCBqkh2ppfAV4xcnMxki.jpg' },
      { id: 7, nombre: 'Ariana Grande', foto: 'https://media.themoviedb.org/t/p/w300_and_h450_face/ojr2zF46BmPe7EALds7WQf6Ro4O.jpg' },
    ];
    const storeCasting = tx.objectStore('casting');
    casting.forEach(c => storeCasting.put(c));

    // ---- FUNCIONES ----
    const funciones = [
      { id: 1, pelicula_id: 1, sala_id: 1, formato: '2D', start_time: '2025-02-02T18:00', end_time: '2025-02-02T20:30', precio_base: 5500, disponible: true },
      { id: 2, pelicula_id: 2, sala_id: 1, formato: 'IMAX', start_time: '2025-02-03T20:00', end_time: '2025-02-03T22:50', precio_base: 7500, disponible: true },
    ];
    const storeFunciones = tx.objectStore('funciones');
    funciones.forEach(f => storeFunciones.put(f));

    // ---- CINES ----
    const cines = [
      { id: 1, nombre: 'Cinepolis Centro', direccion: '123', ciudad: 'Ciudad', telefono: '555-1111' }
    ];
    const storeCines = tx.objectStore('cines');
    cines.forEach(c => storeCines.put(c));

    // ---- SALAS ----
    const salas = [
      { id: 1, cine_id: 1, nombre: "Sala 1", tipo: "VIP", capacidad: 6, plano_url: "", asientos: [{ disponible: true, sala: 1, fila: "A", numero: 1, tipo_asiento: "VIP", activo: true }] }
    ];
    const storeSalas = tx.objectStore('salas');
    salas.forEach(s => storeSalas.put(s));

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