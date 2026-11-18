import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/bio-sayegh-logo-verde.png';
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
      <style>{`
        .nav-contenedor {
          max-width: 1280px;
          margin: 0 auto;
          padding: 12px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }
        .nav-menu-wrapper {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .nav-estado {
          display: flex;
          align-items: center;
          gap: 10px;
          border-left: 1px solid rgba(255,255,255,0.25);
          padding-left: 15px;
          flex-wrap: wrap;
        }
        .nav-btn-movil {
          display: none;
          background: rgba(255,255,255,0.12);
          border: 1px solid #A6D9A5;
          border-radius: 8px;
          padding: 8px;
          color: #FFFFFF;
          cursor: pointer;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 920px) {
          .nav-btn-movil {
            display: inline-flex;
          }
          .nav-menu-wrapper {
            display: none;
            width: 100%;
            flex-direction: column;
            align-items: stretch;
            padding-top: 12px;
            border-top: 1px solid rgba(255,255,255,0.2);
          }
          .nav-menu-wrapper.abierto {
            display: flex;
          }
          .nav-links {
            flex-direction: column;
            align-items: stretch;
          }
          .nav-estado {
            border-left: none;
            border-top: 1px solid rgba(255,255,255,0.2);
            padding-left: 0;
            padding-top: 12px;
            justify-content: space-between;
          }
        }
      `}</style>

      <div className="nav-contenedor">
        {/* LOGO DOMINANTE EN AZUL Y VERDE CLARO */}
        <Link to="/" onClick={() => setAbierto(false)} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src={logo} alt="Bio-Sayegh" style={{ height: '44px', width: 'auto', display: 'block' }} />
        </Link>

        {/* BOTÓN DE MENÚ EN CELULARES */}
        <button
          onClick={() => setAbierto(!abierto)}
          className="nav-btn-movil"
          aria-label="Abrir o cerrar menú"
        >
          {abierto ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* NAVEGACIÓN */}
        <div className={`nav-menu-wrapper ${abierto ? 'abierto' : ''}`}>
          <div className="nav-links">
            <Link to="/" onClick={() => setAbierto(false)} style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 700, padding: '8px 14px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', transition: 'all 0.2s ease' }}>
              <Home size={16} color="#A6D9A5" /> Inicio
            </Link>
            <Link to="/mapa" onClick={() => setAbierto(false)} style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 700, padding: '8px 14px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', transition: 'all 0.2s ease' }}>
              <MapPin size={16} color="#A6D9A5" /> Mapa
            </Link>
            <Link to="/estadisticas" onClick={() => setAbierto(false)} style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 700, padding: '8px 14px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', transition: 'all 0.2s ease' }}>
              <BarChart2 size={16} color="#A6D9A5" /> Datos
            </Link>
            <Link to="/nosotros" onClick={() => setAbierto(false)} style={{ color: '#FFFFFF', textDecoration: 'none', fontWeight: 700, padding: '8px 14px', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', transition: 'all 0.2s ease' }}>
              <Users size={16} color="#A6D9A5" /> Nosotros
            </Link>
            <Link to="/insignias" onClick={() => setAbierto(false)} style={{ textDecoration: 'none', backgroundColor: '#338C30', color: '#FFFFFF', fontWeight: 800, padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', border: '2px solid #A6D9A5', boxShadow: '0 2px 8px rgba(51, 140, 48, 0.4)' }}>
              <Award size={16} color="#A6D9A5" /> INSIGNIAS
            </Link>
          </div>

          {/* TARJETA DE MODO / SALÓN */}
          <div className="nav-estado">
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
              onClick={() => {
                setAbierto(false);
                onCerrarSesion();
              }}
              style={{ backgroundColor: '#8C644D', color: '#FFFFFF', border: '1px solid #A6D9A5', borderRadius: '8px', padding: '8px 12px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s ease' }}
            >
              <LogOut size={14} /> Cambiar Rol
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}