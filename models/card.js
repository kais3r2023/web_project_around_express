const mongoose = require ('mongoose');

const cardSchema = mongoose.Schema({
  name:{
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30
  },
  link:{
    type: String,
    require: true,
    validate: {
      validator: function(value) {
        return /^(https?:\/\/)(www\.)?[\w\-]+(\.[\w\-]+)+([\/?#].*)?$/.test(value);
      },
      message: props => `${props.value} no es un enlace URL válido para la imagen.`
    }
  },
  owner: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('card', cardSchema);