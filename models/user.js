const mongoose = require ('mongoose');

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
        return /https?:\/\/(www\.)?[\w.-]+(?:\/[\w._~:\/?%#[\]@!$&'()*+,;=]*)?#?/g.test(value);
      },
      message: props => `${props.value} no es un enlace URL válido para avatar.`
    }
  }
})

const userModel = mongoose.model('user',userSchema)