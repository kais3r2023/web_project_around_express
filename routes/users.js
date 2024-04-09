const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const filePath = path.join(__dirname, '..', 'data', 'users.json');

router.get('/', (req, res) => {
  fs.readFile(filePath, 'utf-8', (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
    }

    // Parsea los datos JSON
    const users = JSON.parse(data);
    // Envía la lista de usuarios como respuesta
    res.json(users);
  });
});

router.get('/:id', (req, res) => {
  const userId = req.params.id;

  fs.readFile(filePath, 'utf8', (error, data) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
      return;
    }

    // Parsear los datos JSON
    const users = JSON.parse(data);
    // Busca el usuario por su ID
    const user = users.find(user => user._id === userId);

    if (!user) {
      // Si el usuario no se encuentra, devuelce un mensaje de error
      res.status(404).json({ message: 'ID de usuario no encontrado' });
      return;
    }

    // Envía el usuario encontrado como respuesta
    res.json(user);
  });
});
module.exports = router;
