import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import {
  AlertTriangle,
  Send,
  Award,
  ShieldAlert,
  Info,
  Smile
} from "lucide-react";
const ZONAS = [
  { id: "iglesia", nombre: "Iglesia / Capilla" },
  { id: "aulas_principales", nombre: "Aulas Principales (1 a 6)" },
  { id: "preescolar", nombre: "Preescolar / Kinder" },
  { id: "aula_9", nombre: "Aula 9" },
  { id: "aula_izq_2", nombre: "Aula" },
  { id: "sistemas2", nombre: "Sala de Sistemas 2" },
  { id: "aula_izq_4", nombre: "Aula" },
  { id: "aula_11", nombre: "Aula 11" },
  { id: "oficinas_izq", nombre: "Oficinas" },
  { id: "cancha", nombre: "Cancha Deportiva" },
  { id: "porteria", nombre: "Porter\xEDa" },
  { id: "area_descanso", nombre: "\xC1rea de Descanso / Gradas" },
  { id: "parque", nombre: "Parque Infantil" },
  { id: "kiosco", nombre: "Kiosco" },
  { id: "fuente", nombre: "Fuente / Patio Central" },
  { id: "aulas_123", nombre: "Bloque Aulas (1, 2, 3)" },
  { id: "coordinacion", nombre: "Coordinaci\xF3n" },
  { id: "enfermeria", nombre: "Enfermer\xEDa" },
  { id: "bodegas", nombre: "Bodegas" },
  { id: "casa_cural", nombre: "Casa Cural" },
  { id: "cafeteria", nombre: "Cafeter\xEDa" },
  { id: "sistemas1", nombre: "Sala de Sistemas 1" },
  { id: "biblioteca", nombre: "Biblioteca" },
  { id: "banos", nombre: "Ba\xF1os" }
];
import { registrarAccion, obtenerProgreso, calcularPuntos } from "../components/progreso.js";
function MapaPage() {
  const salonKey = localStorage.getItem("salon_activo") || "general";
  const rol = localStorage.getItem("rol_usuario");
  const esInvitado = rol === "invitado";
  const [zonaId, setZonaId] = useState("cafeteria");
  const [nivelResiduos, setNivelResiduos] = useState("Alto");
  const [tipoResiduo, setTipoResiduo] = useState("Pl\xE1sticos y Empaques");
  const [descripcion, setDescripcion] = useState("");
  const [reportadoPor, setReportadoPor] = useState("");
  const [reportes, setReportes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`reportes_residuos_${salonKey}`) || "[]");
    } catch (error) {
      console.error("Error al cargar reportes:", error);
      return [];
    }
  });
  const [puntosGuardados, setPuntosGuardados] = useState(0);
  useEffect(() => {
    const cargar = async () => {
      const s = localStorage.getItem("salon_activo");
      if (!s) return;
      const p = await obtenerProgreso(s);
      setPuntosGuardados(calcularPuntos(p.reportes, p.limpiadas));
    };
    cargar();
    window.addEventListener("progreso-actualizado", cargar);
    return () => window.removeEventListener("progreso-actualizado", cargar);
  }, []);
  const guardarReportes = (nuevos) => {
    setReportes(nuevos);
    localStorage.setItem(`reportes_residuos_${salonKey}`, JSON.stringify(nuevos));
    window.dispatchEvent(new Event("storage"));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!descripcion.trim() || !reportadoPor.trim()) return;
    const zonaObj = ZONAS.find((z) => z.id === zonaId);
    const nuevoReporte = {
      id: Date.now().toString(),
      zonaId,
      lugarNombre: zonaObj ? zonaObj.nombre : "Zona General",
      nivelResiduos,
      tipoResiduo,
      descripcion,
      reportadoPor,
      fecha: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    guardarReportes([nuevoReporte, ...reportes]);
    registrarAccion("reporte");
    setDescripcion("");
    setReportadoPor("");
  };
  const resolverReporte = (id) => {
    const filtrados = reportes.filter((r) => r.id !== id);
    guardarReportes(filtrados);
    const limpiadosPrevios = parseInt(localStorage.getItem(`zonas_limpiadas_count_${salonKey}`) || "0", 10);
    localStorage.setItem(`zonas_limpiadas_count_${salonKey}`, (limpiadosPrevios + 1).toString());
    window.dispatchEvent(new Event("storage"));
    registrarAccion("limpieza");
  };
  const tieneAlerta = (id) => reportes.some((r) => r.zonaId === id);
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", width: "100vw", minHeight: "100vh", backgroundColor: "#FFFFFF", color: "#03658C", fontFamily: "system-ui, -apple-system, sans-serif" }, children: [
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes alertaRoja {
          0% { fill: #df1717; stroke: #df2121; stroke-width: 3px; }
          50% { fill: #d44141; stroke: #f72250; stroke-width: 5px; }
          100% { fill: #d13f4c; stroke: #e20f2b; stroke-width: 3px; }
        }
        .zona-alerta {
          animation: alertaRoja 1.2s infinite ease-in-out;
          cursor: pointer;
        }

        /* BLOQUES ARQUITECT\xD3NICOS CON ILUMINACI\xD3N EN HOVER */
        .edificio-bloque {
          fill: #F0F9F5;
          stroke: #03658C;
          stroke-width: 2px;
          transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }
        .edificio-bloque:hover {
          fill: #A6D9A5 !important;
          stroke: #338C30 !important;
          stroke-width: 3.5px !important;
          filter: drop-shadow(0px 0px 12px rgba(166, 217, 165, 0.95));
        }

        text {
          user-select: none;
          pointer-events: none;
          font-family: system-ui, -apple-system, sans-serif;
          font-weight: 800;
        }
      ` }),
    /* @__PURE__ */ jsxs("div", { style: { width: "380px", backgroundColor: "#03658C", borderRight: "4px solid #338C30", padding: "20px", display: "flex", flexDirection: "column", gap: "16px", overflowY: "auto", color: "#FFFFFF" }, children: [
      /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "#338C30", padding: "14px", borderRadius: "12px", border: "2px solid #A6D9A5" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
          /* @__PURE__ */ jsxs("h2", { style: { fontSize: "1rem", margin: 0, color: "#A6D9A5", display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", fontWeight: 800 }, children: [
            /* @__PURE__ */ jsx(Award, { size: 20 }),
            " Eco-Guardianes"
          ] }),
          /* @__PURE__ */ jsxs("span", { style: { backgroundColor: "#8C644D", color: "#FFFFFF", padding: "3px 8px", borderRadius: "12px", fontSize: "0.75rem", fontWeight: "bold" }, children: [
            puntosGuardados,
            " PTS"
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { style: { fontSize: "0.75rem", color: "#FFFFFF", margin: "6px 0 0 0", fontWeight: 600, opacity: 0.95 }, children: "Haz clic sobre cualquier \xE1rea en el mapa para reportar o revisar problemas." })
      ] }),
      !esInvitado ? /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, style: { backgroundColor: "#FFFFFF", padding: "16px", borderRadius: "12px", border: "2px solid #338C30", display: "flex", flexDirection: "column", gap: "12px", color: "#03658C" }, children: [
        /* @__PURE__ */ jsxs("h3", { style: { fontSize: "0.9rem", color: "#338C30", margin: 0, display: "flex", alignItems: "center", gap: "6px", textTransform: "uppercase", fontWeight: 800 }, children: [
          /* @__PURE__ */ jsx(AlertTriangle, { color: "#8C644D", size: 16 }),
          " Reportar Residuos"
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { style: { fontSize: "0.7rem", color: "#8C644D", fontWeight: "bold", display: "block", marginBottom: "4px" }, children: "UBICACI\xD3N SELECCIONADA" }),
          /* @__PURE__ */ jsx(
            "select",
            {
              value: zonaId,
              onChange: (e) => setZonaId(e.target.value),
              style: { width: "100%", padding: "8px", backgroundColor: "#FFFFFF", border: "2px solid #03658C", borderRadius: "6px", color: "#03658C", fontSize: "0.8rem", fontWeight: 700 },
              children: ZONAS.map((z) => /* @__PURE__ */ jsx("option", { value: z.id, children: z.nombre }, z.id))
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { style: { fontSize: "0.7rem", color: "#8C644D", fontWeight: "bold", display: "block", marginBottom: "4px" }, children: "CANTIDAD" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: nivelResiduos,
                onChange: (e) => setNivelResiduos(e.target.value),
                style: { width: "100%", padding: "8px", backgroundColor: "#FFFFFF", border: "2px solid #03658C", borderRadius: "6px", color: "#03658C", fontSize: "0.8rem", fontWeight: 700 },
                children: [
                  /* @__PURE__ */ jsx("option", { value: "Alto", children: "Alto (Cr\xEDtico)" }),
                  /* @__PURE__ */ jsx("option", { value: "Medio", children: "Medio" }),
                  /* @__PURE__ */ jsx("option", { value: "Bajo", children: "Bajo" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { style: { fontSize: "0.7rem", color: "#8C644D", fontWeight: "bold", display: "block", marginBottom: "4px" }, children: "TIPO" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: tipoResiduo,
                onChange: (e) => setTipoResiduo(e.target.value),
                style: { width: "100%", padding: "8px", backgroundColor: "#FFFFFF", border: "2px solid #03658C", borderRadius: "6px", color: "#03658C", fontSize: "0.8rem", fontWeight: 700 },
                children: [
                  /* @__PURE__ */ jsx("option", { value: "Pl\xE1sticos y Empaques", children: "Pl\xE1sticos" }),
                  /* @__PURE__ */ jsx("option", { value: "Comida / Org\xE1nicos", children: "Org\xE1nicos" }),
                  /* @__PURE__ */ jsx("option", { value: "Papeles y Hojas", children: "Papel" }),
                  /* @__PURE__ */ jsx("option", { value: "Varios", children: "Varios" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { style: { fontSize: "0.7rem", color: "#8C644D", fontWeight: "bold", display: "block", marginBottom: "4px" }, children: "OBSERVACIONES" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Detalle de la situaci\xF3n...",
              value: descripcion,
              onChange: (e) => setDescripcion(e.target.value),
              required: true,
              style: { width: "100%", padding: "8px", backgroundColor: "#FFFFFF", border: "2px solid #03658C", borderRadius: "6px", color: "#03658C", fontSize: "0.8rem", boxSizing: "border-box" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { style: { fontSize: "0.7rem", color: "#8C644D", fontWeight: "bold", display: "block", marginBottom: "4px" }, children: "REPORTADO POR" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              placeholder: "Nombre o Curso",
              value: reportadoPor,
              onChange: (e) => setReportadoPor(e.target.value),
              required: true,
              style: { width: "100%", padding: "8px", backgroundColor: "#FFFFFF", border: "2px solid #03658C", borderRadius: "6px", color: "#03658C", fontSize: "0.8rem", boxSizing: "border-box" }
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "submit",
            style: { padding: "10px", backgroundColor: "#338C30", color: "#FFFFFF", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "0.8rem", marginTop: "4px" },
            children: [
              /* @__PURE__ */ jsx(Send, { size: 14 }),
              " EMITIR ALERTA DE RESIDUOS"
            ]
          }
        )
      ] }) : /* @__PURE__ */ jsxs("div", { style: { padding: "12px", backgroundColor: "#FFFFFF", borderRadius: "8px", color: "#03658C", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: "8px", border: "2px solid #A6D9A5" }, children: [
        /* @__PURE__ */ jsx(Info, { size: 16 }),
        " Modo Invitado: Solo Lectura."
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "#FFFFFF", padding: "14px", borderRadius: "12px", border: "2px solid #A6D9A5", color: "#03658C" }, children: [
        /* @__PURE__ */ jsxs("h3", { style: { fontSize: "0.8rem", color: "#8C644D", margin: "0 0 10px 0", display: "flex", alignItems: "center", gap: "6px", textTransform: "uppercase", fontWeight: 800 }, children: [
          /* @__PURE__ */ jsx(ShieldAlert, { size: 16 }),
          " Reportes Activos (",
          reportes.length,
          ")"
        ] }),
        /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: "8px", maxHeight: "180px", overflowY: "auto" }, children: reportes.length === 0 ? /* @__PURE__ */ jsxs("div", { style: { textAlign: "center", padding: "10px", color: "#338C30", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontWeight: 800 }, children: [
          /* @__PURE__ */ jsx(Smile, { size: 16 }),
          " El campus est\xE1 limpio"
        ] }) : reportes.map((r) => /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "#FFFFFF", borderLeft: "4px solid #8C644D", padding: "8px", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #A6D9A5", borderRight: "1px solid #A6D9A5", borderBottom: "1px solid #A6D9A5" }, children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("strong", { style: { color: "#8C644D", fontSize: "0.75rem", display: "block" }, children: r.lugarNombre }),
            /* @__PURE__ */ jsx("span", { style: { fontSize: "0.7rem", color: "#03658C", display: "block", fontWeight: 600 }, children: r.descripcion })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => resolverReporte(r.id),
              style: { backgroundColor: "#338C30", border: "none", color: "#FFFFFF", padding: "4px 8px", borderRadius: "4px", cursor: "pointer", fontSize: "0.68rem", fontWeight: "bold" },
              children: "Sanear"
            }
          )
        ] }, r.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { style: { flex: 1, padding: "20px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "auto" }, children: /* @__PURE__ */ jsx("div", { style: { position: "relative", width: "980px", height: "760px", backgroundColor: "#FFFFFF", borderRadius: "16px", border: "3px solid #03658C", boxShadow: "0 15px 35px rgba(3, 101, 140, 0.12)" }, children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 1000 780", width: "100%", height: "100%", style: { textAnchor: "middle" }, children: [
      /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "rainbowGrad", x1: "0%", y1: "0%", x2: "100%", y2: "100%", children: [
        /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#03658C" }),
        /* @__PURE__ */ jsx("stop", { offset: "50%", stopColor: "#338C30" }),
        /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#A6D9A5" })
      ] }) }),
      /* @__PURE__ */ jsx("rect", { x: "140", y: "30", width: "230", height: "130", rx: "6", className: tieneAlerta("iglesia") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("iglesia") }),
      /* @__PURE__ */ jsx("text", { x: "255", y: "100", fill: tieneAlerta("iglesia") ? "#FFFFFF" : "#03658C", fontSize: "13", children: "IGLESIA / CAPILLA" }),
      /* @__PURE__ */ jsxs("g", { onClick: () => setZonaId("aulas_principales"), children: [
        [390, 440, 490, 540, 590, 640].map((xPos, idx) => /* @__PURE__ */ jsx("rect", { x: xPos, y: "30", width: "50", height: "130", rx: "3", className: tieneAlerta("aulas_principales") ? "zona-alerta" : "edificio-bloque" }, idx)),
        /* @__PURE__ */ jsx("text", { x: "540", y: "100", fill: tieneAlerta("aulas_principales") ? "#FFFFFF" : "#03658C", fontSize: "11", children: "AULAS PRINCIPALES (1 - 6)" })
      ] }),
      /* @__PURE__ */ jsx("rect", { x: "705", y: "30", width: "130", height: "130", rx: "8", fill: tieneAlerta("preescolar") ? "#8C644D" : "url(#rainbowGrad)", stroke: "#338C30", strokeWidth: "2.5", className: tieneAlerta("preescolar") ? "zona-alerta" : "", style: { cursor: "pointer" }, onClick: () => setZonaId("preescolar") }),
      /* @__PURE__ */ jsx("text", { x: "770", y: "100", fill: "#FFFFFF", fontSize: "12", children: "PREESCOLAR" }),
      /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx("rect", { x: "15", y: "220", width: "120", height: "50", rx: "4", className: tieneAlerta("aula_9") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("aula_9") }),
        /* @__PURE__ */ jsx("text", { x: "75", y: "250", fill: "#03658C", fontSize: "11", children: "AULA 9" }),
        /* @__PURE__ */ jsx("rect", { x: "15", y: "278", width: "120", height: "50", rx: "4", className: tieneAlerta("aula_izq_2") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("aula_izq_2") }),
        /* @__PURE__ */ jsx("text", { x: "75", y: "308", fill: "#03658C", fontSize: "11", children: "AULA" }),
        /* @__PURE__ */ jsx("rect", { x: "15", y: "336", width: "120", height: "50", rx: "4", className: tieneAlerta("sistemas2") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("sistemas2") }),
        /* @__PURE__ */ jsx("text", { x: "75", y: "366", fill: "#03658C", fontSize: "10", children: "SALA SISTEMAS 2" }),
        /* @__PURE__ */ jsx("rect", { x: "15", y: "394", width: "120", height: "50", rx: "4", className: tieneAlerta("aula_izq_4") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("aula_izq_4") }),
        /* @__PURE__ */ jsx("text", { x: "75", y: "424", fill: "#03658C", fontSize: "11", children: "AULA" }),
        /* @__PURE__ */ jsx("rect", { x: "15", y: "452", width: "120", height: "50", rx: "4", className: tieneAlerta("aula_11") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("aula_11") }),
        /* @__PURE__ */ jsx("text", { x: "75", y: "482", fill: "#03658C", fontSize: "11", children: "AULA 11" }),
        /* @__PURE__ */ jsx("rect", { x: "15", y: "510", width: "120", height: "50", rx: "4", className: tieneAlerta("oficinas_izq") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("oficinas_izq") }),
        /* @__PURE__ */ jsx("text", { x: "75", y: "540", fill: "#8C644D", fontSize: "11", children: "OFICINAS" })
      ] }),
      /* @__PURE__ */ jsx("rect", { x: "165", y: "220", width: "160", height: "490", rx: "6", className: tieneAlerta("cancha") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("cancha") }),
      /* @__PURE__ */ jsx("line", { x1: "165", y1: "465", x2: "325", y2: "465", stroke: "#338C30", strokeWidth: "2" }),
      /* @__PURE__ */ jsx("circle", { cx: "245", cy: "465", r: "30", fill: "none", stroke: "#338C30", strokeWidth: "2" }),
      /* @__PURE__ */ jsx("text", { x: "245", y: "350", fill: "#338C30", fontSize: "12", children: "CANCHA DEPORTIVA" }),
      /* @__PURE__ */ jsx("rect", { x: "200", y: "730", width: "90", height: "35", rx: "4", className: tieneAlerta("porteria") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("porteria") }),
      /* @__PURE__ */ jsx("text", { x: "245", y: "752", fill: "#03658C", fontSize: "10", children: "PORTER\xCDA" }),
      /* @__PURE__ */ jsx("rect", { x: "350", y: "180", width: "360", height: "40", rx: "6", className: tieneAlerta("area_descanso") ? "zona-alerta" : "edificio-bloque", strokeDasharray: "4,4", onClick: () => setZonaId("area_descanso") }),
      /* @__PURE__ */ jsx("text", { x: "530", y: "205", fill: "#8C644D", fontSize: "11", children: "\xC1REA DE DESCANSO / GRADAS" }),
      /* @__PURE__ */ jsx("rect", { x: "355", y: "380", width: "85", height: "240", rx: "8", className: tieneAlerta("parque") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("parque") }),
      /* @__PURE__ */ jsx("text", { x: "397", y: "505", fill: "#338C30", fontSize: "11", children: "PARQUE INFANTIL" }),
      /* @__PURE__ */ jsx("circle", { cx: "495", cy: "670", r: "32", className: tieneAlerta("kiosco") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("kiosco") }),
      /* @__PURE__ */ jsx("text", { x: "495", y: "674", fill: "#8C644D", fontSize: "10", children: "KIOSCO" }),
      /* @__PURE__ */ jsx("polygon", { points: "495,305 520,315 530,340 520,365 495,375 470,365 460,340 470,315", className: tieneAlerta("fuente") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("fuente") }),
      /* @__PURE__ */ jsx("text", { x: "495", y: "344", fill: "#03658C", fontSize: "10", children: "FUENTE" }),
      /* @__PURE__ */ jsxs("g", { onClick: () => setZonaId("aulas_123"), children: [
        /* @__PURE__ */ jsx("rect", { x: "560", y: "240", width: "62", height: "150", rx: "4", className: tieneAlerta("aulas_123") ? "zona-alerta" : "edificio-bloque" }),
        /* @__PURE__ */ jsx("text", { x: "591", y: "315", fill: "#03658C", fontSize: "11", transform: "rotate(-90, 591, 315)", children: "AULA 1" }),
        /* @__PURE__ */ jsx("rect", { x: "628", y: "240", width: "62", height: "150", rx: "4", className: tieneAlerta("aulas_123") ? "zona-alerta" : "edificio-bloque" }),
        /* @__PURE__ */ jsx("text", { x: "659", y: "315", fill: "#03658C", fontSize: "11", transform: "rotate(-90, 659, 315)", children: "AULA 2" }),
        /* @__PURE__ */ jsx("rect", { x: "696", y: "240", width: "62", height: "150", rx: "4", className: tieneAlerta("aulas_123") ? "zona-alerta" : "edificio-bloque" }),
        /* @__PURE__ */ jsx("text", { x: "727", y: "315", fill: "#03658C", fontSize: "11", transform: "rotate(-90, 727, 315)", children: "AULA 3" })
      ] }),
      /* @__PURE__ */ jsx("rect", { x: "560", y: "420", width: "200", height: "150", rx: "6", className: tieneAlerta("casa_cural") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("casa_cural") }),
      /* @__PURE__ */ jsx("text", { x: "660", y: "500", fill: "#03658C", fontSize: "11", children: "CASA CURAL" }),
      /* @__PURE__ */ jsx("rect", { x: "630", y: "630", width: "130", height: "100", rx: "6", className: tieneAlerta("cafeteria") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("cafeteria") }),
      /* @__PURE__ */ jsx("text", { x: "695", y: "685", fill: "#8C644D", fontSize: "12", children: "CAFETER\xCDA" }),
      /* @__PURE__ */ jsxs("g", { children: [
        /* @__PURE__ */ jsx("rect", { x: "800", y: "180", width: "52", height: "130", rx: "4", className: tieneAlerta("coordinacion") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("coordinacion") }),
        /* @__PURE__ */ jsx("text", { x: "826", y: "245", fill: "#03658C", fontSize: "10", transform: "rotate(-90, 826, 245)", children: "COORDINACI\xD3N" }),
        /* @__PURE__ */ jsx("rect", { x: "856", y: "180", width: "52", height: "130", rx: "4", className: tieneAlerta("enfermeria") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("enfermeria") }),
        /* @__PURE__ */ jsx("text", { x: "882", y: "245", fill: "#8C644D", fontSize: "10", transform: "rotate(-90, 882, 245)", children: "ENFERMER\xCDA" }),
        /* @__PURE__ */ jsx("rect", { x: "912", y: "180", width: "52", height: "130", rx: "4", className: tieneAlerta("bodegas") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("bodegas") }),
        /* @__PURE__ */ jsx("text", { x: "938", y: "245", fill: "#8C644D", fontSize: "10", transform: "rotate(-90, 938, 245)", children: "BODEGAS" }),
        /* @__PURE__ */ jsx("rect", { x: "800", y: "324", width: "164", height: "65", rx: "4", className: tieneAlerta("sistemas1") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("sistemas1") }),
        /* @__PURE__ */ jsx("text", { x: "882", y: "361", fill: "#03658C", fontSize: "11", children: "SALA SISTEMAS 1" })
      ] }),
      /* @__PURE__ */ jsx("rect", { x: "800", y: "402", width: "164", height: "170", rx: "5", className: tieneAlerta("biblioteca") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("biblioteca") }),
      /* @__PURE__ */ jsx("text", { x: "882", y: "492", fill: "#03658C", fontSize: "12", children: "BIBLIOTECA" }),
      /* @__PURE__ */ jsx("rect", { x: "800", y: "580", width: "164", height: "150", rx: "5", className: tieneAlerta("banos") ? "zona-alerta" : "edificio-bloque", onClick: () => setZonaId("banos") }),
      /* @__PURE__ */ jsx("text", { x: "882", y: "660", fill: "#03658C", fontSize: "12", children: "SERVICIOS SANITARIOS" })
    ] }) }) })
  ] });
}
export {
  MapaPage as default
};