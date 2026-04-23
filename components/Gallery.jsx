// Interactive gallery — real photos
const R = window.__resources || {};
const Gallery = () => {
  const shots = [
    { label: "fachada · Exterior principal", src: R.exteriorPrincipal || "assets/exterior-principal.webp" },
    { label: "fachada · vista lateral", src: R.exterior || "assets/exterior.webp" },
    { label: "fachada · detalle terrazas", src: R.exteriorSec1 || "assets/exterior-sec1.webp" },
    { label: "fachada · acceso peatonal", src: R.exteriorSec2 || "assets/exterior-sec2.webp" },
    { label: "salón · ventanal con terraza", src: R.salon1 || "assets/salon1.webp" },
    { label: "salón · zona de estar", src: R.salon2 || "assets/salon2.webp" },
    { label: "cocina · equipada", src: R.cocina || "assets/cocina.webp" },
    { label: "dormitorio principal", src: R.dormitorio || "assets/dormitorio.webp" },
    { label: "terraza · comedor exterior", src: R.terraza1 || "assets/terraza1.webp" },
    { label: "terraza · zona de estar", src: R.terraza2 || "assets/terraza2.webp" },
  ];
  const [i, setI] = React.useState(0);
  const [view, setView] = React.useState("gallery");
  const next = () => setI((n) => (n + 1) % shots.length);
  const prev = () => setI((n) => (n - 1 + shots.length) % shots.length);

  React.useEffect(() => {
    const onKey = (e) => {
      if (document.activeElement?.closest(".gal") || e.target?.tagName === "BODY") {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="gal" id="galeria" data-screen-label="06 Gallery">
      <div className="gal__head">
        <div className="gal__kicker">04 · Galería & planos</div>
        <h2 className="gal__h">Míralo por dentro.<br /><em>Pasa el rato.</em></h2>
        <div className="gal__tabs" role="tablist">
          <button className={view === "gallery" ? "on" : ""} onClick={() => setView("gallery")}>Interiores</button>
          <button className={view === "floorplan" ? "on" : ""} onClick={() => setView("floorplan")}>Planos</button>
        </div>
      </div>

      {view === "gallery" ? (
        <div className="gal__stage">
          <div className="gal__main" style={{ background: "#111" }}>
            <img
              src={shots[i].src}
              alt={shots[i].label}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            <button className="gal__arrow gal__arrow--l" onClick={prev} aria-label="Anterior">←</button>
            <button className="gal__arrow gal__arrow--r" onClick={next} aria-label="Siguiente">→</button>
            <div className="gal__counter">
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span className="gal__counterSlash">/</span>
              <span>{String(shots.length).padStart(2, "0")}</span>
            </div>
            <div className="gal__caption">{shots[i].label}</div>
          </div>
          <div className="gal__thumbs" role="tablist">
            {shots.map((s, idx) => (
              <button
                key={idx}
                className={`gal__thumb ${idx === i ? "gal__thumb--on" : ""}`}
                onClick={() => setI(idx)}
                aria-label={s.label}
                style={{ background: "#111", overflow: "hidden" }}
              >
                <img src={s.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", aspectRatio: "1/1", display: "block" }} />
                <span className="gal__thumbLabel">{s.label.split(" · ")[0]}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <FloorPlans />
      )}
    </section>
  );
};

const FloorPlans = () => {
  const plans = [
    { id: "A", hab: 1, m2: 51, terr: 8,  price: "143.588 €", iva: "+ IVA", img: R.plan1dorm || "assets/plan-1dorm.webp" },
    { id: "B", hab: 2, m2: 68, terr: 12, price: "177.288 €", iva: "+ IVA", img: R.plan2dorm || "assets/plan-2dorm.webp" },
    { id: "C", hab: 3, m2: 88, terr: 16, price: "219.792 €", iva: "+ IVA", img: R.plan3dorm || "assets/plan-3dorm.webp" },
  ];
  const [sel, setSel] = React.useState(1);
  const p = plans[sel];
  return (
    <div className="plans">
      <div className="plans__list">
        {plans.map((pl, idx) => (
          <button key={pl.id} className={`plans__item ${idx === sel ? "on" : ""}`} onClick={() => setSel(idx)}>
            <div className="plans__itemLeft">
              <div className="plans__itemId">{pl.hab} {pl.hab === 1 ? "dormitorio" : "dormitorios"}</div>
              <div className="plans__itemMeta">≈ {pl.m2} m² útiles · terraza {pl.terr} m²</div>
            </div>
            <div className="plans__itemRight">
              <div className="plans__itemPrice">desde {pl.price}</div>
              <div className="plans__itemAvail">{pl.iva}</div>
            </div>
          </button>
        ))}
      </div>
      <div className="plans__stage">
        <div className="plans__planBox" style={{ background: "white", padding: 0, overflow: "hidden" }}>
          <img
            src={p.img}
            alt={`Plano ${p.hab} dormitorios`}
            style={{ width: "100%", height: "auto", display: "block", maxHeight: "70vh", objectFit: "contain", background: "white" }}
          />
        </div>
        <div className="plans__facts">
          <div className="plans__factsHead">{p.hab} {p.hab === 1 ? "dormitorio" : "dormitorios"}</div>
          <div className="plans__factsGrid">
            <div><span>Dormitorios</span><b>{p.hab}</b></div>
            <div><span>Superficie útil</span><b>≈ {p.m2} m²</b></div>
            <div><span>Terraza</span><b>{p.terr} m²</b></div>
            <div><span>Plaza de garaje</span><b>Incluida</b></div>
            <div><span>Trastero</span><b>Incluido</b></div>
            <div><span>Desde</span><b>{p.price} {p.iva}</b></div>
          </div>
          <a href="#vip" className="btn btn--primary btn--block">Recibir planos oficiales</a>
        </div>
      </div>
    </div>
  );
};

window.Gallery = Gallery;
