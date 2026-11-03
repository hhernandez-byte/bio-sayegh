import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterBioSayegh() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bsf-footer">
      <style>{`
        .bsf-footer {
          margin-top: auto;
          background-color: #03658C;
          border-top: 4px solid #338C30;
          color: #FFFFFF;
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }
        .bsf-footer * { box-sizing: border-box; }
        .bsf-franja {
          height: 6px;
          background: linear-gradient(90deg, #338C30, #A6D9A5, #8C644D, #338C30);
        }
        .bsf-contenedor {
          max-width: 1200px;
          margin: 0 auto;
          padding: 44px 20px 22px;
        }
        .bsf-columnas {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 32px;
          padding-bottom: 30px;
          border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        .bsf-titulo {
          font-size: 0.85rem;
          font-weight: 800;
          color: #A6D9A5;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 0 0 14px 0;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .bsf-logo-fila {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }
        .bsf-logo-circulo {
          background-color: #338C30;
          padding: 8px;
          border-radius: 50%;
          border: 2px solid #A6D9A5;
          display: flex;
          font-size: 18px;
          line-height: 1;
        }
        .bsf-logo-nombre {
          font-size: 1.15rem;
          font-weight: 900;
        }
        .bsf-logo-nombre span { color: #A6D9A5; }
        .bsf-descripcion {
          font-size: 0.82rem;
          line-height: 1.6;
          margin: 0;
          opacity: 0.9;
        }
        .bsf-version {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 14px;
          font-size: 0.75rem;
          color: #A6D9A5;
          background-color: rgba(0,0,0,0.2);
          border: 1px solid #A6D9A5;
          padding: 6px 10px;
          border-radius: 8px;
          font-weight: 700;
        }
        .bsf-enlaces {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 8px;
        }
        .bsf-enlaces a {
          color: #FFFFFF;
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          opacity: 0.92;
        }
        .bsf-enlaces a:hover { color: #A6D9A5; }
        .bsf-enlaces .bsf-icono { color: #A6D9A5; font-size: 14px; }
        .bsf-consejos {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 10px;
        }
        .bsf-consejos li {
          display: flex;
          gap: 10px;
          align-items: flex-start;
          font-size: 0.82rem;
          line-height: 1.5;
        }
        .bsf-consejos .bsf-icono-caja {
          background-color: rgba(166,217,165,0.18);
          border-radius: 8px;
          padding: 5px;
          display: flex;
          flex-shrink: 0;
          font-size: 14px;
          line-height: 1;
        }
        .bsf-institucion-nombre {
          font-size: 0.88rem;
          margin: 0 0 4px;
          font-weight: 800;
        }
        .bsf-institucion-sub {
          font-size: 0.8rem;
          margin: 0 0 14px;
          opacity: 0.9;
        }
        .bsf-equipo {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .bsf-equipo-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: #8C644D;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.85rem;
          border: 2px solid #A6D9A5;
        }
        .bsf-equipo-nombre { font-size: 0.82rem; display: block; }
        .bsf-equipo-sub { font-size: 0.75rem; color: #A6D9A5; }
        .bsf-pie {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 18px;
          font-size: 0.78rem;
          color: #A6D9A5;
        }
      `}</style>

      <div className="bsf-franja"></div>
      <div className="bsf-contenedor">
        <div className="bsf-columnas">

          {/* Marca */}
          <div>
            <div className="bsf-logo-fila">
              <div className="bsf-logo-circulo">🌿</div>
              <span className="bsf-logo-nombre">
                Bio-Sayegh <span>COLSAM</span>
              </span>
            </div>
            <p className="bsf-descripcion">
              Iniciativa tecnológica orientada al desarrollo sostenible y la gestión ecológica escolar.
            </p>
            <div className="bsf-version">✅ Sistema Ecológico Activo v2.5</div>
          </div>

          {/* Explora con React Router Link */}
          <div>
            <h4 className="bsf-titulo">📍 Explora</h4>
            <ul className="bsf-enlaces">
              <li><Link to="/">🏠 Inicio</Link></li>
              <li><Link to="/mapa">🗺️ Mapa del colegio</Link></li>
              <li><Link to="/estadisticas">📊 Datos</Link></li>
              <li><Link to="/insignias">🏅 Insignias</Link></li>
              <li><Link to="/nosotros">👥 Nosotros</Link></li>
            </ul>
          </div>

          {/* Eco-consejos */}
          <div>
            <h4 className="bsf-titulo">🌱 Eco-consejos</h4>
            <ul className="bsf-consejos">
              <li><span className="bsf-icono-caja">♻️</span> Separa orgánicos, inorgánicos y reciclables.</li>
              <li><span className="bsf-icono-caja">💧</span> Cierra la llave mientras te lavas las manos.</li>
              <li><span className="bsf-icono-caja">🌿</span> Reporta cada zona sucia en el mapa.</li>
            </ul>
          </div>

          {/* Institución */}
          <div>
            <h4 className="bsf-titulo">🤝 Institución</h4>
            <p className="bsf-institucion-nombre">Colegio San Alberto Magno</p>
            <p className="bsf-institucion-sub">Proyecto Ambiental Escolar (PRAE)</p>
            <div className="bsf-equipo">
              <div className="bsf-equipo-avatar">BS</div>
              <div>
                <strong className="bsf-equipo-nombre">Equipo Bio-Sayegh</strong>
                <span className="bsf-equipo-sub">Proyecto de Ecología</span>
              </div>
            </div>
          </div>

        </div>

        <div className="bsf-pie">
          <span>© {currentYear} Bio-Sayegh COLSAM. Todos los derechos reservados.</span>
          <span>🍃 Hecho con 💚 por estudiantes para el planeta</span>
        </div>
      </div>
    </footer>
  );
}