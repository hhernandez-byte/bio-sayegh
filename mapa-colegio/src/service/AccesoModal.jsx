import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Sparkles, ChevronRight, MapPin, Leaf } from 'lucide-react';

export default function AccesoModal({ onIngresar }) {
  const [rolSeleccionado, setRolSeleccionado] = useState(null);
  const [salon, setSalon] = useState('salon_1');

  const manejarConfirmacion = () => {
    if (!rolSeleccionado) return;

    const datosUsuario = {
      rol: rolSeleccionado,
      salon: rolSeleccionado === 'invitado' ? 'invitado' : salon,
    };

    localStorage.setItem('rol_usuario', datosUsuario.rol);
    localStorage.setItem('salon_activo', datosUsuario.salon);
    
    onIngresar(datosUsuario);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#0b1120',
      backgroundImage: 'radial-gradient(circle at 50% 20%, #1e293b 0%, #0b1120 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      boxSizing: 'border-box',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'rgba(30, 41, 59, 0.7)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        padding: '40px 32px',
        maxWidth: '480px',
        width: '100%',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(56, 189, 248, 0.1)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Adorno EcoBot */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'rgba(56, 189, 248, 0.1)',
          border: '1px solid rgba(56, 189, 248, 0.3)',
          padding: '6px 16px',
          borderRadius: '20px',
          color: '#38bdf8',
          fontSize: '13px',
          fontWeight: '600',
          marginBottom: '20px'
        }}>
          <Sparkles size={16} /> EcoBot System v2.0
        </div>

        {/* Encabezado */}
        <h1 style={{
         margin: '0 0 12px 0',
  fontSize: '2rem',
  fontWeight: '800',
  color: '#ffffff',
  lineHeight: '1.3',
  paddingLeft: '8px',
  paddingRight: '8px',
  letterSpacing: '0.2px',
  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}>
          ¡Bienvenido a COLSAM!
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: '0 0 32px 0', lineHeight: 1.5 }}>
          Selecciona tu perfil de acceso para ingresar al mapa interactivo y estadísticas ambientales.
        </p>

        {/* Opciones de Rol */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
          
          {/* Tarjeta: Estudiante / Salón */}
          <div 
            onClick={() => setRolSeleccionado('estudiante')}
            style={{
              padding: '18px 20px',
              borderRadius: '16px',
              border: rolSeleccionado === 'estudiante' ? '2px solid #10b981' : '1px solid #334155',
              backgroundColor: rolSeleccionado === 'estudiante' ? 'rgba(16, 185, 129, 0.12)' : 'rgba(15, 23, 42, 0.6)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: rolSeleccionado === 'estudiante' ? '0 0 20px rgba(16, 185, 129, 0.2)' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                backgroundColor: rolSeleccionado === 'estudiante' ? '#10b981' : '#334155',
                color: '#fff',
                padding: '10px',
                borderRadius: '12px',
                display: 'flex',
                transition: 'background-color 0.25s'
              }}>
                <UserCheck size={22} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: '#fff', fontWeight: '700', fontSize: '1rem' }}>Comunidad Salón</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Estudiantes y Docentes</div>
              </div>
            </div>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: rolSeleccionado === 'estudiante' ? '6px solid #10b981' : '2px solid #475569',
              transition: 'all 0.2s'
            }} />
          </div>

          {/* Selector de Salón (Solo si elige Estudiante) */}
          {rolSeleccionado === 'estudiante' && (
            <div style={{
              animation: 'fadeIn 0.3s ease-in-out',
              backgroundColor: 'rgba(15, 23, 42, 0.8)',
              padding: '14px 18px',
              borderRadius: '12px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <label style={{ color: '#cbd5e1', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={16} color="#10b981" /> Elige tu Aula:
              </label>
              <select 
                value={salon}
                onChange={(e) => setSalon(e.target.value)}
                style={{
                  backgroundColor: '#1e293b',
                  color: '#34d399',
                  border: '1px solid #334155',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="salon_3">Salón 3</option>
                <option value="salon_4">Salón 4</option>
                 <option value="salon_5">Salón 5</option>
                  <option value="salon_6">Salón 6</option>
                   <option value="salon_7">Salón 7</option>
                    <option value="salon_8">Salón 8</option>
                     <option value="salon_9">Salón 9</option> 
                      <option value="salon_10">Salón 10</option>
                     <option value="salon_11">Salón 11</option>

              </select>
            </div>
          )}

          {/* Tarjeta: Invitado */}
          <div 
            onClick={() => setRolSeleccionado('invitado')}
            style={{
              padding: '18px 20px',
              borderRadius: '16px',
              border: rolSeleccionado === 'invitado' ? '2px solid #38bdf8' : '1px solid #334155',
              backgroundColor: rolSeleccionado === 'invitado' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(15, 23, 42, 0.6)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: rolSeleccionado === 'invitado' ? '0 0 20px rgba(56, 189, 248, 0.2)' : 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                backgroundColor: rolSeleccionado === 'invitado' ? '#0284c7' : '#334155',
                color: '#fff',
                padding: '10px',
                borderRadius: '12px',
                display: 'flex',
                transition: 'background-color 0.25s'
              }}>
                <ShieldCheck size={22} />
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ color: '#fff', fontWeight: '700', fontSize: '1rem' }}>Modo Visitante</div>
                <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Exploración general de datos</div>
              </div>
            </div>
            <div style={{
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: rolSeleccionado === 'invitado' ? '6px solid #38bdf8' : '2px solid #475569',
              transition: 'all 0.2s'
            }} />
          </div>

        </div>

        {/* Botón Ingresar */}
        <button
          onClick={manejarConfirmacion}
          disabled={!rolSeleccionado}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '14px',
            border: 'none',
            background: rolSeleccionado 
              ? 'linear-gradient(135deg, #0284c7 0%, #0d9488 100%)' 
              : '#334155',
            color: rolSeleccionado ? '#fff' : '#64748b',
            fontWeight: '700',
            fontSize: '1rem',
            cursor: rolSeleccionado ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            transition: 'all 0.3s ease',
            boxShadow: rolSeleccionado ? '0 10px 25px -5px rgba(2, 132, 199, 0.5)' : 'none',
            transform: rolSeleccionado ? 'translateY(-1px)' : 'none'
          }}
        >
          <span>Ingresar a la Plataforma</span>
          <ChevronRight size={18} />
        </button>

        {/* Pie de página pequeño */}
        <p style={{ marginTop: '20px', marginBottom: 0, fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
          <Leaf size={12} color="#10b981" /> Proyecto Ecológico Institucional COLSAM
        </p>

      </div>
    </div>
  );
}