// routes/residuos.js
const express = require('express');
const router = express.Router();
const Residuo = require('../models/Residuo');

// GET: Obtener datos para la gráfica del robot
router.get('/robot-stats', async (req, res) => {
  try {
    const datos = await Residuo.find();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener datos del robot' });
  }
});

module.exports = router; 