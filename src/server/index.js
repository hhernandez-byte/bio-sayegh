// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Conexión a MongoDB (local o MongoDB Atlas)
mongoose.connect('mongodb://127.0.0.1:27017/biosayegh_colsam', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB conectado exitosamente'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// Esquema de Reporte de Residuos
const ReporteSchema = new mongoose.Schema({
  zonaId: String,
  lugarNombre: String,
  nivelResiduos: String,
  tipoResiduo: String,
  descripcion: String,
  reportadoPor: String,
  salon: String,
  fecha: { type: Date, default: Date.now }
});

const Reporte = mongoose.model('Reporte', ReporteSchema);

// RUTAS API
app.get('/api/reportes', async (req, res) => {
  try {
    const reportes = await Reporte.find().sort({ fecha: -1 });
    res.json(reportes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/reportes', async (req, res) => {
  try {
    const nuevoReporte = new Reporte(req.body);
    await nuevoReporte.save();
    res.status(201).json(nuevoReporte);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/reportes/:id', async (req, res) => {
  try {
    await Reporte.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Zona saneada y reporte eliminado de MongoDB' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Servidor corriendo en el puerto 5000'));