import React, { useState, useEffect, useMemo, useRef } from 'react';
import * as Icons from 'lucide-react';

// Swiper React Componentes y Estilos para Carrusel 3D
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// URL de la API del backend PHP
const API_URL = process.env.REACT_APP_API_URL || 'https://tu-servidor-php.com/api.php';

// ----------------------------------------------------------------------
// PALETA DE COLORES Y RAREZAS ADAPTADA A LA PÁGINA DE INICIO
// ----------------------------------------------------------------------
const RAREZA_CONFIG = {
  Común: {
    label: 'Común',
    colorHex: '#2E8B38',
    bgGradient: 'from-white to-[#F0FDF4]',
    borderColor: 'border-[#2E8B38]/30 hover:border-[#2E8B38]',
    glowColor: 'group-hover:shadow-[0_10px_25px_rgba(46,139,56,0.15)]',
    badgeStyle: 'bg-[#2E8B38]/10 text-[#2E8B38] border-[#2E8B38]/30',
    particleColor: '#2E8B38'
  },
  Raro: {
    label: 'Raro',
    colorHex: '#0E6E94',
    bgGradient: 'from-white to-[#F0F9FF]',
    borderColor: 'border-[#0E6E94]/30 hover:border-[#0E6E94]',
    glowColor: 'group-hover:shadow-[0_10px_25px_rgba(14,110,148,0.15)]',
    badgeStyle: 'bg-[#0E6E94]/10 text-[#0E6E94] border-[#0E6E94]/30',
    particleColor: '#0E6E94'
  },
  Épico: {
    label: 'Épico',
    colorHex: '#93634C',
    bgGradient: 'from-white to-[#FDF8F6]',
    borderColor: 'border-[#93634C]/30 hover:border-[#93634C]',
    glowColor: 'group-hover:shadow-[0_10px_25px_rgba(147,99,76,0.15)]',
    badgeStyle: 'bg-[#93634C]/10 text-[#93634C] border-[#93634C]/30',
    particleColor: '#93634C'
  },
  Legendario: {
    label: 'Legendario',
    colorHex: '#D97706',
    bgGradient: 'from-amber-50 to-amber-100/50',
    borderColor: 'border-amber-400 hover:border-amber-500',
    glowColor: 'group-hover:shadow-[0_10px_30px_rgba(217,119,6,0.25)]',
    badgeStyle: 'bg-amber-500 text-white border-amber-400 animate-pulse',
    particleColor: '#D97706'
  }
};

