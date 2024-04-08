const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const filePath = path.join(__dirname , '..' , 'data', 'cards.json');

router.get('/', (req, res)=>{

  fs.readFile(filePath, 'utf8', (error, data)=>{
    if(error){
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor'});
      return;
    }

    // Parseando lod datos JSON
    const cards = JSON.parse(data);
    // envía la lista de tarjetas como respuesta
    res.json(cards);
  });

});

module.exports = router;