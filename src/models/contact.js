const mongoose = require('mongoose')

const Contact = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    cep: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    speciality: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('contact', Contact)