// ----------------------------------------------------------------------
// CATÁLOGO COMPLETO DE INSIGNIAS POR DEFECTO (15 MEDALLAS EXTENDIDAS)
// ----------------------------------------------------------------------
const INSIGNIAS_CATALOGO_DEFAULT = [
  {
    codigo: 'GUARDIANES_CAMPUS',
    nombre: 'Guardianes del Campus',
    descripcion: 'Reporte y recuperación activa de zonas críticas de residuos dentro del colegio.',
    icono: 'ShieldCheck',
    colorHex: '#4ADE80',
    rareza: 'Común',
    reqPuntos: 50,
    categoria: 'Limpieza'
  },
  {
    codigo: 'ECO_MAPEO',
    nombre: 'Eco-Mapeadores',
    descripcion: 'Mapeo total de puntos limpios y zonas verdes en el plano interactivo.',
    icono: 'MapPin',
    colorHex: '#38BDF8',
    rareza: 'Común',
    reqPuntos: 100,
    categoria: 'Exploración'
  },
  {
    codigo: 'SEGREGACION_EXPERTA',
    nombre: 'Maestros del Reciclaje',
    descripcion: 'Separación impecable de orgánicos, plásticos y papel durante 2 semanas.',
    icono: 'Recycle',
    colorHex: '#4ADE80',
    rareza: 'Común',
    reqPuntos: 150,
    categoria: 'Reciclaje'
  },
  {
    codigo: 'CERO_RESIDUOS',
    nombre: 'Zona Cero Residuos',
    descripcion: 'Mantener el aula de clases 100% libre de basura durante todo un mes.',
    icono: 'Sparkles',
    colorHex: '#38BDF8',
    rareza: 'Raro',
    reqPuntos: 200,
    categoria: 'Limpieza'
  },
  {
    codigo: 'PATRULLA_VERDE',
    nombre: 'Escuadrón Verde',
    descripcion: 'Liderar 5 jornadas masivas de recolección comunitaria en el plantel.',
    icono: 'Users',
    colorHex: '#38BDF8',
    rareza: 'Raro',
    reqPuntos: 300,
    categoria: 'Liderazgo'
  },
  {
    codigo: 'COMUNIDAD_SOSTENIBLE',
    nombre: 'Fuerza Colectiva',
    descripcion: 'Lograr que el 100% de los estudiantes del curso estén activos en la app.',
    icono: 'HeartHandshake',
    colorHex: '#38BDF8',
    rareza: 'Raro',
    reqPuntos: 400,
    categoria: 'Comunidad'
  },
  {
    codigo: 'ECO_PUNTOS_PRO',
    nombre: 'Club 500 Eco-Puntos',
    descripcion: 'Superar la barrera colectiva de los 500 Eco-Puntos en el ranking global.',
    icono: 'Award',
    colorHex: '#38BDF8',
    rareza: 'Raro',
    reqPuntos: 500,
    categoria: 'Puntaje'
  },
  {
    codigo: 'AHORRO_HIDRICO',
    nombre: 'Guardianes del Agua',
    descripcion: 'Implementación de campañas para el reporte y reparación de fugas hídricas.',
    icono: 'Droplets',
    colorHex: '#F97316',
    rareza: 'Épico',
    reqPuntos: 600,
    categoria: 'Conservación'
  },
  {
    codigo: 'LIDERAZGO_PRAE',
    nombre: 'Líderes PRAE',
    descripcion: 'Articulación total de actividades del salón con el Proyecto Ambiental Escolar.',
    icono: 'BookOpen',
    colorHex: '#F97316',
    rareza: 'Épico',
    reqPuntos: 650,
    categoria: 'Liderazgo'
  },
  {
    codigo: 'EFICIENCIA_ENERGETICA',
    nombre: 'Huella de Luz Cero',
    descripcion: 'Desconexión de equipos electrónicos y apagado de luces en horas de descanso.',
    icono: 'Zap',
    colorHex: '#F97316',
    rareza: 'Épico',
    reqPuntos: 750,
    categoria: 'Energía'
  },
  {
    codigo: 'CONSTANCIA_VERDE',
    nombre: 'Racha Imparable',
    descripcion: 'Cumplir metas ambientales consecutivas durante 6 semanas seguidas.',
    icono: 'Flame',
    colorHex: '#F97316',
    rareza: 'Épico',
    reqPuntos: 850,
    categoria: 'Constancia'
  },
  {
    codigo: 'INNOVADORES_AMBIENTALES',
    nombre: 'Mentes de Futuro',
    descripcion: 'Diseño y presentación de un prototipo funcional de economía circular.',
    icono: 'Lightbulb',
    colorHex: '#F97316',
    rareza: 'Épico',
    reqPuntos: 950,
    categoria: 'Innovación'
  },
  {
    codigo: 'JARDIN_BIODIVERSO',
    nombre: 'Pulmón del Colegio',
    descripcion: 'Adopción y cuidado constante de un micro-jardín verde dentro de la sede.',
    icono: 'Sprout',
    colorHex: '#F59E0B',
    rareza: 'Legendario',
    reqPuntos: 1200,
    categoria: 'Biodiversidad'
  },
  {
    codigo: 'CAMPEONES_PLANETA',
    nombre: 'Titanes Bio-Sayegh',
    descripcion: 'Alcanzar los 1,500 Eco-Puntos globales acumulados en el año escolar.',
    icono: 'Crown',
    colorHex: '#F59E0B',
    rareza: 'Legendario',
    reqPuntos: 1500,
    categoria: 'Puntaje'
  },
  {
    codigo: 'TROFEO_ORO',
    nombre: 'Gran Leyenda Verde',
    descripcion: 'Obtener el Primer Lugar indiscutible en el ranking final de salones del COLSAM.',
    icono: 'Trophy',
    colorHex: '#F59E0B',
    rareza: 'Legendario',
    reqPuntos: 2000,
    categoria: 'Honor'
  }
];

