import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Send, 
  Award, 
  ShieldAlert,
  Info,
  Smile
} from 'lucide-react';

const ZONAS = [
  { id: 'iglesia', nombre: 'Iglesia / Capilla' },
  { id: 'aulas_principales', nombre: 'Aulas Principales (1 a 6)' },
  { id: 'preescolar', nombre: 'Preescolar / Kinder' },
  { id: 'aula_9', nombre: 'Aula 9' },
  { id: 'aula_izq_2', nombre: 'Aula' },
  { id: 'sistemas2', nombre: 'Sala de Sistemas 2' },
  { id: 'aula_izq_4', nombre: 'Aula' },
  { id: 'aula_11', nombre: 'Aula 11' },
  { id: 'oficinas_izq', nombre: 'Oficinas' },
  { id: 'cancha', nombre: 'Cancha Deportiva' },
  { id: 'porteria', nombre: 'Portería' },
  { id: 'area_descanso', nombre: 'Área de Descanso / Gradas' },
  { id: 'parque', nombre: 'Parque Infantil' },
  { id: 'kiosco', nombre: 'Kiosco' },
  { id: 'fuente', nombre: 'Fuente / Patio Central' },
  { id: 'aulas_123', nombre: 'Bloque Aulas (1, 2, 3)' },
  { id: 'coordinacion', nombre: 'Coordinación' },
  { id: 'enfermeria', nombre: 'Enfermería' },
  { id: 'bodegas', nombre: 'Bodegas' },
  { id: 'casa_cural', nombre: 'Casa Cural' },
  { id: 'cafeteria', nombre: 'Cafetería' },
  { id: 'sistemas1', nombre: 'Sala de Sistemas 1' },
  { id: 'biblioteca', nombre: 'Biblioteca' },
  { id: 'banos', nombre: 'Baños' },
];

