const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String
  },
  name: String,
  passwordHash: String,
  phones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Phone'
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User