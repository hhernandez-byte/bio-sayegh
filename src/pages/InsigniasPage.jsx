import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import {
  Trophy,
  Sparkles,
  Lock,
  Star,
  ShieldCheck,
  Zap,
  AlertTriangle,
  Flame,
  Award,
  X,
  Crown,
  Recycle,
  Leaf,
  Globe
} from "lucide-react";
import { obtenerProgreso, calcularPuntos } from "../components/progreso.js";
function InsigniasPage() {
  const [estadisticas, setEstadisticas] = useState({
    reportesRealizados: 0,
    zonasLimpiadas: 0,
    puntosTotales: 0
  });
  const [insigniaSeleccionada, setInsigniaSeleccionada] = useState(null);
  const [mostrarCeleb, setMostrarCeleb] = useState(false);
  const salon = typeof window !== "undefined" && localStorage.getItem("salon_activo") || "10-A";
  useEffect(() => {
    const cargarProgresoReal = async () => {
      try {
        const salonActual = localStorage.getItem("salon_activo") || "";
        if (!salonActual) return;
        const { reportes, limpiadas } = await obtenerProgreso(salonActual);
        setEstadisticas({ reportesRealizados: reportes, zonasLimpiadas: limpiadas, puntosTotales: calcularPuntos(reportes, limpiadas) });
      } catch (e) {
        console.error("Error al sincronizar insignias:", e);
      }
    };
    cargarProgresoReal();
    window.addEventListener("progreso-actualizado", cargarProgresoReal);
    return () => window.removeEventListener("progreso-actualizado", cargarProgresoReal);
  }, []);
  const R = estadisticas.reportesRealizados, L = estadisticas.zonasLimpiadas, P = estadisticas.puntosTotales;
  const colores = ["#03658C", "#338C30", "#8C644D"];
  const misiones = [
    ["Primer Escaneo Eco", "Registra tu primer reporte de residuo en el mapa del colegio.", Zap, R, 1, "\u{1F916} Eco-Bot Alpha"],
    ["Primera Limpieza", "Sanea tu primera zona marcada en el mapa.", ShieldCheck, L, 1, "\u{1F41E} Mariquita Eco"],
    ["Vigilante del Campus", "Acumula 3 reportes geolocalizados en el colegio.", AlertTriangle, R, 3, "\u{1F98A} Zorro Guardi\xE1n"],
    ["Sanador Ambiental", "Limpia o sanea 2 zonas marcadas en alerta.", ShieldCheck, L, 2, "\u{1F989} B\xFAho Detector"],
    ["Potencia Eco-Puntos", "Alcanza los 200 Eco-Puntos acumulados.", Flame, P, 200, "\u{1F43B} Oso Limpiador"],
    ["Ojo Verde", "Registra 5 reportes de residuos.", Star, R, 5, "\u{1F438} Rana Vig\xEDa"],
    ["Brigada Limpia", "Sanea 3 zonas del colegio.", Recycle, L, 3, "\u{1F43F}\uFE0F Ardilla Brigadista"],
    ["Leyenda Bio-Sayegh", "Suma 8 reportes para liderar la tabla general.", Trophy, R, 8, "\u{1F451} Comandante Eco"],
    ["Eco-Impulso", "Alcanza los 300 Eco-Puntos.", Sparkles, P, 300, "\u{1F98B} Mariposa Viajera"],
    ["Guardi\xE1n del Reciclaje", "Sanea 5 zonas y convi\xE9rtelas en espacios limpios.", Recycle, L, 5, "\u{1F422} Tortuga Recicladora"],
    ["Reportero Experto", "Registra 10 reportes en el mapa.", AlertTriangle, R, 10, "\u{1F99C} Loro Reportero"],
    ["Embajador Verde", "Alcanza los 400 Eco-Puntos e inspira a otros salones.", Leaf, P, 400, "\u{1F41D} Abeja Polinizadora"],
    ["Campus Brillante", "Sanea 7 zonas del colegio.", ShieldCheck, L, 7, "\u{1F994} Erizo Limpio"],
    ["H\xE9roe del Planeta", "Registra 15 reportes de residuos.", Globe, R, 15, "\u{1F40B} Ballena Protectora"],
    ["Fuerza Eco", "Alcanza los 550 Eco-Puntos.", Flame, P, 550, "\u{1F985} \xC1guila Andina"],
    ["Maestro Bio-Sayegh", "Sanea 10 zonas y convierte al colegio en un campus eco.", Crown, L, 10, "\u{1F333} \xC1rbol Ancestral"],
    ["Centinela del Colegio", "Registra 20 reportes en el mapa.", Award, R, 20, "\u{1F406} Jaguar Centinela"],
    ["Restaurador Total", "Sanea 15 zonas del colegio.", Recycle, L, 15, "\u{1F42C} Delf\xEDn Sanador"],
    ["Eco-\xC9lite", "Alcanza los 900 Eco-Puntos.", Sparkles, P, 900, "\u{1F99A} Pavo Real Eco"],
    ["Leyenda del Planeta", "Registra 30 reportes y sanea 20 zonas: \xA1campus 100% eco!", Crown, Math.min(R, L * 1.5), 30, "\u{1F30D} Guardi\xE1n de la Tierra"]
  ];
  const ESPACIO = 130, TOPE = 100;
  const ALTO = TOPE * 2 + ESPACIO * (misiones.length - 1);
  const posX = [425, 640, 425, 210];
  let previaCompleta = true;
  const niveles = misiones.map(([titulo, descripcion, Icono, actual, meta, mascota], i) => {
    const color = colores[i % 3];
    const completa = actual >= meta;
    const disponible = previaCompleta;
    const desbloqueado = disponible && completa;
    previaCompleta = desbloqueado;
    return { id: i + 1, numero: String(i + 1), titulo, descripcion, icono: /* @__PURE__ */ jsx(Icono, { size: 36, color }), actual: disponible ? actual : 0, meta, color, x: posX[i % 4], y: TOPE + i * ESPACIO, mascota, disponible, desbloqueado };
  });
  const rutaD = niveles.reduce((d, n, i) => {
    if (i === 0) return `M ${n.x} ${n.y}`;
    const p = niveles[i - 1];
    const my = (p.y + n.y) / 2;
    return `${d} C ${p.x} ${my}, ${n.x} ${my}, ${n.x} ${n.y}`;
  }, "");
  const abrirAnuncioQuizizz = (nivel, estaDesbloqueado) => {
    setInsigniaSeleccionada({ ...nivel, desbloqueado: estaDesbloqueado });
    setMostrarCeleb(true);
  };
  return /* @__PURE__ */ jsxs("div", { style: {
    minHeight: "100vh",
    backgroundColor: "#FFFFFF",
    color: "#03658C",
    fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    padding: "30px 20px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    overflowX: "hidden"
  }, children: [
    /* @__PURE__ */ jsx("style", { children: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&display=swap');

        .nodo-giant {
          transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
        }
        .nodo-giant:hover {
          transform: scale(1.18) translateY(-6px);
        }

        .card-cyber-giant {
          background: #FFFFFF;
          border: 3px solid #03658C;
          box-shadow: 0 12px 32px rgba(3, 101, 140, 0.12);
          border-radius: 24px;
        }

        @keyframes quizizzPop {
          0% { transform: scale(0.4) rotate(-8deg); opacity: 0; }
          70% { transform: scale(1.05) rotate(2deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }

        .quizizz-modal {
          animation: quizizzPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .anim-float {
          animation: floatSlow 3.5s ease-in-out infinite;
        }
      ` }),
    /* @__PURE__ */ jsxs("div", { className: "card-cyber-giant", style: {
      width: "100%",
      maxWidth: "850px",
      padding: "20px 32px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: "28px",
      zIndex: 10
    }, children: [
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "18px" }, children: [
        /* @__PURE__ */ jsx("div", { style: {
          backgroundColor: "#03658C",
          padding: "14px",
          borderRadius: "20px",
          border: "2px solid #A6D9A5",
          color: "#FFFFFF"
        }, children: /* @__PURE__ */ jsx(Award, { size: 36 }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("span", { style: { fontSize: "0.8rem", fontWeight: 900, color: "#338C30", textTransform: "uppercase", letterSpacing: "2px" }, children: "PROGRESI\xD3N DE NIVELES" }),
          /* @__PURE__ */ jsx("h1", { style: { margin: "2px 0 0 0", fontSize: "2rem", fontWeight: 900, color: "#03658C" }, children: "Camino de Eco-Insignias" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: {
        backgroundColor: "#F0F9F5",
        border: "2px solid #338C30",
        borderRadius: "20px",
        padding: "10px 22px",
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }, children: [
        /* @__PURE__ */ jsx(Sparkles, { size: 24, color: "#338C30", className: "anim-float" }),
        /* @__PURE__ */ jsxs("span", { style: { fontSize: "1.4rem", fontWeight: 900, color: "#03658C" }, children: [
          estadisticas.puntosTotales,
          " ",
          /* @__PURE__ */ jsx("span", { style: { fontSize: "0.85rem", color: "#8C644D" }, children: "PTS" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: {
      position: "relative",
      width: "100%",
      maxWidth: "850px",
      height: `${ALTO}px`,
      backgroundColor: "#FAFCFB",
      border: "3px solid #03658C",
      borderRadius: "36px",
      overflow: "hidden",
      boxShadow: "0 20px 50px rgba(3, 101, 140, 0.12)"
    }, children: [
      ["\u{1F33F}", "\u{1F343}", "\u{1F331}", "\u267B\uFE0F", "\u{1F4A7}"].flatMap((e, k) => [0, 1].map((j) => /* @__PURE__ */ jsx("div", { style: { position: "absolute", top: `${(k * 2 + j) * (ALTO / 10) + 60}px`, [j ? "right" : "left"]: "28px", fontSize: "2.4rem", opacity: 0.55, zIndex: 5, filter: "saturate(1.6)" }, children: e }, `${k}-${j}`))),
      /* @__PURE__ */ jsxs("svg", { viewBox: `0 0 850 ${ALTO}`, preserveAspectRatio: "none", width: "100%", height: "100%", style: { position: "absolute", top: 0, left: 0 }, children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "giantPathGrad", x1: "0%", y1: "100%", x2: "0%", y2: "0%", children: [
          /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#03658C" }),
          /* @__PURE__ */ jsx("stop", { offset: "35%", stopColor: "#8C644D" }),
          /* @__PURE__ */ jsx("stop", { offset: "70%", stopColor: "#338C30" }),
          /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#A6D9A5" })
        ] }) }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: rutaD,
            fill: "none",
            stroke: "#E2E8F0",
            strokeWidth: "48",
            strokeLinecap: "round"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: rutaD,
            fill: "none",
            stroke: "url(#giantPathGrad)",
            strokeWidth: "24",
            strokeDasharray: "16 12",
            strokeLinecap: "round"
          }
        )
      ] }),
      niveles.map((nivel) => {
        const desbloqueado = nivel.desbloqueado;
        const porcentaje = Math.min(100, Math.round(nivel.actual / nivel.meta * 100));
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "nodo-giant",
            onClick: () => abrirAnuncioQuizizz(nivel, desbloqueado),
            style: {
              position: "absolute",
              left: `calc(${nivel.x / 850 * 100}% - 55px)`,
              top: `${nivel.y - 55}px`,
              width: "110px",
              height: "110px",
              zIndex: 20
            },
            children: [
              desbloqueado && /* @__PURE__ */ jsxs("div", { style: {
                position: "absolute",
                top: "-32px",
                left: nivel.x > 450 ? "-70px" : "70px",
                backgroundColor: "#FFFFFF",
                border: `2px solid ${nivel.color}`,
                borderRadius: "16px",
                padding: "4px 12px",
                boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                whiteSpace: "nowrap",
                zIndex: 30
              }, children: [
                /* @__PURE__ */ jsx("span", { style: { fontSize: "1.15rem", lineHeight: 1 }, children: nivel.mascota.slice(0, nivel.mascota.indexOf(" ")) }),
                /* @__PURE__ */ jsxs("span", { style: { fontSize: "0.8rem", fontWeight: 900, color: nivel.color }, children: [
                  nivel.mascota.slice(nivel.mascota.indexOf(" ") + 1),
                  " (",
                  salon,
                  ")"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { style: {
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                backgroundColor: desbloqueado ? "#FFFFFF" : "#F1F5F9",
                border: `4px solid ${desbloqueado ? nivel.color : "#CBD5E1"}`,
                boxShadow: desbloqueado ? `0 0 20px ${nivel.color}44` : "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative"
              }, children: [
                /* @__PURE__ */ jsxs("div", { style: { position: "absolute", top: "-12px", display: "flex", gap: "3px" }, children: [
                  /* @__PURE__ */ jsx(Star, { size: 16, fill: desbloqueado ? "#338C30" : "#CBD5E1", stroke: "none" }),
                  /* @__PURE__ */ jsx(Star, { size: 20, fill: desbloqueado ? "#338C30" : "#CBD5E1", stroke: "none", style: { marginTop: "-4px" } }),
                  /* @__PURE__ */ jsx(Star, { size: 16, fill: desbloqueado ? "#338C30" : "#CBD5E1", stroke: "none" })
                ] }),
                desbloqueado ? nivel.icono : nivel.disponible ? /* @__PURE__ */ jsx("span", { style: { fontSize: "1.6rem", fontWeight: 900, color: nivel.color }, children: nivel.numero }) : /* @__PURE__ */ jsx(Lock, { size: 32, color: "#94A3B8" }),
                /* @__PURE__ */ jsxs("span", { style: { fontSize: "0.75rem", fontWeight: 900, color: desbloqueado ? "#03658C" : "#64748B", marginTop: "2px" }, children: [
                  porcentaje,
                  "%"
                ] })
              ] })
            ]
          },
          nivel.id
        );
      })
    ] }),
    mostrarCeleb && insigniaSeleccionada && /* @__PURE__ */ jsx("div", { style: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(3, 101, 140, 0.5)",
      backdropFilter: "blur(8px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 999,
      padding: "20px"
    }, children: /* @__PURE__ */ jsxs("div", { className: "quizizz-modal", style: {
      position: "relative",
      width: "100%",
      maxWidth: "460px",
      backgroundColor: "#FFFFFF",
      border: `3px solid ${insigniaSeleccionada.color}`,
      borderRadius: "32px",
      padding: "36px 28px",
      textAlign: "center",
      boxShadow: `0 20px 60px rgba(0,0,0,0.2)`
    }, children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setMostrarCeleb(false),
          style: {
            position: "absolute",
            top: "18px",
            right: "18px",
            backgroundColor: "rgba(0,0,0,0.05)",
            border: "none",
            color: "#03658C",
            borderRadius: "50%",
            width: "36px",
            height: "36px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          },
          children: /* @__PURE__ */ jsx(X, { size: 20 })
        }
      ),
      /* @__PURE__ */ jsxs("div", { style: { display: "inline-flex", padding: "8px 18px", borderRadius: "30px", backgroundColor: "rgba(166, 217, 165, 0.3)", border: `2px solid ${insigniaSeleccionada.color}`, color: insigniaSeleccionada.color, fontWeight: 900, fontSize: "0.85rem", marginBottom: "16px", gap: "6px", alignItems: "center" }, children: [
        /* @__PURE__ */ jsx(Crown, { size: 18 }),
        " ",
        insigniaSeleccionada.desbloqueado ? "\xA1LOGRO DESBLOQUEADO!" : insigniaSeleccionada.disponible ? "MISI\xD3N EN CURSO" : "COMPLETA LA MISI\xD3N ANTERIOR"
      ] }),
      /* @__PURE__ */ jsx("div", { style: {
        margin: "0 auto 20px auto",
        width: "110px",
        height: "110px",
        borderRadius: "50%",
        backgroundColor: "#FFFFFF",
        border: `4px solid ${insigniaSeleccionada.color}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: `0 8px 24px ${insigniaSeleccionada.color}33`
      }, children: insigniaSeleccionada.icono }),
      /* @__PURE__ */ jsx("h2", { style: { fontSize: "1.8rem", fontWeight: 900, margin: "0 0 10px 0", color: "#03658C" }, children: insigniaSeleccionada.titulo }),
      /* @__PURE__ */ jsx("p", { style: { color: "#8C644D", fontSize: "0.95rem", lineHeight: 1.5, marginBottom: "24px", fontWeight: 600 }, children: insigniaSeleccionada.descripcion }),
      /* @__PURE__ */ jsxs("div", { style: { backgroundColor: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: "14px", padding: "12px 16px", marginBottom: "24px" }, children: [
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 800, color: "#8C644D", marginBottom: "6px" }, children: [
          /* @__PURE__ */ jsx("span", { children: "PROGRESO ACTUAL:" }),
          /* @__PURE__ */ jsxs("span", { style: { color: insigniaSeleccionada.color }, children: [
            insigniaSeleccionada.actual,
            " / ",
            insigniaSeleccionada.meta
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { style: { width: "100%", height: "10px", backgroundColor: "#E2E8F0", borderRadius: "10px", overflow: "hidden" }, children: /* @__PURE__ */ jsx("div", { style: {
          width: `${Math.min(100, insigniaSeleccionada.actual / insigniaSeleccionada.meta * 100)}%`,
          height: "100%",
          backgroundColor: insigniaSeleccionada.color,
          borderRadius: "10px"
        } }) })
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setMostrarCeleb(false),
          style: {
            width: "100%",
            padding: "14px",
            backgroundColor: insigniaSeleccionada.color,
            color: "#FFFFFF",
            border: "none",
            borderRadius: "16px",
            fontWeight: 900,
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: `0 4px 14px ${insigniaSeleccionada.color}44`
          },
          children: "\xA1ENTENDIDO!"
        }
      )
    ] }) })
  ] });
}
export {
  InsigniasPage as default
};