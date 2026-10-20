// models/Residuo.js
const mongoose = require('mongoose');

const ResiduoSchema = new mongoose.Schema({
  categoria: { 
    type: String, 
    required: true, 
    enum: ['Orgánicos', 'Inorgánicos', 'Renovables'] 
  },
  cantidad: { type: Number, default: 0 },
  color: { type: String },
  icono: { type: String }
});

module.exports = mongoose.model('Residuo', ResiduoSchema);