// ----------------------------------------------------------------------
// EFECTO DE CONFETI EN CANVAS NATIVO (OPTIMIZADO PARA VS CODE ONLINE)
// ----------------------------------------------------------------------
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
        p.vy += 0.32; // Gravedad
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

// ----------------------------------------------------------------------
// COMPONENTE SECUNDARIO: FONDO DE PARTÍCULAS INTERACTIVO
// ----------------------------------------------------------------------
function BackgroundParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 5 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 14 + 8,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#2E8B38]/30 blur-[1px] animate-pulse"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
    </div>
  );
}

// ----------------------------------------------------------------------
// COMPONENTE SECUNDARIO: MODAL DE DETALLE DE INSIGNIA
// ----------------------------------------------------------------------
function InsigniaModal({ insignia, desbloqueada, puntosActuales, onClose }) {
  if (!insignia) return null;

  const IconComponent = Icons[insignia.icono] || Icons.Award;
  const config = RAREZA_CONFIG[insignia.rareza] || RAREZA_CONFIG['Común'];
  const porcentaje = Math.min(100, Math.round((puntosActuales / insignia.reqPuntos) * 100));
  const faltantes = Math.max(0, insignia.reqPuntos - puntosActuales);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-lg bg-white border ${config.borderColor} rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden text-slate-800`}>
        
        {/* Botón de Cierre */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full bg-slate-100 transition-colors"
        >
          <Icons.X size={20} />
        </button>

        {/* Encabezado */}
        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${config.badgeStyle}`}>
            {insignia.rareza}
          </span>
          <span className="text-xs font-mono text-[#0E6E94] bg-sky-50 border border-sky-200 px-3 py-1 rounded-full">
            {insignia.categoria || 'General'}
          </span>
        </div>

        {/* Icono Grande */}
        <div className="flex justify-center my-6">
          <div
            className={`p-6 rounded-3xl bg-[#064460] shadow-xl border border-[#0E6E94] ${desbloqueada ? 'animate-bounce' : ''}`}
          >
            <IconComponent size={64} color={desbloqueada ? insignia.colorHex : '#94A3B8'} />
          </div>
        </div>

        {/* Título y Descripción */}
        <h3 className="text-2xl font-black text-center text-[#064460]">{insignia.nombre}</h3>
        <p className="text-slate-600 text-xs sm:text-sm text-center mt-2 leading-relaxed">
          {insignia.descripcion}
        </p>

        {/* Progreso */}
        <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-4">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-500 font-medium">Requisito de Desbloqueo</span>
            <span className="text-[#064460] font-mono font-bold">{insignia.reqPuntos} Eco-Puntos</span>
          </div>
          
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden mb-3">
            <div
              className="h-full bg-[#2E8B38] transition-all duration-700"
              style={{ width: `${porcentaje}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className={desbloqueada ? 'text-[#2E8B38] font-bold flex items-center gap-1' : 'text-slate-500'}>
              {desbloqueada ? (
                <>
                  <Icons.CheckCircle2 size={14} /> ¡Insignia Conseguida!
                </>
              ) : (
                `Te faltan ${faltantes} Eco-Puntos`
              )}
            </span>
            <span className="text-slate-500 font-bold">{porcentaje}%</span>
          </div>
        </div>

        {/* Acciones */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full py-3 bg-[#2E8B38] hover:bg-[#25722D] text-white font-bold rounded-xl text-sm transition-all shadow-md"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// COMPONENTE PRINCIPAL: RUTA DE INSIGNIAS CON CARRUSEL GIRATORIO
// ----------------------------------------------------------------------
export default function InsigniasGamificadas({ puntosSalonActual = 720, codigoSalon = '10A' }) {
  const [insignias, setInsignias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroRareza, setFiltroRareza] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const [modalInsignia, setModalInsignia] = useState(null);
  
  const swiperRef = useRef(null);

  // Cargar Insignias desde la API PHP o usar Fallback por defecto
  useEffect(() => {
    const cargarInsignias = async () => {
      try {
        const res = await fetch(`${API_URL}?action=categorias`);
        if (!res.ok) throw new Error('Respuesta no válida del servidor');
        const data = await res.json();
        
        if (Array.isArray(data) && data.length > 0) {
          setInsignias(data);
        } else {
          setInsignias(INSIGNIAS_CATALOGO_DEFAULT);
        }
      } catch (err) {
        console.warn('Servidor PHP no alcanzado. Cargando catálogo extendido local:', err);
        setInsignias(INSIGNIAS_CATALOGO_DEFAULT);
      } finally {
        setCargando(false);
      }
    };

    cargarInsignias();
  }, []);

  // Filtrado por búsqueda y rareza
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

  // Identificar las insignias desbloqueadas y la más reciente
  const insigniasDesbloqueadas = useMemo(() => {
    return insignias.filter((i) => puntosSalonActual >= i.reqPuntos);
  }, [insignias, puntosSalonActual]);

  const ultimaDesbloqueada = useMemo(() => {
    return insigniasDesbloqueadas[insigniasDesbloqueadas.length - 1];
  }, [insigniasDesbloqueadas]);

  const porcentajeGlobal = useMemo(() => {
    if (insignias.length === 0) return 0;
    return Math.round((insigniasDesbloqueadas.length / insignias.length) * 100);
  }, [insigniasDesbloqueadas, insignias]);

  // Enfocar el carrusel en la última insignia desbloqueada y disparar el confeti
  useEffect(() => {
    if (ultimaDesbloqueada && swiperRef.current && swiperRef.current.swiper) {
      const index = insigniasFiltradas.findIndex((i) => i.codigo === ultimaDesbloqueada.codigo);
      if (index !== -1) {
        setTimeout(() => {
          swiperRef.current.swiper.slideTo(index, 800);
          if (swiperRef.current.swiper.autoplay) {
            swiperRef.current.swiper.autoplay.stop();
          }
          dispararConfetiBioSayegh();
        }, 500);
      }
    }
  }, [puntosSalonActual, insigniasFiltradas, ultimaDesbloqueada]);

  if (cargando) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center text-[#2E8B38] p-6">
        <Icons.Loader2 className="w-12 h-12 animate-spin mb-4" />
        <h2 className="text-xl font-bold text-slate-800">Cargando Ruta de Insignias</h2>
        <p className="text-xs text-slate-500 mt-1 animate-pulse">Conectando con Bio-Sayegh COLSAM...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 p-4 sm:p-8 relative overflow-hidden font-sans">
      <BackgroundParticles />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* ================================================================== */}
        {/* HEADER TIPO BANNER PRINCIPAL (MANTENIDO INTACTO) */}
        {/* ================================================================== */}
        <header className="relative bg-gradient-to-r from-[#064460] to-[#2E8B38] border-2 border-[#2E8B38] rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden text-white">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 relative z-10">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 backdrop-blur-md">
                Salón Conectado: {codigoSalon} ({puntosSalonActual} Eco-Puntos)
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
                Ruta de Insignias
              </h1>
              <p className="text-emerald-100 text-sm max-w-2xl">
                Plataforma ecológica para la geolocalización de residuos y gamificación por cursos en el Colegio San Alberto Magno.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl w-full lg:w-auto text-center">
              <div className="text-3xl font-black text-white">
                {insigniasDesbloqueadas.length} <span className="text-base font-normal text-emerald-100">/ {insignias.length}</span>
              </div>
              <div className="text-xs text-emerald-200 font-bold mt-1">
                {porcentajeGlobal}% Desbloqueado
              </div>
            </div>
          </div>

          {/* Barra de Progreso Superior */}
          <div className="mt-6 w-full bg-black/20 h-2.5 rounded-full overflow-hidden border border-white/20">
            <div
              className="h-full bg-emerald-400 transition-all duration-1000 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
              style={{ width: `${porcentajeGlobal}%` }}
            />
          </div>
        </header>

        {/* ================================================================== */}
        {/* CONTROLES Y FILTROS */}
        {/* ================================================================== */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
          <div className="relative w-full md:w-80">
            <Icons.Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Buscar insignia..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#2E8B38]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-center">
            {['Todas', 'Desbloqueadas', 'Común', 'Raro', 'Épico', 'Legendario'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltroRareza(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  filtroRareza === cat
                    ? 'bg-[#2E8B38] border-[#2E8B38] text-white shadow-md scale-105'
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ================================================================== */}
        {/* NUEVA ORGANIZACIÓN: BANNER GIRATORIO EN 3D (SWIPER COVERFLOW) */}
        {/* ================================================================== */}
        <div className="relative bg-gradient-to-b from-[#064460] to-[#043349] p-6 sm:p-10 rounded-3xl shadow-2xl border-2 border-[#0E6E94] overflow-hidden">
          
          <div className="text-center mb-4">
            <h2 className="text-white text-xl sm:text-2xl font-extrabold tracking-wide">
              Carrusel Interactivo de Insignias
            </h2>
            <p className="text-slate-300 text-xs mt-1">
              Desliza horizontalmente. El carrusel se detiene en la insignia recién alcanzada.
            </p>
          </div>

          {insigniasFiltradas.length === 0 ? (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-8 text-center text-white my-8">
              <Icons.AlertCircle className="w-10 h-10 mx-auto mb-2 text-amber-300" />
              <p className="font-bold">No hay insignias que coincidan con la búsqueda.</p>
            </div>
          ) : (
            <Swiper
              ref={swiperRef}
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 25,
                stretch: 0,
                depth: 180,
                modifier: 1,
                slideShadows: false,
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: true,
              }}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="w-full py-6"
            >
              {insigniasFiltradas.map((item) => {
                const IconComponent = Icons[item.icono] || Icons.Award;
                const desbloqueada = puntosSalonActual >= item.reqPuntos;
                const esUltima = ultimaDesbloqueada?.codigo === item.codigo;
                const config = RAREZA_CONFIG[item.rareza] || RAREZA_CONFIG['Común'];

                return (
                  <SwiperSlide key={item.codigo} className="w-[280px] sm:w-[320px]">
                    <div
                      onClick={() => {
                        if (desbloqueada) dispararConfetiBioSayegh();
                        setModalInsignia(item);
                      }}
                      className={`relative bg-white border-2 rounded-3xl p-6 shadow-xl transition-all duration-500 cursor-pointer flex flex-col justify-between h-[390px] ${
                        esUltima
                          ? 'border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.5)] scale-105'
                          : desbloqueada
                          ? 'border-[#2E8B38]'
                          : 'border-slate-200 opacity-60 grayscale'
                      }`}
                    >
                      <div>
                        {/* Cabecera de la tarjeta */}
                        <div className="flex justify-between items-center mb-3">
                          <span className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border ${config.badgeStyle}`}>
                            {item.rareza}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-500">
                            {item.reqPuntos} PTS
                          </span>
                        </div>

                        {/* Icono central */}
                        <div className="flex justify-center my-6">
                          <div className={`p-5 rounded-3xl bg-[#064460] shadow-lg border border-[#0E6E94] ${esUltima ? 'animate-bounce' : ''}`}>
                            <IconComponent size={52} color={desbloqueada ? item.colorHex : '#94A3B8'} />
                          </div>
                        </div>

                        {/* Título y Descripción con alto contraste */}
                        <h3 className="text-center font-black text-lg text-[#064460]">
                          {item.nombre}
                        </h3>
                        <p className="text-center text-xs text-slate-600 font-medium mt-2 leading-relaxed line-clamp-2">
                          {item.descripcion}
                        </p>
                      </div>

                      {/* Pie de tarjeta */}
                      <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs font-bold">
                        <span className={desbloqueada ? 'text-[#2E8B38] font-black' : 'text-slate-400'}>
                          {desbloqueada ? '¡Desbloqueada!' : 'En Progreso'}
                        </span>
                        {esUltima && (
                          <span className="bg-amber-400 text-slate-900 px-2.5 py-0.5 rounded-full text-[10px] font-black animate-pulse">
                            ¡RECIÉN OBTENIDA!
                          </span>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>

      </div>

      {/* Modal de Detalle */}
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