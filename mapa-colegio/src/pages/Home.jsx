import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Award, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp,
  Leaf,
  Trophy,
  Flame,
  ShieldCheck,
  Zap,
  Target,
  BarChart3
} from 'lucide-react';

export default function Home({ alNavegar }) {
  const [estadisticas, setEstadisticas] = useState({
    totalReportes: 0,
    puntos: 180,
    zonasLimpias: 85
  });

  const [misiones, setMisiones] = useState([
    { id: 1, titulo: 'Inspección de Cafetería', recompensa: '+30 PTS', completada: false },
    { id: 2, titulo: 'Reportar contenedor lleno en Aulas', recompensa: '+20 PTS', completada: false },
    { id: 3, titulo: 'Revisar la Cancha Deportiva', recompensa: '+25 PTS', completada: true }
  ]);

  const salon = localStorage.getItem('salon_activo') || '10-A';
  const rol = localStorage.getItem('rol_usuario') || 'Estudiante';

  useEffect(() => {
    try {
      const reportes = JSON.parse(localStorage.getItem('reportes_residuos') || '[]');
      setEstadisticas(prev => ({
        ...prev,
        totalReportes: reportes.length,
        puntos: 180 + (reportes.length * 20)
      }));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const completarMision = (id) => {
    setMisiones(misiones.map(m => {
      if (m.id === id && !m.completada) {
        setEstadisticas(prev => ({ ...prev, puntos: prev.puntos + 25 }));
        return { ...m, completada: true };
      }
      return m;
    }));
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#060913',
      color: '#f1f5f9',
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      padding: '30px 20px',
      boxSizing: 'border-box',
      backgroundImage: 'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(14, 165, 233, 0.15), rgba(255, 255, 255, 0))'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .glow-title {
          background: linear-gradient(135deg, #ffffff 30%, #38bdf8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .card-cyber {
          background: rgba(13, 22, 41, 0.7);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .card-cyber:hover {
          transform: translateY(-4px);
          border-color: rgba(56, 189, 248, 0.3);
          box-shadow: 0 10px 30px -10px rgba(56, 189, 248, 0.2);
        }

        .btn-glow {
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          color: white;
          font-weight: 700;
          border-radius: 12px;
          border: none;
          box-shadow: 0 0 20px rgba(2, 132, 199, 0.4);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-glow:hover {
          transform: scale(1.02);
          box-shadow: 0 0 30px rgba(2, 132, 199, 0.7);
        }

        .btn-outline {
          background: rgba(15, 23, 42, 0.6);
          color: #e2e8f0;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-outline:hover {
          background: rgba(30, 41, 59, 0.8);
          border-color: rgba(56, 189, 248, 0.4);
          color: #38bdf8;
        }

        .mision-item {
          transition: all 0.2s ease;
        }
        .mision-item:hover {
          background: rgba(30, 41, 59, 0.5) !important;
        }
      `}</style>

      <div style={{ maxWidth: '1150px', margin: '0 auto' }}>

        {/* --- HEADER PRINCIPAL / HERO --- */}
        <div className="card-cyber" style={{ padding: '36px', marginBottom: '28px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'rgba(56, 189, 248, 0.12)', filter: 'blur(60px)', borderRadius: '50%' }}></div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '5px 12px', borderRadius: '30px', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Leaf size={14} /> MONITOREO AMBIENTAL EN VIVO
                </span>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Salón Destacado: <strong style={{ color: '#38bdf8' }}>{salon}</strong> ({rol})</span>
              </div>

              <h1 className="glow-title" style={{ fontSize: '2.8rem', fontWeight: 800, margin: 0, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
                Campus Limpio & Inteligente
              </h1>
              <p style={{ color: '#94a3b8', fontSize: '1rem', marginTop: '10px', maxWidth: '600px', lineHeight: 1.5 }}>
                Gestiona los residuos, reporta alertas en el mapa interactivo y acumula puntos para posicionar a tu salón en el ranking del colegio.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '200px' }}>
              <button className="btn-glow" onClick={() => alNavegar && alNavegar('mapa')} style={{ padding: '14px 24px', fontSize: '0.95rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <MapPin size={20} /> Ir al Mapa Interactivo
              </button>
              <button className="btn-outline" onClick={() => alNavegar && alNavegar('insignias')} style={{ padding: '12px 20px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <Award size={18} color="#fbbf24" /> Ver Logros del Curso
              </button>
            </div>
          </div>
        </div>

        {/* --- TARJETAS DE IMPACTO EN TIEMPO REAL --- */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '28px' }}>
          
          <div className="card-cyber" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Eco-Puntos del Salón</span>
              <div style={{ background: 'rgba(251, 191, 36, 0.15)', padding: '10px', borderRadius: '12px', color: '#fbbf24' }}>
                <Flame size={22} />
              </div>
            </div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '12px 0 4px 0', color: '#fbbf24' }}>
              {estadisticas.puntos} <span style={{ fontSize: '1rem', fontWeight: 600, color: '#f59e0b' }}>PTS</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={14} color="#34d399" /> +25 pts obtenidos esta semana
            </p>
          </div>

          <div className="card-cyber" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Reportes Generados</span>
              <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '10px', borderRadius: '12px', color: '#38bdf8' }}>
                <Zap size={22} />
              </div>
            </div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '12px 0 4px 0', color: '#f1f5f9' }}>
              {estadisticas.totalReportes}
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>Alertas registradas en el mapa</p>
          </div>

          <div className="card-cyber" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Salubridad del Campus</span>
              <div style={{ background: 'rgba(52, 211, 153, 0.15)', padding: '10px', borderRadius: '12px', color: '#34d399' }}>
                <ShieldCheck size={22} />
              </div>
            </div>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '12px 0 4px 0', color: '#34d399' }}>
              {estadisticas.zonasLimpias}%
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.8rem', margin: 0 }}>Zonas mantenidas en estado óptimo</p>
          </div>

        </div>

        {/* --- SECCIÓN INFERIOR: MISIONES Y RANKING DEL COLEGIO --- */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          
          {/* MISIONES DÍA */}
          <div className="card-cyber" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Target color="#38bdf8" size={22} />
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>Misiones Ecológicas del Día</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {misiones.map((m) => (
                <div 
                  key={m.id} 
                  className="mision-item"
                  onClick={() => completarMision(m.id)}
                  style={{
                    backgroundColor: m.completada ? 'rgba(16, 185, 129, 0.08)' : 'rgba(15, 23, 42, 0.6)',
                    border: m.completada ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255, 255, 255, 0.05)',
                    padding: '14px 16px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: m.completada ? 'default' : 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CheckCircle2 size={20} color={m.completada ? '#34d399' : '#64748b'} />
                    <span style={{ fontSize: '0.9rem', textDecoration: m.completada ? 'line-through' : 'none', color: m.completada ? '#94a3b8' : '#e2e8f0', fontWeight: 500 }}>
                      {m.titulo}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, backgroundColor: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '4px 10px', borderRadius: '20px' }}>
                    {m.completada ? '¡Hecho!' : m.recompensa}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RANKING LÍDERES */}
          <div className="card-cyber" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <Trophy color="#fbbf24" size={22} />
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>Tabla de Líderes (Cursos)</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { pos: '1º', curso: 'Grado 11-B', pts: '340 PTS', color: '#fbbf24' },
                { pos: '2º', curso: 'Grado 10-A (Tu salón)', pts: '180 PTS', color: '#94a3b8' },
                { pos: '3º', curso: 'Grado 9-C', pts: '150 PTS', color: '#b45309' }
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', backgroundColor: 'rgba(15, 23, 42, 0.6)', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span style={{ fontWeight: 800, color: item.color, fontSize: '1.1rem', width: '24px' }}>{item.pos}</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f1f5f9' }}>{item.curso}</span>
                  </div>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#38bdf8' }}>{item.pts}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}