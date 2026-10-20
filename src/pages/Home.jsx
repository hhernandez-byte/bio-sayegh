import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  MapPin, 
  Award, 
  BarChart3, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Code, 
  HeartHandshake, 
  CheckCircle2,
  TreePine,
  Zap
} from 'lucide-react';

export default function Home({ usuario }) {
  const esInvitado = usuario?.rol === 'invitado';

  const [metricas, setMetricas] = useState({
    zonasLimpiadas: 0,
    reportesActivos: 0,
    puntosTotales: 120
  });

  useEffect(() => {
    const calcularImpacto = () => {
      try {
        const reportes = JSON.parse(localStorage.getItem('reportes_residuos') || '[]');
        const limpiados = parseInt(localStorage.getItem('zonas_limpiadas_count') || '0', 10);
        setMetricas({
          zonasLimpiadas: limpiados,
          reportesActivos: reportes.length,
          puntosTotales: 120 + (limpiados * 35) + (reportes.length * 15)
        });
      } catch (e) {
        console.error("Error cargando métricas:", e);
      }
    };

    calcularImpacto();
    window.addEventListener('storage', calcularImpacto);
    return () => window.removeEventListener('storage', calcularImpacto);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FFFFFF',
      color: '#03658C',
      fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      overflowX: 'hidden',
      position: 'relative'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800;900&display=swap');

        @keyframes floatLeaf {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
          50% { transform: translateY(-18px) rotate(10deg); opacity: 1; }
          100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
        }

        .anim-leaf-1 { animation: floatLeaf 4.5s ease-in-out infinite; }
        .anim-leaf-2 { animation: floatLeaf 6s ease-in-out infinite 1s; }

        /* DEGRADADO DOMINANTE EN AZUL (#03658C) Y VERDE CLARO (#338C30) */
        .hero-banner {
          position: relative;
          width: 100%;
          min-height: 480px;
          border-radius: 28px;
          overflow: hidden;
          background: linear-gradient(135deg, #03658C 0%, #024e6d 45%, #338C30 100%);
          border: 3px solid #A6D9A5;
          box-shadow: 0 16px 40px rgba(3, 101, 140, 0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 50px 24px;
          box-sizing: border-box;
          color: #FFFFFF;
        }

        /* TARJETAS CON BASE BLANCA Y BORDES DOMINANTES */
        .card-eco {
          background: #FFFFFF;
          border: 2.5px solid #03658C;
          border-radius: 20px;
          padding: 24px;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 8px 24px rgba(3, 101, 140, 0.08);
        }

        .card-eco:hover {
          transform: translateY(-6px);
          border-color: #338C30;
          box-shadow: 0 14px 32px rgba(51, 140, 48, 0.2);
        }

        .btn-eco-primary {
          background-color: #338C30;
          color: #FFFFFF;
          font-weight: 800;
          border-radius: 12px;
          border: 2px solid #A6D9A5;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .btn-eco-primary:hover {
          background-color: #03658C;
          border-color: #FFFFFF;
          transform: translateY(-2px);
        }

        .btn-eco-secondary {
          background-color: #03658C;
          color: #FFFFFF;
          font-weight: 800;
          border-radius: 12px;
          border: 2px solid #A6D9A5;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .btn-eco-secondary:hover {
          background-color: #338C30;
          border-color: #FFFFFF;
          transform: translateY(-2px);
        }
      `}</style>

      {/* ELEMENTOS FLOTANTES EN MENTA Y VERDE */}
      <div style={{ position: 'absolute', top: '90px', left: '3%', pointerEvents: 'none', zIndex: 1, color: '#A6D9A5' }} className="anim-leaf-1">
        <Leaf size={46} />
      </div>
      <div style={{ position: 'absolute', top: '230px', right: '4%', pointerEvents: 'none', zIndex: 1, color: '#338C30' }} className="anim-leaf-2">
        <TreePine size={52} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px 20px', width: '100%', boxSizing: 'border-box', zIndex: 2 }}>

        {/* HERO BANNER */}
        <div className="hero-banner" style={{ marginBottom: '40px' }}>
          <div style={{ maxWidth: '800px' }}>
            
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#FFFFFF',
              border: '2px solid #A6D9A5',
              borderRadius: '30px',
              padding: '6px 20px',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: '#03658C',
              marginBottom: '20px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <Zap size={16} color="#338C30" />
              {esInvitado ? 'MODO INVITADO HABILITADO' : `SALÓN CONECTADO: ${usuario?.salon?.replace('salon_', '').toUpperCase() || '10-A'}`}
            </div>

            <h1 style={{
              fontSize: '3.2rem',
              fontWeight: 900,
              margin: '0 0 16px 0',
              lineHeight: 1.1,
              color: '#FFFFFF',
              textTransform: 'uppercase'
            }}>
              PROYECTO <br />
              <span style={{ color: '#A6D9A5' }}>
                BIO-SAYEGH COLSAM
              </span>
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: '#FFFFFF',
              maxWidth: '680px',
              margin: '0 auto 32px auto',
              lineHeight: 1.6,
              fontWeight: 600,
              opacity: 0.95
            }}>
              Plataforma ecológica para la geolocalización de residuos, limpieza colaborativa y gamificación ambiental por cursos en el Colegio Sagrado Corazón de Jesús.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/mapa" className="btn-eco-primary" style={{ padding: '16px 32px', fontSize: '1rem', gap: '10px' }}>
                <MapPin size={20} color="#A6D9A5" /> EXPLORAR MAPA DEL CAMPUS
              </Link>
              <Link to="/insignias" className="btn-eco-secondary" style={{ padding: '16px 28px', fontSize: '1rem', gap: '10px' }}>
                <Award size={20} color="#A6D9A5" /> RUTA DE INSIGNIAS
              </Link>
            </div>

          </div>
        </div>

        {/* MÉTRICAS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '50px'
        }}>
          <div className="card-eco" style={{ display: 'flex', alignItems: 'center', gap: '18px', borderLeft: '6px solid #338C30' }}>
            <div style={{ backgroundColor: 'rgba(51, 140, 48, 0.12)', border: '2px solid #338C30', padding: '16px', borderRadius: '16px', color: '#338C30' }}>
              <ShieldCheck size={32} />
            </div>
            <div>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#03658C', display: 'block', lineHeight: 1 }}>
                {metricas.zonasLimpiadas}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#8C644D', fontWeight: 800, textTransform: 'uppercase' }}>
                Zonas Saneadas
              </span>
            </div>
          </div>

          <div className="card-eco" style={{ display: 'flex', alignItems: 'center', gap: '18px', borderLeft: '6px solid #03658C' }}>
            <div style={{ backgroundColor: 'rgba(3, 101, 140, 0.12)', border: '2px solid #03658C', padding: '16px', borderRadius: '16px', color: '#03658C' }}>
              <Sparkles size={32} />
            </div>
            <div>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#03658C', display: 'block', lineHeight: 1 }}>
                {metricas.puntosTotales}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#8C644D', fontWeight: 800, textTransform: 'uppercase' }}>
                Eco-Puntos Acumulados
              </span>
            </div>
          </div>

          <div className="card-eco" style={{ display: 'flex', alignItems: 'center', gap: '18px', borderLeft: '6px solid #8C644D' }}>
            <div style={{ backgroundColor: 'rgba(140, 100, 77, 0.12)', border: '2px solid #8C644D', padding: '16px', borderRadius: '16px', color: '#8C644D' }}>
              <MapPin size={32} />
            </div>
            <div>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#03658C', display: 'block', lineHeight: 1 }}>
                {metricas.reportesActivos}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#8C644D', fontWeight: 800, textTransform: 'uppercase' }}>
                Reportes Activos
              </span>
            </div>
          </div>
        </div>

        {/* MÓDULOS */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#338C30', letterSpacing: '2px', textTransform: 'uppercase' }}>
            ARQUITECTURA AMBIENTAL
          </span>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#03658C', margin: '4px 0 0 0', textTransform: 'uppercase' }}>
            Componentes del Sistema
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '60px'
        }}>
          <div className="card-eco" style={{ textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: '#03658C', border: '2px solid #A6D9A5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#FFFFFF' }}>
              <MapPin size={30} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 8px 0', color: '#03658C' }}>Mapa Geolocalizado</h3>
            <p style={{ fontSize: '0.85rem', color: '#8C644D', lineHeight: 1.5, marginBottom: '20px', fontWeight: 600 }}>
              Ubica puntos de acumulación de basura en tiempo real sobre el plano vectorial del colegio.
            </p>
            <Link to="/mapa" className="btn-eco-primary" style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}>
              Ver Mapa Interactivo
            </Link>
          </div>

          <div className="card-eco" style={{ textAlign: 'center', border: '3px solid #338C30', backgroundColor: 'rgba(166, 217, 165, 0.15)' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: '#338C30', border: '2px solid #A6D9A5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#FFFFFF' }}>
              <Award size={30} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 8px 0', color: '#338C30' }}>Ruta de Insignias</h3>
            <p style={{ fontSize: '0.85rem', color: '#8C644D', lineHeight: 1.5, marginBottom: '20px', fontWeight: 600 }}>
              Camino interactivo con anuncios de celebración para reconocer logros ecológicos por salones.
            </p>
            <Link to="/insignias" className="btn-eco-primary" style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}>
              Explorar Insignias
            </Link>
          </div>

          <div className="card-eco" style={{ textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: '#03658C', border: '2px solid #A6D9A5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#FFFFFF' }}>
              <BarChart3 size={30} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 8px 0', color: '#03658C' }}>Métricas & Datos</h3>
            <p style={{ fontSize: '0.85rem', color: '#8C644D', lineHeight: 1.5, marginBottom: '20px', fontWeight: 600 }}>
              Visualiza estadísticas de residuos limpios y análisis de comportamiento ambiental por curso.
            </p>
            <Link to="/estadisticas" className="btn-eco-secondary" style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}>
              Ver Estadísticas
            </Link>
          </div>
        </div>

      </div>

      {/* FOOTER DOMINANTE EN AZUL CON DETALLES EN VERDE Y MENTA */}
      <footer style={{
        marginTop: 'auto',
        backgroundColor: '#03658C',
        borderTop: '4px solid #338C30',
        padding: '36px 20px 20px 20px',
        boxSizing: 'border-box',
        color: '#FFFFFF'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '28px', marginBottom: '28px', paddingBottom: '28px', borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ backgroundColor: '#338C30', padding: '6px', borderRadius: '8px', color: '#A6D9A5' }}>
                  <Leaf size={18} />
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#A6D9A5' }}>
                  Bio-Sayegh <span style={{ color: '#FFFFFF' }}>COLSAM</span>
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#FFFFFF', lineHeight: 1.6, margin: 0, opacity: 0.9 }}>
                Iniciativa tecnológica orientada al desarrollo sostenible y la gestión ecológica escolar.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#A6D9A5', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={16} /> Equipo de Trabajo
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: '#338C30', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.9rem', border: '2px solid #A6D9A5' }}>BS</div>
                <div>
                  <strong style={{ fontSize: '0.85rem', color: '#FFFFFF', display: 'block' }}>Desarrollo Bio-Sayegh</strong>
                  <span style={{ fontSize: '0.75rem', color: '#A6D9A5' }}>Proyecto de Ecología</span>
                </div>
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#A6D9A5', textTransform: 'uppercase', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HeartHandshake size={16} /> Institución
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#FFFFFF', margin: '0 0 4px 0', fontWeight: 700 }}>
                Colegio Sagrado Corazón de Jesús
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '0.75rem', color: '#A6D9A5' }}>
                <CheckCircle2 size={14} /> Sistema Ecológico Activo v2.5
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '0.78rem', color: '#A6D9A5' }}>
            <span>© {new Date().getFullYear()} Bio-Sayegh COLSAM. Todos los derechos reservados.</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Code size={14} color="#A6D9A5" /> Plataforma Ecológica Escolar
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}