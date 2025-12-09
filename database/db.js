import { LowSync } from 'lowdb'
import { JSONFileSync } from 'lowdb/node'

// Ruta de tu archivo JSON
const adapter = new JSONFileSync('./database/db.json')

// Estructura inicial del JSON
const defaultData = {
  peliculas: [],
  salas: [],
  funciones: [],
  usuarios: [],
  actores: []
}

// Crear DB
export const db = new LowSync(adapter, defaultData)

// Inicializar (leer, crear si no existe)
export function initDB() {
  db.read()
  db.data ||= defaultData
  db.write()
}