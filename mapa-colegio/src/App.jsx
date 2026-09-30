import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import AccesoModal from './service/AccesoModal';
import Home from './pages/Home';
import InsigniasPage from './pages/InsigniasPage';
import MapaPage from './pages/MapaPage';
import { Map, Trophy, Home as HomeIcon, LogOut, Menu, X, UserCheck, ChevronRight, AlertTriangle } from 'lucide-react';

// BARRA SUPERIOR CON MENÚ DESPLEGABLE INTERACTIVO
function Navbar({ usuario, onCerrarSesion }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMenuAbierto(false);
  }, [location.pathname]);

  const esRutaActiva = (path) => location.pathname === path;

  return (
    <nav style={{
      backgroundColor: '#0f172a',
      borderBottom: '1px solid #1e293b',
      padding: '0 25px',
      height: '75px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 2000,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
    }}>
      
      {/* LOGO */}
      <div 
        onClick={() => navigate('/')} 
        style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', userSelect: 'none' }}
      >
        <div style={{ backgroundColor: '#10b98120', padding: '8px', borderRadius: '14px', border: '1px solid #10b98140', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontSize: '1.4rem' }}>🌱</span>
        </div>
        <div>
          <span style={{ fontSize: '1.25rem', fontWeight: '900', color: '#fff', letterSpacing: '0.5px', display: 'block', lineHeight: 1 }}>
            Bio-Sayegh
          </span>
          <span style={{ color: '#38bdf8', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>
            COLSAM ECOLOGÍA
          </span>
        </div>
      </div>

      {/* BOTÓN DESPLEGABLE */}
      <button
        onClick={() => setMenuAbierto(!menuAbierto)}
        style={{
          backgroundColor: menuAbierto ? '#ef444420' : '#1e293b',
          border: menuAbierto ? '1px solid #ef4444' : '1px solid #38bdf8',
          color: menuAbierto ? '#f87171' : '#38bdf8',
          padding: '10px 18px',
          borderRadius: '16px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: menuAbierto ? '0 0 15px rgba(239, 68, 68, 0.3)' : '0 0 15px rgba(56, 189, 248, 0.2)'
        }}
      >
        <span>{menuAbierto ? 'Cerrar' : 'Menú'}</span>
        {menuAbierto ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* DROPDOWN MENU */}
      {menuAbierto && (
        <div style={{
          position: 'absolute',
          top: '85px',
          right: '20px',
          width: '320px',
          backgroundColor: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '24px',
          padding: '20px',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 30px rgba(56, 189, 248, 0.15)',
          backdropFilter: 'blur(12px)',
          zIndex: 2001
        }}>
          
          {/* INFORMACIÓN DEL USUARIO CONECTADO */}
          <div style={{ backgroundColor: '#0f172a', padding: '14px', borderRadius: '16px', border: '1px solid #334155', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ backgroundColor: '#38bdf820', padding: '10px', borderRadius: '12px', border: '1px solid #38bdf840' }}>
              <UserCheck size={20} color="#38bdf8" />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ margin: 0, fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', textTransform: 'uppercase' }}>Sesión Activa</p>
              <p style={{ margin: '2px 0 0', fontSize: '1rem', color: '#fff', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {usuario?.salon || (usuario?.rol === 'invitado' ? 'Invitado' : 'Sin Salón')}
              </p>
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px', paddingLeft: '5px' }}>
            Navegación
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Link 
              to="/" 
              style={{
                textDecoration: 'none',
                padding: '12px 16px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: esRutaActiva('/') ? '#38bdf820' : 'transparent',
                border: esRutaActiva('/') ? '1px solid #38bdf8' : '1px solid transparent',
                color: esRutaActiva('/') ? '#38bdf8' : '#cbd5e1',
                fontWeight: 'bold'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <HomeIcon size={18} /> Inicio
              </div>
              <ChevronRight size={16} opacity={0.6} />
            </Link>

            <Link 
              to="/mapa" 
              style={{
                textDecoration: 'none',
                padding: '12px 16px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: esRutaActiva('/mapa') ? '#10b98120' : 'transparent',
                border: esRutaActiva('/mapa') ? '1px solid #10b981' : '1px solid transparent',
                color: esRutaActiva('/mapa') ? '#34d399' : '#cbd5e1',
                fontWeight: 'bold'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Map size={18} /> Mapa Interactivo
              </div>
              <ChevronRight size={16} opacity={0.6} />
            </Link>

            <Link 
              to="/insignias" 
              style={{
                textDecoration: 'none',
                padding: '12px 16px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: esRutaActiva('/insignias') ? '#facc1520' : 'transparent',
                border: esRutaActiva('/insignias') ? '1px solid #facc15' : '1px solid transparent',
                color: esRutaActiva('/insignias') ? '#facc15' : '#cbd5e1',
                fontWeight: 'bold'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Trophy size={18} /> Insignias
              </div>
              <ChevronRight size={16} opacity={0.6} />
            </Link>

            <Link 
              to="/reporte" 
              style={{
                textDecoration: 'none',
                padding: '12px 16px',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: esRutaActiva('/reporte') ? '#ef444420' : 'transparent',
                border: esRutaActiva('/reporte') ? '1px solid #ef4444' : '1px solid transparent',
                color: esRutaActiva('/reporte') ? '#f87171' : '#cbd5e1',
                fontWeight: 'bold'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <AlertTriangle size={18} /> Patrulla Ecológica
              </div>
              <ChevronRight size={16} opacity={0.6} />
            </Link>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #334155', margin: '15px 0' }} />

          {/* BOTÓN CAMBIAR ROL O REESTABLECER ACCESO */}
          <button 
            onClick={() => {
              setMenuAbierto(false);
              onCerrarSesion();
            }}
            style={{
              width: '100%',
              backgroundColor: '#ef444415',
              border: '1px solid #ef444460',
              color: '#f87171',
              padding: '12px',
              borderRadius: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}
          >
            <LogOut size={16} /> Cambiar Rol / Modo
          </button>

        </div>
      )}

    </nav>
  );
}

export default function App() {
  const [usuario, setUsuario] = useState(null);

  // Carga inicial desde LocalStorage
  useEffect(() => {
    const rolGuardado = localStorage.getItem('rol_usuario');
    const salonGuardado = localStorage.getItem('salon_activo');

    if (rolGuardado) {
      setUsuario({ rol: rolGuardado, salon: salonGuardado });
    }
  }, []);

  // Función para volver al Modal de selección
  const handleCerrarSesion = () => {
    localStorage.removeItem('rol_usuario');
    localStorage.removeItem('salon_activo');
    localStorage.removeItem('modo_acceso');
    setUsuario(null); // Esto obliga a React a renderizar AccesoModal
  };

  // 1. SI NO HAY USUARIO SELECCIONADO, MUESTRA EL MODAL DE ACCESO (Invitado/Salón/Docente)
  if (!usuario) {
    return (
      <AccesoModal 
        onIngresar={(datos) => {
          localStorage.setItem('rol_usuario', datos.rol);
          if (datos.salon) localStorage.setItem('salon_activo', datos.salon);
          setUsuario(datos);
        }} 
      />
    );
  }

  // 2. SI YA INGRESÓ, MUESTRA LA NAVEGACIÓN COMPLETA
  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#070d19', minHeight: '100vh', color: '#fff' }}>
        <Navbar usuario={usuario} onCerrarSesion={handleCerrarSesion} />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/insignias" element={<InsigniasPage onCerrarSesion={handleCerrarSesion} />} />
          <Route path="/mapa" element={<MapaPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}