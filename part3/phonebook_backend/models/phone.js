const mongoose = require('mongoose')

const phoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [3, 'invalid name']
  },
  date: Date,
  number: {
     type: String,
     minLength: [8, 'Phone Number invalid'],
     required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})


phoneSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Phone = mongoose.model('Phone', phoneSchema)



module.exports = Phone
