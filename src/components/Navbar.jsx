import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MapPin, BarChart2, Home, LogOut, UserCheck, ShieldAlert, Award, Users } from 'lucide-react';

export default function Navbar({ usuario, onCerrarSesion }) {
  const [abierto, setAbierto] = useState(false);
  const esInvitado = usuario?.rol === 'invitado';

  return (
    <nav style={{ 
      backgroundColor: '#03658C', 
      color: '#FFFFFF', 
      borderBottom: '4px solid #338C30', 
      position: 'relative', 
      zIndex: 1000, 
      boxShadow: '0 4px 16px rgba(3, 101, 140, 0.25)' 
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* LOGO DOMINANTE EN AZUL Y VERDE CLARO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ backgroundColor: '#338C30', padding: '8px', borderRadius: '50%', display: 'flex', border: '2px solid #A6D9A5' }}>
            <MapPin size={20} color="#FFFFFF" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.5px' }}>
            Bio-Sayegh <span style={{ color: '#A6D9A5' }}>COLSAM</span>
          </span>
        </div>

        {/* NAVEGACIÓN */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link to="/" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 700, padding: '8px 14px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', transition: 'all 0.2s ease' }}>
              <Home size={16} color="#A6D9A5" /> Inicio
            </Link>
            <Link to="/mapa" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 700, padding: '8px 14px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', transition: 'all 0.2s ease' }}>
              <MapPin size={16} color="#A6D9A5" /> Mapa
            </Link>
            <Link to="/estadisticas" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 700, padding: '8px 14px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', transition: 'all 0.2s ease' }}>
              <BarChart2 size={16} color="#A6D9A5" /> Datos
            </Link>
            
            {/* NUEVO APARTADO: NOSOTROS */}
            <Link to="/nosotros" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 700, padding: '8px 14px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', transition: 'all 0.2s ease' }}>
              <Users size={16} color="#A6D9A5" /> Nosotros
            </Link>

            <Link to="/insignias" style={{ textDecoration: 'none', backgroundColor: '#338C30', color: '#FFFFFF', fontWeight: 800, padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', border: '2px solid #A6D9A5', boxShadow: '0 2px 8px rgba(51, 140, 48, 0.4)' }}>
              <Award size={16} color="#A6D9A5" /> INSIGNIAS
            </Link>
          </div>

          {/* TARJETA DE MODO / SALÓN CON DETALLES MARRÓN Y MENTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: '1px solid rgba(255,255,255,0.25)', paddingLeft: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid #A6D9A5', padding: '6px 12px', borderRadius: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: esInvitado ? '#A6D9A5' : '#338C30' }} />
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <span style={{ fontSize: '10px', color: '#A6D9A5', textTransform: 'uppercase', lineHeight: 1, fontWeight: 700 }}>Modo Activo</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {esInvitado ? <><ShieldAlert size={12} color="#A6D9A5" /> Invitado</> : <><UserCheck size={12} color="#A6D9A5" /> Salón {usuario?.salon?.replace('salon_', '').toUpperCase()}</>}
                </span>
              </div>
            </div>

            <button 
              onClick={onCerrarSesion}
              style={{ backgroundColor: '#8C644D', color: '#FFFFFF', border: '1px solid #A6D9A5', borderRadius: '8px', padding: '8px 12px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s ease' }}
            >
              <LogOut size={14} /> Cambiar Rol
            </button>
          </div>

        </div>

        <button onClick={() => setAbierto(!abierto)} style={{ display: 'none', background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer' }}>
          {abierto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}
<<<<<<< HEAD
// Actualización Bio-Sayegh COLSAM
=======
// Actualización 

>>>>>>> 85e3a6f (Corregido y actualizado EstadisticasPage)
