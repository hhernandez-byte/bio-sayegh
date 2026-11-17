import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import AccesoModal from './components/AccesoModal';
import FooterBioSayegh from './components/Footer';
import Home from './pages/Home';
import MapaPage from './pages/MapaPage';
import InsigniasPage from './pages/InsigniasPage';
import EstadisticasPage from './pages/EstadisticasPage';
import NosotrosPage from './pages/NosotrosPage.jsx';

export default function App() {
  const [usuario, setUsuario] = useState(() => {
    return {
      rol: localStorage.getItem('rol_usuario') || 'invitado',
      salon: localStorage.getItem('salon_activo') || ''
    };
  });

  // Solo entra un salón con su contraseña; sin contraseña no se puede cerrar la ventana
  const [modalAbierto, setModalAbierto] = useState(() => {
    return localStorage.getItem('rol_usuario') !== 'estudiante' || !localStorage.getItem('clave_salon');
  });

  const handleSeleccionarRol = (nuevoUsuario) => {
    localStorage.setItem('rol_usuario', nuevoUsuario.rol);
    localStorage.setItem('salon_activo', nuevoUsuario.salon);
    setUsuario(nuevoUsuario);
    setModalAbierto(false);
    window.dispatchEvent(new Event('progreso-actualizado'));
  };

  const yaDentro =
    localStorage.getItem('rol_usuario') === 'estudiante' && !!localStorage.getItem('clave_salon');

  return (
    <Router>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar
          usuario={usuario}
          onCerrarSesion={() => setModalAbierto(true)}
        />

        <AccesoModal
          abierto={modalAbierto}
          onCerrar={yaDentro ? () => setModalAbierto(false) : null}
          onSeleccionarRol={handleSeleccionarRol}
        />

        {/* key=... hace que cada salón vea solo su propio progreso */}
        <div key={usuario.salon} style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home usuario={usuario} />} />
            <Route path="/mapa" element={<MapaPage usuario={usuario} />} />
            <Route path="/insignias" element={<InsigniasPage usuario={usuario} />} />
            <Route path="/estadisticas" element={<EstadisticasPage />} />
            <Route path="/nosotros" element={<NosotrosPage />} />
          </Routes>
        </div>

        <FooterBioSayegh />
      </div>
    </Router>
  );
}