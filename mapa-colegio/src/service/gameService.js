// Claves asignadas a los salones
export const CLAVES_SALONES = {
  "1234": "Salón 3-1",
  "5678": "Salón 3-2",
  "9012": "Salón 4-1",
  "3456": "Salón 5-1"
};

// Obtener salón activo
export const getSalonActivo = () => {
  return localStorage.getItem('salon_activo') || '';
};

// Obtener el número de invasores atrapados por el salón
export const getInvasoresAtrapados = (nombreSalon) => {
  if (!nombreSalon) return 0;
  return parseInt(localStorage.getItem(`invasores_${nombreSalon}`) || '0', 10);
};

// Registrar un invasor eliminado en el mapa
export const registrarInvasorEliminado = () => {
  const salon = getSalonActivo();
  if (!salon) return 0;

  const actual = getInvasoresAtrapados(salon);
  const nuevoTotal = actual + 1;
  localStorage.setItem(`invasores_${salon}`, nuevoTotal.toString());
  return nuevoTotal;
};