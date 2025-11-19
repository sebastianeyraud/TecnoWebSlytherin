const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

const readData = (file) => fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : [];
const writeData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

// ----- Usuarios -----
app.get('/usuarios', (req, res) => res.json(readData('data/usuarios.json')));
app.post('/usuarios', (req, res) => {
  const usuarios = readData('data/usuarios.json');
  usuarios.push(req.body);
  writeData('data/usuarios.json', usuarios);
  res.json({ message: 'Usuario agregado' });
});
app.put('/usuarios/:email', (req, res) => {
  const email = req.params.email;
  const usuarios = readData('data/usuarios.json');

  const index = usuarios.findIndex(u => u.email === email);
  if (index === -1) return res.status(404).json({ message: 'Usuario no encontrado' });

  // Reemplaza el usuario con los datos del body
  usuarios[index] = req.body;
  writeData('data/usuarios.json', usuarios);

  res.json({ message: 'Usuario actualizado' });
});

// ----- Peliculas -----
app.get('/peliculas', (req, res) => res.json(readData('data/peliculas.json')));
app.post('/peliculas', (req, res) => {
  const peliculas = readData('data/peliculas.json');
  peliculas.push(req.body);
  writeData('data/peliculas.json', peliculas);
  res.json({ message: 'Pelicula agregada' });
});
app.put('/peliculas/:titulo', (req, res) => {
  const titulo = req.params.titulo;
  const peliculas = readData('data/peliculas.json');

  const index = peliculas.findIndex(p => p.titulo === titulo);
  if (index === -1) return res.status(404).json({ message: 'Pelicula no encontrada' });

  // Reemplaza la película
  peliculas[index] = req.body;
  writeData('data/peliculas.json', peliculas);

  res.json({ message: 'Película actualizada' });
});

// ----- Salas -----
app.get('/salas', (req, res) => res.json(readData('data/salas.json')));
app.post('/salas', (req, res) => {
  const salas = readData('data/salas.json');
  salas.push(req.body);
  writeData('data/salas.json', salas);
  res.json({ message: 'Sala agregada' });
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));