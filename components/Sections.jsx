const Manifesto = () => (
  <section className="manifesto" id="proyecto" data-screen-label="02 Manifesto">
    <div className="manifesto__kicker">
      <span>01</span> El proyecto
    </div>
    <h2 className="manifesto__headline">
      285 viviendas nuevas,<br />
      <em>precio protegido</em>, sin renunciar a nada.
    </h2>
    <div className="manifesto__body">
      <p>
        Sagunto Fusión 1 nace para que comprar tu primera casa vuelva a ser
        posible. Es una promoción de <b>Vivienda de Protección Pública</b> con
        todo lo que se espera de la obra nueva actual: aerotermia, calificación
        energética A, garaje y trastero incluidos, y zonas comunes con piscina,
        gimnasio y áreas infantiles.
      </p>
      <p>
        El precio máximo de venta está fijado por la Generalitat Valenciana en
        <b> 1.908 €/m² útil</b>, muy por debajo del precio libre de la zona.
        Quien llegue antes, elige antes.
      </p>
    </div>
    <div className="manifesto__sign">
      <div style={{ width: 44, height: 44, borderRadius: 44, background: "oklch(0.62 0.14 45)", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800 }}>N</div>
      <div>
        <div className="manifesto__signName">Promueve Neobricks · Comercializa Palanca Fontestad</div>
        <div className="manifesto__signRole">Inmobiliaria con 48 años en Sagunto</div>
      </div>
    </div>
  </section>
);

const Pillars = () => {
  const items = [
    { n: "01", t: "Precio protegido oficial", d: "Máximo 1.908 €/m² útil fijado por la Generalitat Valenciana. Muy por debajo del mercado libre en la misma zona." },
    { n: "02", t: "Obra nueva completa", d: "Aerotermia, suelo radiante, carpintería con RPT, calificación energética A. Cero gas, facturas mínimas." },
    { n: "03", t: "Garaje y trastero incluidos", d: "Plaza de garaje y trastero incluidos en el precio de cada vivienda. Preinstalación de carga para vehículo eléctrico." },
    { n: "04", t: "Zonas comunes completas", d: "Piscina comunitaria, gimnasio, zonas infantiles y áreas ajardinadas en el interior de la manzana residencial." },
  ];
  return (
    <section className="pillars" data-screen-label="03 Pillars">
      {items.map((it) => (
        <article className="pillar" key={it.n}>
          <div className="pillar__n">{it.n}</div>
          <h3 className="pillar__t">{it.t}</h3>
          <p className="pillar__d">{it.d}</p>
        </article>
      ))}
    </section>
  );
};

const Architecture = () => (
  <section className="arch" data-screen-label="04 Architecture">
    <div className="arch__media">
      <img src={(window.__resources && window.__resources.salon2) || "assets/salon2.webp"} alt="Interior Sagunto Fusión 1" style={{ width: "100%", height: "100%", objectFit: "cover", aspectRatio: "4/5", display: "block" }} />
    </div>
    <div className="arch__copy">
      <div className="arch__kicker">02 · Arquitectura y calidades</div>
      <h2 className="arch__h">
        Calidades de obra nueva,<br />
        <em>precio de VPP.</em>
      </h2>
      <p>
        Sagunto Fusión 1 se construye con los estándares de la obra nueva libre
        de gama media-alta. La diferencia no está en las calidades, sino en el
        régimen: es vivienda protegida, así que el precio lo fija la
        administración, no el mercado.
      </p>
      <ul className="arch__list">
        <li><span>—</span> Aerotermia + suelo radiante/refrescante</li>
        <li><span>—</span> Carpintería aluminio con RPT y doble vidrio</li>
        <li><span>—</span> Suelo porcelánico continuo en toda la vivienda</li>
        <li><span>—</span> Cocina equipada · armarios empotrados</li>
        <li><span>—</span> Piscina, gym, zonas infantiles</li>
        <li><span>—</span> Garaje + trastero incluidos</li>
      </ul>
    </div>
  </section>
);

const Location = () => {
  return (
    <section className="loc" id="ubicacion" data-screen-label="05 Location">
      <div className="loc__head">
        <div className="loc__kicker">03 · Ubicación</div>
        <h2 className="loc__h">
          El nuevo barrio residencial de Sagunto,<br />
          <em>conectado con todo.</em>
        </h2>
      </div>

      <div className="loc__map" style={{ aspectRatio: "16/9", background: "none", border: "1px solid var(--line)" }}>
        <iframe
          src="https://www.google.com/maps?q=39.676556,-0.260278&z=17&output=embed"
          style={{ width: "100%", height: "100%", border: 0, position: "absolute", inset: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación Sagunto Fusión 1"
        />
        <a href="https://www.google.com/maps/place/39%C2%B040'37.6%22N+0%C2%B015'37.0%22W/@39.676556,-0.260278,17z"
           target="_blank" rel="noopener"
           style={{ position: "absolute", bottom: 12, right: 12, background: "var(--ink)", color: "var(--paper)",
                    padding: "10px 14px", fontSize: 13, letterSpacing: "0.02em", borderRadius: 4,
                    textDecoration: "none", zIndex: 2, fontFamily: "var(--sans)" }}>
          Abrir en Google Maps →
        </a>
      </div>

      <div className="loc__copy" style={{ marginTop: 40 }}>
        <p>
          La promoción se ubica en el nuevo sector residencial de Sagunto, con
          acceso directo a la A-7 y a la estación de Cercanías. A pocos minutos
          del casco histórico, del Puerto de Sagunto y de sus playas, y con
          Valencia a menos de media hora en coche o tren.
        </p>
        <div className="loc__stats">
          <div><span>22 min</span>a Valencia</div>
          <div><span>4 min</span>a Cercanías</div>
          <div><span>8 min</span>al puerto y playa</div>
        </div>
      </div>
    </section>
  );
};

window.Manifesto = Manifesto;
window.Pillars = Pillars;
window.Architecture = Architecture;
window.Location = Location;
