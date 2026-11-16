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

export default function NosotrosPage() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [activeProblemTab, setActiveProblemTab] = useState('contexto');
  const [activeMarcoTab, setActiveMarcoTab] = useState('Tecnológico');

  const teamMembers = [
    {
      id: 'AC',
      initials: 'AC',
      name: 'Aylin Carbonell',
      role: 'Investigación Teórica',
      specialty: 'Investigación Teórica',
      bio: 'Encargada de estructurar los modelos de datos, asegurar el almacenamiento correcto y la integridad de la información del sistema.',
      contributions: [
        'Creación de Base de datos',
        'Gestión de registros de usuarios, salones e insignias',
        'Aseguramiento de la persistencia de datos'
      ],
      badge: 'Investigador Teórico 1'
    },
    {
      id: 'JG',
      initials: 'JG',
      name: 'Jesús Gutierrez',
      role: 'Analisis de Errores & Calidad',
      specialty: 'Control de Calidad (QA) & Pruebas',
      bio: 'Encargado de realizar pruebas de software, detectar fallos en la interfaz y garantizar el correcto funcionamiento del sistema.',
      contributions: [
        'Pruebas funcionales de la plataforma web',
        'Detección y reporte de errores en el código',
        'Control de calidad y verificación del rendimiento'
      ],
      badge: 'Analista QA'
    },
    {
      id: 'HH',
      initials: 'HH',
      name: 'Hernando Hernandez',
      role: 'Investigación Teórica',
      specialty: 'Investigación Teórica',
      bio: 'Encargado del sustento ecológico, investigación del marco PRAE y redacción de los contenidos ambientales de la plataforma.',
      contributions: [
        'Investigación de conceptos',
        'Redacción de conceptos',
        'Documentación de conceptos'
      ],
      badge: 'Investigador Teórico 2'
    },
    {
      id: 'SP',
      initials: 'SP',
      name: 'Samuel Pardo',
      role: 'Liderazgo General del Proyecto',
      specialty: 'Dirección de Proyecto & Estrategia',
      bio: 'Encargado de la gestión integral, supervisión del equipo y toma de decisiones estratégicas de la plataforma Bio-Sayegh.',
      contributions: [
        'Liderazgo y gestión del equipo',
        'Planificación estratégica del proyecto',
        'Supervisión general de avances y entregables'
      ],
      badge: 'Líder'
    },
    {
      id: 'YV',
      initials: 'YV',
      name: 'Yhara Vasquéz',
      role: 'Desarrollo Web',
      specialty: 'Desarrollo aplicativo web',
      bio: 'Encargada del desarrollo web, maquetación visual y componentes interactivos de la plataforma Bio-Sayegh.',
      contributions: [
        'Desarrollo e interfaz de la plataforma web',
        'Implementación de componentes dinámicos en React',
        'Navegación y diseño responsivo del sitio'
      ],
      badge: 'Desarrolladora'
    }
  ];

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
      subtitle: 'Plataforma Bio-Sayegh',
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

  const specificObjectives = [
    { num: '1', title: 'Diagnosticar', desc: 'Diagnosticar la situación actual sobre la segregación de residuos y el nivel de conocimiento ecológico en los estudiantes del Colegio San Alberto Magno.' },
    { num: '2', title: 'Diseñar', desc: 'Diseñar las dinámicas de gamificación (retos, insignias y el asistente virtual) y la cartografía de los puntos de acopio adaptadas a la comunidad educativa.' },
    { num: '3', title: 'Implementar', desc: 'Implementar el aplicativo web Bio-Sayegh como herramienta pedagógica interactiva dentro de las actividades de saneamiento ambiental del colegio.' },
    { num: '4', title: 'Evaluar', desc: 'Evaluar el cambio en la cultura de recolección selectiva y el grado de adopción de la plataforma a través del seguimiento de estadísticas de participación en 2026.' }
  ];

  const marcoData = {
    Tecnológico: {
      title: 'Marco Tecnológico',
      subtitle: 'Sostenibilidad & Gamificación Educativa',
      content: 'Detalla la infraestructura técnica, los lenguajes de programación, las librerías y la arquitectura de software integradas en la plataforma Bio-Sayegh para asegurar una experiencia interactiva, eficiente y escalable en la gestión ambiental del colegio.',
      points: [
        'Arquitectura Web Cliente-Servidor (React + Node.js)',
        'Entorno de Construcción y Rendimiento (Vite)',
        'Sistema de Módulos e Interfaz Adaptativa',
        'Gestión de Datos y Modelado de Residuos',
        'Plataforma Educativa y Gamificación',
        'Control de Calidad y Estándares de Código'
      ]
    },
    Conceptual: {
      title: 'Marco Conceptual',
      subtitle: 'Definiciones Clave de la Plataforma',
      content: 'Establece los términos técnicos y pedagógicos utilizados en la plataforma Bio-Sayegh para homologar la comprensión entre docentes y alumnos.',
      points: [
        'Eco-Puntos: Unidades de logro otorgadas a salones por acciones ecológicas.',
        'Eco-Guardianes: Rol adquirido al proteger el entorno escolar de invasores.',
        'Eco-Misión: Tareas a completar para alcanzar Eco-Puntos.',
        'Eco-Insignias: Recompensas obtenidas al completar alguna Eco-Misión.',
        'Saneamiento: Proceso de recuperación de zonas.',
        'Punto limpio: Área designada para el depósito clasificado de residuos.',
        'Invasores: Residuos encontrados en el Colegio San Alberto Magno.',
        'Concienciar: Adquirir conciencia sobre una realidad o problemática.',
        'Gamificación: Uso de elementos, mecánicas y dinámicas propios de los juegos en entornos que no son lúdicos.',
        'Geolocalización: Proceso de determinar la ubicación física o geográfica real de un dispositivo, persona u objeto en zonas determinadas.',
        'Cartografía Ambiental: Representación gráfica del territorio que localiza las zonas críticas y saneadas del colegio.',
        'Educación Ambiental: Proceso formativo que desarrolla conocimientos, valores y hábitos para proteger el entorno.',
        'API: Es un puente digital que permite que dos programas distintos se comuniquen e intercambien datos entre sí.'
      ]
    },
    Legal: {
      title: 'Marco Legal',
      subtitle: 'Normativa Ambiental Colombiana',
      content: 'Alineado con las leyes y decretos nacionales sobre educación ambiental, gestión integral de residuos sólidos y cumplimiento de metas internacionales.',
      points: [
        'Constitución Política de Colombia (1991) – Artículo 79',
        'Constitución Política de Colombia (1991) – Artículo 80',
        'Constitución Política de Colombia (1991) – Artículo 95 (Numeral 8)',
        'Ley 115 de 1994 (Ley General de Educación) – Artículo 5 (Numeral 10)',
        'Ley 115 de 1994 – Artículo 14 (Literal c)',
        'Decreto 1743 de 1994',
        'Resolución 2184 de 2019 (Ministerio de Ambiente y Desarrollo Sostenible)'
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#03658C] font-sans selection:bg-[#A6D9A5] selection:text-[#03658C] pb-12">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-12">
        
        {/* BANNER PRINCIPAL SIMPLIFICADO */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#03658C] via-[#024f6e] to-[#338C30] text-white p-8 sm:p-12 text-center shadow-xl border border-[#A6D9A5]/30">
          <Leaf className="absolute -left-10 -bottom-10 w-48 h-48 text-white/5 pointer-events-none" />
          <TreePine className="absolute -right-10 -top-10 w-52 h-52 text-white/5 pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-tight">
              ACERCA DE NOSOTROS
            </h1>

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

        {/* INTEGRANTES DEL EQUIPO */}
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                onClick={() => setSelectedMember(member)}
                className="group cursor-pointer bg-white rounded-2xl p-5 border-2 border-slate-100 hover:border-[#338C30] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#03658C] via-[#338C30] to-[#8C644D]" />

                <div className="relative my-2 pb-3">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-tr from-[#03658C] via-[#338C30] to-[#A6D9A5] shadow-md group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center border-2 border-[#A6D9A5]/30">
                      <span className="text-2xl font-black text-[#03658C] group-hover:text-[#338C30] transition-colors">
                        {member.initials}
                      </span>
                    </div>
                  </div>
                  
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full text-[9px] sm:text-[10px] font-bold bg-[#03658C] text-white uppercase tracking-wider shadow whitespace-nowrap z-10">
                    {member.badge}
                  </span>
                </div>

                <h3 className="text-sm font-black text-[#03658C] group-hover:text-[#338C30] transition-colors mt-2">
                  {member.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 leading-tight line-clamp-2">
                  {member.role}
                </p>

                <div className="mt-4 text-[11px] font-bold text-[#338C30] flex items-center gap-1 group-hover:underline">
                  <span>Ver Detalle</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MODAL FICHA TÉCNICA */}
        {selectedMember && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
            onClick={() => setSelectedMember(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl border-2 border-[#338C30] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
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

        {/* PREGUNTA PROBLEMATIZADORA */}
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
                <span>Eje articulador del Proyecto Ambiental PRAE COLSAM</span>
              </span>
              <span className="font-mono text-[#A6D9A5] font-bold">BIO-SAYEGH v2.5</span>
            </div>
          </div>
        </section>

        {/* PLANTEAMIENTO DEL PROBLEMA */}
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

                <button
                  onClick={() => setActiveProblemTab(comp.id)}
                  className={`w-full py-3 ${comp.btnBg} text-[#FFFFFF] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 mt-4`}
                >
                  <span>{comp.btnText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* JUSTIFICACIÓN DEL PROYECTO */}
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

        {/* OBJETIVOS */}
        <section id="objetivos" className="space-y-6 pt-4">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#338C30] uppercase tracking-widest">
              PROPÓSITO Y RUTA
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#03658C] uppercase">
              OBJETIVOS DEL PROYECTO
            </h2>
          </div>

          <div className="bg-gradient-to-r from-[#03658C] to-[#338C30] text-white rounded-2xl p-6 sm:p-8 shadow-md border border-[#A6D9A5]/30">
            <div className="flex items-center gap-2 text-[#A6D9A5] font-bold text-xs uppercase tracking-widest mb-2">
              <Target className="w-5 h-5 text-[#A6D9A5]" />
              <span>OBJETIVO GENERAL</span>
            </div>
            <p className="text-base sm:text-lg font-semibold leading-relaxed">
              Diseñar e implementar un aplicativo web interactivo (Bio-Sayegh) basado en geolocalización de residuos y estrategias de gamificación, orientado a mejorar la clasificación, el saneamiento y la cultura de recolección selectiva en el Colegio San Alberto Magno de Barranquilla en 2026.
            </p>
          </div>

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

        {/* MARCO REFERENCIAL */}
        <section className="space-y-6 pt-4">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-[#338C30] uppercase tracking-widest">
              FUNDAMENTACIÓN ACADÉMICA
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#03658C] uppercase">
              MARCO REFERENCIAL
            </h2>
          </div>

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
              {activeMarcoTab === 'Conceptual' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {marcoData[activeMarcoTab].points.map((pt, i) => {
                    const sep = pt.indexOf(': ');
                    const term = sep > -1 ? pt.slice(0, sep) : pt;
                    const def = sep > -1 ? pt.slice(sep + 2) : '';
                    return (
                      <div
                        key={i}
                        className="flex gap-3 rounded-xl border border-[#03658C]/15 bg-[#F5FAF7] p-3 transition-all hover:border-[#338C30]/45 hover:shadow-sm"
                      >
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#03658C]/10 text-[10px] font-black text-[#03658C]">
                          {i + 1}
                        </span>
                        <div className="space-y-0.5">
                          <span className="block text-xs font-black text-[#338C30]">{term}</span>
                          <span className="block text-[11px] leading-snug text-slate-600">{def}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <ul className="space-y-2">
                  {marcoData[activeMarcoTab].points.map((pt, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-[#338C30] shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>

      </main>

    </div>
  );
}