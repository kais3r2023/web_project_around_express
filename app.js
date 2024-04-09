const express = require('express');
const users = require('./routes/users');
const cards = require('./routes/cards');

const app = express();
const { PORT = 3000 } = process.env;

app.use('/users', users);
app.use('/cards', cards);

// Ruta por defecto: devuelve un mensaje de error para cualquier otra ruta
app.use((req, res) => {
  res.status(404).json({ message: 'Recurso solicitado no encontrado' });
});

app.listen(PORT, () => {
  console.log(` Servidor en ejecución en http://localhost:${PORT}`);
});
