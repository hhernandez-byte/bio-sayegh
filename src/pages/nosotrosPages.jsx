import React, { useState } from 'react';
import {
  Leaf,
  Users,
  Sparkles,
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
  TreePine
} from 'lucide-react';

export default function App() {
  // Selected Team Member for Interactive Modal
  const [selectedMember, setSelectedMember] = useState(null);

  // Active Tab for Marco Referencial
  const [activeMarcoTab, setActiveMarcoTab] = useState('teorico');

  // 5 Team Members Data (Requirement: Circular initials side by side)
  const teamMembers = [
    {
      id: 'AC',
      initials: 'AC',
      name: 'Aylin Carbonell',
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
      id: 'JG',
      initials: 'JG',
      name: 'Jesús Gutierrez',
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
      id: 'HH',
      initials: 'HH',
      name: 'Hernando Hernandez',
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
      id: 'SP',
      initials: 'SP',
      name: 'Samuel Pardo',
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
      id: 'YV',
      initials: 'YV',
      name: 'Yhara Vasquéz',
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
      text: 'Las campañas ambientales convencionales sufren de falta de continuidad al carecer de herramientas tecnológicas que permitan medir el impacto real y premiar la constancia estudiantil.',
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
      title: 'Marco Tecnológico',
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
   
    legal: {
      title: 'Marco Legal',
      subtitle: 'Normativa Ambiental Colombiana',
      content: 'Alineado con las leyes y decretos nacionales sobre educación ambiental, gestión integral de residuos sólidos y cumplimiento de metas internacionales.',
      points: [
        'Ley 115 de 1994 (Ley General de Educación - PRAE)',
        'Decreto 1743 de 1994 (Institucionalización de la Educación Ambiental)',
        'Objetivos de Desarrollo Sostenible (ODS 12: Producción y Consumo Responsable)'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#03658C] font-sans selection:bg-[#A6D9A5] selection:text-[#03658C] pb-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
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

        {/* ==================== METRIC CARDS ==================== */}
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

        {/* ==================== 3. DESCRIPCIÓN DEL GRUPO (5 INTEGRANTES EN FILA CIRCULAR) ==================== */}
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

          {/* 5 Circular Members Row */}
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
                  className={`w-full py-3 ${comp.btnBg} text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 mt-4`}
                >
                  <span>{comp.btnText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== 6. JUSTIFICACIÓN DEL PROYECTO ==================== */}
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
              <h3 className="text-lg font-black text-[#03658C]">Escalabilidad e Integración</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Se articula con el Proyecto Ambiental Escolar (PRAE) garantizando la continuidad pedagógica en la comunidad educativa.
              </p>
            </div>

          </div>
        </section>

        {/* ==================== 7. OBJETIVOS ==================== */}
        <section id="objetivos" className="space-y-6 pt-4">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#338C30] uppercase tracking-widest">
              PROPÓSITO Y RUTA
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#03658C] uppercase">
              OBJETIVOS DEL PROYECTO
            </h2>
          </div>

          {/* Objetivo General Card */}
          <div className="bg-gradient-to-r from-[#03658C] to-[#338C30] text-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#A6D9A5]/30">
            <div className="flex items-center gap-2 text-[#A6D9A5] font-bold text-xs uppercase tracking-widest mb-2">
              <Target className="w-5 h-5 text-[#A6D9A5]" />
              <span>OBJETIVO GENERAL</span>
            </div>
            <p className="text-base sm:text-lg font-semibold leading-relaxed">
              Desarrollar e implementar la plataforma web Bio-Sayegh COLSAM para la geolocalización de residuos y gamificación de incentivos ambientales, fomentando una cultura de recolección selectiva y saneamiento en el Colegio San Alberto Magno.
            </p>
          </div>

          {/* Objetivos Específicos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {specificObjectives.map((obj) => (
              <div key={obj.num} className="bg-white rounded-2xl p-5 border-2 border-slate-100 hover:border-[#338C30] shadow-sm transition-all space-y-2">
                <div className="w-8 h-8 rounded-full bg-[#A6D9A5]/30 text-[#338C30] font-black text-sm flex items-center justify-center">
                  {obj.num}
                </div>
                <h4 className="text-sm font-bold text-[#03658C]">{obj.title}</h4>
                <p className="text-xs text-slate-600 leading-normal">{obj.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== 8. MARCO REFERENCIAL ==================== */}
        <section className="space-y-6 pt-4">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#338C30] uppercase tracking-widest">
              FUNDAMENTACIÓN ACADÉMICA
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#03658C] uppercase">
              MARCO REFERENCIAL
            </h2>
          </div>

          {/* Tabs Nav */}
          <div className="flex flex-wrap items-center justify-center gap-2 border-b border-slate-200 pb-4">
            {Object.keys(marcoData).map((key) => (
              <button
                key={key}
                onClick={() => setActiveMarcoTab(key)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeMarcoTab === key
                    ? 'bg-[#03658C] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Tab Content Box */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-[#03658C]/20 shadow-md space-y-4 max-w-4xl mx-auto">
            <span className="text-xs font-bold text-[#338C30] uppercase tracking-wider">
              {marcoData[activeMarcoTab].subtitle}
            </span>
            <h3 className="text-2xl font-black text-[#03658C]">
              {marcoData[activeMarcoTab].title}
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {marcoData[activeMarcoTab].content}
            </p>

            <div className="pt-2">
              <span className="text-xs font-bold text-[#03658C] uppercase block mb-2">Puntos Destacados:</span>
              <ul className="space-y-2">
                {marcoData[activeMarcoTab].points.map((pt, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-[#338C30] shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="mt-16 bg-[#03658C] text-white py-8 border-t-4 border-[#338C30]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#338C30] flex items-center justify-center text-white">
              <Leaf className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold tracking-tight">Bio-Sayegh COLSAM</span>
            <span className="text-slate-300">| Proyecto Ambiental Escolar</span>
          </div>

          <div className="text-slate-300">
            © {new Date().getFullYear()} Colegio San Alberto Magno. Todos los derechos reservados.
          </div>
        </div>
      </footer>

    </div>
  );
}
