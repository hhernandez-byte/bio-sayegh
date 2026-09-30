import React, { useState } from 'react';
import { Award, Lock, Sparkles, CheckCircle2, Trophy } from 'lucide-react';

// Lista de insignias / niveles del camino
const INSIGNIAS_NIVELES = [
  { id: 1, titulo: "Separador Novato", desc: "Clasifica 10 plásticos correctamente", icono: "♻️", color: "#38bdf8" },
  { id: 2, titulo: "Héroe del Vidrio", desc: "Deposita 5 botellas de vidrio", icono: "🍾", color: "#34d399" },
  { id: 3, titulo: "Guardián Orgánico", desc: "Registra residuos de alimentos", icono: "🍎", color: "#facc15" },
  { id: 4, titulo: "Eco-Detective", desc: "Atrapa 3 invasores en el mapa", icono: "🔍", color: "#fb923c" },
  { id: 5, titulo: "Maestro del Papel", desc: "Recicla cuadernos y hojas", icono: "📦", color: "#a855f7" },
  { id: 6, titulo: "Campeón COLSAM", desc: "¡Salón con cero residuos mal gestionados!", icono: "👑", color: "#f43f5e" },
];

export default function CaminoInsignias({ salonClave = "Salón 3-1" }) {
  // Simulación: nivel actual desbloqueado por el salón (1 al 6)
  const [nivelActual, setNivelActual] = useState(3); 
  const [insigniaSeleccionada, setInsigniaSeleccionada] = useState(null);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-slate-900/90 rounded-3xl border-2 border-slate-700 shadow-2xl relative overflow-hidden backdrop-blur-md">
      {/* Fondo de brillo festivo */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Encabezado vistoso */}
      <div className="text-center mb-10 relative z-10">
        <span className="bg-amber-500/20 text-amber-300 font-extrabold text-xs px-4 py-1.5 rounded-full border border-amber-500/40 uppercase tracking-widest inline-flex items-center gap-1.5 mb-2 shadow-lg shadow-amber-500/10">
          <Trophy size={14} /> Mapa de Logros - {salonClave}
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-300 to-amber-300 drop-shadow-sm">
          ¡Camino de Insignias EcoBot!
        </h2>
        <p className="text-slate-300 text-sm mt-1">Avanza clasificando residuos para desbloquear nuevos logros</p>
      </div>

      {/* CAMINO ESTILO CANDY CRUSH */}
      <div className="relative py-12 px-4 flex flex-col items-center gap-16 min-h-[500px]">
        {/* Línea conectora serpenteante */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M 50% 80 C 70% 150, 70% 200, 50% 270 C 30% 340, 30% 390, 50% 460 C 70% 530, 70% 580, 50% 650"
            fill="transparent"
            stroke="#334155"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="16 12"
          />
        </svg>

        {/* Nodos del Camino */}
        {INSIGNIAS_NIVELES.map((item, index) => {
          const desbloqueada = item.id <= nivelActual;
          const esNivelActual = item.id === nivelActual;
          
          // Desplazamiento alternado izquierda-derecha (tipo mapa de juego)
          const offsetClass = index % 2 === 0 ? "sm:translate-x-16" : "sm:-translate-x-16";

          return (
            <div 
              key={item.id} 
              className={`relative z-10 flex items-center gap-4 transition-all duration-300 ${offsetClass}`}
            >
              {/* Botón de Insignia */}
              <button
                onClick={() => setInsigniaSeleccionada(item)}
                className={`relative group w-20 h-20 rounded-full flex items-center justify-center font-black text-2xl transition-all transform hover:scale-110 active:scale-95 shadow-2xl border-4 ${
                  desbloqueada
                    ? 'border-amber-300 text-white shadow-amber-500/40 cursor-pointer animate-bounce-short'
                    : 'bg-slate-800 border-slate-600 text-slate-500 cursor-not-allowed opacity-80'
                }`}
                style={{
                  background: desbloqueada 
                    ? `radial-gradient(circle, ${item.color} 0%, #0f172a 100%)` 
                    : '#1e293b'
                }}
              >
                {/* Icono de la insignia */}
                <span>{item.icono}</span>

                {/* Brillos adicionales si está completada */}
                {desbloqueada && (
                  <Sparkles className="absolute -top-2 -right-2 text-amber-300 animate-spin-slow" size={20} />
                )}

                {/* Candado si está bloqueada */}
                {!desbloqueada && (
                  <div className="absolute inset-0 bg-slate-950/70 rounded-full flex items-center justify-center">
                    <Lock size={22} className="text-slate-400" />
                  </div>
                )}
              </button>

              {/* PERSONAJE CANECA ANIMADA (Sigue al nivel actual) */}
              {esNivelActual && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce">
                  <div className="bg-emerald-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase shadow-lg border border-emerald-300 whitespace-nowrap mb-1">
                    ¡Aquí estás!
                  </div>
                  {/* Avatar de Caneca Animada en SVG */}
                  <div className="w-12 h-12 bg-emerald-400 rounded-2xl border-2 border-white shadow-xl flex items-center justify-center text-xl relative">
                    🗑️
                    {/* Ojitos animados */}
                    <span className="absolute top-1 text-[8px]">👀</span>
                  </div>
                </div>
              )}

              {/* Etiqueta del nivel */}
              <div className="bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-xl shadow-md text-left backdrop-blur-sm">
                <p className="text-xs font-extrabold text-slate-200">{item.titulo}</p>
                <p className="text-[10px] text-slate-400 font-semibold">
                  {desbloqueada ? '¡Completada!' : 'Bloqueada'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL / DETALLE DE INSIGNIA SELECCIONADA */}
      {insigniaSeleccionada && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 border-2 border-slate-700 rounded-3xl p-6 max-w-sm w-full text-center relative shadow-2xl animate-in zoom-in-95">
            <div 
              className="w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl mb-4 border-4 border-amber-300 shadow-lg"
              style={{ background: `radial-gradient(circle, ${insigniaSeleccionada.color} 0%, #0f172a 100%)` }}
            >
              {insigniaSeleccionada.icono}
            </div>
            <h3 className="text-xl font-black text-white">{insigniaSeleccionada.titulo}</h3>
            <p className="text-sm text-slate-300 mt-2">{insigniaSeleccionada.desc}</p>
            
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setInsigniaSeleccionada(null)}
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl transition-colors shadow-lg cursor-pointer"
              >
                ¡Entendido!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}