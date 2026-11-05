import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as Icons from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'https://tu-servidor-php.com/api.php';

const RAREZA_CONFIG = {
  Común: {
    label: 'Común',
    colorHex: '#2E8B38',
    borderColor: 'border-[#2E8B38]/30 hover:border-[#2E8B38]',
    badgeStyle: 'bg-[#2E8B38]/10 text-[#2E8B38] border-[#2E8B38]/30',
  },
  Raro: {
    label: 'Raro',
    colorHex: '#0E6E94',
    borderColor: 'border-[#0E6E94]/30 hover:border-[#0E6E94]',
    badgeStyle: 'bg-[#0E6E94]/10 text-[#0E6E94] border-[#0E6E94]/30',
  },
  Épico: {
    label: 'Épico',
    colorHex: '#93634C',
    borderColor: 'border-[#93634C]/30 hover:border-[#93634C]',
    badgeStyle: 'bg-[#93634C]/10 text-[#93634C] border-[#93634C]/30',
  },
  Legendario: {
    label: 'Legendario',
    colorHex: '#D97706',
    borderColor: 'border-amber-400 hover:border-amber-500',
    badgeStyle: 'bg-amber-500 text-white border-amber-400 animate-pulse',
  }
};

const INSIGNIAS_CATALOGO_DEFAULT = [
  { codigo: 'GUARDIANES_CAMPUS', nombre: 'Guardianes del Campus', descripcion: 'Reporte y recuperación activa de zonas críticas de residuos.', icono: 'ShieldCheck', colorHex: '#4ADE80', rareza: 'Común', reqPuntos: 50, categoria: 'Limpieza' },
  { codigo: 'ECO_MAPEO', nombre: 'Eco-Mapeadores', descripcion: 'Mapeo total de puntos limpios y zonas verdes en el plano interactivo.', icono: 'MapPin', colorHex: '#38BDF8', rareza: 'Común', reqPuntos: 100, categoria: 'Exploración' },
  { codigo: 'SEGREGACION_EXPERTA', nombre: 'Maestros del Reciclaje', descripcion: 'Separación impecable de orgánicos, plásticos y papel.', icono: 'Recycle', colorHex: '#4ADE80', rareza: 'Común', reqPuntos: 150, categoria: 'Reciclaje' },
  { codigo: 'CERO_RESIDUOS', nombre: 'Zona Cero Residuos', descripcion: 'Mantener el aula de clases 100% libre de basura durante todo un mes.', icono: 'Sparkles', colorHex: '#38BDF8', rareza: 'Raro', reqPuntos: 200, categoria: 'Limpieza' },
  { codigo: 'PATRULLA_VERDE', nombre: 'Escuadrón Verde', descripcion: 'Liderar 5 jornadas masivas de recolección comunitaria en el plantel.', icono: 'Users', colorHex: '#38BDF8', rareza: 'Raro', reqPuntos: 300, categoria: 'Liderazgo' },
  { codigo: 'TROFEO_ORO', nombre: 'Gran Leyenda Verde', descripcion: 'Obtener el Primer Lugar indiscutible en el ranking final.', icono: 'Trophy', colorHex: '#F59E0B', rareza: 'Legendario', reqPuntos: 1500, categoria: 'Honor' }
];

