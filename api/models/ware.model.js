var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var ObjectId = require('mongodb').ObjectID;
var WareSchema = new Schema({
  vendor: {
    type: String,
    required: 'Заповніть поле vendor',
    index: true,
    unique: true
  },
  title: {
    type: String,
    required: 'Заповніть поле заголовок',
  },
  price: {
    type: Number,
    default: 100
  },
  images: [{
    type: String
  }],
  mainImageIndex: Number,
  available: {
    type: Boolean,
    default: true
  },
  description: {
    type: String
  },
  bonuses: [{
    type: ObjectId
  }]
})
// Getter
WareSchema.path('price').get(function(num) {
  return (num / 100).toFixed(2);
});

// Setter
WareSchema.path('price').set(function(num) {
  return num * 100;
});
module.exports = mongoose.model('Ware', WareSchema)