export default function MapaPage() {
  const rol = localStorage.getItem('rol_usuario');
  const esInvitado = rol === 'invitado';

  const [zonaId, setZonaId] = useState('cafeteria');
  const [nivelResiduos, setNivelResiduos] = useState('Alto');
  const [tipoResiduo, setTipoResiduo] = useState('Plásticos y Empaques');
  const [descripcion, setDescripcion] = useState('');
  const [reportadoPor, setReportadoPor] = useState('');

  const [reportes, setReportes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('reportes_residuos') || '[]');
    } catch (error) {
      console.error('Error al cargar reportes:', error);
      return [];
    }
  });
  const [puntosGuardados, setPuntosGuardados] = useState(120);

  const guardarReportes = (nuevos) => {
    setReportes(nuevos);
    localStorage.setItem('reportes_residuos', JSON.stringify(nuevos));
    window.dispatchEvent(new Event('storage'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!descripcion.trim() || !reportadoPor.trim()) return;

    const zonaObj = ZONAS.find((z) => z.id === zonaId);

    const nuevoReporte = {
      id: Date.now().toString(),
      zonaId,
      lugarNombre: zonaObj ? zonaObj.nombre : 'Zona General',
      nivelResiduos,
      tipoResiduo,
      descripcion,
      reportadoPor,
      fecha: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    guardarReportes([nuevoReporte, ...reportes]);
    setPuntosGuardados(puntosGuardados + 20);
    setDescripcion('');
    setReportadoPor('');
  };

  const resolverReporte = (id) => {
    const filtrados = reportes.filter((r) => r.id !== id);
    guardarReportes(filtrados);

    const limpiadosPrevios = parseInt(localStorage.getItem('zonas_limpiadas_count') || '0', 10);
    localStorage.setItem('zonas_limpiadas_count', (limpiadosPrevios + 1).toString());
    window.dispatchEvent(new Event('storage'));
  };

  const tieneAlerta = (id) => reportes.some((r) => r.zonaId === id);

  return (
    <div style={{ display: 'flex', width: '100vw', minHeight: '100vh', backgroundColor: '#FFFFFF', color: '#03658C', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      <style>{`
        @keyframes alertaRoja {
          0% { fill: #df1717; stroke: #df2121; stroke-width: 3px; }
          50% { fill: #d44141; stroke: #f72250; stroke-width: 5px; }
          100% { fill: #d13f4c; stroke: #e20f2b; stroke-width: 3px; }
        }
        .zona-alerta {
          animation: alertaRoja 1.2s infinite ease-in-out;
          cursor: pointer;
        }

        /* BLOQUES ARQUITECTÓNICOS CON ILUMINACIÓN EN HOVER */
        .edificio-bloque {
          fill: #F0F9F5;
          stroke: #03658C;
          stroke-width: 2px;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }
        .edificio-bloque:hover {
          fill: #A6D9A5 !important;
          stroke: #338C30 !important;
          stroke-width: 3.5px !important;
          filter: drop-shadow(0px 0px 12px rgba(166, 217, 165, 0.95));
        }

        text {
          user-select: none;
          pointer-events: none;
          font-family: system-ui, -apple-system, sans-serif;
          font-weight: 800;
        }
      `}</style>

      {/* PANEL IZQUIERDO CON AZUL DOMINANTE (#03658C) */}
      <div style={{ width: '380px', backgroundColor: '#03658C', borderRight: '4px solid #338C30', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', color: '#FFFFFF' }}>
        
        <div style={{ backgroundColor: '#338C30', padding: '14px', borderRadius: '12px', border: '2px solid #A6D9A5' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1rem', margin: 0, color: '#A6D9A5', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', fontWeight: 800 }}>
              <Award size={20} /> Eco-Guardianes
            </h2>
            <span style={{ backgroundColor: '#8C644D', color: '#FFFFFF', padding: '3px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>
              {puntosGuardados} PTS
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#FFFFFF', margin: '6px 0 0 0', fontWeight: 600, opacity: 0.95 }}>
            Haz clic sobre cualquier área en el mapa para reportar o revisar problemas.
          </p>
        </div>

        {!esInvitado ? (
          <form onSubmit={handleSubmit} style={{ backgroundColor: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '2px solid #338C30', display: 'flex', flexDirection: 'column', gap: '12px', color: '#03658C' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#338C30', margin: 0, display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', fontWeight: 800 }}>
              <AlertTriangle color="#8C644D" size={16} /> Reportar Residuos
            </h3>

            <div>
              <label style={{ fontSize: '0.7rem', color: '#8C644D', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>UBICACIÓN SELECCIONADA</label>
              <select 
                value={zonaId} 
                onChange={(e) => setZonaId(e.target.value)}
                style={{ width: '100%', padding: '8px', backgroundColor: '#FFFFFF', border: '2px solid #03658C', borderRadius: '6px', color: '#03658C', fontSize: '0.8rem', fontWeight: 700 }}
              >
                {ZONAS.map((z) => (
                  <option key={z.id} value={z.id}>{z.nombre}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '0.7rem', color: '#8C644D', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>CANTIDAD</label>
                <select 
                  value={nivelResiduos} 
                  onChange={(e) => setNivelResiduos(e.target.value)}
                  style={{ width: '100%', padding: '8px', backgroundColor: '#FFFFFF', border: '2px solid #03658C', borderRadius: '6px', color: '#03658C', fontSize: '0.8rem', fontWeight: 700 }}
                >
                  <option value="Alto">Alto (Crítico)</option>
                  <option value="Medio">Medio</option>
                  <option value="Bajo">Bajo</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', color: '#8C644D', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>TIPO</label>
                <select 
                  value={tipoResiduo} 
                  onChange={(e) => setTipoResiduo(e.target.value)}
                  style={{ width: '100%', padding: '8px', backgroundColor: '#FFFFFF', border: '2px solid #03658C', borderRadius: '6px', color: '#03658C', fontSize: '0.8rem', fontWeight: 700 }}
                >
                  <option value="Plásticos y Empaques">Plásticos</option>
                  <option value="Comida / Orgánicos">Orgánicos</option>
                  <option value="Papeles y Hojas">Papel</option>
                  <option value="Varios">Varios</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.7rem', color: '#8C644D', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>OBSERVACIONES</label>
              <input 
                type="text" 
                placeholder="Detalle de la situación..."
                value={descripcion} 
                onChange={(e) => setDescripcion(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', backgroundColor: '#FFFFFF', border: '2px solid #03658C', borderRadius: '6px', color: '#03658C', fontSize: '0.8rem', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.7rem', color: '#8C644D', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>REPORTADO POR</label>
              <input 
                type="text" 
                placeholder="Nombre o Curso"
                value={reportadoPor} 
                onChange={(e) => setReportadoPor(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', backgroundColor: '#FFFFFF', border: '2px solid #03658C', borderRadius: '6px', color: '#03658C', fontSize: '0.8rem', boxSizing: 'border-box' }}
              />
            </div>

            <button 
              type="submit" 
              style={{ padding: '10px', backgroundColor: '#338C30', color: '#FFFFFF', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.8rem', marginTop: '4px' }}
            >
              <Send size={14} /> EMITIR ALERTA DE RESIDUOS
            </button>
          </form>
        ) : (
          <div style={{ padding: '12px', backgroundColor: '#FFFFFF', borderRadius: '8px', color: '#03658C', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', border: '2px solid #A6D9A5' }}>
            <Info size={16} /> Modo Invitado: Solo Lectura.
          </div>
        )}

        <div style={{ backgroundColor: '#FFFFFF', padding: '14px', borderRadius: '12px', border: '2px solid #A6D9A5', color: '#03658C' }}>
          <h3 style={{ fontSize: '0.8rem', color: '#8C644D', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase', fontWeight: 800 }}>
            <ShieldAlert size={16} /> Reportes Activos ({reportes.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
            {reportes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '10px', color: '#338C30', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 800 }}>
                <Smile size={16} /> El campus está limpio
              </div>
            ) : (
              reportes.map((r) => (
                <div key={r.id} style={{ backgroundColor: '#FFFFFF', borderLeft: '4px solid #8C644D', padding: '8px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #A6D9A5', borderRight: '1px solid #A6D9A5', borderBottom: '1px solid #A6D9A5' }}>
                  <div>
                    <strong style={{ color: '#8C644D', fontSize: '0.75rem', display: 'block' }}>{r.lugarNombre}</strong>
                    <span style={{ fontSize: '0.7rem', color: '#03658C', display: 'block', fontWeight: 600 }}>{r.descripcion}</span>
                  </div>
                  <button 
                    onClick={() => resolverReporte(r.id)} 
                    style={{ backgroundColor: '#338C30', border: 'none', color: '#FFFFFF', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.68rem', fontWeight: 'bold' }}
                  >
                    Sanear
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* MAPA SVG CON ILUMINACIÓN MENTA EN HOVER */}
      <div style={{ flex: 1, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
        <div style={{ position: 'relative', width: '980px', height: '760px', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '3px solid #03658C', boxShadow: '0 15px 35px rgba(3, 101, 140, 0.12)' }}>
          <svg viewBox="0 0 1000 780" width="100%" height="100%" style={{ textAnchor: 'middle' }}>
            
            <defs>
              <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#03658C" />
                <stop offset="50%" stopColor="#338C30" />
                <stop offset="100%" stopColor="#A6D9A5" />
              </linearGradient>
            </defs>

            {/* 1. IGLESIA */}
            <rect x="140" y="30" width="230" height="130" rx="6" className={tieneAlerta('iglesia') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('iglesia')} />
            <text x="255" y="100" fill={tieneAlerta('iglesia') ? '#FFFFFF' : '#03658C'} fontSize="13">IGLESIA / CAPILLA</text>

            {/* 2. AULAS PRINCIPALES */}
            <g onClick={() => setZonaId('aulas_principales')}>
              {[390, 440, 490, 540, 590, 640].map((xPos, idx) => (
                <rect key={idx} x={xPos} y="30" width="50" height="130" rx="3" className={tieneAlerta('aulas_principales') ? 'zona-alerta' : 'edificio-bloque'} />
              ))}
              <text x="540" y="100" fill={tieneAlerta('aulas_principales') ? '#FFFFFF' : '#03658C'} fontSize="11">AULAS PRINCIPALES (1 - 6)</text>
            </g>

            {/* 3. PREESCOLAR */}
            <rect x="705" y="30" width="130" height="130" rx="8" fill={tieneAlerta('preescolar') ? '#8C644D' : 'url(#rainbowGrad)'} stroke="#338C30" strokeWidth="2.5" className={tieneAlerta('preescolar') ? 'zona-alerta' : ''} style={{ cursor: 'pointer' }} onClick={() => setZonaId('preescolar')} />
            <text x="770" y="100" fill="#FFFFFF" fontSize="12">PREESCOLAR</text>

            {/* 4. BLOQUE IZQUIERDO */}
            <g>
              <rect x="15" y="220" width="120" height="50" rx="4" className={tieneAlerta('aula_9') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('aula_9')} />
              <text x="75" y="250" fill="#03658C" fontSize="11">AULA 9</text>

              <rect x="15" y="278" width="120" height="50" rx="4" className={tieneAlerta('aula_izq_2') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('aula_izq_2')} />
              <text x="75" y="308" fill="#03658C" fontSize="11">AULA</text>

              <rect x="15" y="336" width="120" height="50" rx="4" className={tieneAlerta('sistemas2') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('sistemas2')} />
              <text x="75" y="366" fill="#03658C" fontSize="10">SALA SISTEMAS 2</text>

              <rect x="15" y="394" width="120" height="50" rx="4" className={tieneAlerta('aula_izq_4') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('aula_izq_4')} />
              <text x="75" y="424" fill="#03658C" fontSize="11">AULA</text>

              <rect x="15" y="452" width="120" height="50" rx="4" className={tieneAlerta('aula_11') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('aula_11')} />
              <text x="75" y="482" fill="#03658C" fontSize="11">AULA 11</text>

              <rect x="15" y="510" width="120" height="50" rx="4" className={tieneAlerta('oficinas_izq') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('oficinas_izq')} />
              <text x="75" y="540" fill="#8C644D" fontSize="11">OFICINAS</text>
            </g>

            {/* 5. CANCHA DEPORTIVA */}
            <rect x="165" y="220" width="160" height="490" rx="6" className={tieneAlerta('cancha') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('cancha')} />
            <line x1="165" y1="465" x2="325" y2="465" stroke="#338C30" strokeWidth="2"/>
            <circle cx="245" cy="465" r="30" fill="none" stroke="#338C30" strokeWidth="2"/>
            <text x="245" y="350" fill="#338C30" fontSize="12">CANCHA DEPORTIVA</text>

            {/* 6. PORTERÍA */}
            <rect x="200" y="730" width="90" height="35" rx="4" className={tieneAlerta('porteria') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('porteria')} />
            <text x="245" y="752" fill="#03658C" fontSize="10">PORTERÍA</text>

            {/* 7. ÁREA DE DESCANSO */}
            <rect x="350" y="180" width="360" height="40" rx="6" className={tieneAlerta('area_descanso') ? 'zona-alerta' : 'edificio-bloque'} strokeDasharray="4,4" onClick={() => setZonaId('area_descanso')} />
            <text x="530" y="205" fill="#8C644D" fontSize="11">ÁREA DE DESCANSO / GRADAS</text>

            {/* 8. PARQUE INFANTIL */}
            <rect x="355" y="380" width="85" height="240" rx="8" className={tieneAlerta('parque') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('parque')} />
            <text x="397" y="505" fill="#338C30" fontSize="11">PARQUE INFANTIL</text>

            {/* 9. KIOSCO */}
            <circle cx="495" cy="670" r="32" className={tieneAlerta('kiosco') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('kiosco')} />
            <text x="495" y="674" fill="#8C644D" fontSize="10">KIOSCO</text>

            {/* 10. FUENTE */}
            <polygon points="495,305 520,315 530,340 520,365 495,375 470,365 460,340 470,315" className={tieneAlerta('fuente') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('fuente')} />
            <text x="495" y="344" fill="#03658C" fontSize="10">FUENTE</text>

            {/* 11. BLOQUE AULAS (1, 2, 3) */}
            <g onClick={() => setZonaId('aulas_123')}>
              <rect x="560" y="240" width="62" height="150" rx="4" className={tieneAlerta('aulas_123') ? 'zona-alerta' : 'edificio-bloque'} />
              <text x="591" y="315" fill="#03658C" fontSize="11" transform="rotate(-90, 591, 315)">AULA 1</text>
              <rect x="628" y="240" width="62" height="150" rx="4" className={tieneAlerta('aulas_123') ? 'zona-alerta' : 'edificio-bloque'} />
              <text x="659" y="315" fill="#03658C" fontSize="11" transform="rotate(-90, 659, 315)">AULA 2</text>
              <rect x="696" y="240" width="62" height="150" rx="4" className={tieneAlerta('aulas_123') ? 'zona-alerta' : 'edificio-bloque'} />
              <text x="727" y="315" fill="#03658C" fontSize="11" transform="rotate(-90, 727, 315)">AULA 3</text>
            </g>

            {/* 12. CASA CURAL */}
            <rect x="560" y="420" width="200" height="150" rx="6" className={tieneAlerta('casa_cural') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('casa_cural')} />
            <text x="660" y="500" fill="#03658C" fontSize="11">CASA CURAL</text>

            {/* 13. CAFETERÍA */}
            <rect x="630" y="630" width="130" height="100" rx="6" className={tieneAlerta('cafeteria') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('cafeteria')} />
            <text x="695" y="685" fill="#8C644D" fontSize="12">CAFETERÍA</text>

            {/* 14. BLOQUE ADMINISTRATIVO */}
            <g>
              <rect x="800" y="180" width="52" height="130" rx="4" className={tieneAlerta('coordinacion') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('coordinacion')} />
              <text x="826" y="245" fill="#03658C" fontSize="10" transform="rotate(-90, 826, 245)">COORDINACIÓN</text>
              <rect x="856" y="180" width="52" height="130" rx="4" className={tieneAlerta('enfermeria') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('enfermeria')} />
              <text x="882" y="245" fill="#8C644D" fontSize="10" transform="rotate(-90, 882, 245)">ENFERMERÍA</text>
              <rect x="912" y="180" width="52" height="130" rx="4" className={tieneAlerta('bodegas') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('bodegas')} />
              <text x="938" y="245" fill="#8C644D" fontSize="10" transform="rotate(-90, 938, 245)">BODEGAS</text>
              <rect x="800" y="324" width="164" height="65" rx="4" className={tieneAlerta('sistemas1') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('sistemas1')} />
              <text x="882" y="361" fill="#03658C" fontSize="11">SALA SISTEMAS 1</text>
            </g>

            {/* 15. BIBLIOTECA */}
            <rect x="800" y="402" width="164" height="170" rx="5" className={tieneAlerta('biblioteca') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('biblioteca')} />
            <text x="882" y="492" fill="#03658C" fontSize="12">BIBLIOTECA</text>

            {/* 16. BAÑOS */}
            <rect x="800" y="580" width="164" height="150" rx="5" className={tieneAlerta('banos') ? 'zona-alerta' : 'edificio-bloque'} onClick={() => setZonaId('banos')} />
            <text x="882" y="660" fill="#03658C" fontSize="12">SERVICIOS SANITARIOS</text>

          </svg>
        </div>
      </div>
    </div>
  );
}