// EFECTO DE CONFETI MATEMÁTICO NATIVO EN CANVAS
function dispararConfetiBioSayegh() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colores = ['#064460', '#2E8B38', '#0E6E94', '#93634C', '#4ADE80', '#F59E0B'];
  const particulas = Array.from({ length: 110 }).map(() => ({
    x: canvas.width / 2,
    y: canvas.height / 2 + 60,
    vx: (Math.random() - 0.5) * 18,
    vy: (Math.random() - 0.75) * 18,
    size: Math.random() * 9 + 4,
    color: colores[Math.floor(Math.random() * colores.length)],
    rotation: Math.random() * 360,
    vRot: (Math.random() - 0.5) * 12,
    opacity: 1
  }));

  let frame = 0;
  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activas = 0;

    particulas.forEach((p) => {
      if (p.opacity > 0) {
        activas++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.32;
        p.rotation += p.vRot;
        p.opacity -= 0.01;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (activas > 0 && frame < 180) {
      frame++;
      requestAnimationFrame(animar);
    } else {
      canvas.remove();
    }
  }

  animar();
}

function InsigniaModal({ insignia, desbloqueada, puntosActuales, onClose }) {
  if (!insignia) return null;

  const IconComponent = Icons[insignia.icono] || Icons.Award;
  const config = RAREZA_CONFIG[insignia.rareza] || RAREZA_CONFIG['Común'];
  const porcentaje = Math.min(100, Math.round((puntosActuales / insignia.reqPuntos) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
      <div className={`relative w-full max-w-lg bg-white border ${config.borderColor} rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-slate-800`}>
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full bg-slate-100">
          <Icons.X size={20} />
        </button>

        <div className="flex justify-center my-6">
          <div className={`p-6 rounded-3xl bg-[#064460] shadow-xl border border-[#0E6E94] ${desbloqueada ? 'animate-bounce' : ''}`}>
            <IconComponent size={64} color={desbloqueada ? insignia.colorHex : '#94A3B8'} />
          </div>
        </div>

        <h3 className="text-2xl font-black text-center text-[#064460]">{insignia.nombre}</h3>
        <p className="text-slate-600 text-xs sm:text-sm text-center mt-2 leading-relaxed">{insignia.descripcion}</p>

        <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-500 font-medium">Requisito</span>
            <span className="text-[#064460] font-bold">{insignia.reqPuntos} Eco-Puntos</span>
          </div>
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-[#2E8B38] transition-all duration-700" style={{ width: `${porcentaje}%` }} />
          </div>
        </div>

        <button onClick={onClose} className="mt-6 w-full py-3 bg-[#2E8B38] text-white font-bold rounded-xl text-sm shadow-md">
          Entendido
        </button>
      </div>
    </div>
  );
}

export default function InsigniasGamificadas({ puntosSalonActual = 720, codigoSalon = '10A' }) {
  const [insignias, setInsignias] = useState(INSIGNIAS_CATALOGO_DEFAULT);
  const [filtroRareza, setFiltroRareza] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const [modalInsignia, setModalInsignia] = useState(null);
  
  const [indiceActivo, setIndiceActivo] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  const insigniasFiltradas = useMemo(() => {
    return insignias.filter((item) => {
      const coincideRareza =
        filtroRareza === 'Todas'
          ? true
          : filtroRareza === 'Desbloqueadas'
          ? puntosSalonActual >= item.reqPuntos
          : item.rareza === filtroRareza;

      const coincideBusqueda =
        item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(busqueda.toLowerCase());

      return coincideRareza && coincideBusqueda;
    });
  }, [insignias, filtroRareza, busqueda, puntosSalonActual]);

  const insigniasDesbloqueadas = useMemo(() => {
    return insignias.filter((i) => puntosSalonActual >= i.reqPuntos);
  }, [insignias, puntosSalonActual]);

  const ultimaDesbloqueada = useMemo(() => {
    return insigniasDesbloqueadas[insigniasDesbloqueadas.length - 1];
  }, [insigniasDesbloqueadas]);

  // Rotación automática del carrusel nativo
  useEffect(() => {
    if (!autoRotate || insigniasFiltradas.length === 0) return;
    const interval = setInterval(() => {
      setIndiceActivo((prev) => (prev + 1) % insigniasFiltradas.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [autoRotate, insigniasFiltradas]);

  // Detenerse en la última desbloqueada y lanzar confeti
  useEffect(() => {
    if (ultimaDesbloqueada && insigniasFiltradas.length > 0) {
      const index = insigniasFiltradas.findIndex((i) => i.codigo === ultimaDesbloqueada.codigo);
      if (index !== -1) {
        setIndiceActivo(index);
        setAutoRotate(false);
        dispararConfetiBioSayegh();
      }
    }
  }, [puntosSalonActual, insigniasFiltradas, ultimaDesbloqueada]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 p-4 sm:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER TIPO BANNER PRINCIPAL */}
        <header className="relative bg-gradient-to-r from-[#064460] to-[#2E8B38] border-2 border-[#2E8B38] rounded-3xl p-6 sm:p-10 shadow-xl text-white">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 backdrop-blur-md">
                Salón Conectado: {codigoSalon} ({puntosSalonActual} Eco-Puntos)
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold mt-2">Ruta de Insignias</h1>
              <p className="text-emerald-100 text-sm mt-1">Plataforma ecológica COLSAM.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center">
              <div className="text-3xl font-black text-white">
                {insigniasDesbloqueadas.length} <span className="text-base font-normal text-emerald-100">/ {insignias.length}</span>
              </div>
              <div className="text-xs text-emerald-200 font-bold mt-1">Desbloqueadas</div>
            </div>
          </div>
        </header>

        {/* FILTROS */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
          <div className="relative w-full md:w-80">
            <Icons.Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar insignia..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {['Todas', 'Desbloqueadas', 'Común', 'Raro', 'Épico', 'Legendario'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltroRareza(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                  filtroRareza === cat ? 'bg-[#2E8B38] border-[#2E8B38] text-white shadow-md' : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* BANNER GIRATORIO EN 3D NATIVO (SIN LIBRERÍAS EXTERNAS) */}
        <div className="relative bg-gradient-to-b from-[#064460] to-[#043349] p-6 sm:p-12 rounded-3xl shadow-2xl border-2 border-[#0E6E94] overflow-hidden min-h-[500px] flex flex-col justify-center items-center">
          
          <div className="text-center mb-6 z-10">
            <h2 className="text-white text-xl sm:text-2xl font-extrabold">Carrusel Interactivo de Insignias</h2>
            <p className="text-slate-300 text-xs mt-1">Selecciona o desliza para enfocar una insignia.</p>
          </div>

          {/* ESCENA DEL CARRUSEL 3D NATIVO */}
          <div className="relative w-full max-w-4xl h-[400px] flex items-center justify-center overflow-hidden">
            {insigniasFiltradas.map((item, idx) => {
              const offset = idx - indiceActivo;
              const esActiva = idx === indiceActivo;
              const desbloqueada = puntosSalonActual >= item.reqPuntos;
              const esUltima = ultimaDesbloqueada?.codigo === item.codigo;
              const IconComponent = Icons[item.icono] || Icons.Award;
              const config = RAREZA_CONFIG[item.rareza] || RAREZA_CONFIG['Común'];

              // Cálculo de transformaciones 3D
              const translateX = offset * 220;
              const scale = esActiva ? 1.05 : Math.max(0.7, 1 - Math.abs(offset) * 0.2);
              const opacity = Math.abs(offset) > 2 ? 0 : Math.max(0.4, 1 - Math.abs(offset) * 0.3);
              const zIndex = 30 - Math.abs(offset);

              return (
                <div
                  key={item.codigo}
                  onClick={() => {
                    setIndiceActivo(idx);
                    setAutoRotate(false);
                    if (desbloqueada) dispararConfetiBioSayegh();
                    setModalInsignia(item);
                  }}
                  className={`absolute w-[280px] sm:w-[320px] h-[380px] bg-white border-2 rounded-3xl p-6 shadow-2xl transition-all duration-700 cursor-pointer flex flex-col justify-between ${
                    esUltima && esActiva
                      ? 'border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.6)]'
                      : desbloqueada
                      ? 'border-[#2E8B38]'
                      : 'border-slate-200 grayscale opacity-75'
                  }`}
                  style={{
                    transform: `translateX(${translateX}px) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                  }}
                >
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border ${config.badgeStyle}`}>
                        {item.rareza}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500">{item.reqPuntos} PTS</span>
                    </div>

                    <div className="flex justify-center my-6">
                      <div className={`p-5 rounded-3xl bg-[#064460] border border-[#0E6E94] ${esUltima && esActiva ? 'animate-bounce' : ''}`}>
                        <IconComponent size={52} color={desbloqueada ? item.colorHex : '#94A3B8'} />
                      </div>
                    </div>

                    <h3 className="text-center font-black text-lg text-[#064460]">{item.nombre}</h3>
                    <p className="text-center text-xs text-slate-600 font-medium mt-2 line-clamp-2">{item.descripcion}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-bold">
                    <span className={desbloqueada ? 'text-[#2E8B38]' : 'text-slate-400'}>
                      {desbloqueada ? '¡Desbloqueada!' : 'En Progreso'}
                    </span>
                    {esUltima && (
                      <span className="bg-amber-400 text-slate-900 px-2.5 py-0.5 rounded-full text-[10px] font-black">
                        ¡NUEVA!
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CONTROLES FLECHAS DEL CARRUSEL */}
          <div className="flex gap-4 mt-4 z-20">
            <button
              onClick={() => { setAutoRotate(false); setIndiceActivo((prev) => Math.max(0, prev - 1)); }}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20"
            >
              <Icons.ChevronLeft size={20} />
            </button>
            <button
              onClick={() => { setAutoRotate(false); setIndiceActivo((prev) => Math.min(insigniasFiltradas.length - 1, prev + 1)); }}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/20"
            >
              <Icons.ChevronRight size={20} />
            </button>
          </div>

        </div>

      </div>

      {modalInsignia && (
        <InsigniaModal
          insignia={modalInsignia}
          desbloqueada={puntosSalonActual >= modalInsignia.reqPuntos}
          puntosActuales={puntosSalonActual}
          onClose={() => setModalInsignia(null)}
        />
      )}
    </div>
  );
}