// Estructura provisional para leer/guardar progreso local por clave de salón

export const getProgresoSalon = (claveSalon) => {
  const datos = localStorage.getItem(`progreso_${claveSalon}`);
  return datos ? JSON.parse(datos) : { invasores: [], insignias: [] };
};

export const guardarInvasor = (claveSalon, nuevoInvasor) => {
  const actual = getProgresoSalon(claveSalon);
  actual.invasores.push(nuevoInvasor);
  localStorage.setItem(`progreso_${claveSalon}`, JSON.stringify(actual));
};

export const guardarInsignia = (claveSalon, idInsignia) => {
  const actual = getProgresoSalon(claveSalon);
  if (!actual.insignias.includes(idInsignia)) {
    actual.insignias.push(idInsignia);
    localStorage.setItem(`progreso_${claveSalon}`, JSON.stringify(actual));
  }
};
