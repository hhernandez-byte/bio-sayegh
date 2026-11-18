import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  MapPin, 
  Award, 
  BarChart3, 
  TreePine,
  Zap
} from 'lucide-react';

export default function Home({ usuario }) {
  const esInvitado = usuario?.rol === 'invitado';

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

        /* BOTONES DE LAS TARJETAS: #03658C EN REPOSO Y #338C30 EN HOVER */
        .btn-card-eco {
          background-color: #03658C;
          color: #FFFFFF;
          font-weight: 800;
          border-radius: 12px;
          border: 2px solid #03658C;
          cursor: pointer;
          transition: all 0.25s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .btn-card-eco:hover {
          background-color: #338C30;
          border-color: #338C30;
          color: #FFFFFF;
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
                BIO-SAYEGH
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
              Plataforma ecológica para la geolocalización de residuos, limpieza colaborativa y gamificación ambiental por cursos en el Colegio San Alberto Magno.
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
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 8px 0', color: '#03658C' }}>Mapa Geolocalizador</h3>
            <p style={{ fontSize: '0.85rem', color: '#8C644D', lineHeight: 1.5, marginBottom: '20px', fontWeight: 600 }}>
              Ubica puntos de acumulación de basura en tiempo real sobre el plano vectorial del colegio.
            </p>
            <Link to="/mapa" className="btn-card-eco" style={{ width: '100%', padding: '10px', fontSize: '0.85rem', boxSizing: 'border-box' }}>
              Ver Mapa Interactivo
            </Link>
          </div>

          <div className="card-eco" style={{ textAlign: 'center' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '16px', backgroundColor: '#03658C', border: '2px solid #A6D9A5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#FFFFFF' }}>
              <Award size={30} />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 8px 0', color: '#03658C' }}>Ruta de Insignias</h3>
            <p style={{ fontSize: '0.85rem', color: '#8C644D', lineHeight: 1.5, marginBottom: '20px', fontWeight: 600 }}>
              Camino interactivo con anuncios de celebración para reconocer logros ecológicos por salones.
            </p>
            <Link to="/insignias" className="btn-card-eco" style={{ width: '100%', padding: '10px', fontSize: '0.85rem', boxSizing: 'border-box' }}>
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
            <Link to="/estadisticas" className="btn-card-eco" style={{ width: '100%', padding: '10px', fontSize: '0.85rem', boxSizing: 'border-box' }}>
              Ver Estadísticas
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}