import React, { useState, useEffect, useMemo } from 'react';
import * as Icons from 'lucide-react';

// URL de la API del backend PHP
const API_URL = process.env.REACT_APP_API_URL || 'https://tu-servidor-php.com/api.php';

// ----------------------------------------------------------------------
// CONFIGURACIÓN DE RAREZAS Y ESTILOS VISUALES
// ----------------------------------------------------------------------
const RAREZA_CONFIG = {
  Común: {
    label: 'Común',
    colorHex: '#94A3B8',
    bgGradient: 'from-slate-900/90 via-slate-900/40 to-slate-950/90',
    borderColor: 'border-slate-700/60 hover:border-slate-400',
    glowColor: 'group-hover:shadow-[0_0_30px_rgba(148,163,184,0.25)]',
    badgeStyle: 'bg-slate-800/80 text-slate-300 border-slate-600',
    particleColor: '#94A3B8'
  },
  Raro: {
    label: 'Raro',
    colorHex: '#3B82F6',
    bgGradient: 'from-blue-950/50 via-slate-900/60 to-slate-950/90',
    borderColor: 'border-blue-600/50 hover:border-blue-400',
    glowColor: 'group-hover:shadow-[0_0_35px_rgba(59,130,246,0.35)]',
    badgeStyle: 'bg-blue-950/80 text-blue-300 border-blue-700',
    particleColor: '#3B82F6'
  },
  Épico: {
    label: 'Épico',
    colorHex: '#A855F7',
    bgGradient: 'from-purple-950/50 via-slate-900/60 to-slate-950/90',
    borderColor: 'border-purple-600/50 hover:border-purple-400',
    glowColor: 'group-hover:shadow-[0_0_40px_rgba(168,85,247,0.4)]',
    badgeStyle: 'bg-purple-950/80 text-purple-300 border-purple-700',
    particleColor: '#A855F7'
  },
  Legendario: {
    label: 'Legendario',
    colorHex: '#F59E0B',
    bgGradient: 'from-amber-950/40 via-slate-900/70 to-slate-950/95',
    borderColor: 'border-amber-500/60 hover:border-amber-300',
    glowColor: 'group-hover:shadow-[0_0_50px_rgba(245,158,11,0.5)]',
    badgeStyle: 'bg-amber-950/80 text-amber-300 border-amber-500 animate-pulse',
    particleColor: '#F59E0B'
  }
};

