import React, { useState } from 'react';
import { 
  Leaf, 
  MapPin, 
  BarChart3, 
  Users, 
  Award, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  Target, 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  Globe, 
  Activity, 
  Lightbulb, 
  X, 
  ArrowRight, 
  TreePine, 
  Scale, 
  Compass, 
  FileText, 
  School
} from 'lucide-react';

export default function App() {
  // Navigation active tab
  const [activeNav, setActiveNav] = useState('nosotros');

  // Selected Team Member for Interactive Modal
  const [selectedMember, setSelectedMember] = useState(null);

  // Active Tab for Planteamiento del Problema
  const [activeProblemTab, setActiveProblemTab] = useState('contexto');

  // Active Tab for Marco Referencial
  const [activeMarcoTab, setActiveMarcoTab] = useState('teorico');

  // 5 Team Members Data (Requirement: Circular initials side by side)
  const teamMembers = [
    {
      id: 'HH',
      initials: 'HH',
      name: 'Harold Hernández',
      role: 'Líder de Proyecto & Software',
      specialty: 'Desarrollo Web & Georreferenciación',
      bio: 'Encargado de la arquitectura de la plataforma web Bio-Sayegh COLSAM, coordinando la geolocalización vectorial en tiempo real y la integración con el sistema de incentivos por curso.',
      contributions: [
        'Arquitectura e interfaz de la plataforma web',
        'Coordinación técnica del sistema vectorial del mapa',
        'Integración del módulo interactivo de insignias ecológicas'
      ],
      badge: 'Líder'
    },
    {
      id: 'AS',
      initials: 'AS',
      name: 'Andrea Sayegh',
      role: 'Investigadora Principal Ecológica',
      specialty: 'Gestión Ambiental Escolar',
      bio: 'Líder del diagnóstico situacional de residuos en el Colegio San Alberto Magno. Diseñó la pregunta problematizadora y la estrategia de cultura ciudadana ambiental.',
      contributions: [
        'Formulación de la pregunta problematizadora',
        'Diseño de las categorías de recolección de residuos',
        'Gestión e integración del marco normativo y metodológico'
      ],
      badge: 'Investigadora'
    },
    {
      id: 'MG',
      initials: 'MG',
      name: 'Mateo Gómez',
      role: 'Analista de Datos Ambientales',
      specialty: 'Métricas & Estadísticas',
      bio: 'Especialista en estructuración de indicadores cuantitativos. Procesa las estadísticas de saneamiento y acumulación de eco-puntos por salón.',
      contributions: [
        'Modelado de métricas para zonas saneadas y eco-puntos',
        'Análisis cualitativo y cuantitativo del proyecto',
        'Validación de datos de campo en el campus'
      ],
      badge: 'Analista'
    },
    {
      id: 'CR',
      initials: 'CR',
      name: 'Camila Rodríguez',
      role: 'Coordinadora de Gamificación',
      specialty: 'Estrategias Didácticas & Pedagógicas',
      bio: 'Diseñadora del esquema de gamificación escolar, encargada de la Ruta de Insignias y de articular el proyecto con el PRAE del Colegio San Alberto Magno.',
      contributions: [
        'Diseño conceptual de la Ruta de Insignias',
        'Redacción del Marco Teórico y Pedagógico',
        'Estrategias de incentivo para salones de clase'
      ],
      badge: 'Coordinadora'
    },
    {
      id: 'VM',
      initials: 'VM',
      name: 'Valentín Mendoza',
      role: 'Especialista en Logística & Zonas',
      specialty: 'Geolocalización & Operativa',
      bio: 'Supervisa la delimitación física del campus para el mapa vectorial, asegurando la verificación en terreno de las alertas de residuos reportadas.',
      contributions: [
        'Mapeo territorial del Colegio San Alberto Magno',
        'Estructuración del Marco Contextual y territorial',
        'Enlace con docentes y representantes de salones'
      ],
      badge: 'Logística'
    }
  ];

  // Planteamiento del Problema Cards
  const problemComponents = [
    {
      id: 'contexto',
      icon: <Globe className="w-6 h-6 text-white" />,
      iconBg: 'bg-[#03658C]',
      borderColor: 'border-[#03658C]',
      badgeBg: 'bg-[#03658C]',
      title: 'Diagnóstico & Contexto',
      subtitle: 'Realidad en el Campus Escolar',
      text: 'En el Colegio San Alberto Magno se evidencia acumulación de residuos sólidos en áreas comunes y aulas, generando la necesidad de un sistema moderno de monitoreo ambiental participativo.',
      btnText: 'Ver Detalle del Contexto',
      btnBg: 'bg-[#03658C] hover:bg-[#024f6e]',
      details: [
        'Disposición inadecuada de residuos en áreas de recreo',
        'Baja motivación inicial en hábitos de separación',
        'Necesidad de geolocalizar puntos limpios'
      ]
    },
    {
      id: 'desafio',
      icon: <Activity className="w-6 h-6 text-white" />,
      iconBg: 'bg-[#338C30]',
      borderColor: 'border-[#338C30]',
      badgeBg: 'bg-[#338C30]',
      title: 'El Desafío Central',
      subtitle: 'Brecha de Seguimiento Tradicional',
      text: 'Las campanas ambientales convencionales sufren de falta de continuidad al carecer de herramientas tecnológicas que permitan medir el impacto real y premiar la constancia estudiantil.',
      btnText: 'Explorar la Problemática',
      btnBg: 'bg-[#338C30] hover:bg-[#287026]',
      details: [
        'Ausencia de indicadores visuales e históricos por curso',
        'Procesos manuales estáticos y de bajo engagement',
        'Falta de un canal digital de reporte dinámico'
      ]
    },
    {
      id: 'propuesta',
      icon: <Lightbulb className="w-6 h-6 text-white" />,
      iconBg: 'bg-[#8C644D]',
      borderColor: 'border-[#8C644D]',
      badgeBg: 'bg-[#8C644D]',
      title: 'Propuesta de Solución',
      subtitle: 'Plataforma Bio-Sayegh COLSAM',
      text: 'Implementar una web geolocalizada con gamificación por salones (eco-puntos, insignias y zonas saneadas), transformando la gestión de residuos en una actividad colaborativa.',
      btnText: 'Ver Modelo de Solución',
      btnBg: 'bg-[#8C644D] hover:bg-[#72513e]',
      details: [
        'Mapeo vectorial del campus en tiempo real',
        'Incentivos mediante la Ruta de Insignias',
        'Sostenibilidad articulada con el PRAE'
      ]
    }
  ];

  // Specific Objectives
  const specificObjectives = [
    {
      num: '1',
      title: 'Geolocalizar Zonas Críticas',
      desc: 'Cartografiar digitalmente el Colegio San Alberto Magno para registrar alertas de residuos y puntos limpios en tiempo real.'
    },
    {
      num: '2',
      title: 'Implementar Gamificación Ambiental',
      desc: 'Desarrollar la estructura de Eco-Puntos e Insignias para motivar la sana competencia ecológica entre los salones del colegio.'
    },
    {
      num: '3',
      title: 'Sistematizar Datos de Saneamiento',
      desc: 'Generar tableros de control con estadísticas de zonas saneadas e indicadores de desempeño ambiental por curso.'
    },
    {
      num: '4',
      title: 'Fomentar la Cultura Sostenible',
      desc: 'Evaluar la apropiación comunitaria de la plataforma Bio-Sayegh como herramienta pedagógica del proyecto ambiental institucional.'
    }
  ];

  // Marco Referencial Data
  const marcoData = {
    teorico: {
      title: 'Marco Teórico',
      subtitle: 'Sostenibilidad & Gamificación Educativa',
      content: 'Se fundamenta en la teoría del Aprendizaje Basado en Juegos (GBL), la Geoinformática ambiental y los enfoques de Educación para el Desarrollo Sostenible (EDS) promovidos por la UNESCO.',
      points: [
        'Mecanismos de Gamificación para cambios conductuales (Deterding et al.)',
        'Tecnologías de la Información Geográfica (TIG) aplicadas a la educación',
        'Cultura de reciclaje y segregación en la fuente'
      ]
    },
    conceptual: {
      title: 'Marco Conceptual',
      subtitle: 'Definiciones Clave de la Plataforma',
      content: 'Establece los términos técnicos y pedagógicos utilizados en la plataforma Bio-Sayegh COLSAM para homologar la comprensión entre docentes y alumnos.',
      points: [
        'Punto Limpio: Área designada para el depósito clasificado de residuos',
        'Eco-Puntos: Unidades de logro otorgadas a salones por acciones ecológicas',
        'Saneamiento Colaborativo: Proceso colectivo de recuperación de zonas'
      ]
    },
    contextual: {
      title: 'Marco Contextual',
      subtitle: 'Colegio San Alberto Magno (COLSAM)',
      content: 'Desarrollado específicamente en las instalaciones del Colegio San Alberto Magno, involucrando activamente a estudiantes, profesores y salones piloto como el Salón 3A.',
      points: [
        'Comunidad educativa comprometida con la innovación verde',
        'Infraestructura física distribuida en bloques, patios y zonas verdes',
        'Integración directa con el Proyecto Ambiental Escolar (PRAE)'
      ]
    },
    legal: {
      title: 'Marco Legal',
      subtitle: 'Normativa Ambiental Colombiana',
      content: 'Alineado con las leyes y decretos nacionales sobre educación ambiental, gestión integral de residuos sólidos y cumplimiento de metas internacionales.',
      points: [
        'Ley 115 de 1994 (Ley General de Educación - PRAE)',
        'Decreto 1743 de 1994 (Institucionalización de la Educación Ambiental)',
        'Objetivos de Desarrollo Sostenible (ODS 12: Producción y Consumo Responsable)'
      ]
    },
    metodologico: {
      title: 'Marco Metodológico',
      subtitle: 'Investigación-Acción Participativa (IAP)',
      content: 'Enfoque mixto que combina la recolección cuantitativa de métricas de residuos con la observación cualitativa de hábitos sostenibles en los cursos.',
      points: [
        'Enfoque de Investigación-Acción Participativa (IAP)',
        'Diagnóstico, diseño tecnológico, pilotaje e impacto',
        'Técnicas: Registro en plataforma, encuestas y observación directa'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#03658C] font-sans selection:bg-[#A6D9A5] selection:text-[#03658C] pb-12">
      
      {/* ==================== 1. ENCABEZADO SUPERIOR ==================== */}
      <header className="bg-[#03658C] text-white sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 overflow-x-auto">
          
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-[#338C30] flex items-center justify-center text-white shadow">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex items-baseline text-lg font-black tracking-tight">
              <span className="text-white">Bio-Sayegh</span>
              <span className="text-[#A6D9A5] ml-1.5 text-base font-bold">COLSAM</span>
            </div>
          </div>

          {/* Nav Buttons */}
          <nav className="flex items-center gap-1.5 text-xs font-semibold shrink-0">
            
            <button 
              onClick={() => setActiveNav('inicio')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeNav === 'inicio' ? 'bg-[#024f6e] text-white border border-[#A6D9A5]' : 'hover:bg-[#024b69] text-slate-100'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Inicio</span>
            </button>

            <button 
              onClick={() => setActiveNav('mapa')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeNav === 'mapa' ? 'bg-[#024f6e] text-white border border-[#A6D9A5]' : 'hover:bg-[#024b69] text-slate-100'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Mapa</span>
            </button>

            <button 
              onClick={() => setActiveNav('datos')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                activeNav === 'datos' ? 'bg-[#024f6e] text-white border border-[#A6D9A5]' : 'hover:bg-[#024b69] text-slate-100'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Datos</span>
            </button>

            <button 
              onClick={() => setActiveNav('nosotros')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#024059] text-white font-bold border border-[#A6D9A5] shadow-inner"
            >
              <Users className="w-3.5 h-3.5 text-[#A6D9A5]" />
              <span>Nosotros</span>
            </button>

            {/* Insignia Verde Button */}
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#338C30] hover:bg-[#287026] text-white font-bold tracking-wider uppercase shadow-sm">
              <Award className="w-3.5 h-3.5" />
              <span>INSIGNIAS</span>
            </button>

            {/* Pill: Salón Conectado */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#024059] border border-[#A6D9A5]/40 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-[#A6D9A5] animate-pulse" />
              <span className="text-slate-200">SALÓN CONECTADO:</span>
              <span className="text-white font-bold">3A</span>
            </div>

            {/* Cambiar Rol Button */}
            <button className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#8C644D] hover:bg-[#72513e] text-white text-[11px] font-medium border border-[#A6D9A5]/30">
              <span>Cambiar Rol</span>
            </button>

          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* ==================== 2. BANNER PRINCIPAL ==================== */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#03658C] via-[#024f6e] to-[#338C30] text-white p-8 sm:p-12 text-center shadow-xl border border-[#A6D9A5]/30">
          
          <Leaf className="absolute -left-10 -bottom-10 w-48 h-48 text-white/5 pointer-events-none" />
          <TreePine className="absolute -right-10 -top-10 w-52 h-52 text-white/5 pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#A6D9A5]/40 text-xs font-bold uppercase tracking-widest text-[#A6D9A5]">
              <span className="w-2 h-2 rounded-full bg-[#A6D9A5]" />
              <span>APARTADO NOSOTROS • COLEGIO SAN ALBERTO MAGNO</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-tight">
              PROYECTO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#A6D9A5] to-white">
                BIO-SAYEGH COLSAM
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-100 font-normal leading-relaxed max-w-2xl mx-auto">
              Plataforma ecológica para la geolocalización de residuos, limpieza colaborativa, gamificación ambiental y estructuración metodológica de investigación escolar.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a 
                href="#equipo" 
                className="px-6 py-3 rounded-full bg-[#338C30] hover:bg-[#287026] text-white text-xs font-bold tracking-wider uppercase shadow-lg transition-all flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>INTEGRANTES DEL GRUPO</span>
              </a>
              
              <a 
                href="#objetivos" 
                className="px-6 py-3 rounded-full bg-[#03658C] hover:bg-[#024f6e] text-white text-xs font-bold tracking-wider uppercase border border-[#A6D9A5]/40 shadow-lg transition-all flex items-center gap-2"
              >
                <Target className="w-4 h-4 text-[#A6D9A5]" />
                <span>VER OBJETIVOS</span>
              </a>
            </div>

          </div>
        </section>

        {/* ==================== METRIC CARDS (ESTILO DE LA INTERFAZ DE REFERENCIA) ==================== */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white rounded-2xl p-6 border-2 border-[#338C30] shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-[#A6D9A5]/25 border border-[#338C30]/30 flex items-center justify-center text-[#338C30] shrink-0">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-[#03658C]">5</div>
              <div className="text-xs font-bold text-slate-500 tracking-wider uppercase">INTEGRANTES DEL EQUIPO</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-[#03658C] shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-[#03658C]/10 border border-[#03658C]/30 flex items-center justify-center text-[#03658C] shrink-0">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-[#03658C]">155</div>
              <div className="text-xs font-bold text-slate-500 tracking-wider uppercase">ECO-PUNTOS ACUMULADOS</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border-2 border-[#8C644D] shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 rounded-xl bg-[#8C644D]/10 border border-[#8C644D]/30 flex items-center justify-center text-[#8C644D] shrink-0">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <div className="text-3xl font-black text-[#03658C]">5</div>
              <div className="text-xs font-bold text-slate-500 tracking-wider uppercase">EJE METODOLÓGICO Y MARCO</div>
            </div>
          </div>

        </section>

        {/* ==================== 3. DESCRIPCIÓN DEL GRUPO (5 INTEGRANTES EN MARCO CIRCULAR SIDE-BY-SIDE) ==================== */}
        <section id="equipo" className="space-y-6 pt-4">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#338C30] uppercase tracking-widest">
              INVESTIGACIÓN Y DESARROLLO
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#03658C] uppercase">
              DESCRIPCIÓN DEL GRUPO
            </h2>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
              Cinco integrantes ubicados horizontalmente en marcos circulares. Haz clic en cualquiera de ellos para ver su ficha completa.
            </p>
          </div>

          {/* 5 Circular Members Row (Side by Side) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="group cursor-pointer bg-white rounded-2xl p-5 border-2 border-slate-100 hover:border-[#338C30] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
              >
                {/* Top Accent Stripe */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#03658C] via-[#338C30] to-[#8C644D]" />

                {/* Circular Frame with Initial */}
                <div className="relative my-3">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-tr from-[#03658C] via-[#338C30] to-[#A6D9A5] shadow-md group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center border-2 border-[#A6D9A5]/30">
                      <span className="text-2xl font-black text-[#03658C] group-hover:text-[#338C30] transition-colors">
                        {member.initials}
                      </span>
                    </div>
                  </div>
                  
                  {/* Badge */}
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#03658C] text-white uppercase tracking-wider shadow">
                    {member.badge}
                  </span>
                </div>

                {/* Name & Role */}
                <h3 className="text-sm font-black text-[#03658C] group-hover:text-[#338C30] transition-colors mt-2">
                  {member.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-tight line-clamp-2">
                  {member.role}
                </p>

                {/* Interactive Action Prompt */}
                <div className="mt-4 text-[11px] font-bold text-[#338C30] flex items-center gap-1 group-hover:underline">
                  <span>Ver Detalle</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TEAM MEMBER MODAL */}
        {selectedMember && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSelectedMember(null)}
          >
            <div 
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border-2 border-[#338C30] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#03658C] via-[#338C30] to-[#8C644D]" />

              <button 
                onClick={() => setSelectedMember(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#03658C] to-[#338C30] p-[2px] shrink-0">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-xl font-black text-[#03658C]">
                    {selectedMember.initials}
                  </div>
                </div>
                <div>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-[#A6D9A5]/30 text-[#338C30] border border-[#338C30]/30 uppercase">
                    {selectedMember.badge}
                  </span>
                  <h3 className="text-xl font-bold text-[#03658C] mt-1">{selectedMember.name}</h3>
                  <p className="text-xs text-slate-500">{selectedMember.role}</p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="bg-[#A6D9A5]/15 p-3 rounded-xl border border-[#A6D9A5]/50">
                  <span className="font-bold text-[#03658C] block text-xs uppercase mb-1">Especialidad</span>
                  <p className="text-slate-800 font-medium">{selectedMember.specialty}</p>
                </div>

                <div>
                  <span className="font-bold text-[#03658C] block text-xs uppercase mb-1">Descripción de Funciones</span>
                  <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {selectedMember.bio}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-[#03658C] block text-xs uppercase mb-2">Aportes Específicos</span>
                  <ul className="space-y-2">
                    {selectedMember.contributions.map((c, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#338C30] shrink-0" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="mt-6 w-full py-3 rounded-xl bg-[#03658C] hover:bg-[#024f6e] text-white font-bold text-xs uppercase tracking-wider transition-all shadow"
              >
                Cerrar Ficha
              </button>
            </div>
          </div>
        )}

        {/* ==================== 4. PREGUNTA PROBLEMATIZADORA ==================== */}
        <section className="max-w-4xl mx-auto">
          <div className="rounded-3xl bg-[#03658C] text-white p-8 sm:p-10 shadow-xl border-2 border-[#338C30] relative overflow-hidden">
            
            <HelpCircle className="absolute -right-8 -bottom-8 w-44 h-44 text-white/5 pointer-events-none" />

            <div className="flex items-center gap-2 text-[#A6D9A5] text-xs font-bold uppercase tracking-widest mb-3">
              <HelpCircle className="w-4 h-4" />
              <span>PREGUNTA PROBLEMATIZADORA DE INVESTIGACIÓN</span>
            </div>

            <blockquote className="text-xl sm:text-2xl font-black leading-relaxed tracking-tight mb-6 text-white">
              "¿De qué manera la implementación de una plataforma web interactiva basada en geolocalización de residuos y gamificación ambiental influye en los hábitos de gestión de residuos de los estudiantes del Colegio San Alberto Magno?"
            </blockquote>

            <div className="pt-4 border-t border-teal-700/60 flex flex-wrap items-center justify-between text-xs text-slate-200 gap-2">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-4 h-4 text-[#A6D9A5]" />
                Eje articulador del Proyecto Ambiental PRAE - COLSAM
              </span>
              <span className="font-mono text-[#A6D9A5] font-bold">BIO-SAYEGH v2.5</span>
            </div>
          </div>
        </section>

        {/* ==================== 5. PLANTEAMIENTO DEL PROBLEMA ==================== */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#338C30] uppercase tracking-widest">
              ARQUITECTURA AMBIENTAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#03658C] uppercase">
              PLANTEAMIENTO DEL PROBLEMA
            </h2>
            <p className="text-slate-600 text-sm max-w-lg mx-auto">
              Componentes del diagnóstico ecológico y la respuesta metodológica desarrollada para el campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {problemComponents.map((comp) => (
              <div 
                key={comp.id}
                className={`bg-white rounded-2xl border-2 ${comp.borderColor} shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group`}
              >
                <div className="p-6 space-y-4">
                  {/* Circle Icon at the top */}
                  <div className={`w-12 h-12 rounded-full ${comp.iconBg} flex items-center justify-center shadow-md`}>
                    {comp.icon}
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {comp.subtitle}
                    </span>
                    <h3 className="text-xl font-black text-[#03658C] mt-0.5">
                      {comp.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {comp.text}
                  </p>

                  <div className="pt-2">
                    <ul className="space-y-1.5">
                      {comp.details.map((dt, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#338C30]" />
                          <span>{dt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Full Width Button at Bottom */}
                <button 
                  onClick={() => setActiveProblemTab(comp.id)}
                  className={`w-full py-3 ${comp.btnBg} text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 mt-4`}
                >
                  <span>{comp.btnText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== 6. JUSTIFICACIÓN ==================== */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#338C30] uppercase tracking-widest">
              VALOR ESTRATÉGICO
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#03658C] uppercase">
              JUSTIFICACIÓN DEL PROYECTO
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-2xl border-2 border-[#03658C]/20 hover:border-[#03658C] shadow-sm space-y-3 relative overflow-hidden transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#03658C] text-white flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="text-lg font-black text-[#03658C]">Impacto Ambiental Directo</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Transforma la recolección de residuos en un proceso medible y accesible en tiempo real para estudiantes y docentes del Colegio San Alberto Magno.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-[#338C30]/20 hover:border-[#338C30] shadow-sm space-y-3 relative overflow-hidden transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#338C30] text-white flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="text-lg font-black text-[#03658C]">Innovación Didáctica</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Integra la gamificación ambiental mediante Eco-Puntos e Insignias para movilizar el interés colectivo en cada uno de los cursos.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-[#8C644D]/20 hover:border-[#8C644D] shadow-sm space-y-3 relative overflow-hidden transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#8C644D] text-white flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="text-lg font-black text-[#03658C]">Escalabilidad Institucional</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sienta las bases metodológicas y tecnológicas para replicar el modelo Bio-Sayegh en otras comunidades educativas de la región.
              </p>
            </div>

          </div>
        </section>

        {/* ==================== 7. OBJETIVOS (GENERAL Y ESPECÍFICOS) ==================== */}
        <section id="objetivos" className="space-y-6 pt-4">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#338C30] uppercase tracking-widest">
              HORIZONTES DE TRABAJO
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#03658C] uppercase">
              OBJETIVOS DEL PROYECTO
            </h2>
          </div>

          {/* General Objective Featured Box */}
          <div className="bg-gradient-to-r from-[#03658C] to-[#024f6e] text-white p-8 rounded-3xl shadow-lg border-2 border-[#338C30] flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#338C30] text-white flex items-center justify-center shrink-0 shadow-md">
              <Target className="w-8 h-8 text-[#A6D9A5]" />
            </div>
            <div className="space-y-2 text-center md:text-left">
              <span className="px-3 py-1 rounded-full bg-[#338C30] text-[10px] font-bold uppercase tracking-wider text-white">
                OBJETIVO GENERAL
              </span>
              <h3 className="text-lg sm:text-xl font-bold leading-snug">
                Desarrollar e implementar la plataforma ecológica web Bio-Sayegh COLSAM para la geolocalización participativa de residuos, gamificación ambiental e incremento del saneamiento colaborativo en el Colegio San Alberto Magno.
              </h3>
            </div>
          </div>

          {/* Specific Objectives Grid */}
          <div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center mb-4">
              OBJETIVOS ESPECÍFICOS
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {specificObjectives.map((obj) => (
                <div 
                  key={obj.num}
                  className="bg-white p-5 rounded-2xl border-2 border-slate-100 hover:border-[#338C30] shadow-sm flex items-start gap-4 transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-[#338C30] text-white font-black text-sm flex items-center justify-center shrink-0 shadow">
                    {obj.num}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-[#03658C]">{obj.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{obj.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== 8. MARCO REFERENCIAL ==================== */}
        <section className="space-y-6 pt-4">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#338C30] uppercase tracking-widest">
              SUSTENTO ACADÉMICO Y LEGAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#03658C] uppercase">
              MARCO REFERENCIAL
            </h2>
          </div>

          {/* Interactive Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {Object.keys(marcoData).map((key) => {
              const item = marcoData[key];
              const isActive = activeMarcoTab === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveMarcoTab(key)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    isActive 
                      ? 'bg-[#03658C] text-white border-[#338C30] shadow-md' 
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {item.title}
                </button>
              );
            })}
          </div>

          {/* Marco Content Card */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-slate-200 shadow-sm space-y-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold text-[#338C30] uppercase tracking-wider">
                  {marcoData[activeMarcoTab].subtitle}
                </span>
                <h3 className="text-xl font-black text-[#03658C]">
                  {marcoData[activeMarcoTab].title}
                </h3>
              </div>
              <BookOpen className="w-6 h-6 text-[#03658C]" />
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {marcoData[activeMarcoTab].content}
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Puntos Fundamentales
              </span>
              <ul className="grid sm:grid-cols-1 gap-2">
                {marcoData[activeMarcoTab].points.map((pt, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-[#A6D9A5]/15 p-2.5 rounded-lg border border-[#A6D9A5]/30">
                    <CheckCircle2 className="w-4 h-4 text-[#338C30] shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      </main>

      {/* ==================== 9. PIE DE PÁGINA (FOOTER MATCHING COLSAM) ==================== */}
      <footer className="mt-20 bg-[#03658C] text-white pt-10 pb-8 border-t-4 border-[#338C30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
          
          {/* Logo and Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#338C30] flex items-center justify-center text-white">
                <Leaf className="w-4 h-4" />
              </div>
              <span className="text-base font-black">Bio-Sayegh <span className="text-[#A6D9A5]">COLSAM</span></span>
            </div>
            <p className="text-slate-200 leading-relaxed">
              Iniciativa tecnológica orientada al desarrollo sostenible y la gestión ecológica escolar en el Colegio San Alberto Magno.
            </p>
          </div>

          {/* Equipo de Trabajo */}
          <div className="space-y-2">
            <span className="font-bold uppercase tracking-wider text-[#A6D9A5] text-[11px] block">
              EQUIPO DE TRABAJO
            </span>
            <div className="flex items-center gap-3 bg-[#024f6e] p-3 rounded-xl border border-teal-700/50">
              <div className="w-8 h-8 rounded-full bg-[#338C30] text-white flex items-center justify-center font-bold text-xs">
                BS
              </div>
              <div>
                <div className="font-bold text-white">Desarrollo Bio-Sayegh</div>
                <div className="text-[11px] text-slate-200">Proyecto de Ecología e Investigación</div>
              </div>
            </div>
          </div>

          {/* Institución */}
          <div className="space-y-2">
            <span className="font-bold uppercase tracking-wider text-[#A6D9A5] text-[11px] block">
              INSTITUCIÓN
            </span>
            <div className="space-y-1">
              <div className="font-bold text-white">Colegio San Alberto Magno</div>
              <div className="text-slate-200 text-[11px]">Sistema Ecológico Activo v2.5</div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 mt-8 border-t border-teal-700/40 text-center text-[11px] text-slate-300">
          <p>© {new Date().getFullYear()} Bio-Sayegh COLSAM • Todos los derechos reservados.</p>
        </div>
      </footer>

    </div>
  );
}
