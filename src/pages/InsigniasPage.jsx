import React, { useEffect, useState } from 'react';

// URL de tu servidor PHP donde alojaste api.php
const API_URL = 'https://tu-servidor-php.com/api.php';

export default function AvanceSalones() {
  const [salones, setSalones] = useState([]);
  const [cargando, setCargando] = useState(true);

  // 1. Consultar la lista de salones desde PHP al cargar el componente
  const obtenerSalones = async () => {
    try {
      const res = await fetch(`${API_URL}?action=salones`);
      const data = await res.json();
      setSalones(data);
    } catch (error) {
      console.error('Error cargando salones:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerSalones();
  }, []);

  // 2. Función para registrar un avance (sumar puntos)
  const sumarPuntos = async (codigoSalon, cantidadPuntos) => {
    try {
      const res = await fetch(`${API_URL}?action=sumar-puntos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codigo: codigoSalon,
          puntos: cantidadPuntos,
        }),
      });

      const resultado = await res.json();

      if (resultado.success) {
        obtenerSalones();
      }
    } catch (error) {
      console.error('Error al actualizar puntos:', error);
    }
  };

  if (cargando) return <p className="text-center text-emerald-400 p-8">Cargando datos desde Bio-Sayegh DB...</p>;

  return (
    <div className="bg-slate-950 min-h-screen p-6 text-slate-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
          Tabla de Posiciones - Bio-Sayegh COLSAM
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {salones.map((salon) => (
            <div 
              key={salon.codigo} 
              className="bg-emerald-950/40 border border-emerald-800/50 backdrop-blur-md p-5 rounded-2xl shadow-xl transition-all duration-300 hover:border-emerald-500/60 hover:-translate-y-1"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-xl text-emerald-200">Grado {salon.grado}</h2>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-900/60 text-emerald-300 font-mono border border-emerald-700/50">
                  {salon.codigo}
                </span>
              </div>
              
              <div className="my-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <p className="text-xs text-emerald-400 font-medium uppercase tracking-wider">Eco-Puntos Acumulados</p>
                <p className="text-3xl font-black text-white mt-1">
                  {salon.ecoPuntosTotales}
                </p>
              </div>

              <button
                onClick={() => sumarPuntos(salon.codigo, 10)}
                className="w-full mt-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-all shadow-lg shadow-emerald-900/30 active:scale-95"
              >
                +10 Eco-Puntos
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}