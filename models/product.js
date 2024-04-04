const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'product name must be provided'],
  },
  price: {
    type: Number,
    required: [true, 'product price must be provided'],
  },
  img: {
    type: String,
  },
  amount: {
    type: Number,
    required: [true, 'product amount must be provided'],
  },
})

module.exports = mongoose.model('Product', productSchema)
