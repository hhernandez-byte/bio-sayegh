import React, { useState, useEffect } from 'react';
import { Trophy, Lock, CheckCircle, Key, LogOut, ShieldAlert, Sparkles, X, Lightbulb, RefreshCw } from 'lucide-react';

const TIPS_COLEGIO = [
  "¡Hola! Recuerda depositar las botellas plásticas aplastadas para ahorrar espacio.",
  "Las servilletas usadas y cajas de jugos con grasa van en la caneca de no aprovechables.",
  "Mantiene los pasillos limpios: si ves un papel en el suelo, recógelo aunque no sea tuyo.",
  "En las canchas y zonas verdes, guarda tus envolturas hasta encontrar un punto ecológico.",
  "Utiliza el papel por ambos lados antes de desecharlo en el contenedor azul o blanco.",
  "Cuida las canecas del patio: asegúrate de tapar bien los contenedores para evitar malos olores."
];

const INSIGNIAS_NIVELES = [
  { id: 1, metaInvasores: 1, titulo: "Separador Novato", desc: "Clasifica y captura tu primer invasor en el mapa", icono: "♻️", color: "#38bdf8" },
  { id: 2, metaInvasores: 3, titulo: "Héroe del Vidrio", desc: "Deposita y elimina 3 invasores del colegio", icono: "🍾", color: "#34d399" },
  { id: 3, metaInvasores: 5, titulo: "Guardián Orgánico", desc: "Registra 5 capturas en zonas de alimentos", icono: "🍎", color: "#facc15" },
  { id: 4, metaInvasores: 10, titulo: "Eco-Detective", desc: "Atrapa 10 invasores acumulados en las patrullas", icono: "🔍", color: "#fb923c" },
  { id: 5, metaInvasores: 15, titulo: "Maestro del Papel", desc: "Recicla y elimina 15 invasores con tu aula", icono: "📦", color: "#a855f7" },
  { id: 6, metaInvasores: 20, titulo: "Campeón COLSAM", desc: "¡Salón líder con cero residuos mal gestionados!", icono: "👑", color: "#f43f5e" },
];

