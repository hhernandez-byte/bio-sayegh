import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { Bot, Sparkles } from 'lucide-react';

export default function DashboardRobot() {
  const datosRobot = [
    { categoria: 'Orgánicos', cantidad: 25, color: '#10b981' },
    { categoria: 'Inorgánicos', cantidad: 14, color: '#ef4444' },
    { categoria: 'Renovables', cantidad: 38, color: '#38bdf8' }
  ];

  return (
    <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '16px', border: '2px solid #334155', color: '#fff', maxWidth: '850px', margin: '20px auto', textAlign: 'center' }}>
      
      {/* Encabezado */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', justifyContent: 'center' }}>
        <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.2)', padding: '10px', borderRadius: '12px', border: '1px solid #38bdf8' }}>
          <Bot color="#38bdf8" size={32} />
        </div>
        <div style={{ textAlign: 'left' }}>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#f8fafc' }}>Robot Clasificador EcoBot</h2>
          <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Monitoreo de separación de residuos</span>
        </div>
      </div>

      {/* Tarjetas resumen */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '25px' }}>
        {datosRobot.map((item) => (
          <div key={item.categoria} style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '10px', borderLeft: `5px solid ${item.color}`, textAlign: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'block' }}>{item.categoria}</span>
            <strong style={{ fontSize: '1.8rem', color: item.color }}>{item.cantidad}</strong>
            <span style={{ fontSize: '0.75rem', color: '#64748b', display: 'block' }}>unidades</span>
          </div>
        ))}
      </div>

      {/* Gráfica de Barras con dimensiones directas */}
      <div style={{ display: 'flex', justifyContent: 'center', backgroundColor: '#0f172a', padding: '20px', borderRadius: '12px' }}>
        <BarChart width={700} height={300} data={datosRobot}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis dataKey="categoria" stroke="#94a3b8" tick={{ fill: '#f8fafc', fontSize: 14, fontWeight: 'bold' }} />
          <YAxis stroke="#94a3b8" tick={{ fill: '#cbd5e1' }} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38bdf8', borderRadius: '10px', color: '#fff' }}
          />
          <Bar dataKey="cantidad" radius={[10, 10, 0, 0]}>
            {datosRobot.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '15px', color: '#34d399', fontSize: '0.9rem' }}>
        <Sparkles size={16} /> Cada residuo clasificado correctamente ayuda a mantener limpio nuestro colegio.
      </div>

    </div>
  );
}