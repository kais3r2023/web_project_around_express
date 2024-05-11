const User = require('../models/user');
const ERROR_CODE = 400;
const NOT_FOUND_CODE = 404;
const SERVER_ERROR_CODE = 500;

module.exports.getAllUsers = (req, res)=>{
  User.find()
  .orFail()
  .then((users) =>{
    res.send(users);
  })
  .catch((error)=>{
    res.status(SERVER_ERROR_CODE).json({message: error.message});
  })
}

module.exports.getUser = (req, res)=>{
  const userId = req.params.id;
  User.findById(userId)
  .orFail()
  .then((user) =>{
    res.send({data: user});
  })
  .catch((error)=>{
    res.status(NOT_FOUND_CODE).json({ message: error.message });
  });
};

module.exports.createUser = (req, res) =>{
  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
  .then((user)=>{
    res.send({data: user});
  })

  .catch((error) =>{
    res.status(ERROR_CODE).json({message: error.message});
  })
};

module.exports.updateProfile = (req, res)=>{
  const {name, about} = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, {name, about},{ new: true})
  .orFail()
  .then((user)=>{
    res.send({data: user});
  })
  .catch((error)=>{
    res.status(NOT_FOUND_CODE).json({message: error.message})
  });
};

module.exports.updateAvatar = (req, res)=>{
  const {avatar} = req.body
  const userId = req.user._id
  User.findByIdAndUpdate(userId, {avatar}, {new: true, runValidators: true})
  .orFail()
  .then((user)=>{
    res.send({data: user});
  })
  .catch((error)=>{
    res.status(NOT_FOUND_CODE).json({ message: error.message});
})
};