export default function InsigniasPage({ onCerrarSesion }) {
  const [salonActivo, setSalonActivo] = useState("");
  const [rolActivo, setRolActivo] = useState("");
  const [invasoresConteo, setInvasoresConteo] = useState(0);
  const [insigniaSeleccionada, setInsigniaSeleccionada] = useState(null);

  // Estados de la mascota Caneca (EcoCan)
  const [tipIndex, setTipIndex] = useState(0);
  const [mostrarTip, setMostrarTip] = useState(false);

  useEffect(() => {
    const rolGuardado = localStorage.getItem('rol_usuario');
    const salonGuardado = localStorage.getItem('salon_activo');

    if (rolGuardado) setRolActivo(rolGuardado);
    if (salonGuardado) {
      setSalonActivo(salonGuardado);
      obtenerInvasores(salonGuardado);
    }
  }, []);

  const obtenerInvasores = (nombreSalon) => {
    const conteo = localStorage.getItem(`invasores_${nombreSalon}`);
    setInvasoresConteo(conteo ? parseInt(conteo, 10) : 0);
  };

  const handleCerrarSesionCompleto = () => {
    // Borra las claves de localStorage usadas en AccesoModal
    localStorage.removeItem('rol_usuario');
    localStorage.removeItem('salon_activo');
    localStorage.removeItem('modo_acceso');

    // Notifica a App.jsx para reabrir AccesoModal o recarga la página
    if (onCerrarSesion) {
      onCerrarSesion();
    } else {
      window.location.reload();
    }
  };

  const siguienteTip = () => {
    setTipIndex((prev) => (prev + 1) % TIPS_COLEGIO.length);
  };

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#ffffff', minHeight: 'calc(100vh - 70px)', padding: '40px 20px', fontFamily: 'sans-serif', position: 'relative' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* BARRA SUPERIOR DE ESTADO */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '16px 24px', borderRadius: '20px', marginBottom: '30px', border: '1px solid #334155', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ textAlign: 'left' }}>
            <span style={{ color: '#facc15', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', letterSpacing: '1px' }}>
              <Trophy size={14} /> MODO ACTIVO ({rolActivo ? rolActivo.toUpperCase() : 'VISITANTE'})
            </span>
            <h2 style={{ margin: '2px 0 0', fontSize: '1.4rem', color: '#fff' }}>{salonActivo || 'Sin Salón Asignado'}</h2>
          </div>

          <div style={{ backgroundColor: '#0f172a', padding: '8px 16px', borderRadius: '14px', border: '1px solid #38bdf8', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldAlert size={22} color="#fb923c" />
            <div style={{ textAlign: 'left' }}>
              <p style={{ margin: 0, fontSize: '0.7rem', color: '#94a3b8' }}>Capturas en Mapa</p>
              <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 'bold', color: '#38bdf8' }}>{invasoresConteo}</p>
            </div>
          </div>

          {/* BOTÓN DE CAMBIAR ROL */}
          <button 
            onClick={handleCerrarSesionCompleto}
            style={{ backgroundColor: 'transparent', border: '1px solid #ef4444', color: '#f87171', padding: '8px 14px', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 'bold' }}
          >
            <LogOut size={16} /> Cambiar Rol
          </button>
        </div>

        <h1 style={{ fontSize: '2.3rem', fontWeight: 'bold', margin: '0 0 8px 0', color: '#38bdf8' }}>
          Camino de Insignias
        </h1>
        <p style={{ color: '#cbd5e1', fontSize: '1rem', marginBottom: '35px' }}>
          Progresa eliminando residuos e invasores en el mapa del colegio
        </p>

        {/* CAMINO DE INSIGNIAS */}
        <div style={{ backgroundColor: '#1e293b', padding: '40px 20px', borderRadius: '28px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
            
            {INSIGNIAS_NIVELES.map((item, index) => {
              const desbloqueada = invasoresConteo >= item.metaInvasores;
              const offsets = ['0px', '70px', '0px', '-70px'];
              const translateX = offsets[index % offsets.length];

              return (
                <div 
                  key={item.id} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '18px', 
                    transform: `translateX(${translateX})`, 
                    position: 'relative' 
                  }}
                >
                  <button
                    onClick={() => setInsigniaSeleccionada(item)}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      border: desbloqueada ? '4px solid #fde047' : '4px solid #475569',
                      background: desbloqueada ? `radial-gradient(circle, ${item.color} 0%, #0f172a 100%)` : '#0f172a',
                      boxShadow: desbloqueada ? `0 0 20px ${item.color}80` : 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      zIndex: 2,
                    }}
                  >
                    <span>{item.icono}</span>
                    {!desbloqueada && (
                      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.85)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Lock size={22} color="#94a3b8" />
                      </div>
                    )}
                  </button>

                  <div style={{ backgroundColor: '#0f172a', padding: '12px 18px', borderRadius: '16px', border: '1px solid #334155', textAlign: 'left', minWidth: '160px' }}>
                    <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 'bold', color: '#f8fafc' }}>{item.titulo}</p>
                    <p style={{ margin: '4px 0 0', fontSize: '0.78rem', color: desbloqueada ? '#34d399' : '#facc15', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' }}>
                      {desbloqueada ? <CheckCircle size={14} /> : null}
                      {desbloqueada ? '¡Completado!' : `${invasoresConteo} / ${item.metaInvasores} Invasores`}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>
      </div>

      {/* MASCOTA FLOTANTE (CANECA CON TIPS) */}
      <div style={{ position: 'fixed', bottom: '25px', right: '25px', zIndex: 999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        {mostrarTip && (
          <div style={{ backgroundColor: '#1e293b', border: '2px solid #10b981', padding: '15px 18px', borderRadius: '18px', width: '260px', marginBottom: '12px', boxShadow: '0 15px 25px -5px rgba(0,0,0,0.6)', color: '#fff', fontSize: '0.85rem', position: 'relative', lineHeight: '1.4' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ color: '#34d399', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}>
                <Lightbulb size={14} /> EcoTip del Colegio
              </span>
              <button onClick={() => setMostrarTip(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>
                <X size={16} />
              </button>
            </div>
            <p style={{ margin: '0 0 10px 0', color: '#cbd5e1' }}>{TIPS_COLEGIO[tipIndex]}</p>
            <button 
              onClick={siguienteTip} 
              style={{ backgroundColor: '#10b981', color: '#0f172a', border: 'none', padding: '6px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'auto' }}
            >
              <RefreshCw size={12} /> Otro Tip
            </button>
          </div>
        )}

        <button
          onClick={() => {
            setMostrarTip(!mostrarTip);
            if (!mostrarTip) siguienteTip();
          }}
          style={{
            width: '65px',
            height: '65px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            border: '3px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            cursor: 'pointer',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)',
          }}
        >
          🗑️
        </button>
      </div>

      {/* MODAL DETALLE DE INSIGNIA */}
      {insigniaSeleccionada && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ backgroundColor: '#1e293b', padding: '30px', borderRadius: '24px', textAlign: 'center', maxWidth: '340px', width: '100%', border: '2px solid #475569', position: 'relative' }}>
            <button onClick={() => setInsigniaSeleccionada(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={20} />
            </button>
            <div style={{ fontSize: '2.8rem', width: '80px', height: '80px', margin: '0 auto 15px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: insigniaSeleccionada.color, border: '3px solid #fff' }}>
              {insigniaSeleccionada.icono}
            </div>
            <h3 style={{ color: '#fff', margin: '0 0 8px 0', fontSize: '1.3rem' }}>{insigniaSeleccionada.titulo}</h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem', lineHeight: '1.4', margin: '0 0 20px 0' }}>{insigniaSeleccionada.desc}</p>
          </div>
        </div>
      )}

    </div>
  );
}