const Card = require('../models/card');

const ERROR_CODE = 400;

module.exports.getAllCards = (req, res)=>{
  Card.find((cards)=>{
    res.send(cards);
  })
}