// ----------------------------------------------------------------------
// CATÁLOGO COMPLETO DE INSIGNIAS POR DEFECTO (13+ ITEMS)
// ----------------------------------------------------------------------
const INSIGNIAS_CATALOGO_DEFAULT = [
  {
    codigo: 'GUARDIANES_CAMPUS',
    nombre: 'Guardianes del Campus',
    descripcion: 'Reporte y recuperación activa de zonas críticas de residuos dentro del colegio.',
    icono: 'ShieldCheck',
    colorHex: '#0284C7',
    rareza: 'Común',
    reqPuntos: 50,
    categoria: 'Limpieza'
  },
  {
    codigo: 'ECO_MAPEO',
    nombre: 'Eco-Mapeadores',
    descripcion: 'Mapeo total de puntos limpios y zonas verdes en el plano interactivo.',
    icono: 'MapPin',
    colorHex: '#16A34A',
    rareza: 'Común',
    reqPuntos: 100,
    categoria: 'Exploración'
  },
  {
    codigo: 'SEGREGACION_EXPERTA',
    nombre: 'Maestros del Reciclaje',
    descripcion: 'Separación impecable de orgánicos, plásticos y papel durante 2 semanas.',
    icono: 'Recycle',
    colorHex: '#10B981',
    rareza: 'Común',
    reqPuntos: 150,
    categoria: 'Reciclaje'
  },
  {
    codigo: 'CERO_RESIDUOS',
    nombre: 'Zona Cero Residuos',
    descripcion: 'Mantener el aula de clases 100% libre de basura durante todo un mes.',
    icono: 'Sparkles',
    colorHex: '#EAB308',
    rareza: 'Raro',
    reqPuntos: 200,
    categoria: 'Limpieza'
  },
  {
    codigo: 'PATRULLA_VERDE',
    nombre: 'Escuadrón Verde',
    descripcion: 'Liderar 5 jornadas masivas de recolección comunitaria en el plantel.',
    icono: 'Users',
    colorHex: '#F97316',
    rareza: 'Raro',
    reqPuntos: 300,
    categoria: 'Liderazgo'
  },
  {
    codigo: 'COMUNIDAD_SOSTENIBLE',
    nombre: 'Fuerza Colectiva',
    descripcion: 'Lograr que el 100% de los estudiantes del curso estén activos en la app.',
    icono: 'HeartHandshake',
    colorHex: '#EC4899',
    rareza: 'Raro',
    reqPuntos: 400,
    categoria: 'Comunidad'
  },
  {
    codigo: 'ECO_PUNTOS_PRO',
    nombre: 'Club 500 Eco-Puntos',
    descripcion: 'Superar la barrera colectiva de los 500 Eco-Puntos en el ranking global.',
    icono: 'Award',
    colorHex: '#8B5CF6',
    rareza: 'Raro',
    reqPuntos: 500,
    categoria: 'Puntaje'
  },
  {
    codigo: 'AHORRO_HIDRICO',
    nombre: 'Guardianes del Agua',
    descripcion: 'Implementación de campañas para el reporte y reparación de fugas hídricas.',
    icono: 'Droplets',
    colorHex: '#06B6D4',
    rareza: 'Épico',
    reqPuntos: 600,
    categoria: 'Conservación'
  },
  {
    codigo: 'LIDERAZGO_PRAE',
    nombre: 'Líderes PRAE',
    descripcion: 'Articulación total de actividades del salón con el Proyecto Ambiental Escolar.',
    icono: 'BookOpen',
    colorHex: '#0284C7',
    rareza: 'Épico',
    reqPuntos: 650,
    categoria: 'Liderazgo'
  },
  {
    codigo: 'EFICIENCIA_ENERGETICA',
    nombre: 'Huella de Luz Cero',
    descripcion: 'Desconexión de equipos electrónicos y apagado de luces en horas de descanso.',
    icono: 'Zap',
    colorHex: '#F59E0B',
    rareza: 'Épico',
    reqPuntos: 750,
    categoria: 'Energía'
  },
  {
    codigo: 'CONSTANCIA_VERDE',
    nombre: 'Racha Imparable',
    descripcion: 'Cumplir metas ambientales consecutivas durante 6 semanas seguidas.',
    icono: 'Flame',
    colorHex: '#EF4444',
    rareza: 'Épico',
    reqPuntos: 850,
    categoria: 'Constancia'
  },
  {
    codigo: 'INNOVADORES_AMBIENTALES',
    nombre: 'Mentes de Futuro',
    descripcion: 'Diseño y presentación de un prototipo funcional de economía circular.',
    icono: 'Lightbulb',
    colorHex: '#A855F7',
    rareza: 'Épico',
    reqPuntos: 950,
    categoria: 'Innovación'
  },
  {
    codigo: 'JARDIN_BIODIVERSO',
    nombre: 'Pulmón del Colegio',
    descripcion: 'Adopción y cuidado constante de un micro-jardín verde dentro de la sede.',
    icono: 'Sprout',
    colorHex: '#22C55E',
    rareza: 'Legendario',
    reqPuntos: 1200,
    categoria: 'Biodiversidad'
  },
  {
    codigo: 'CAMPEONES_PLANETA',
    nombre: 'Titanes Bio-Sayegh',
    descripcion: 'Alcanzar los 1,500 Eco-Puntos globales acumulados en el año escolar.',
    icono: 'Crown',
    colorHex: '#EAB308',
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
// COMPONENTE SECUNDARIO: FONDO DE PARTÍCULAS INTERACTIVO
// ----------------------------------------------------------------------
function BackgroundParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-emerald-400/30 blur-[1px] animate-pulse"
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
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-teal-600/10 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px]" />
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className={`relative w-full max-w-lg bg-slate-900 border ${config.borderColor} rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden`}>
        {/* Luz de fondo */}
        <div 
          className="absolute -top-20 -left-20 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ backgroundColor: insignia.colorHex || config.particleColor }}
        />

        {/* Botón de Cierre */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <Icons.X size={20} />
        </button>

        {/* Encabezado de la Modal */}
        <div className="flex items-center gap-3 mb-6">
          <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${config.badgeStyle}`}>
            {insignia.rareza}
          </span>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-3 py-1 rounded-full">
            {insignia.categoria || 'General'}
          </span>
        </div>

        {/* Icono Grande Animado */}
        <div className="flex justify-center my-6">
          <div
            className={`relative p-8 rounded-3xl border transition-all duration-500 ${
              desbloqueada ? 'bg-slate-950/80 shadow-2xl' : 'bg-slate-950/40 border-slate-800 opacity-60'
            }`}
            style={{
              borderColor: desbloqueada ? `${insignia.colorHex}80` : undefined,
              boxShadow: desbloqueada ? `0 0 40px ${insignia.colorHex}40` : undefined
            }}
          >
            <IconComponent
              size={72}
              color={desbloqueada ? insignia.colorHex : '#475569'}
              className={desbloqueada ? 'animate-bounce' : ''}
            />
          </div>
        </div>

        {/* Título y Descripción */}
        <h3 className="text-2xl font-black text-center text-white">{insignia.nombre}</h3>
        <p className="text-slate-300 text-sm text-center mt-3 leading-relaxed">
          {insignia.descripcion}
        </p>

        {/* Estadísticas de Progreso dentro de la Modal */}
        <div className="mt-8 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-slate-400 font-medium">Requisito de Desbloqueo</span>
            <span className="text-white font-mono font-bold">{insignia.reqPuntos} Eco-Puntos</span>
          </div>
          
          <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden border border-slate-800 mb-3">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-700"
              style={{ width: `${porcentaje}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-xs">
            <span className={desbloqueada ? 'text-emerald-400 font-bold flex items-center gap-1' : 'text-slate-400'}>
              {desbloqueada ? (
                <>
                  <Icons.CheckCircle2 size={14} /> ¡Insignia Conquistada!
                </>
              ) : (
                `Te faltan ${faltantes} Eco-Puntos`
              )}
            </span>
            <span className="text-slate-400 font-bold">{porcentaje}%</span>
          </div>
        </div>

        {/* Acciones */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-950/50"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// COMPONENTE PRINCIPAL: GALERÍA DE INSIGNIAS GAMIFICADAS
// ----------------------------------------------------------------------
export default function InsigniasGamificadas({ puntosSalonActual = 680, codigoSalon = '10-1' }) {
  const [insignias, setInsignias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtroRareza, setFiltroRareza] = useState('Todas');
  const [busqueda, setBusqueda] = useState('');
  const [modalInsignia, setModalInsignia] = useState(null);
  const [vistaModo, setVistaModo] = useState('grid'); // 'grid' o 'list'

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

  // Filtrado reactivo por rareza y término de búsqueda
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

  // Métricas globales calculadas
  const totalDesbloqueadas = useMemo(() => {
    return insignias.filter((i) => puntosSalonActual >= i.reqPuntos).length;
  }, [insignias, puntosSalonActual]);

  const porcentajeGlobal = useMemo(() => {
    if (insignias.length === 0) return 0;
    return Math.round((totalDesbloqueadas / insignias.length) * 100);
  }, [totalDesbloqueadas, insignias]);

  if (cargando) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-emerald-400 p-6 relative overflow-hidden">
        <BackgroundParticles />
        <div className="relative z-10 flex flex-col items-center">
          <Icons.Loader2 className="w-12 h-12 animate-spin mb-4 text-emerald-400" />
          <h2 className="text-xl font-bold text-white tracking-wide">Cargando Bio-Sayegh COLSAM</h2>
          <p className="text-xs text-slate-400 mt-1 animate-pulse">Sincronizando logros con la base de datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 relative overflow-hidden font-sans">
      {/* Fondo Animado de Partículas */}
      <BackgroundParticles />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* ================================================================== */}
        {/* HEADER & DASHBOARD DE LOGROS */}
        {/* ================================================================== */}
        <header className="relative bg-gradient-to-r from-emerald-950/60 via-slate-900/80 to-slate-950/90 border border-emerald-800/40 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            
            {/* Título e Info del Salón */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold border border-emerald-500/30 flex items-center gap-1.5">
                  <Icons.ShieldAlert size={14} /> Salón {codigoSalon}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {puntosSalonActual} Eco-Puntos Acumulados
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Galería de Insignias COLSAM
              </h1>
              <p className="text-slate-400 text-sm max-w-2xl">
                Explora las medallas de reconocimiento ambiental. Supera los retos en el colegio para desbloquear coleccionables exclusivos.
              </p>
            </div>

            {/* Métrica Resumen */}
            <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-800 p-5 rounded-2xl w-full lg:w-auto shadow-inner">
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
                <Icons.Trophy className="w-10 h-10 text-amber-400 animate-pulse" />
              </div>
              <div>
                <div className="text-3xl font-black text-white">
                  {totalDesbloqueadas} <span className="text-base font-normal text-slate-500">/ {insignias.length}</span>
                </div>
                <div className="text-xs text-emerald-400 font-bold flex items-center gap-1 mt-0.5">
                  <Icons.Sparkles size={12} /> {porcentajeGlobal}% Completado
                </div>
              </div>
            </div>
          </div>

          {/* Barra de Progreso Global */}
          <div className="mt-8 space-y-2">
            <div className="flex justify-between text-xs font-medium text-slate-400">
              <span>Nivel de Avance de la Promoción</span>
              <span className="text-emerald-400 font-mono font-bold">{porcentajeGlobal}%</span>
            </div>
            <div className="w-full bg-slate-950 h-3 rounded-full p-0.5 border border-slate-800/80">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                style={{ width: `${porcentajeGlobal}%` }}
              />
            </div>
          </div>
        </header>

        {/* ================================================================== */}
        {/* BARRA DE HERRAMIENTAS: BÚSQUEDA Y FILTROS */}
        {/* ================================================================== */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900/40 border border-slate-800/80 p-4 rounded-2xl backdrop-blur-md">
          
          {/* Caja de Búsqueda */}
          <div className="relative w-full md:w-80">
            <Icons.Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input
              type="text"
              placeholder="Buscar insignia..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            {busqueda && (
              <button
                onClick={() => setBusqueda('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                <Icons.X size={14} />
              </button>
            )}
          </div>

          {/* Botones de Filtro por Rareza */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-center">
            {['Todas', 'Desbloqueadas', 'Común', 'Raro', 'Épico', 'Legendario'].map((categoria) => (
              <button
                key={categoria}
                onClick={() => setFiltroRareza(categoria)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-300 border ${
                  filtroRareza === categoria
                    ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-950 scale-105'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {categoria}
              </button>
            ))}
          </div>

          {/* Toggle de Modo de Vista (Grid / List) */}
          <div className="hidden sm:flex items-center bg-slate-950 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setVistaModo('grid')}
              className={`p-2 rounded-lg transition-colors ${vistaModo === 'grid' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-white'}`}
              title="Vista en Cuadrícula"
            >
              <Icons.LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setVistaModo('list')}
              className={`p-2 rounded-lg transition-colors ${vistaModo === 'list' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-white'}`}
              title="Vista en Lista"
            >
              <Icons.List size={16} />
            </button>
          </div>
        </div>

        {/* ================================================================== */}
        {/* GRID DE CARDS DINÁMICAS DE INSIGNIAS */}
        {/* ================================================================== */}
        {insigniasFiltradas.length === 0 ? (
          <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-12 text-center max-w-md mx-auto">
            <Icons.AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-300">No se encontraron insignias</h3>
            <p className="text-xs text-slate-500 mt-1">Prueba cambiando el término de búsqueda o el filtro seleccionado.</p>
            <button
              onClick={() => { setFiltroRareza('Todas'); setBusqueda(''); }}
              className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl text-emerald-400 transition-colors"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className={
            vistaModo === 'grid'
              ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
              : "flex flex-col gap-4"
          }>
            {insigniasFiltradas.map((item) => {
              const IconComponent = Icons[item.icono] || Icons.Award;
              const desbloqueada = puntosSalonActual >= item.reqPuntos;
              const config = RAREZA_CONFIG[item.rareza] || RAREZA_CONFIG['Común'];
              const porcentaje = Math.min(100, Math.round((puntosSalonActual / item.reqPuntos) * 100));

              if (vistaModo === 'list') {
                return (
                  <div
                    key={item.codigo}
                    onClick={() => setModalInsignia(item)}
                    className={`group bg-gradient-to-r ${config.bgGradient} border ${config.borderColor} ${config.glowColor} rounded-2xl p-4 backdrop-blur-md transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      !desbloqueada && 'opacity-60 grayscale hover:grayscale-0'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="p-3 rounded-xl border bg-slate-950"
                        style={{ borderColor: desbloqueada ? `${item.colorHex}60` : undefined }}
                      >
                        <IconComponent size={32} color={desbloqueada ? item.colorHex : '#64748B'} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors">{item.nombre}</h3>
                          <span className={`text-[10px] px-2 py-0.5 rounded-full border ${config.badgeStyle}`}>
                            {item.rareza}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{item.descripcion}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <span className="text-xs font-mono font-bold text-white">{item.reqPuntos} PTS</span>
                        <div className="text-[10px] text-slate-400">{porcentaje}% alcanzado</div>
                      </div>
                      <Icons.ChevronRight className="text-slate-600 group-hover:text-emerald-400 transition-colors" size={20} />
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={item.codigo}
                  onClick={() => setModalInsignia(item)}
                  className={`group relative bg-gradient-to-b ${config.bgGradient} border ${config.borderColor} ${config.glowColor} rounded-3xl p-5 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between cursor-pointer overflow-hidden ${
                    !desbloqueada && 'opacity-60 grayscale hover:grayscale-0'
                  }`}
                >
                  {/* Luz de fondo en Hover */}
                  <div className="absolute -top-12 -left-12 w-28 h-28 bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

                  <div>
                    {/* Fila Superior: Rareza y Puntos */}
                    <div className="flex justify-between items-center mb-4">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${config.badgeStyle}`}>
                        {item.rareza}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-emerald-400 transition-colors">
                        {item.reqPuntos} PTS
                      </span>
                    </div>

                    {/* Icono de Insignia Central con Glow */}
                    <div className="flex justify-center my-4">
                      <div
                        className={`relative p-4 rounded-2xl border transition-all duration-500 transform group-hover:scale-110 ${
                          desbloqueada
                            ? 'bg-slate-950/80 border-emerald-500/40 shadow-lg'
                            : 'bg-slate-950/60 border-slate-800'
                        }`}
                        style={{
                          borderColor: desbloqueada ? `${item.colorHex}80` : undefined,
                          boxShadow: desbloqueada ? `0 0 25px ${item.colorHex}35` : undefined
                        }}
                      >
                        <IconComponent
                          size={44}
                          color={desbloqueada ? item.colorHex : '#475569'}
                          className={`transition-transform duration-500 ${desbloqueada ? 'group-hover:rotate-12' : ''}`}
                        />

                        {/* Indicador de Desbloqueado en tiempo real */}
                        {desbloqueada && (
                          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Título y Descripción Corta */}
                    <h3 className="text-center font-extrabold text-base text-slate-100 group-hover:text-emerald-300 transition-colors">
                      {item.nombre}
                    </h3>
                    <p className="text-center text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2 min-h-[32px]">
                      {item.descripcion}
                    </p>
                  </div>

                  {/* Barra de Progreso Individual Inferior */}
                  <div className="mt-5 pt-3 border-t border-slate-800/80">
                    <div className="flex justify-between text-[11px] font-medium mb-1">
                      <span className={desbloqueada ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                        {desbloqueada ? '¡Desbloqueada!' : 'En Progreso'}
                      </span>
                      <span className="text-slate-400">{porcentaje}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
                        style={{ width: `${porcentaje}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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