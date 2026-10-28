import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AccesoModal from './components/AccesoModal';
import Home from './pages/Home';
import MapaPage from './pages/MapaPage';
import InsigniasPage from './pages/InsigniasPage';
import EstadisticasPage from './pages/EstadisticasPage';
import NosotrosPage from './pages/NosotrosPage';

export default function App() {
  const [usuario, setUsuario] = useState(() => {
    return {
      rol: localStorage.getItem('rol_usuario') || 'invitado',
      salon: localStorage.getItem('salon_activo') || ''
    };
  });

  const [modalAbierto, setModalAbierto] = useState(() => {
    return !localStorage.getItem('rol_usuario');
  });

  const handleSeleccionarRol = (nuevoUsuario) => {
    localStorage.setItem('rol_usuario', nuevoUsuario.rol);
    localStorage.setItem('salon_activo', nuevoUsuario.salon);
    setUsuario(nuevoUsuario);
    setModalAbierto(false);
  };

  return (
    <Router>
      <Navbar 
        usuario={usuario} 
        onCerrarSesion={() => setModalAbierto(true)} 
      />

      <AccesoModal 
        abierto={modalAbierto} 
        onCerrar={localStorage.getItem('rol_usuario') ? () => setModalAbierto(false) : null}
        onSeleccionarRol={handleSeleccionarRol} 
      />

      <Routes>
        <Route path="/" element={<Home usuario={usuario} />} />
        <Route path="/mapa" element={<MapaPage usuario={usuario} />} />
        <Route path="/insignias" element={<InsigniasPage usuario={usuario} />} />
        <Route path="/estadisticas" element={<EstadisticasPage />} />
        
        <Route path="/nosotros" element={<NosotrosPage />} />
      </Routes>
    </Router>
  );
}
