// Tweaks panel — hero variant + promo name
const Tweaks = ({ active, promoName, setPromoName, heroVariant, setHeroVariant }) => {
  if (!active) return null;
  return (
    <div className="tweaks">
      <div className="tweaks__head">
        <div className="tweaks__title">Tweaks</div>
        <div className="tweaks__sub">Ajustes rápidos de diseño</div>
      </div>

      <div className="tweaks__group">
        <div className="tweaks__label">Nombre de la promoción</div>
        <input
          type="text" className="tweaks__input"
          value={promoName}
          onChange={(e) => setPromoName(e.target.value)}
          placeholder="Nombre…"
        />
        <div className="tweaks__chips">
          {["Llum Massamagrell", "Marenost", "Alba Residencial", "Pati de Taronjers", "Onada 68"].map((n) => (
            <button key={n} className={`tweaks__chip ${promoName === n ? "on" : ""}`}
                    onClick={() => setPromoName(n)}>{n}</button>
          ))}
        </div>
      </div>

      <div className="tweaks__group">
        <div className="tweaks__label">Variante de hero</div>
        <div className="tweaks__segmented">
          {[
            { k: "typographic", l: "Tipográfico", d: "Editorial, sin imagen" },
            { k: "image",       l: "Imagen",      d: "Render + copy superpuesta" },
            { k: "video",       l: "Vídeo",       d: "Cinemático, tipo film" },
          ].map((o) => (
            <button key={o.k}
                    className={`tweaks__seg ${heroVariant === o.k ? "on" : ""}`}
                    onClick={() => setHeroVariant(o.k)}>
              <b>{o.l}</b>
              <span>{o.d}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="tweaks__foot">
        Los cambios se guardan automáticamente al recargar.
      </div>
    </div>
  );
};

window.Tweaks = Tweaks;
