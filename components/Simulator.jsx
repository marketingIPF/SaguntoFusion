// Mortgage simulator — Sagunto Fusión 1 · precios reales VPP (sin IVA incluido en slider)
const Simulator = () => {
  const [price, setPrice] = React.useState(177288);
  const [down, setDown] = React.useState(20);
  const [years, setYears] = React.useState(30);
  const [rate, setRate] = React.useState(3.1);

  const iva = price * 0.10;
  const priceWithIva = price + iva;
  const principal = Math.round(priceWithIva * (1 - down / 100));
  const months = years * 12;
  const r = rate / 100 / 12;
  const monthly = r === 0
    ? principal / months
    : (principal * r) / (1 - Math.pow(1 + r, -months));
  const total = monthly * months;
  const interest = total - principal;

  const fmt = (n) => new Intl.NumberFormat("es-ES", { maximumFractionDigits: 0 }).format(Math.round(n));

  const typologies = [
    { label: "1 dormitorio", price: 143588 },
    { label: "2 dormitorios", price: 177288 },
    { label: "3 dormitorios", price: 219792 },
  ];

  return (
    <section className="sim" id="simulador" data-screen-label="07 Simulator">
      <div className="sim__head">
        <div className="sim__kicker">05 · Simulador</div>
        <h2 className="sim__h">
          ¿Cuánto cuesta dejar de pagar alquiler?<br />
          <em>Deslízalo.</em>
        </h2>
      </div>

      <div className="sim__body">
        <div className="sim__controls">
          <div className="slider">
            <div className="slider__top">
              <label>Tipología</label>
              <div className="slider__value">{fmt(price)} € + IVA</div>
            </div>
            <div className="chips" style={{ marginTop: 10 }}>
              {typologies.map((t) => (
                <button key={t.label} type="button"
                        className={`chip ${price === t.price ? "chip--on" : ""}`}
                        onClick={() => setPrice(t.price)}
                        style={{ background: price === t.price ? "oklch(0.78 0.15 45)" : "transparent",
                                 color: price === t.price ? "oklch(0.22 0.012 80)" : "var(--paper)",
                                 borderColor: price === t.price ? "oklch(0.78 0.15 45)" : "rgba(255,255,255,0.2)" }}>
                  {t.label} · desde {fmt(t.price)} €
                </button>
              ))}
            </div>
            <div className="slider__hint">Precios oficiales VPP (sin IVA). IVA reducido del 10 % aplicado automáticamente.</div>
          </div>

          <Slider label="Entrada" value={down} min={10} max={40} step={1} onChange={setDown}
                  format={(v) => `${v}%  ·  ${fmt(priceWithIva * v / 100)} €`} />
          <Slider label="Plazo" value={years} min={10} max={35} step={1} onChange={setYears}
                  format={(v) => `${v} años`} />
          <Slider label="Tipo de interés" value={rate} min={2} max={5} step={0.05} onChange={setRate}
                  format={(v) => `${v.toFixed(2)}%`} hint="TIN estimado · consulta con tu banco" />
        </div>

        <div className="sim__result">
          <div className="sim__resultHead">Cuota mensual estimada</div>
          <div className="sim__big">
            {fmt(monthly)}<span>€/mes</span>
          </div>
          <div className="sim__rule" />
          <div className="sim__break">
            <div><span>Precio vivienda (sin IVA)</span><b>{fmt(price)} €</b></div>
            <div><span>IVA (10 %)</span><b>{fmt(iva)} €</b></div>
            <div><span>Precio total con IVA</span><b>{fmt(priceWithIva)} €</b></div>
            <div><span>Capital solicitado</span><b>{fmt(principal)} €</b></div>
            <div><span>Intereses totales</span><b>{fmt(interest)} €</b></div>
            <div><span>Total a devolver</span><b>{fmt(total)} €</b></div>
          </div>
          <div className="sim__bar">
            <span className="sim__barPrincipal" style={{ flex: principal }}>capital</span>
            <span className="sim__barInterest" style={{ flex: interest }}>intereses</span>
          </div>
          <div className="sim__note">
            Cálculo orientativo · sistema francés · sin comisiones ni seguros.
            Si tu alquiler actual es <b>más de {fmt(monthly)} €</b>, probablemente ya estás pagando una casa. Solo que no es la tuya.
          </div>
        </div>
      </div>
    </section>
  );
};

const Slider = ({ label, value, min, max, step, onChange, format, hint }) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="slider">
      <div className="slider__top">
        <label>{label}</label>
        <div className="slider__value">{format(value)}</div>
      </div>
      <div className="slider__trackWrap">
        <div className="slider__track">
          <div className="slider__fill" style={{ width: `${pct}%` }} />
        </div>
        <input
          type="range"
          min={min} max={max} step={step} value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
        />
      </div>
      {hint && <div className="slider__hint">{hint}</div>}
    </div>
  );
};

window.Simulator = Simulator;
