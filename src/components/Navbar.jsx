import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MapPin, BarChart2, Home, LogOut, UserCheck, ShieldAlert, Award } from 'lucide-react';

export default function Navbar({ usuario, onCerrarSesion }) {
  const [abierto, setAbierto] = useState(false);
  const esInvitado = usuario?.rol === 'invitado';

  return (
    <nav style={{ backgroundColor: '#1e293b', color: '#fff', borderBottom: '1px solid #334155', position: 'relative', zIndex: 1000 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
        {/* LOGO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ backgroundColor: '#0284c7', padding: '6px', borderRadius: '50%', display: 'flex' }}>
            <MapPin size={20} color="#fff" />
          </div>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#38bdf8' }}>
            Bio-Sayegh <span style={{ color: '#fff' }}>COLSAM</span>
          </span>
        </div>

        {/* NAVEGACIÓN Y PERFIL DE ESCRITORIO */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          
          {/* Enlaces Principales */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', padding: '8px 14px', borderRadius: '8px', backgroundColor: '#334155', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              <Home size={16} /> Inicio
            </Link>
            <Link to="/mapa" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 'bold', padding: '8px 14px', borderRadius: '8px', backgroundColor: '#334155', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              <MapPin size={16} /> Mapa
            </Link>
            <Link to="/estadisticas" style={{ color: '#34d399', textDecoration: 'none', fontWeight: 'bold', padding: '8px 14px', borderRadius: '8px', backgroundColor: '#334155', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
              <BarChart2 size={16} /> Datos
            </Link>
            
            {/* LINK CORREGIDO HACIA /insignias */}
            <Link to="/insignias" style={{ textDecoration: 'none', background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff', fontWeight: 'bold', padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
              <Award size={16} /> INSIGNIAS
            </Link>
          </div>

          {/* TARJETA DE ROL Y BOTÓN SALIR */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: '1px solid #475569', paddingLeft: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', padding: '6px 12px', borderRadius: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: esInvitado ? '#f59e0b' : '#10b981' }} />
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <span style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', lineHeight: 1 }}>Modo Activo</span>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: esInvitado ? '#f1f5f9' : '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {esInvitado ? <><ShieldAlert size={12} color="#f59e0b" /> Invitado</> : <><UserCheck size={12} color="#34d399" /> Salón {usuario?.salon?.replace('salon_', '').toUpperCase()}</>}
                </span>
              </div>
            </div>

            <button 
              onClick={onCerrarSesion}
              style={{ backgroundColor: '#334155', color: '#f87171', border: '1px solid #475569', borderRadius: '8px', padding: '8px 12px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <LogOut size={14} /> Cambiar Rol
            </button>
          </div>

        </div>

        {/* MÓVIL TOGGLE */}
        <button onClick={() => setAbierto(!abierto)} style={{ display: 'none', background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
          {abierto ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}