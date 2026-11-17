// Conexión con la base de datos de Bio-Sayegh (progreso por salón)
const URL = 'https://c--64e684d8-0729-444b-8ced-f0477844062e-prod.lovable.cloud';
const KEY = 'sb_publishable_QBIqJQW3UwU7PlTO0zIbnQ_JOGnPCLd';
const headers = { apikey: KEY, 'Content-Type': 'application/json' };

export const PUNTOS_REPORTE = 25;
export const PUNTOS_LIMPIEZA = 35;
export const calcularPuntos = (reportes, limpiadas) =>
  reportes * PUNTOS_REPORTE + limpiadas * PUNTOS_LIMPIEZA;

async function rpc(nombre, body) {
  const r = await fetch(`${URL}/rest/v1/rpc/${nombre}`, { method: 'POST', headers, body: JSON.stringify(body) });
  if (!r.ok) throw new Error(await r.text());
  return r.json();
}

export async function verificarSalon(salon, clave) {
  return (await rpc('verificar_salon', { _salon: salon, _clave: clave })) === true;
}

export async function obtenerProgreso(salon) {
  const r = await fetch(`${URL}/rest/v1/progreso_salones?select=reportes,zonas_limpiadas&salon_id=eq.${encodeURIComponent(salon)}`, { headers });
  const data = r.ok ? (await r.json())[0] : null;
  return { reportes: data?.reportes ?? 0, limpiadas: data?.zonas_limpiadas ?? 0 };
}

export async function registrarAccion(tipo) {
  const salon = localStorage.getItem('salon_activo') || '';
  const clave = localStorage.getItem('clave_salon') || '';
  if (!salon || !clave) return;
  try { await rpc('registrar_accion', { _salon: salon, _clave: clave, _tipo: tipo }); }
  catch (e) { console.error('No se pudo guardar el progreso:', e); }
  window.dispatchEvent(new Event('progreso-actualizado'));
}