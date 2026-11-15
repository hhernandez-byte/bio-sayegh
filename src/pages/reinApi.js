const firebaseConfig = {
  apiKey: "AIzaSyBwx261jUYsfTbyTnpGBuSPsdrJnDcujI4",
  authDomain: "rein-31f65.firebaseapp.com",
  databaseURL: "https://rein-31f65-default-rtdb.firebaseio.com/",
  projectId: "rein-31f65",
  storageBucket: "rein-31f65.firebasestorage.app",
  messagingSenderId: "24168654179",
  appId: "1:24168654179:web:dc3ccadb020bbc80159f56",
  measurementId: "G-BW3Q2CS79X"
};
const conteoVacio = {
  organicos: 0,
  inorganicos: 0,
  botellasPlastico: 0,
  otros: 0,
  totalRegistros: 0,
  ultimaActualizacion: "Sin datos"
};
function clasificarTipo(tipo) {
  const t = String(tipo || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (t.includes("inorgan") || t.includes("no organ")) return "inorganicos";
  if (t.includes("organ") || t.includes("comida") || t.includes("resto")) return "organicos";
  if (t.includes("plastic") || t.includes("botella") || t.includes("pet")) return "botellasPlastico";
  return "otros";
}
function formatearFechaHora(fecha, hora) {
  if (!fecha) return "";
  const partes = String(fecha).split("-");
  const fechaCorta = partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : String(fecha);
  return hora ? `${fechaCorta} ${String(hora).slice(0, 5)}` : fechaCorta;
}
function mapearRegistros(datos) {
  const registro = { ...conteoVacio };
  if (!datos) return registro;
  const registros = Object.values(datos);
  let mejorMarca = "";
  let mejorTexto = "";
  for (const r of registros) {
    const cantidad = Number(r?.cantidad ?? 1) || 1;
    const categoria = clasificarTipo(r?.tipo);
    registro[categoria] += cantidad;
    registro.totalRegistros += 1;
    const marca = `${r?.fecha ?? ""} ${r?.hora ?? ""}`.trim();
    if (marca && marca > mejorMarca) {
      mejorMarca = marca;
      mejorTexto = formatearFechaHora(r?.fecha, r?.hora);
    }
  }
  if (mejorTexto) registro.ultimaActualizacion = mejorTexto;
  return registro;
}
let promesaBase = null;
async function obtenerBase() {
  if (!promesaBase) {
    promesaBase = (async () => {
      const { initializeApp, getApps, getApp } = await import("firebase/app");
      const { getDatabase } = await import("firebase/database");
      const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
      return getDatabase(app);
    })();
  }
  return promesaBase;
}
async function conectarResiduos(alCambio) {
  const database = await obtenerBase();
  const { ref, onValue } = await import("firebase/database");
  return onValue(ref(database, "residuos"), (snapshot) => {
    alCambio(mapearRegistros(snapshot.val()));
  });
}
async function obtenerResiduosUnaVez() {
  const respuesta = await fetch(`${firebaseConfig.databaseURL}residuos.json`, {
    headers: { Accept: "application/json" }
  });
  if (!respuesta.ok) throw new Error(`La API respondi\xF3 ${respuesta.status}`);
  return mapearRegistros(await respuesta.json());
}
export {
  conectarResiduos,
  conteoVacio,
  mapearRegistros,
  obtenerResiduosUnaVez
};