import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  RefreshCw, 
  Apple, 
  Trash2, 
  Milk, 
  BarChart3, 
  Cpu, 
  CheckCircle2, 
  Zap, 
  Sparkles,
  PieChart
} from 'lucide-react';

export default function EstadisticasPage() {
  // Estado telemétrico de clasificación de residuos recopilados por el EcoBot
  const [conteoResiduos, setConteoResiduos] = useState({
    organicos: 42,      // Residuos de comida, cáscaras, etc.
    inorganicos: 28,    // Empaques, cartón, envoltorios
    botellasPlastico: 65, // Botellas PET y plásticos duros
    ultimaActualizacion: "En tiempo real"
  });

  const [cargando, setCargando] = useState(false);

  // Total acumulado
  const totalRecolectado = conteoResiduos.organicos + conteoResiduos.inorganicos + conteoResiduos.botellasPlastico;

  // Porcentajes para métricas visuales
  const pctOrganicos = totalRecolectado > 0 ? Math.round((conteoResiduos.organicos / totalRecolectado) * 100) : 0;
  const pctInorganicos = totalRecolectado > 0 ? Math.round((conteoResiduos.inorganicos / totalRecolectado) * 100) : 0;
  const pctPlastico = totalRecolectado > 0 ? Math.round((conteoResiduos.botellasPlastico / totalRecolectado) * 100) : 0;

  // Función preparada para consumir la API en MongoDB / IoT del Robot
  const actualizarClasificacion = async () => {
    setCargando(true);
    try {
      // AQUÍ CONECTARÁS TU API POSTERIORMENTE:
      // const res = await fetch('http://localhost:5000/api/robot/residuos');
      // const data = await res.json();
      // setConteoResiduos(data);

      setTimeout(() => {
        setConteoResiduos((prev) => ({
          ...prev,
          botellasPlastico: prev.botellasPlastico + 1,
          ultimaActualizacion: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));
        setCargando(false);
      }, 600);
    } catch (error) {
      console.error("Error consultando la API de clasificación:", error);
      setCargando(false);
    }
  };

  useEffect(() => {
    const intervalo = setInterval(actualizarClasificacion, 12000);
    return () => clearInterval(intervalo);
  }, []);

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
      alignItems: 'center'
    }}>
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.08); }
        }
        .anim-pulse {
          animation: pulseGlow 2s infinite ease-in-out;
        }

        .card-clasificacion {
          background: #FFFFFF;
          border: 2.5px solid #03658C;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 8px 24px rgba(3, 101, 140, 0.08);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .card-clasificacion:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 30px rgba(3, 101, 140, 0.16);
        }

        .btn-sync {
          background-color: #338C30;
          color: #FFFFFF;
          border: 2px solid #A6D9A5;
          padding: 10px 18px;
          border-radius: 12px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
        }
        .btn-sync:hover {
          background-color: #03658C;
          transform: scale(1.02);
        }
      `}</style>

      {/* BANNER SUPERIOR */}
      <div style={{
        width: '100%',
        maxWidth: '1100px',
        backgroundColor: '#03658C',
        border: '3px solid #338C30',
        borderRadius: '24px',
        padding: '24px 32px',
        color: '#FFFFFF',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '32px',
        boxShadow: '0 12px 30px rgba(3, 101, 140, 0.18)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
          <div style={{
            backgroundColor: '#338C30',
            border: '2px solid #A6D9A5',
            padding: '14px',
            borderRadius: '20px',
            color: '#FFFFFF'
          }}>
            <Bot size={38} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="anim-pulse" style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#A6D9A5' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#A6D9A5', textTransform: 'uppercase', letterSpacing: '1px' }}>
                SISTEMA DE CLASIFICACIÓN IoT EN VIVO
              </span>
            </div>
            <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.5px' }}>
              Métricas del EcoBot COLSAM
            </h1>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button onClick={actualizarClasificacion} className="btn-sync">
            <RefreshCw size={18} className={cargando ? 'anim-pulse' : ''} /> 
            {cargando ? 'Consultando API...' : 'Actualizar Clasificación'}
          </button>
        </div>
      </div>

      {/* TARJETA DEL TOTAL ACUMULADO */}
      <div style={{
        width: '100%',
        maxWidth: '1100px',
        backgroundColor: 'rgba(166, 217, 165, 0.2)',
        border: '2.5px solid #338C30',
        borderRadius: '20px',
        padding: '20px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '32px',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ backgroundColor: '#338C30', padding: '10px', borderRadius: '14px', color: '#FFFFFF' }}>
            <Sparkles size={24} />
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#8C644D', textTransform: 'uppercase' }}>
              Total de Residuos Clasificados
            </span>
            <strong style={{ display: 'block', fontSize: '1.8rem', fontWeight: 900, color: '#03658C' }}>
              {totalRecolectado} <span style={{ fontSize: '1rem', color: '#338C30' }}>unidades</span>
            </strong>
          </div>
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#8C644D' }}>
          Última actualización: {conteoResiduos.ultimaActualizacion}
        </span>
      </div>

      {/* GRILLA DE LAS 3 CATEGORÍAS PRINCIPALES */}
      <div style={{
        width: '100%',
        maxWidth: '1100px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        
        {/* 1. ORGÁNICOS */}
        <div className="card-clasificacion" style={{ borderLeft: '7px solid #338C30' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ backgroundColor: 'rgba(51, 140, 48, 0.12)', padding: '10px', borderRadius: '12px', color: '#338C30' }}>
              <Apple size={28} />
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#338C30', backgroundColor: '#F0F9F5', padding: '4px 10px', borderRadius: '20px', border: '1px solid #A6D9A5' }}>
              {pctOrganicos}% DEL TOTAL
            </span>
          </div>

          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#8C644D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Residuos Orgánicos
          </span>
          <span style={{ fontSize: '2.4rem', fontWeight: 900, color: '#03658C', display: 'block', margin: '4px 0 12px 0', lineHeight: 1 }}>
            {conteoResiduos.organicos}
          </span>

          <p style={{ fontSize: '0.8rem', color: '#8C644D', margin: 0, fontWeight: 600 }}>
            Restos de comida, cáscaras y materia biodegradable detectada.
          </p>

          <div style={{ width: '100%', height: '8px', backgroundColor: '#F0F9F5', borderRadius: '10px', marginTop: '16px', overflow: 'hidden', border: '1px solid #A6D9A5' }}>
            <div style={{ width: `${pctOrganicos}%`, height: '100%', backgroundColor: '#338C30', borderRadius: '10px' }} />
          </div>
        </div>

        {/* 2. INORGÁNICOS */}
        <div className="card-clasificacion" style={{ borderLeft: '7px solid #8C644D' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ backgroundColor: 'rgba(140, 100, 77, 0.12)', padding: '10px', borderRadius: '12px', color: '#8C644D' }}>
              <Trash2 size={28} />
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#8C644D', backgroundColor: '#FFF8F5', padding: '4px 10px', borderRadius: '20px', border: '1px solid #8C644D' }}>
              {pctInorganicos}% DEL TOTAL
            </span>
          </div>

          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#8C644D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Residuos Inorgánicos
          </span>
          <span style={{ fontSize: '2.4rem', fontWeight: 900, color: '#03658C', display: 'block', margin: '4px 0 12px 0', lineHeight: 1 }}>
            {conteoResiduos.inorganicos}
          </span>

          <p style={{ fontSize: '0.8rem', color: '#8C644D', margin: 0, fontWeight: 600 }}>
            Empaques de snacks, papel, cartón y envoltorios no reciclables.
          </p>

          <div style={{ width: '100%', height: '8px', backgroundColor: '#FFF8F5', borderRadius: '10px', marginTop: '16px', overflow: 'hidden', border: '1px solid #8C644D' }}>
            <div style={{ width: `${pctInorganicos}%`, height: '100%', backgroundColor: '#8C644D', borderRadius: '10px' }} />
          </div>
        </div>

        {/* 3. BOTELLAS DE PLÁSTICO */}
        <div className="card-clasificacion" style={{ borderLeft: '7px solid #03658C' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div style={{ backgroundColor: 'rgba(3, 101, 140, 0.12)', padding: '10px', borderRadius: '12px', color: '#03658C' }}>
              <Milk size={28} />
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#03658C', backgroundColor: '#F0F8FF', padding: '4px 10px', borderRadius: '20px', border: '1px solid #03658C' }}>
              {pctPlastico}% DEL TOTAL
            </span>
          </div>

          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#8C644D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Botellas de Plástico
          </span>
          <span style={{ fontSize: '2.4rem', fontWeight: 900, color: '#03658C', display: 'block', margin: '4px 0 12px 0', lineHeight: 1 }}>
            {conteoResiduos.botellasPlastico}
          </span>

          <p style={{ fontSize: '0.8rem', color: '#8C644D', margin: 0, fontWeight: 600 }}>
            Botellas PET, plásticos duros y envases de bebidas reciclables.
          </p>

          <div style={{ width: '100%', height: '8px', backgroundColor: '#F0F8FF', borderRadius: '10px', marginTop: '16px', overflow: 'hidden', border: '1px solid #03658C' }}>
            <div style={{ width: `${pctPlastico}%`, height: '100%', backgroundColor: '#03658C', borderRadius: '10px' }} />
          </div>
        </div>

      </div>

      {/* CONSOLA DE CONEXIÓN CON LA BASE DE DATOS MONGODB */}
      <div style={{
        width: '100%',
        maxWidth: '1100px',
        backgroundColor: '#FFFFFF',
        border: '3px solid #03658C',
        borderRadius: '24px',
        padding: '24px 28px',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
          <Cpu size={22} color="#03658C" />
          <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 900, color: '#03658C' }}>
            ESTADO DEL BACKEND & MONGODB
          </h3>
        </div>

        <div style={{
          backgroundColor: '#03658C',
          color: '#A6D9A5',
          fontFamily: 'monospace',
          fontSize: '0.82rem',
          padding: '16px',
          borderRadius: '14px',
          lineHeight: 1.6,
          border: '2px solid #338C30'
        }}>
          <div>[API ENDPOINT]: /api/robot/residuos</div>
          <div>[CLUSTERING]: Detección de sensores ópticos por categoría en tiempo real</div>
          <div>[DATABASE]: MongoDB 'biosayegh_colsam' -&gt; colección 'clasificacion_ecobot'</div>
          <div style={{ color: '#FFFFFF', marginTop: '6px', fontWeight: 'bold' }}>
            STATUS: Listo para sincronizar conteos físicos cuando el EcoBot empiece a recolectar.
          </div>
        </div>
      </div>
  
 </div>
);
}
