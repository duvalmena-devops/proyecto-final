const express = require('express');
const app = express();

app.use(express.json());

// Vulnerabilidad demo 1: Code Injection
app.post('/calcular', (req, res) => {
  const formula = req.body.formula;
  const resultado = eval(formula);
  res.json({ resultado });
});

// Vulnerabilidad demo 2: Path Traversal
const path = require('path');

app.get('/archivo', (req, res) => {
  const nombre = req.query.nombre;
  const ruta = path.join('/archivos', nombre);
  res.sendFile(ruta);
});

app.listen(3000);