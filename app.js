const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let usuarios = [];

app.post('/registro', (req, res) => {
    const { nombre, email, password } = req.body;
    usuarios.push({ nombre, email, password });
    res.status(201).send(`Usuario ${nombre} registrado correctamente.`);
  });
  
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    if (usuario) {
      res.status(200).send(`Usuario ${usuario.nombre} ha iniciado sesión correctamente.`);
    } else {
      res.status(401).send('Email o contraseña incorrectos.');
    }
  });
  
  app.put('/actualizar', (req, res) => {
    const { nombre, email, password } = req.body;
    const usuario = usuarios.find(u => u.email === email);
    if (usuario) {
      usuario.nombre = nombre;
      usuario.password = password;
      res.status(200).send(`Usuario ${usuario.nombre} actualizado correctamente.`);
    } else {
      res.status(404).send('Usuario no encontrado.');
    }
  });
  
  app.delete('/eliminar', (req, res) => {
    const { email } = req.body;
    const index = usuarios.findIndex(u => u.email === email);
    if (index !== -1) {
      usuarios.splice(index, 1);
      res.status(200).send(`Usuario con email ${email} eliminado correctamente.`);
    } else {
      res.status(404).send('Usuario n encontrado.');
    }
  });
  

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

