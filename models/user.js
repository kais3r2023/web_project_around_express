const mongoose = require ('mongoose');
const regExpLink = /^(https?:\/\/)(www\.)?[\w~:/?%#[\]@!$&'.()*+,;=]*\/#?/;

const userSchema = mongoose.Schema({
  name:{
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30
  },
  about:{
    type: String,
    require: true,
    minlength: 2,
    maxlength: 30
  },
  avatar:{
    type: String,
    require: true,
    validate: {
      validator(value){
        return (regExpLink.test(value));
      },
      message: props => `${props.value} no es un enlace URL válido para avatar.`
    }
  }
},{versionKey: false});

module.exports = mongoose.model('user', userSchema);