const FAQ = () => {
  const items = [
    { q: "¿Qué es una VPP y quién puede comprarla?",
      a: "VPP es Vivienda de Protección Pública. Puede adquirirla cualquier persona física que cumpla los requisitos fijados por la Generalitat Valenciana: ingresos máximos según unidad familiar, no ser titular de otra vivienda en propiedad en la misma área, y destinarla a residencia habitual. Nuestro equipo te ayuda a comprobar si cumples los requisitos sin compromiso." },
    { q: "¿Cuál es el precio máximo oficial?",
      a: "El precio máximo de venta para VPP en Sagunto está fijado por la Generalitat Valenciana en 1.908 €/m² útil (más anejos vinculados: garaje y trastero). Es un precio regulado y no puede superarse." },
    { q: "¿Qué incluye el precio?",
      a: "La vivienda, la plaza de garaje y el trastero vinculado. Las calidades incluyen aerotermia, suelo radiante/refrescante, cocina equipada, armarios empotrados, carpintería exterior con RPT, y acceso a las zonas comunes (piscina, gimnasio, áreas infantiles)." },
    { q: "¿Cómo es el proceso de reserva?",
      a: "Primero te pones en contacto con nosotros y comprobamos requisitos de VPP. Si todo encaja, se formaliza una reserva con cantidad a cuenta, se firma el contrato de compraventa privada, y se van realizando los desembolsos según el calendario de obra hasta la escritura final en notaría." },
    { q: "¿Están avaladas las cantidades entregadas?",
      a: "Sí. Todas las cantidades entregadas a cuenta durante la construcción están avaladas por entidad bancaria, conforme a la Ley 38/1999 de Ordenación de la Edificación. Recibes aval individual nominativo." },
    { q: "¿Cuándo se entregan las viviendas?",
      a: "El calendario de obra estimado prevé la entrega entre 24 y 30 meses desde el inicio de las obras. Te detallamos fechas concretas en la cita informativa." },
    { q: "¿Se puede financiar con hipoteca?",
      a: "Sí. Las VPP son perfectamente financiables. Además, al tratarse de obra nueva con calificación energética A y precio controlado, los bancos ofrecen condiciones preferentes. Nuestro departamento financiero te asesora con varias entidades sin coste." },
  ];

  const [open, setOpen] = React.useState(0);
  return (
    <section className="faq" id="faq" data-screen-label="08 FAQ">
      <div className="faq__head">
        <div className="faq__kicker">06 · Preguntas</div>
        <h2 className="faq__h">Todo lo que deberías saber sobre la VPP,<br /><em>sin letra pequeña.</em></h2>
      </div>
      <div className="faq__list">
        {items.map((it, i) => (
          <div key={i} className={`faq__item ${open === i ? "faq__item--open" : ""}`}>
            <button className="faq__q" onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="faq__qNum">{String(i + 1).padStart(2, "0")}</span>
              <span className="faq__qText">{it.q}</span>
              <span className="faq__qIcon">{open === i ? "–" : "+"}</span>
            </button>
            <div className="faq__a" style={{ maxHeight: open === i ? 500 : 0 }}>
              <div className="faq__aInner">{it.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

window.FAQ = FAQ;
