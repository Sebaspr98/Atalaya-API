const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'contactos.json');

app.use(express.json());

function leerContactos() {
  if (!fs.existsSync(DATA_FILE)) {
    return [];
  }

  try {
    const contenido = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(contenido);
  } catch (error) {
    console.error('No se pudo leer contactos.json:', error.message);
    return [];
  }
}

function guardarContactos(contactos) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(contactos, null, 2));
}

// Sirve archivos estáticos desde la raíz
app.use(express.static(path.join(__dirname)));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/contactos.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'contactos.html'));
});

// Ejemplo de API
app.get('/api/hola', (req, res) => {
  res.json({ mensaje: 'Hola desde Express' });
});

app.post('/api/contacto', (req, res) => {
  const { nombre, email, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ ok: false, mensaje: 'Faltan datos obligatorios.' });
  }

  const contactos = leerContactos();
  const nuevoContacto = { nombre, email, mensaje, fecha: new Date().toISOString() };
  contactos.push(nuevoContacto);
  guardarContactos(contactos);

  res.status(201).json({
    ok: true,
    mensaje: 'Mensaje recibido correctamente.',
    datos: nuevoContacto
  });
});

app.get('/api/contactos', (req, res) => {
  res.json(leerContactos());
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});