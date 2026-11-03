import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MapPin, BarChart2, Home, LogOut, UserCheck, ShieldAlert, Award, Users } from 'lucide-react';

// Componente del Logo vectorial integrado
function BioSayeghLogo() {
  return (
    <svg 
      viewBox="0 0 450 160" 
      style={{ height: '48px', width: 'auto', display: 'block' }} 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="navLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#A6D9A5" />
        </linearGradient>
      </defs>
      
      <g fill="url(#navLogoGrad)">
        {/* Hojas sobre la letra i */}
        <path d="M 148 55 C 146 45, 155 35, 160 38 C 163 45, 154 53, 148 55 Z" />
        <path d="M 158 56 C 165 48, 175 49, 176 56 C 169 59, 160 59, 158 56 Z" />
        
        {/* Texto principal Bio-Sayegh */}
        <text 
          x="50%" 
          y="105" 
          textAnchor="middle" 
          fontFamily="'Kaushan Script', cursive" 
          fontSize="75" 
          fontWeight="bold" 
          fontStyle="italic"
        >
          Bio-Sayegh
        </text>

        {/* Trazo e ilustración inferior */}
        <path d="M 70 115 C 70 145, 180 155, 230 140 C 170 142, 90 135, 75 115 Z" />
        <path d="M 180 138 C 210 135, 235 150, 230 158 C 200 160, 180 148, 180 138 Z" />
      </g>
    </svg>
  );
}

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
        
        {/* LOGO EN SVG CSS CON IDENTIDAD COLSAM */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BioSayeghLogo />
          <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#A6D9A5', letterSpacing: '1px', alignSelf: 'flex-end', marginBottom: '6px' }}>
            COLSAM
          </span>
        </Link>

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
            
            <Link to="/nosotros" style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 700, padding: '8px 14px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', transition: 'all 0.2s ease' }}>
              <Users size={16} color="#A6D9A5" /> Nosotros
            </Link>

            <Link to="/insignias" style={{ textDecoration: 'none', backgroundColor: '#338C30', color: '#FFFFFF', fontWeight: 800, padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', border: '2px solid #A6D9A5', boxShadow: '0 2px 8px rgba(51, 140, 48, 0.4)' }}>
              <Award size={16} color="#A6D9A5" /> INSIGNIAS
            </Link>
          </div>

          {/* TARJETA DE MODO / SALÓN */}
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
