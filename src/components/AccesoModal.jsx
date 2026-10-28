import React, { useState } from 'react';
import { ShieldAlert, UserCheck, Key, ArrowRight, X, Sparkles } from 'lucide-react';

export default function AccesoModal({ abierto, onCerrar, onSeleccionarRol }) {
  const [salonSeleccionado, setSalonSeleccionado] = useState('3a');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  if (!abierto) return null;

  // Generación de cursos de 3° a 11° (ej. 3A, 3B, ..., 11A, 11B)
  const salonesDisponibles = [];
  for (let i = 3; i <= 11; i++) {
    salonesDisponibles.push({ id: `${i}a`, nombre: `Salón ${i}-A` });
  }

  const handleLoginSalon = (e) => {
    e.preventDefault();
    if (!clave.trim()) {
      setError('Por favor ingresa la contraseña de tu salón.');
      return;
    }

    // Validación local / backend (puedes ajustar la clave por defecto o conectarlo a Mongo)
    if (clave === 'colsam2026' || clave === `salon${salonSeleccionado}`) {
      setError('');
      onSeleccionarRol({ rol: 'estudiante', salon: salonSeleccionado });
      setClave('');
    } else {
      setError('Contraseña incorrecta. Prueba con "colsam2026" o la clave de tu curso.');
    }
  };

  const handleEntrarInvitado = () => {
    setError('');
    onSeleccionarRol({ rol: 'invitado', salon: '' });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(3, 101, 140, 0.65)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '480px',
        backgroundColor: '#FFFFFF',
        border: '3px solid #03658C',
        borderRadius: '28px',
        padding: '32px 24px',
        boxShadow: '0 20px 50px rgba(3, 101, 140, 0.25)',
        boxSizing: 'border-box'
      }}>
        
        {/* BOTÓN CERRAR SI YA HAY ROL */}
        {onCerrar && (
          <button 
            onClick={onCerrar} 
            style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#03658C', cursor: 'pointer' }}
          >
            <X size={22} />
          </button>
        )}

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#03658C', border: '2px solid #A6D9A5', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', marginBottom: '12px' }}>
            <Sparkles size={28} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#03658C', margin: '0 0 6px 0' }}>
            ACCESO BIO-SAYEGH
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#8C644D', fontWeight: 600, margin: 0 }}>
            Selecciona cómo deseas ingresar al sistema del COLSAM
          </p>
        </div>

        {/* MODO INVITADO */}
        <button
          onClick={handleEntrarInvitado}
          style={{
            width: '100%',
            padding: '14px',
            backgroundColor: '#F0F9F5',
            border: '2px solid #338C30',
            borderRadius: '16px',
            color: '#03658C',
            fontWeight: 800,
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldAlert size={22} color="#338C30" />
            <div style={{ textAlign: 'left' }}>
              <span style={{ display: 'block', lineHeight: 1.1 }}>Modo Invitado</span>
              <small style={{ fontSize: '0.72rem', color: '#8C644D', fontWeight: 600 }}>Solo exploración y lecturas</small>
            </div>
          </div>
          <ArrowRight size={18} color="#338C30" />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#A6D9A5' }} />
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8C644D', textTransform: 'uppercase' }}>O Inicia Sesión por Salón</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#A6D9A5' }} />
        </div>

        {/* FORMULARIO MODO SALÓN (3° a 11°) */}
        <form onSubmit={handleLoginSalon} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8C644D', display: 'block', marginBottom: '4px' }}>SELECCIONA TU SALÓN (3.º a 11.º)</label>
            <select
              value={salonSeleccionado}
              onChange={(e) => setSalonSeleccionado(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', backgroundColor: '#FFFFFF', border: '2px solid #03658C', borderRadius: '10px', color: '#03658C', fontWeight: 700, fontSize: '0.9rem' }}
            >
              {salonesDisponibles.map((s) => (
                <option key={s.id} value={s.id}>{s.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8C644D', display: 'block', marginBottom: '4px' }}>CONTRASEÑA DEL SALÓN</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                placeholder="Ingresa la clave..."
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                style={{ width: '100%', padding: '10px 12px 10px 38px', backgroundColor: '#FFFFFF', border: '2px solid #03658C', borderRadius: '10px', color: '#03658C', fontWeight: 700, fontSize: '0.9rem', boxSizing: 'border-box' }}
              />
              <Key size={18} color="#03658C" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
            <small style={{ fontSize: '0.7rem', color: '#8C644D', display: 'block', marginTop: '4px' }}>Clave general demo: <strong>colsam2026</strong></small>
          </div>

          {error && (
            <div style={{ backgroundColor: '#FFF0F0', border: '1px solid #8C644D', color: '#8C644D', fontSize: '0.78rem', padding: '8px 12px', borderRadius: '8px', fontWeight: 700 }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#03658C',
              color: '#FFFFFF',
              border: '2px solid #A6D9A5',
              borderRadius: '12px',
              fontWeight: 900,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '6px'
            }}
          >
            <UserCheck size={18} /> INGRESAR COMO SALÓN
          </button>
        </form>

      </div>
    </div>
  );
}