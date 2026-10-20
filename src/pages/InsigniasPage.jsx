import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Sparkles, 
  Lock, 
  Star, 
  ShieldCheck, 
  Zap, 
  AlertTriangle, 
  Flame,
  Award,
  X,
  Crown
} from 'lucide-react';

export default function InsigniasPage() {
  const [estadisticas, setEstadisticas] = useState({
    reportesRealizados: 0,
    zonasLimpiadas: 0,
    puntosTotales: 120
  });

  const [insigniaSeleccionada, setInsigniaSeleccionada] = useState(null);
  const [mostrarCeleb, setMostrarCeleb] = useState(false);

  const salon = localStorage.getItem('salon_activo') || '10-A';

  useEffect(() => {
    const cargarProgresoReal = () => {
      try {
        const reportes = JSON.parse(localStorage.getItem('reportes_residuos') || '[]');
        const limpiados = parseInt(localStorage.getItem('zonas_limpiadas_count') || '0', 10);
        
        const totalReportes = reportes.length;
        const puntos = 120 + (totalReportes * 25) + (limpiados * 35);

        setEstadisticas({
          reportesRealizados: totalReportes,
          zonasLimpiadas: limpiados,
          puntosTotales: puntos
        });
      } catch (e) {
        console.error("Error al sincronizar insignias:", e);
      }
    };

    cargarProgresoReal();
    window.addEventListener('storage', cargarProgresoReal);
    return () => window.removeEventListener('storage', cargarProgresoReal);
  }, []);

  const niveles = [
    {
      id: 1,
      numero: '1',
      titulo: 'Primer Escaneo Eco',
      descripcion: 'Registra tu primer reporte de residuo en el mapa del colegio.',
      icono: <Zap size={36} color="#03658C" />,
      actual: estadisticas.reportesRealizados,
      meta: 1,
      color: '#03658C',
      x: 220,
      y: 650,
      mascota: '🤖 Eco-Bot Alpha'
    },
    {
      id: 2,
      numero: '2',
      titulo: 'Vigilante del Campus',
      descripcion: 'Acumula 3 reportes geolocalizados en el colegio.',
      icono: <AlertTriangle size={36} color="#8C644D" />,
      actual: estadisticas.reportesRealizados,
      meta: 3,
      color: '#8C644D',
      x: 580,
      y: 520,
      mascota: '🦊 Zorro Guardián'
    },
    {
      id: 3,
      numero: '3',
      titulo: 'Sanador Ambiental',
      descripcion: 'Limpia o sanea 2 zonas marcadas en alerta en el mapa.',
      icono: <ShieldCheck size={36} color="#338C30" />,
      actual: estadisticas.zonasLimpiadas,
      meta: 2,
      color: '#338C30',
      x: 260,
      y: 370,
      mascota: '🦉 Búho Detector'
    },
    {
      id: 4,
      numero: '4',
      titulo: 'Potencia Eco-Puntos',
      descripcion: 'Alcanza los 200 Eco-Puntos acumulados aportando a la ecología.',
      icono: <Flame size={36} color="#03658C" />,
      actual: estadisticas.puntosTotales,
      meta: 200,
      color: '#03658C',
      x: 600,
      y: 220,
      mascota: '🐻 Oso Limpiador'
    },
    {
      id: 5,
      numero: '5',
      titulo: 'Leyenda Bio-Sayegh',
      descripcion: 'Suma 8 reportes en el colegio para liderar la tabla general.',
      icono: <Trophy size={36} color="#338C30" />,
      actual: estadisticas.reportesRealizados,
      meta: 8,
      color: '#338C30',
      x: 380,
      y: 80,
      mascota: '👑 Comandante Eco'
    }
  ];

  const abrirAnuncioQuizizz = (nivel, estaDesbloqueado) => {
    setInsigniaSeleccionada({ ...nivel, desbloqueado: estaDesbloqueado });
    setMostrarCeleb(true);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      color: '#03658C',
      fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      padding: '30px 20px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflowX: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&display=swap');

        .nodo-giant {
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }
        .nodo-giant:hover {
          transform: scale(1.18) translateY(-6px);
        }

        .card-cyber-giant {
          background: #FFFFFF;
          border: 3px solid #03658C;
          box-shadow: 0 12px 32px rgba(3, 101, 140, 0.12);
          border-radius: 24px;
        }

        @keyframes quizizzPop {
          0% { transform: scale(0.4) rotate(-8deg); opacity: 0; }
          70% { transform: scale(1.05) rotate(2deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        .quizizz-modal {
          animation: quizizzPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .anim-float {
          animation: floatSlow 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* HEADER PRINCIPAL */}
      <div className="card-cyber-giant" style={{
        width: '100%',
        maxWidth: '850px',
        padding: '20px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '28px',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            backgroundColor: '#03658C',
            padding: '14px',
            borderRadius: '20px',
            border: '2px solid #A6D9A5',
            color: '#FFFFFF'
          }}>
            <Award size={36} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#338C30', textTransform: 'uppercase', letterSpacing: '2px' }}>
              PROGRESIÓN DE NIVELES
            </span>
            <h1 style={{ margin: '2px 0 0 0', fontSize: '2rem', fontWeight: 900, color: '#03658C' }}>
              Camino de Eco-Insignias
            </h1>
          </div>
        </div>

        {/* CONTADOR DE ECO-PUNTOS */}
        <div style={{
          backgroundColor: '#F0F9F5',
          border: '2px solid #338C30',
          borderRadius: '20px',
          padding: '10px 22px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Sparkles size={24} color="#338C30" className="anim-float" />
          <span style={{ fontSize: '1.4rem', fontWeight: 900, color: '#03658C' }}>
            {estadisticas.puntosTotales} <span style={{ fontSize: '0.85rem', color: '#8C644D' }}>PTS</span>
          </span>
        </div>
      </div>

      {/* CONTENEDOR DEL CAMINO */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '850px',
        height: '800px',
        backgroundColor: '#FFFFFF',
        border: '3px solid #03658C',
        borderRadius: '36px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(3, 101, 140, 0.12)'
      }}>

        {/* MASCOTAS ECOLÓGICAS */}
        <div className="anim-float" style={{ position: 'absolute', top: '50px', left: '40px', fontSize: '3rem', zIndex: 10 }}>🤖</div>
        <div className="anim-float" style={{ position: 'absolute', top: '320px', right: '50px', fontSize: '3rem', zIndex: 10, animationDelay: '1s' }}>🦊</div>
        <div className="anim-float" style={{ position: 'absolute', bottom: '80px', left: '50px', fontSize: '3rem', zIndex: 10, animationDelay: '2s' }}>🦉</div>

        {/* SVG DE LA RUTA */}
        <svg viewBox="0 0 850 800" width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          <defs>
            <linearGradient id="giantPathGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#03658C" />
              <stop offset="35%" stopColor="#8C644D" />
              <stop offset="70%" stopColor="#338C30" />
              <stop offset="100%" stopColor="#A6D9A5" />
            </linearGradient>
          </defs>

          {/* Sombra de la curva */}
          <path
            d="M 220 650 C 450 650, 580 580, 580 520 C 580 430, 260 430, 260 370 C 260 280, 600 280, 600 220 C 600 130, 380 130, 380 80"
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="48"
            strokeLinecap="round"
          />

          {/* Trayecto punteado con gradiente */}
          <path
            d="M 220 650 C 450 650, 580 580, 580 520 C 580 430, 260 430, 260 370 C 260 280, 600 280, 600 220 C 600 130, 380 130, 380 80"
            fill="none"
            stroke="url(#giantPathGrad)"
            strokeWidth="24"
            strokeDasharray="16 12"
            strokeLinecap="round"
          />
        </svg>

        {/* NODOS DE LAS INSIGNIAS */}
        {niveles.map((nivel) => {
          const desbloqueado = nivel.actual >= nivel.meta;
          const porcentaje = Math.min(100, Math.round((nivel.actual / nivel.meta) * 100));

          return (
            <div
              key={nivel.id}
              className="nodo-giant"
              onClick={() => abrirAnuncioQuizizz(nivel, desbloqueado)}
              style={{
                position: 'absolute',
                left: `${nivel.x - 55}px`,
                top: `${nivel.y - 55}px`,
                width: '110px',
                height: '110px',
                zIndex: 20
              }}
            >
              {desbloqueado && (
                <div style={{
                  position: 'absolute',
                  top: '-32px',
                  left: nivel.x > 450 ? '-70px' : '70px',
                  backgroundColor: '#FFFFFF',
                  border: `2px solid ${nivel.color}`,
                  borderRadius: '16px',
                  padding: '4px 12px',
                  boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap',
                  zIndex: 30
                }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 900, color: nivel.color }}>
                    {nivel.mascota} ({salon})
                  </span>
                </div>
              )}

              <div style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: desbloqueado ? '#FFFFFF' : '#F1F5F9',
                border: `4px solid ${desbloqueado ? nivel.color : '#CBD5E1'}`,
                boxShadow: desbloqueado ? `0 0 20px ${nivel.color}44` : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                
                <div style={{ position: 'absolute', top: '-12px', display: 'flex', gap: '3px' }}>
                  <Star size={16} fill={desbloqueado ? '#338C30' : '#CBD5E1'} stroke="none" />
                  <Star size={20} fill={desbloqueado ? '#338C30' : '#CBD5E1'} stroke="none" style={{ marginTop: '-4px' }} />
                  <Star size={16} fill={desbloqueado ? '#338C30' : '#CBD5E1'} stroke="none" />
                </div>

                {desbloqueado ? nivel.icono : <Lock size={32} color="#94A3B8" />}

                <span style={{ fontSize: '0.75rem', fontWeight: 900, color: desbloqueado ? '#03658C' : '#64748B', marginTop: '2px' }}>
                  {porcentaje}%
                </span>
              </div>

            </div>
          );
        })}

      </div>

      {/* POP-UP DE INSIGNIA SELECCIONADA */}
      {mostrarCeleb && insigniaSeleccionada && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(3, 101, 140, 0.5)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '20px'
        }}>
          <div className="quizizz-modal" style={{
            position: 'relative',
            width: '100%',
            maxWidth: '460px',
            backgroundColor: '#FFFFFF',
            border: `3px solid ${insigniaSeleccionada.color}`,
            borderRadius: '32px',
            padding: '36px 28px',
            textAlign: 'center',
            boxShadow: `0 20px 60px rgba(0,0,0,0.2)`
          }}>
            <button 
              onClick={() => setMostrarCeleb(false)}
              style={{
                position: 'absolute',
                top: '18px',
                right: '18px',
                backgroundColor: 'rgba(0,0,0,0.05)',
                border: 'none',
                color: '#03658C',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>

            <div style={{ display: 'inline-flex', padding: '8px 18px', borderRadius: '30px', backgroundColor: 'rgba(166, 217, 165, 0.3)', border: `2px solid ${insigniaSeleccionada.color}`, color: insigniaSeleccionada.color, fontWeight: 900, fontSize: '0.85rem', marginBottom: '16px', gap: '6px', alignItems: 'center' }}>
              <Crown size={18} /> {insigniaSeleccionada.desbloqueado ? '¡LOGRO DESBLOQUEADO!' : 'NIVEL BLOQUEADO'}
            </div>

            <div style={{
              margin: '0 auto 20px auto',
              width: '110px',
              height: '110px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: `4px solid ${insigniaSeleccionada.color}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 8px 24px ${insigniaSeleccionada.color}33`
            }}>
              {insigniaSeleccionada.icono}
            </div>

            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, margin: '0 0 10px 0', color: '#03658C' }}>
              {insigniaSeleccionada.titulo}
            </h2>

            <p style={{ color: '#8C644D', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '24px', fontWeight: 600 }}>
              {insigniaSeleccionada.descripcion}
            </p>

            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '12px 16px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 800, color: '#8C644D', marginBottom: '6px' }}>
                <span>PROGRESO ACTUAL:</span>
                <span style={{ color: insigniaSeleccionada.color }}>
                  {insigniaSeleccionada.actual} / {insigniaSeleccionada.meta}
                </span>
              </div>
              <div style={{ width: '100%', height: '10px', backgroundColor: '#E2E8F0', borderRadius: '10px', overflow: 'hidden' }}>
                <div style={{
                  width: `${Math.min(100, (insigniaSeleccionada.actual / insigniaSeleccionada.meta) * 100)}%`,
                  height: '100%',
                  backgroundColor: insigniaSeleccionada.color,
                  borderRadius: '10px'
                }} />
              </div>
            </div>

            <button 
              onClick={() => setMostrarCeleb(false)}
              style={{
                width: '100%',
                padding: '14px',
                backgroundColor: insigniaSeleccionada.color,
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '16px',
                fontWeight: 900,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: `0 4px 14px ${insigniaSeleccionada.color}44`
              }}
            >
              ¡ENTENDIDO!
            </button>
          </div>
        </div>
      )}

    </div>
  );
}