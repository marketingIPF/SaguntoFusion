const Hero = ({ variant, promoName, location }) => {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="hero" data-variant={variant} data-screen-label="01 Hero">
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <div className="nav__inner">
          <a className="nav__brand" href="#">
            <span className="nav__brandMark">◐</span>
            <span className="nav__brandText">Palanca<span className="nav__brandThin">Fontestad</span></span>
          </a>
          <div className="nav__links">
            <a href="#proyecto">El proyecto</a>
            <a href="#galeria">Galería</a>
            <a href="#simulador">Simulador</a>
            <a href="#faq">FAQ</a>
          </div>
          <a href="#vip" className="nav__cta">
            Reserva VPP <span aria-hidden>→</span>
          </a>
        </div>
      </nav>

      {variant === "typographic" && <HeroTypographic promoName={promoName} location={location} />}
      {variant === "image" && <HeroImage promoName={promoName} location={location} />}
      {variant === "video" && <HeroVideo promoName={promoName} location={location} />}
    </section>
  );
};

// ----- VARIANT: TYPOGRAPHIC (editorial) -----
const HeroTypographic = ({ promoName, location }) => (
  <div className="heroType">
    <div className="heroType__meta">
      <div className="heroType__chip">
        <span className="heroType__dot" /> VPP · {location}
      </div>
      <div className="heroType__date">285 viviendas · 1, 2 y 3 habitaciones</div>
    </div>

    <h1 className="heroType__title">
      <span className="heroType__line">Tu primera</span>
      <span className="heroType__line heroType__line--serif"><em>casa</em></span>
      <span className="heroType__line">a precio</span>
      <span className="heroType__line heroType__line--muted">protegido.</span>
    </h1>

    <div className="heroType__grid">
      <div className="heroType__col">
        <div className="heroType__label">Promoción</div>
        <div className="heroType__value heroType__value--display">{promoName}</div>
      </div>
      <div className="heroType__col">
        <div className="heroType__label">Régimen</div>
        <div className="heroType__value">VPP · obra nueva</div>
      </div>
      <div className="heroType__col">
        <div className="heroType__label">Desde</div>
        <div className="heroType__value">
          <span className="heroType__price">1.908 €/m²</span>
          <span className="heroType__priceNote">precio máximo VPP oficial</span>
        </div>
      </div>
      <div className="heroType__col">
        <div className="heroType__label">Reserva</div>
        <div className="heroType__value">
          <a href="#vip" className="heroType__cta">
            Solicitar información <span aria-hidden>↓</span>
          </a>
        </div>
      </div>
    </div>

    <div className="heroType__ticker">
      <span>285 viviendas VPP en Sagunto</span>
      <span>·</span>
      <span>garaje y trastero incluidos</span>
      <span>·</span>
      <span>calificación energética A</span>
      <span>·</span>
      <span>aerotermia y suelo radiante</span>
      <span>·</span>
      <span>zonas comunes con piscina</span>
      <span>·</span>
      <span>285 viviendas VPP en Sagunto</span>
    </div>
  </div>
);

// ----- VARIANT: IMAGE -----
const HeroImage = ({ promoName, location }) => (
  <div className="heroImg">
    <div className="heroImg__media">
      <img
        src={(window.__resources && window.__resources.exteriorPrincipal) || "assets/exterior-principal.webp"}
        alt="Sagunto Fusión 1 — fachada principal"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div className="heroImg__scrim" />
    </div>

    <div className="heroImg__overlay">
      <div className="heroImg__chip">
        <span className="heroImg__dot" /> VPP · {location}
      </div>
      <h1 className="heroImg__title">
        Tu primera <em>casa</em><br />a precio protegido.
      </h1>
      <p className="heroImg__sub">
        {promoName}. 285 viviendas de obra nueva en el nuevo barrio residencial
        de Sagunto, con garaje, trastero y zonas comunes incluidos.
      </p>
      <div className="heroImg__ctaRow">
        <a href="#vip" className="btn btn--primary">Solicitar información</a>
        <a href="#proyecto" className="btn btn--ghost">Ver el proyecto</a>
      </div>
    </div>

    <div className="heroImg__stats">
      <div><span>285</span>viviendas</div>
      <div><span>1-3</span>habitaciones</div>
      <div><span>A</span>calificación energética</div>
      <div><span>1.908</span>€/m² máx.</div>
    </div>
  </div>
);

// ----- VARIANT: VIDEO -----
const HeroVideo = ({ promoName, location }) => (
  <div className="heroVid">
    <div className="heroVid__media">
      <Placeholder
        label="vídeo · dron sobre Sagunto"
        ratio="16/9"
        tone="sky"
        style={{ height: "100%", width: "100%", aspectRatio: "auto" }}
      />
      <div className="heroVid__vignette" />
      <button className="heroVid__play" aria-label="Reproducir">
        <span className="heroVid__playRing" />
        <span className="heroVid__playIcon">▶</span>
        <span className="heroVid__playLabel">Ver film · 00:48</span>
      </button>
      <div className="heroVid__timecode">
        <span className="heroVid__rec" /> LIVE · dron 04.2026
      </div>
    </div>

    <div className="heroVid__bottom">
      <div className="heroVid__left">
        <div className="heroVid__chip">
          <span className="heroVid__dot" /> {location}
        </div>
        <h1 className="heroVid__title">
          Tu primera <em>casa</em> a precio protegido.
        </h1>
      </div>
      <div className="heroVid__right">
        <div className="heroVid__meta">
          <div className="heroVid__metaRow"><span>Promoción</span><b>{promoName}</b></div>
          <div className="heroVid__metaRow"><span>Régimen</span><b>VPP</b></div>
          <div className="heroVid__metaRow"><span>Viviendas</span><b>285</b></div>
        </div>
        <a href="#vip" className="btn btn--primary btn--block">Solicitar información</a>
      </div>
    </div>
  </div>
);

window.Hero = Hero;
