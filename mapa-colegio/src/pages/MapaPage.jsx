import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Send, 
  CheckCircle2, 
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

  const [reportes, setReportes] = useState([]);
  const [puntosGuardados, setPuntosGuardados] = useState(120);

  useEffect(() => {
    const reportesGuardados = JSON.parse(localStorage.getItem('reportes_residuos') || '[]');
    setReportes(reportesGuardados);
  }, []);

  const guardarReportes = (nuevos) => {
    setReportes(nuevos);
    localStorage.setItem('reportes_residuos', JSON.stringify(nuevos));
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
  };

  const tieneAlerta = (id) => reportes.some((r) => r.zonaId === id);

  const seleccionarZonaMapa = (id) => {
    setZonaId(id);
  };

  return (
    <div style={{ display: 'flex', width: '100vw', minHeight: '100vh', backgroundColor: '#090d16', color: '#ffffff', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      <style>{`
        @keyframes alertaRoja {
          0% { fill: #dc2626; stroke: #f87171; stroke-width: 3px; }
          50% { fill: #991b1b; stroke: #ef4444; stroke-width: 5px; }
          100% { fill: #dc2626; stroke: #f87171; stroke-width: 3px; }
        }
        .zona-alerta {
          animation: alertaRoja 1.2s infinite ease-in-out;
          cursor: pointer;
        }
        .edificio-bloque {
          fill: #111c33;
          stroke: #1e3a8a;
          stroke-width: 2px;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .edificio-bloque:hover {
          fill: #1d325c !important;
          stroke: #38bdf8 !important;
          stroke-width: 3px !important;
        }
        text {
          user-select: none;
          pointer-events: none;
          font-family: system-ui, -apple-system, sans-serif;
          font-weight: 600;
          letter-spacing: 0.3px;
        }
      `}</style>

      {/* PANEL IZQUIERDO */}
      <div style={{ width: '380px', backgroundColor: '#0c1425', borderRight: '1px solid #1e293b', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
        
        <div style={{ backgroundColor: '#111d35', padding: '14px', borderRadius: '10px', border: '1px solid #1e3a8a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1rem', margin: 0, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase' }}>
              <Award size={20} /> Eco-Guardianes
            </h2>
            <span style={{ backgroundColor: '#d97706', color: '#fff', padding: '3px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold' }}>
              {puntosGuardados} PTS
            </span>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '6px', margin: '6px 0 0 0' }}>
            Haz clic sobre cualquier área en el mapa para reportar o revisar problemas.
          </p>
        </div>

        {!esInvitado ? (
          <form onSubmit={handleSubmit} style={{ backgroundColor: '#111d35', padding: '16px', borderRadius: '10px', border: '1px solid #1e293b', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h3 style={{ fontSize: '0.9rem', color: '#38bdf8', margin: 0, display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase' }}>
              <AlertTriangle color="#ef4444" size={16} /> Reportar Residuos
            </h3>

            <div>
              <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>UBICACIÓN SELECCIONADA</label>
              <select 
                value={zonaId} 
                onChange={(e) => setZonaId(e.target.value)}
                style={{ width: '100%', padding: '8px', backgroundColor: '#090d16', border: '1px solid #1e3a8a', borderRadius: '6px', color: '#fff', fontSize: '0.8rem' }}
              >
                {ZONAS.map((z) => (
                  <option key={z.id} value={z.id}>{z.nombre}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>CANTIDAD</label>
                <select 
                  value={nivelResiduos} 
                  onChange={(e) => setNivelResiduos(e.target.value)}
                  style={{ width: '100%', padding: '8px', backgroundColor: '#090d16', border: '1px solid #1e3a8a', borderRadius: '6px', color: '#fff', fontSize: '0.8rem' }}
                >
                  <option value="Alto">Alto (Crítico)</option>
                  <option value="Medio">Medio</option>
                  <option value="Bajo">Bajo</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>TIPO</label>
                <select 
                  value={tipoResiduo} 
                  onChange={(e) => setTipoResiduo(e.target.value)}
                  style={{ width: '100%', padding: '8px', backgroundColor: '#090d16', border: '1px solid #1e3a8a', borderRadius: '6px', color: '#fff', fontSize: '0.8rem' }}
                >
                  <option value="Plásticos y Empaques">Plásticos</option>
                  <option value="Comida / Orgánicos">Orgánicos</option>
                  <option value="Papeles y Hojas">Papel</option>
                  <option value="Varios">Varios</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>OBSERVACIONES</label>
              <input 
                type="text" 
                placeholder="Detalle de la situación..."
                value={descripcion} 
                onChange={(e) => setDescripcion(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', backgroundColor: '#090d16', border: '1px solid #1e3a8a', borderRadius: '6px', color: '#fff', fontSize: '0.8rem', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>REPORTADO POR</label>
              <input 
                type="text" 
                placeholder="Nombre o Curso"
                value={reportadoPor} 
                onChange={(e) => setReportadoPor(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', backgroundColor: '#090d16', border: '1px solid #1e3a8a', borderRadius: '6px', color: '#fff', fontSize: '0.8rem', boxSizing: 'border-box' }}
              />
            </div>

            <button 
              type="submit" 
              style={{ padding: '10px', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.8rem', marginTop: '4px' }}
            >
              <Send size={14} /> EMITIR ALERTA DE RESIDUOS
            </button>
          </form>
        ) : (
          <div style={{ padding: '12px', backgroundColor: '#111d35', borderRadius: '8px', color: '#38bdf8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Info size={16} /> Modo Invitado: Solo Lectura.
          </div>
        )}

        <div style={{ backgroundColor: '#111d35', padding: '14px', borderRadius: '10px', border: '1px solid #1e293b' }}>
          <h3 style={{ fontSize: '0.8rem', color: '#f87171', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '6px', textTransform: 'uppercase' }}>
            <ShieldAlert size={16} /> Reportes Activos ({reportes.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
            {reportes.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '10px', color: '#4ade80', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Smile size={16} /> El campus está limpio
              </div>
            ) : (
              reportes.map((r) => (
                <div key={r.id} style={{ backgroundColor: '#090d16', borderLeft: '3px solid #dc2626', padding: '8px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: '#f87171', fontSize: '0.75rem', display: 'block' }}>{r.lugarNombre}</strong>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', display: 'block' }}>{r.descripcion}</span>
                  </div>
                  <button 
                    onClick={() => resolverReporte(r.id)} 
                    style={{ backgroundColor: '#16a34a', border: 'none', color: '#fff', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.68rem', fontWeight: 'bold' }}
                  >
                    Sanear
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* MAPA SVG PROFESIONAL EN MODO OSCURO */}
      <div style={{ flex: 1, padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'auto' }}>
        
        <div style={{ position: 'relative', width: '980px', height: '760px', backgroundColor: '#080d1a', borderRadius: '12px', border: '1px solid #1e293b', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9)' }}>
          
          <svg viewBox="0 0 1000 780" width="100%" height="100%" style={{ textAnchor: 'middle' }}>
            
            <defs>
              <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="25%" stopColor="#f59e0b" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="75%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>

            {/* 1. IGLESIA */}
            <rect 
              x="140" y="30" width="230" height="130" rx="6" 
              className={tieneAlerta('iglesia') ? 'zona-alerta' : 'edificio-bloque'}
              onClick={() => seleccionarZonaMapa('iglesia')}
            />
            <text x="255" y="100" fill={tieneAlerta('iglesia') ? '#ffffff' : '#38bdf8'} fontSize="13">
              IGLESIA / CAPILLA
            </text>

            {/* 2. AULAS PRINCIPALES (1 A 6) */}
            <g onClick={() => seleccionarZonaMapa('aulas_principales')}>
              {[390, 440, 490, 540, 590, 640].map((xPos, idx) => (
                <rect 
                  key={idx} x={xPos} y="30" width="50" height="130" rx="3"
                  className={tieneAlerta('aulas_principales') ? 'zona-alerta' : 'edificio-bloque'}
                />
              ))}
              <text x="540" y="100" fill={tieneAlerta('aulas_principales') ? '#ffffff' : '#cbd5e1'} fontSize="11">
                AULAS PRINCIPALES (1 - 6)
              </text>
            </g>

            {/* 3. PREESCOLAR ARCOÍRIS */}
            <rect 
              x="705" y="30" width="130" height="130" rx="8" 
              fill={tieneAlerta('preescolar') ? '#dc2626' : 'url(#rainbowGrad)'} 
              stroke="#fbbf24" strokeWidth="2.5" 
              className={tieneAlerta('preescolar') ? 'zona-alerta' : ''}
              style={{ cursor: 'pointer' }}
              onClick={() => seleccionarZonaMapa('preescolar')}
            />
            <text x="770" y="100" fill="#ffffff" fontSize="12" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>
              PREESCOLAR
            </text>

            {/* 4. BLOQUE IZQUIERDO */}
            <g>
              <rect 
                x="15" y="220" width="120" height="50" rx="4" 
                className={tieneAlerta('aula_9') ? 'zona-alerta' : 'edificio-bloque'}
                onClick={() => seleccionarZonaMapa('aula_9')}
              />
              <text x="75" y="250" fill="#cbd5e1" fontSize="11">AULA 9</text>

              <rect 
                x="15" y="278" width="120" height="50" rx="4" 
                className={tieneAlerta('aula_izq_2') ? 'zona-alerta' : 'edificio-bloque'}
                onClick={() => seleccionarZonaMapa('aula_izq_2')}
              />
              <text x="75" y="308" fill="#cbd5e1" fontSize="11">AULA</text>

              <rect 
                x="15" y="336" width="120" height="50" rx="4" 
                className={tieneAlerta('sistemas2') ? 'zona-alerta' : 'edificio-bloque'}
                onClick={() => seleccionarZonaMapa('sistemas2')}
              />
              <text x="75" y="366" fill="#38bdf8" fontSize="10">SALA SISTEMAS 2</text>

              <rect 
                x="15" y="394" width="120" height="50" rx="4" 
                className={tieneAlerta('aula_izq_4') ? 'zona-alerta' : 'edificio-bloque'}
                onClick={() => seleccionarZonaMapa('aula_izq_4')}
              />
              <text x="75" y="424" fill="#cbd5e1" fontSize="11">AULA</text>

              <rect 
                x="15" y="452" width="120" height="50" rx="4" 
                className={tieneAlerta('aula_11') ? 'zona-alerta' : 'edificio-bloque'}
                onClick={() => seleccionarZonaMapa('aula_11')}
              />
              <text x="75" y="482" fill="#cbd5e1" fontSize="11">AULA 11</text>

              <rect 
                x="15" y="510" width="120" height="50" rx="4" 
                className={tieneAlerta('oficinas_izq') ? 'zona-alerta' : 'edificio-bloque'}
                onClick={() => seleccionarZonaMapa('oficinas_izq')}
              />
              <text x="75" y="540" fill="#fbbf24" fontSize="11">OFICINAS</text>
            </g>

            {/* 5. CANCHA DEPORTIVA */}
            <rect 
              x="165" y="220" width="160" height="490" rx="6" 
              className={tieneAlerta('cancha') ? 'zona-alerta' : 'edificio-bloque'}
              onClick={() => seleccionarZonaMapa('cancha')}
            />
            <line x1="165" y1="465" x2="325" y2="465" stroke="#1e3a8a" strokeWidth="2"/>
            <circle cx="245" cy="465" r="30" fill="none" stroke="#1e3a8a" strokeWidth="2"/>
            <text x="245" y="350" fill="#4ade80" fontSize="12">CANCHA DEPORTIVA</text>

            {/* 6. PORTERÍA */}
            <rect 
              x="200" y="730" width="90" height="35" rx="4" 
              className={tieneAlerta('porteria') ? 'zona-alerta' : 'edificio-bloque'}
              onClick={() => seleccionarZonaMapa('porteria')}
            />
            <text x="245" y="752" fill="#cbd5e1" fontSize="10">PORTERÍA</text>

            {/* 7. ÁREA DE DESCANSO */}
            <rect 
              x="350" y="180" width="360" height="40" rx="6" 
              className={tieneAlerta('area_descanso') ? 'zona-alerta' : 'edificio-bloque'}
              strokeDasharray="4,4"
              onClick={() => seleccionarZonaMapa('area_descanso')}
            />
            <text x="530" y="205" fill="#fbbf24" fontSize="11">ÁREA DE DESCANSO / GRADIES</text>

            {/* 8. PARQUE INFANTIL */}
            <rect 
              x="355" y="380" width="85" height="240" rx="8" 
              className={tieneAlerta('parque') ? 'zona-alerta' : 'edificio-bloque'}
              onClick={() => seleccionarZonaMapa('parque')}
            />
            <text x="397" y="505" fill="#4ade80" fontSize="11">PARQUE INFANTIL</text>

            {/* 9. KIOSCO */}
            <circle 
              cx="495" cy="670" r="32" 
              className={tieneAlerta('kiosco') ? 'zona-alerta' : 'edificio-bloque'}
              onClick={() => seleccionarZonaMapa('kiosco')}
            />
            <text x="495" y="674" fill="#fbbf24" fontSize="10">KIOSCO</text>

            {/* 10. FUENTE / PATIO CENTRAL */}
            <polygon 
              points="495,305 520,315 530,340 520,365 495,375 470,365 460,340 470,315" 
              className={tieneAlerta('fuente') ? 'zona-alerta' : 'edificio-bloque'}
              onClick={() => seleccionarZonaMapa('fuente')}
            />
            <text x="495" y="344" fill="#38bdf8" fontSize="10">FUENTE</text>

            {/* 11. BLOQUE AULAS (1, 2, 3) HORIZONTAL CON NOMBRES VERTICALES */}
            <g onClick={() => seleccionarZonaMapa('aulas_123')}>
              {/* Aula 1 */}
              <rect x="560" y="240" width="62" height="150" rx="4" className={tieneAlerta('aulas_123') ? 'zona-alerta' : 'edificio-bloque'} />
              <text x="591" y="315" fill="#cbd5e1" fontSize="11" transform="rotate(-90 591 315)">AULA 1</text>
              
              {/* Aula 2 */}
              <rect x="628" y="240" width="62" height="150" rx="4" className={tieneAlerta('aulas_123') ? 'zona-alerta' : 'edificio-bloque'} />
              <text x="659" y="315" fill="#cbd5e1" fontSize="11" transform="rotate(-90 659 315)">AULA 2</text>

              {/* Aula 3 */}
              <rect x="696" y="240" width="62" height="150" rx="4" className={tieneAlerta('aulas_123') ? 'zona-alerta' : 'edificio-bloque'} />
              <text x="727" y="315" fill="#cbd5e1" fontSize="11" transform="rotate(-90 727 315)">AULA 3</text>
            </g>

            {/* 12. CASA CURAL */}
            <rect 
              x="560" y="420" width="200" height="150" rx="6" 
              className={tieneAlerta('casa_cural') ? 'zona-alerta' : 'edificio-bloque'}
              onClick={() => seleccionarZonaMapa('casa_cural')}
            />
            <text x="660" y="500" fill="#cbd5e1" fontSize="11">CASA CURAL</text>

            {/* 13. CAFETERÍA */}
            <rect 
              x="630" y="630" width="130" height="100" rx="6" 
              className={tieneAlerta('cafeteria') ? 'zona-alerta' : 'edificio-bloque'}
              onClick={() => seleccionarZonaMapa('cafeteria')}
            />
            <text x="695" y="685" fill="#fbbf24" fontSize="12">CAFETERÍA</text>

            {/* 14. BLOQUE ADMINISTRATIVO HORIZONTAL CON NOMBRES VERTICALES Y SALA SISTEMAS 1 */}
            <g>
              {/* Coordinación */}
              <rect 
                x="800" y="180" width="52" height="130" rx="4" 
                className={tieneAlerta('coordinacion') ? 'zona-alerta' : 'edificio-bloque'}
                onClick={() => seleccionarZonaMapa('coordinacion')}
              />
              <text x="826" y="245" fill="#38bdf8" fontSize="10" transform="rotate(-90 826 245)">COORDINACIÓN</text>

              {/* Enfermería */}
              <rect 
                x="856" y="180" width="52" height="130" rx="4" 
                className={tieneAlerta('enfermeria') ? 'zona-alerta' : 'edificio-bloque'}
                onClick={() => seleccionarZonaMapa('enfermeria')}
              />
              <text x="882" y="245" fill="#f87171" fontSize="10" transform="rotate(-90 882 245)">ENFERMERÍA</text>

              {/* Bodegas */}
              <rect 
                x="912" y="180" width="52" height="130" rx="4" 
                className={tieneAlerta('bodegas') ? 'zona-alerta' : 'edificio-bloque'}
                onClick={() => seleccionarZonaMapa('bodegas')}
              />
              <text x="938" y="245" fill="#fbbf24" fontSize="10" transform="rotate(-90 938 245)">BODEGAS</text>

              {/* Sala de Sistemas 1 */}
              <rect 
                x="800" y="324" width="164" height="65" rx="4" 
                className={tieneAlerta('sistemas1') ? 'zona-alerta' : 'edificio-bloque'}
                onClick={() => seleccionarZonaMapa('sistemas1')}
              />
              <text x="882" y="361" fill="#38bdf8" fontSize="11">SALA SISTEMAS 1</text>
            </g>

            {/* 15. BIBLIOTECA */}
            <rect 
              x="800" y="402" width="164" height="170" rx="5" 
              className={tieneAlerta('biblioteca') ? 'zona-alerta' : 'edificio-bloque'}
              onClick={() => seleccionarZonaMapa('biblioteca')}
            />
            <text x="882" y="492" fill="#cbd5e1" fontSize="12">BIBLIOTECA</text>

            {/* 16. BAÑOS */}
            <rect 
              x="800" y="580" width="164" height="150" rx="5" 
              className={tieneAlerta('banos') ? 'zona-alerta' : 'edificio-bloque'}
              onClick={() => seleccionarZonaMapa('banos')}
            />
            <text x="882" y="660" fill="#38bdf8" fontSize="12">SERVICIOS SANITARIOS</text>

          </svg>

        </div>
      </div>
    </div>
  );
}