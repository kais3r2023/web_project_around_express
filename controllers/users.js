const User = require('../models/user');
const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;

module.exports.getAllUsers = (req, res)=>{
  User.find().then((users) =>{
    res.send(users);
  })
}

module.exports.getUser = (req, res)=>{
  const userId = req.params.id;
  User.findById(userId)
  .orFail(()=>{
    const error = new Error('No se ha encontrado ningún user con ese id');
    error.statusCode = 404;
    throw error;
  })
  .then((user) =>{
    res.send(user);
  })
  .catch((err)=>{
    console.log(err);
    res
      .status(NOT_FOUND_CODE)
      .send({menssage: 'No se ha encontrado ningún user con ese id'});
  });
};

module.exports.createUser = (req, res) =>{
  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
  .then((user)=>{
    res.send({data: user});
  })

  .catch(() =>{
    res
      .status(ERROR_CODE)
      .send({ menssage: 'Los datos proporcionados no son válidos'});
  })
};