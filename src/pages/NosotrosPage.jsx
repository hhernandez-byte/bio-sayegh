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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-[#024b69] text-slate-100 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Inicio</span>
            </button>

            <button 
              onClick={() => setActiveNav('mapa')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-[#024b69] text-slate-100 transition-all"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Mapa</span>
            </button>

            <button 
              onClick={() => setActiveNav('datos')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-[#024b69] text-slate-100 transition-all"
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

            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#338C30] hover:bg-[#287026] text-white font-bold tracking-wider uppercase shadow-sm">
              <Award className="w-3.5 h-3.5" />
              <span>INSIGNIAS</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">

        {/* ==================== 2. BANNER PRINCIPAL ==================== */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#03658C] via-[#024f6e] to-[#338C30] text-white p-8 sm:p-12 text-center shadow-xl border border-[#A6D9A5]/30">
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#A6D9A5]/40 text-xs font-bold uppercase tracking-widest text-[#A6D9A5]">
              <span className="w-2 h-2 rounded-full bg-[#A6D9A5]" />
              <span>APARTADO NOSOTROS • COLEGIO SAN ALBERTO MAGNO</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase leading-tight">
              PROYECTO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#A6D9A5] to-white">
                BIO-SAYEGH COLSAM
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-100 font-normal leading-relaxed max-w-2xl mx-auto">
              Plataforma ecológica para la geolocalización de residuos, limpieza colaborativa, gamificación ambiental y estructuración metodológica de investigación escolar.
            </p>
          </div>
        </section>

        {/* ==================== 3. DESCRIPCIÓN DEL GRUPO ==================== */}
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
                <div className="relative my-3">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[3px] bg-gradient-to-tr from-[#03658C] via-[#338C30] to-[#A6D9A5] shadow-md group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center border-2 border-[#A6D9A5]/30">
                      <span className="text-2xl font-black text-[#03658C] group-hover:text-[#338C30] transition-colors">
                        {member.initials}
                      </span>
                    </div>
                  </div>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#03658C] text-white uppercase tracking-wider shadow">
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

      </main>
    </div>
  );
}
