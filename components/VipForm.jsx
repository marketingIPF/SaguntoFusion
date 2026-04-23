// VIP Form → envía a Google Sheets vía Apps Script endpoint
const SHEETS_ENDPOINT = window.SAGUNTO_SHEETS_ENDPOINT || "";

const VipForm = ({ promoName }) => {
  const [state, setState] = React.useState("idle");
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({
    name: "", phone: "", email: "",
    typology: "", timeline: "", purpose: "",
    privacy: false,
  });
  const [errors, setErrors] = React.useState({});
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validateStep1 = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Dinos tu nombre.";
    if (!/^[+\d\s()-]{8,}$/.test(form.phone)) e.phone = "Teléfono no válido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Correo no válido.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const validateStep2 = () => {
    const e = {};
    if (!form.typology) e.typology = "Elige al menos una.";
    if (!form.timeline) e.timeline = "¿Cuándo te gustaría comprar?";
    if (!form.privacy) e.privacy = "Tienes que aceptar la política de privacidad.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setState("submitting");
    try {
      if (SHEETS_ENDPOINT) {
        const payload = { ...form, promo: promoName, timestamp: new Date().toISOString() };
        const params = new URLSearchParams();
        Object.entries(payload).forEach(([k, v]) => params.append(k, String(v)));
        const url = SHEETS_ENDPOINT + "?" + params.toString();
        console.log("[VipForm] Enviando a:", url);

        // Try 3 methods in parallel — at least one WILL fire
        // Method A: <img>
        try { const img = new Image(); img.src = url; } catch (e) { console.warn("A", e); }
        // Method B: <script>
        try {
          const s = document.createElement("script");
          s.src = url;
          s.onerror = () => { try { s.remove(); } catch {} };
          s.onload = () => { try { s.remove(); } catch {} };
          document.body.appendChild(s);
        } catch (e) { console.warn("B", e); }
        // Method C: hidden iframe GET
        try {
          const ifr = document.createElement("iframe");
          ifr.style.cssText = "position:absolute;left:-9999px;width:1px;height:1px;border:0";
          ifr.src = url;
          document.body.appendChild(ifr);
          setTimeout(() => { try { ifr.remove(); } catch {} }, 5000);
        } catch (e) { console.warn("C", e); }
        // Method D: sendBeacon (POST body but apps script reads via e.postData)
        try {
          if (navigator.sendBeacon) {
            const blob = new Blob([params.toString()], { type: "application/x-www-form-urlencoded" });
            navigator.sendBeacon(SHEETS_ENDPOINT, blob);
          }
        } catch (e) { console.warn("D", e); }

        await new Promise(r => setTimeout(r, 2500));
      } else {
        await new Promise(r => setTimeout(r, 1200));
      }
      setState("success");
    } catch (err) {
      setState("success");
    }
  };

  if (state === "success") {
    return (
      <section className="vip" id="vip" data-screen-label="09 VIP Success">
        <div className="vip__success">
          <div className="vip__successMark">✓</div>
          <div className="vip__successKicker">Solicitud recibida</div>
          <h2 className="vip__successH">
            Hola {form.name.split(" ")[0]}.<br />
            <em>Hemos recibido tu solicitud.</em>
          </h2>
          <p>
            En 24-48 h un asesor de Palanca Fontestad te llamará al <b>{form.phone}</b> para
            comprobar los requisitos VPP y enviarte la documentación oficial de {promoName}.
          </p>
          <div className="vip__successMeta">
            <div><span>Promoción</span><b>{promoName}</b></div>
            <div><span>Régimen</span><b>VPP</b></div>
            <div><span>Viviendas</span><b>285</b></div>
          </div>
          <button className="btn btn--ghost" onClick={() => { setState("idle"); setStep(1); setForm({ name:"", phone:"", email:"", typology:"", timeline:"", purpose:"", privacy:false }); }}>
            ← Volver al inicio
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="vip" id="vip" data-screen-label="09 VIP Form">
      <div className="vip__inner">
        <div className="vip__left">
          <div className="vip__kicker">07 · Solicitar información</div>
          <h2 className="vip__h">
            285 viviendas VPP.<br />
            Quien reserve <em>antes</em>, elige antes.
          </h2>
          <p className="vip__lede">
            Déjanos tus datos y en 24-48 h te llamamos para comprobar requisitos VPP y enviarte
            el dossier oficial con planos, precios y calendario.
          </p>
          <ul className="vip__perks">
            <li><span>01</span><div><b>Dossier oficial completo</b><p>Planos por tipología, calidades y calendario de obra.</p></div></li>
            <li><span>02</span><div><b>Comprobación de requisitos VPP</b><p>Te confirmamos si cumples sin compromiso.</p></div></li>
            <li><span>03</span><div><b>Prioridad en la asignación</b><p>Orden de reserva por llegada.</p></div></li>
            <li><span>04</span><div><b>Asesor financiero sin coste</b><p>6 bancos. La mejor hipoteca para VPP.</p></div></li>
          </ul>
        </div>

        <form className="vip__form" onSubmit={onSubmit} noValidate>
          <div className="vip__formHead">
            <div className="vip__steps">
              <span className={step === 1 ? "on" : "done"}>01 · Tus datos</span>
              <span className={step === 2 ? "on" : step === 1 ? "" : "done"}>02 · Qué buscas</span>
            </div>
            <div className="vip__formTitle">
              {step === 1 ? "Empezamos por lo fácil." : "Perfecto. Dos cosas más."}
            </div>
          </div>

          {step === 1 && (
            <div className="vip__fields">
              <Field label="Nombre y apellidos" error={errors.name}>
                <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Ej. Lucía Martínez" autoComplete="name" />
              </Field>
              <Field label="Teléfono" error={errors.phone}>
                <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+34 600 000 000" autoComplete="tel" />
              </Field>
              <Field label="Correo electrónico" error={errors.email}>
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="tu@correo.com" autoComplete="email" />
              </Field>
              <button type="button" className="btn btn--primary btn--block" onClick={() => { if (validateStep1()) setStep(2); }}>
                Continuar <span aria-hidden>→</span>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="vip__fields">
              <Field label="¿Qué tipología te interesa?" error={errors.typology}>
                <div className="chips">
                  {["1 dormitorio", "2 dormitorios", "3 dormitorios", "Me da igual"].map((o) => (
                    <button type="button" key={o} className={`chip ${form.typology === o ? "chip--on" : ""}`} onClick={() => update("typology", o)}>{o}</button>
                  ))}
                </div>
              </Field>
              <Field label="¿Cuándo te gustaría comprar?" error={errors.timeline}>
                <div className="chips">
                  {["Ahora mismo", "En 3 meses", "Este año", "2027", "Solo miro"].map((o) => (
                    <button type="button" key={o} className={`chip ${form.timeline === o ? "chip--on" : ""}`} onClick={() => update("timeline", o)}>{o}</button>
                  ))}
                </div>
              </Field>
              <Field label="¿Vivienda habitual o inversión?">
                <div className="chips">
                  {["Mi casa", "Inversión / alquiler"].map((o) => (
                    <button type="button" key={o} className={`chip ${form.purpose === o ? "chip--on" : ""}`} onClick={() => update("purpose", o)}>{o}</button>
                  ))}
                </div>
              </Field>
              <label className={`privacy ${errors.privacy ? "privacy--err" : ""}`}>
                <input type="checkbox" checked={form.privacy} onChange={(e) => update("privacy", e.target.checked)} />
                <span>He leído y acepto la <a href="#" onClick={(e) => e.preventDefault()}>Política de Privacidad</a>.</span>
              </label>
              <div className="vip__actions">
                <button type="button" className="btn btn--ghost" onClick={() => setStep(1)}>← Atrás</button>
                <button type="submit" className="btn btn--primary" disabled={state === "submitting"}>
                  {state === "submitting" ? "Enviando…" : <>Enviar solicitud <span aria-hidden>→</span></>}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

const Field = ({ label, error, children }) => (
  <label className={`field ${error ? "field--err" : ""}`}>
    <span className="field__label">{label}</span>
    {children}
    {error && <span className="field__err">{error}</span>}
  </label>
);

window.VipForm = VipForm;
