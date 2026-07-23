import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { findGuestMatches, isValidGuest } from "./guestList";


const ADDRESS_SHARE_URL = "https://share.google/RfJ5xwi1vwSWgSfvn";
const MAPS_EMBED_QUERY = encodeURIComponent(
  "La Toscana Pampulha, Belo Horizonte, Minas Gerais, Brasil",
);
const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${MAPS_EMBED_QUERY}&output=embed`;

const GOOGLE_FORM_ID = "1FAIpQLSdahcPoWWmkEH34wdnXSGAhQ7CbGBXDHR-m-EoH4cG9WIu7Og";
const GOOGLE_FORM_ENTRIES = {
  attending: "entry.375662700",
  guests: "entry.116323640",
  names: [
    "entry.958544039",
    "entry.424745400",
    "entry.989269875",
    "entry.576531442",
    "entry.1786211925",
  ],
  dietary: "entry.2138633738",
  dietaryNote: "entry.257800192",
};
const GOOGLE_FORM_ACTION = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

const ATTENDING_YES = "Eu vou / Nós vamos";
const ATTENDING_NO = "Infelizmente eu não posso / nós não podemos";

export function Casamento() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    attending: "yes",
    guests: "",
    guestNames: [""],
    dietary: "no",
    dietaryNote: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const openModal = () => {
    setSubmitted(false);
    setSubmitting(false);
    setSubmitError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm({
      attending: "yes",
      guests: "",
      guestNames: [""],
      dietary: "no",
      dietaryNote: "",
    });
    setSubmitted(false);
    setSubmitting(false);
    setSubmitError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const guestCount = Number(form.guests) || 0;
    if (!guestCount) return;
    const names = form.guestNames.slice(0, guestCount).map((n) => n.trim());
    if (names.some((n) => !n || !isValidGuest(n))) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const body = new FormData();
      body.append(
        GOOGLE_FORM_ENTRIES.attending,
        form.attending === "yes" ? ATTENDING_YES : ATTENDING_NO
      );
      names.forEach((n, i) => {
        const entry = GOOGLE_FORM_ENTRIES.names[i];
        if (entry) body.append(entry, n);
      });
      body.append(GOOGLE_FORM_ENTRIES.guests, form.guests);
      if (form.attending === "yes") {
        body.append(
          GOOGLE_FORM_ENTRIES.dietary,
          form.dietary === "yes" ? "Sim" : "Não"
        );
        if (form.dietaryNote.trim()) {
          body.append(GOOGLE_FORM_ENTRIES.dietaryNote, form.dietaryNote.trim());
        }
      }

      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body,
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Algo deu errado."
      );
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isModalOpen]);

  return (
    <>
      <style>{CSS}</style>
      <nav className="bm-nav">
        <Link to="/casamento" className="bm-nav-logo">18.10.2026</Link>
        <button
          className="bm-hamburger"
          type="button"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
        <ul className={`bm-nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <a href="#info" onClick={() => setMenuOpen(false)}>Informações</a>
          </li>
          <li>
            <a href="#dresscode" onClick={() => setMenuOpen(false)}>Dress code</a>
          </li>
          <li>
            <a href="#local" onClick={() => setMenuOpen(false)}>Local</a>
          </li>
        </ul>
      </nav>

      <header className="dt-hero">
        <img className="dt-corner dt-corner-tl" src="/branch-left.png" alt="" aria-hidden="true" />
        <img className="dt-corner dt-corner-tr" src="/branch-right.png" alt="" aria-hidden="true" />
        <img className="dt-cat dt-cat-white" src="/cat-white.png" alt="" aria-hidden="true" />

        <img className="dt-hero-logo" src="/bm-logo.png" alt="Bruna & Marc" />
        <div className="bm-ornament">— ✦ —</div>
        <p className="dt-hero-date">Domingo, 18 de outubro de 2026</p>
        <h1 className="dt-hero-title">O Nosso &quot;Sim&quot;</h1>
        <p className="dt-hero-sub">
          Tudo o que você precisa saber sobre o dia do nosso casamento
        </p>
      </header>

      <section className="dt-photo-section">
        <div className="dt-photo">
          <img src="/latoscana.jpg" alt="La Toscana – local do casamento" />
          <div className="dt-photo-overlay">
            <button className="dt-rsvp-btn" type="button" onClick={openModal}>
              Você vem? Confirme sua presença aqui
            </button>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="dt-modal-backdrop" onClick={closeModal}>
          <div className="dt-modal" onClick={(e) => e.stopPropagation()}>
            <button className="dt-modal-close" type="button" onClick={closeModal} aria-label="Fechar">
              ×
            </button>
            <h2 className="dt-modal-title">Confirmação</h2>
            <p className="dt-modal-lead">
              Estamos ansiosos por vocês! Por favor, nos avise quem virá.
            </p>
            {submitted ? (
              <div className="dt-modal-success">
                <div className="dt-modal-success-icon">✓</div>
                <p>Muito obrigado pela sua confirmação!</p>
              </div>
            ) : (
              <form className="dt-modal-form" onSubmit={handleSubmit}>
                <div className="dt-field">
                  <span>Você vem / vocês vêm?</span>
                  <div className="dt-radio-group dt-radio-group-attending">
                    <label className="dt-radio">
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        checked={form.attending === "yes"}
                        onChange={(e) =>
                          setForm({ ...form, attending: e.target.value })
                        }
                      />
                      <span>Eu vou / Nós vamos</span>
                    </label>
                    <label className="dt-radio">
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={form.attending === "no"}
                        onChange={(e) =>
                          setForm({ ...form, attending: e.target.value })
                        }
                      />
                      <span>Infelizmente eu não posso / nós não podemos</span>
                    </label>
                  </div>
                </div>
                <label className="dt-field">
                  <span>Número de convidados</span>
                  <select
                    value={form.guests}
                    onChange={(e) => {
                      const count = Number(e.target.value) || 0;
                      setForm((prev) => {
                        const names = [...prev.guestNames];
                        while (names.length < count) names.push("");
                        names.length = count;
                        return { ...prev, guests: e.target.value, guestNames: names };
                      });
                    }}
                    required
                  >
                    <option value="" disabled>
                      Por favor, selecione
                    </option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "pessoa" : "pessoas"}
                      </option>
                    ))}
                  </select>
                </label>
                {Number(form.guests) > 0 && (
                  <div className="dt-field">
                    <span>Nomes dos convidados</span>
                    <p className="dt-modal-hint">
                      Digite as primeiras letras do primeiro nome (mín. 2 letras) e selecione o nome na lista.
                    </p>
                    {Array.from({ length: Number(form.guests) }).map((_, i) => (
                      <GuestNameInput
                        key={i}
                        index={i}
                        value={form.guestNames[i] || ""}
                        otherNames={form.guestNames.filter((_, j) => j !== i)}
                        onChange={(val) =>
                          setForm((prev) => {
                            const names = [...prev.guestNames];
                            names[i] = val;
                            return { ...prev, guestNames: names };
                          })
                        }
                      />
                    ))}
                  </div>
                )}
                {form.attending === "yes" && (
                  <div className="dt-field">
                    <span>Alimentação – restrições & preferências</span>
                    <div className="dt-radio-group">
                      <label className="dt-radio">
                        <input
                          type="radio"
                          name="dietary"
                          value="no"
                          checked={form.dietary === "no"}
                          onChange={(e) =>
                            setForm({ ...form, dietary: e.target.value, dietaryNote: "" })
                          }
                        />
                        <span>Não</span>
                      </label>
                      <label className="dt-radio">
                        <input
                          type="radio"
                          name="dietary"
                          value="yes"
                          checked={form.dietary === "yes"}
                          onChange={(e) => setForm({ ...form, dietary: e.target.value })}
                        />
                        <span>Sim</span>
                      </label>
                    </div>
                    {form.dietary === "yes" && (
                      <input
                        className="dt-dietary-note"
                        type="text"
                        value={form.dietaryNote}
                        onChange={(e) => setForm({ ...form, dietaryNote: e.target.value })}
                        placeholder="ex.: intolerância a glúten, vegetariano, vegano"
                      />
                    )}
                  </div>
                )}

                {submitError && (
                  <p className="dt-modal-error" role="alert">
                    {submitError}
                  </p>
                )}
                {(() => {
                  const count = Number(form.guests) || 0;
                  const namesOk =
                    count > 0 &&
                    form.guestNames
                      .slice(0, count)
                      .every((n) => n.trim() && isValidGuest(n));
                  return (
                    <button
                      className="dt-modal-submit"
                      type="submit"
                      disabled={submitting || !namesOk}
                    >
                      {submitting ? "Enviando…" : "Enviar"}
                    </button>
                  );
                })()}
              </form>
            )}
          </div>
        </div>
      )}

      <section id="info" className="dt-section">
        <div className="bm-container">
          <div className="dt-grid">
            <InfoCard icon="📍" label="Endereço" tone="primary">
              <p>
                <strong>La Toscana</strong>
                <br />
                Pampulha · Belo Horizonte
                <br />
                Minas Gerais · Brasil
              </p>
              <a
                className="dt-btn"
                href={ADDRESS_SHARE_URL}
                target="_blank"
                rel="noreferrer noopener"
              >
                Abrir no Google ↗
              </a>
            </InfoCard>

            <InfoCard icon="🕰️" label="Início">
              <p className="dt-big">15:30h</p>
              <p className="dt-note">
                Pontualidade é tudo! Por favor, programem-se para chegar com antecedência.
              </p>
            </InfoCard>

            <InfoCard icon="👗" label="Dress code">
              <p className="dt-big" style={{ fontSize: "1.6rem" }}>
                Elegante em tons escuros
              </p>
              <p className="dt-note">
                Roupas escuras e festivas — chique e com estilo.
              </p>
              <p className="dt-note" style={{ marginTop: "0.5rem", fontWeight: 600 }}>
                Mais informações abaixo ↓
              </p>
            </InfoCard>

            <InfoCard icon="🚗" label="Como chegar & estacionamento">
              <p>
                As vagas de estacionamento no local são <strong>limitadas</strong>.
              </p>
              <p className="dt-note">
                Recomendamos vir de <strong>Uber</strong> ou{" "}
                <strong>99</strong>, caso a hospedagem não seja acessível a pé.
              </p>
            </InfoCard>

          </div>
        </div>
      </section>

      <div className="dt-rsvp-standalone">
        <div className="dt-rsvp-wrap">
          <button className="dt-rsvp-btn" type="button" onClick={openModal}>
            Você vem? Confirme sua presença aqui
          </button>
          <img className="dt-cat dt-cat-black" src="/cat-black.png" alt="" aria-hidden="true" />
        </div>
      </div>

      <section id="dresscode" className="dt-section dt-dresscode">
        <div className="bm-container">
          <span className="bm-eyebrow">Dress code</span>
          <h2 className="bm-title">Elegante em tons escuros</h2>
          <p className="bm-lead">
            Uma pequena visão geral como inspiração:
          </p>
          <div className="dt-dresscode-grid">
            <figure className="dt-dresscode-card">
              <div className="dt-dresscode-card-media">
                <img src="/dresscode-elas.png" alt="Dress code para elas – roupas elegantes e escuras" />
              </div>
              <h3>Para elas</h3>
              <figcaption>
                <p>
                  Vestido longo ou midi, macacão elegante ou um conjunto festivo
                  em <strong>tons escuros</strong> (ex.: preto, verde escuro,
                  azul marinho, marsala).
                </p>
              </figcaption>
            </figure>
            <figure className="dt-dresscode-card">
              <div className="dt-dresscode-card-media">
                <img src="/dresscode-eles.png" alt="Dress code para eles – calça social e camisa" />
              </div>
              <h3>Para eles</h3>
              <figcaption>
                <p>
                  <strong>Calça social, camisa</strong> e, se possível, uma{" "}
                  <strong>gravata longa</strong>. Blazer é opcional.
                </p>
              </figcaption>
            </figure>
          </div>

          <h3 className="dt-dresscode-nogo-title">Por favor, evitem</h3>
          <div className="dt-dresscode-grid">
            <figure className="dt-dresscode-card dt-dresscode-card-nogo">
              <div className="dt-dresscode-card-media">
                <img src="/dresscode-elas-nogo.png" alt="Não recomendado – roupas claras" />
              </div>
              <figcaption>
                <p>
                  Por favor, <strong>evitem cores claras</strong> como branco,
                  off-white, bege, marfim, pérola ou champanhe — são reservadas
                  à noiva.
                </p>
              </figcaption>
            </figure>
            <figure className="dt-dresscode-card dt-dresscode-card-nogo">
              <div className="dt-dresscode-card-media">
                <img src="/dresscode-eles-nogo.png" alt="Não recomendado – roupas muito casuais" />
              </div>
              <figcaption>
                <p>
                  Por favor, <strong>evitem bermudas, camisetas, camisas de time</strong>{" "}
                  ou looks muito coloridos e chamativos — pedimos trajes festivos
                  para manter a elegância da celebração.
                </p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section id="local" className="dt-section dt-section-alt">
        <div className="bm-container">
          <span className="bm-eyebrow">Local</span>
          <h2 className="bm-title">Como nos encontrar</h2>
          <p className="bm-lead">
            O La Toscana fica na Pampulha, à beira da lagoa — um dos cantos
            mais bonitos de Belo Horizonte.
          </p>
          <div className="dt-map">
            <iframe
              title="Mapa do local do casamento"
              src={MAPS_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="dt-map-hint">
            Para o endereço exato e navegação:{" "}
            <a href={ADDRESS_SHARE_URL} target="_blank" rel="noreferrer noopener">
              Abrir no Google ↗
            </a>
          </p>
          <div className="dt-rsvp-below-map">
            <button className="dt-rsvp-btn" type="button" onClick={openModal}>
              Você vem? Confirme sua presença aqui
            </button>
          </div>
        </div>
      </section>

      <footer className="bm-footer">
        <p>18 de outubro de 2026 · Belo Horizonte, Brasil · Feito com ♥</p>
      </footer>
    </>
  );
}

function GuestNameInput({
  index,
  value,
  otherNames,
  onChange,
}: {
  index: number;
  value: string;
  otherNames: string[];
  onChange: (val: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  const matches = findGuestMatches(value, otherNames);
  const valid = isValidGuest(value);
  const showList = focused && matches.length > 0 && !valid;

  useEffect(() => {
    if (!focused) return;
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [focused]);

  useEffect(() => setHighlight(0), [value]);

  const pick = (name: string) => {
    onChange(name);
    setFocused(false);
  };

  return (
    <div className="dt-autocomplete" ref={wrapRef}>
      <input
        type="text"
        className={`dt-guest-name${value && !valid ? " dt-guest-name-invalid" : ""}${valid ? " dt-guest-name-valid" : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onKeyDown={(e) => {
          if (!showList) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setHighlight((h) => Math.min(h + 1, matches.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setHighlight((h) => Math.max(h - 1, 0));
          } else if (e.key === "Enter") {
            e.preventDefault();
            pick(matches[highlight]);
          } else if (e.key === "Escape") {
            setFocused(false);
          }
        }}
        placeholder={`Convidado ${index + 1} — digite ao menos 2 letras`}
        autoComplete="off"
        required
      />
      {showList && (
        <ul className="dt-autocomplete-list" role="listbox">
          {matches.map((name, i) => (
            <li
              key={name}
              role="option"
              aria-selected={i === highlight}
              className={i === highlight ? "is-active" : ""}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(name);
              }}
              onMouseEnter={() => setHighlight(i)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
      {focused && value.trim().length >= 2 && matches.length === 0 && !valid && (
        <p className="dt-autocomplete-empty">
          Nenhum convidado encontrado. Verifique o nome ou entre em contato conosco.
        </p>
      )}
    </div>
  );
}

function InfoCard({
  icon,
  label,
  children,
  tone,
}: {
  icon: string;
  label: string;
  children: React.ReactNode;
  tone?: "primary";
}) {
  return (
    <div className={`dt-card${tone === "primary" ? " dt-card-primary" : ""}`}>
      <div className="dt-card-icon">{icon}</div>
      <span className="dt-card-label">{label}</span>
      <div className="dt-card-body">{children}</div>
    </div>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Lato:wght@300;400;700&family=Great+Vibes&display=swap');

:root{
  --bm-green:#1B4332;--bm-green2:#2D6A4F;--bm-green3:#40916C;
  --bm-gold:#B8962E;--bm-gold2:#D4AF61;--bm-gold3:#F0D080;
  --bm-ivory:#FAF8F2;--bm-ivory2:#EDE8DF;--bm-ivory3:#DDD6CB;
  --bm-brown:#2C2420;--bm-brown2:#6B5F58;--bm-brown3:#9E9189;
}
html{scroll-behavior:smooth;}
body{font-family:'Lato',sans-serif;font-weight:300;color:var(--bm-brown);background:var(--bm-ivory);line-height:1.75;font-size:16px;}

.bm-nav{position:fixed;top:0;width:100%;z-index:1000;background:rgba(15,40,25,0.96);backdrop-filter:blur(12px);padding:0.9rem 2.5rem;display:flex;justify-content:space-between;align-items:center;}
.bm-nav-logo{font-family:'Great Vibes',cursive;font-size:1.6rem;color:var(--bm-gold2);text-decoration:none;letter-spacing:0.02em;}
.bm-nav-links{display:flex;gap:1.8rem;list-style:none;margin:0;padding:0;}
.bm-nav-links a{color:rgba(255,255,255,0.75);text-decoration:none;font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;transition:color 0.2s;}
.bm-nav-links a:hover,.bm-nav-links a.active{color:var(--bm-gold2);}
.bm-hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;background:transparent;border:0;}
.bm-hamburger span{display:block;width:22px;height:1.5px;background:rgba(255,255,255,0.8);}

.dt-hero{min-height:70vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;background:var(--bm-green);padding:8rem 2rem 4rem;position:relative;overflow:hidden;color:#fff;}
.dt-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 20% 50%,rgba(64,145,108,0.25) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(184,150,46,0.12) 0%,transparent 50%);pointer-events:none;}
.dt-corner{position:absolute;top:0;width:clamp(140px,22vw,280px);height:auto;pointer-events:none;user-select:none;opacity:0.45;z-index:0;}
.dt-corner-tl{left:0;}
.dt-corner-tr{right:0;transform:scaleX(-1);}

.dt-hero-logo{width:clamp(180px,26vw,300px);height:auto;margin-bottom:1rem;filter:brightness(0) saturate(100%) invert(78%) sepia(38%) saturate(548%) hue-rotate(8deg) brightness(95%) contrast(88%);position:relative;z-index:1;}
.bm-ornament{color:var(--bm-gold);font-size:1rem;letter-spacing:0.8rem;margin-bottom:2rem;opacity:0.6;}
.dt-hero-date{font-size:0.8rem;color:rgba(255,255,255,0.9);letter-spacing:0.22em;text-transform:uppercase;margin-bottom:0.6rem;}
.dt-hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(3rem,7vw,5rem);font-weight:400;color:var(--bm-gold2);margin:0 0 0.6rem;line-height:1.05;}
.dt-hero-sub{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(1rem,2vw,1.25rem);color:rgba(255,255,255,0.7);}

.dt-section{padding:5rem 2rem;}
.dt-section-alt{background:var(--bm-ivory2);}
.bm-container{max-width:960px;margin:0 auto;}
.bm-eyebrow{font-size:0.7rem;letter-spacing:0.28em;text-transform:uppercase;color:var(--bm-gold);display:block;margin-bottom:0.7rem;font-weight:400;}
.bm-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,4vw,2.6rem);font-weight:400;color:var(--bm-green);margin:0 0 0.5rem;line-height:1.15;}
.bm-lead{font-size:1.05rem;color:var(--bm-brown2);margin-bottom:2rem;max-width:620px;}

.dt-grid{display:flex;flex-wrap:wrap;justify-content:center;gap:1.2rem;}
.dt-grid>*{flex:0 1 calc(33.333% - 1rem);min-width:200px;max-width:calc(33.333% - 0.7rem);}
.dt-card{background:#fff;border:1px solid var(--bm-ivory3);border-radius:4px;padding:1.2rem 1rem;display:flex;flex-direction:column;gap:0.45rem;}
.dt-card-primary{background:var(--bm-green);color:#fff;border-color:var(--bm-green);}
.dt-card-primary .dt-card-label{color:var(--bm-gold2);}
.dt-card-primary .dt-card-body p{color:#fff;font-weight:700;font-size:1rem;text-shadow:0 1px 2px rgba(0,0,0,0.25);}
.dt-card-primary .dt-btn{background:var(--bm-ivory);color:var(--bm-green);}
.dt-card-primary .dt-btn:hover{background:var(--bm-gold3);color:var(--bm-green);}
.dt-card-icon{font-size:1.3rem;line-height:1;}
.dt-card-label{font-size:0.65rem;letter-spacing:0.22em;text-transform:uppercase;color:var(--bm-gold);font-weight:600;}
.dt-card-body p{margin:0 0 0.4rem;color:var(--bm-brown2);font-size:0.92rem;}
.dt-card-body p:last-child{margin-bottom:0;}
.dt-big{font-family:'Cormorant Garamond',serif;font-size:1.5rem;color:var(--bm-green);font-weight:500;line-height:1.1;margin:0.1rem 0 0.3rem !important;}
.dt-card-primary .dt-big{color:var(--bm-gold2);}
.dt-note{font-size:0.85rem;color:var(--bm-brown2);}
.dt-card-primary .dt-note{color:rgba(255,255,255,0.7);}
.dt-btn{display:inline-block;margin-top:0.5rem;padding:0.55rem 0.9rem;background:var(--bm-gold);color:#fff;text-decoration:none;font-size:0.7rem;letter-spacing:0.16em;text-transform:uppercase;border-radius:2px;transition:background 0.2s;align-self:flex-start;}
.dt-btn:hover{background:var(--bm-gold2);}

.dt-map{position:relative;width:100%;aspect-ratio:16/10;border-radius:4px;overflow:hidden;border:1px solid var(--bm-ivory3);background:var(--bm-ivory);box-shadow:0 4px 24px rgba(27,67,50,0.08);}
.dt-map iframe{position:absolute;inset:0;width:100%;height:100%;border:0;}
.dt-map-hint{margin-top:1rem;font-size:0.9rem;color:var(--bm-brown2);}
.dt-map-hint a{color:var(--bm-gold);text-decoration:none;border-bottom:1px solid var(--bm-gold3);}
.dt-map-hint a:hover{color:var(--bm-green2);}

.dt-photo-section{background:var(--bm-green);padding:0;}
.dt-photo{max-width:1200px;margin:0 auto;aspect-ratio:16/9;overflow:hidden;position:relative;}
.dt-photo > img{width:100%;height:100%;object-fit:cover;display:block;opacity:0.75;}
.dt-photo-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(to top,rgba(15,40,25,0.55) 0%,rgba(15,40,25,0.15) 50%,rgba(15,40,25,0.35) 100%);pointer-events:none;}
.dt-rsvp-btn{pointer-events:auto;border:0;padding:1.1rem 2rem;background:var(--bm-gold);color:#fff;font-family:'Lato',sans-serif;font-size:0.95rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;border-radius:4px;box-shadow:0 8px 28px rgba(0,0,0,0.35);cursor:pointer;transition:transform 0.2s,background 0.2s,box-shadow 0.2s;}
.dt-rsvp-btn:hover{background:var(--bm-gold2);transform:translateY(-2px);box-shadow:0 12px 34px rgba(0,0,0,0.45);}
@media(max-width:640px){.dt-rsvp-btn{padding:0.95rem 1.4rem;font-size:0.8rem;}}

.dt-rsvp-standalone,.dt-rsvp-below-map{display:flex;justify-content:center;}
.dt-rsvp-standalone{padding:3rem 1.2rem;background:var(--bm-ivory);}
.dt-rsvp-below-map{padding-top:2rem;}
@media(max-width:640px){.dt-rsvp-standalone{padding:2.2rem 1.2rem;}.dt-rsvp-below-map{padding-top:1.6rem;}}

.dt-modal-backdrop{position:fixed;inset:0;z-index:2000;display:flex;align-items:center;justify-content:center;background:rgba(15,40,25,0.82);backdrop-filter:blur(4px);padding:1.2rem;overflow-y:auto;-webkit-overflow-scrolling:touch;}
.dt-modal{position:relative;width:100%;max-width:460px;max-height:calc(100vh - 2.4rem);overflow-y:auto;-webkit-overflow-scrolling:touch;background:#fff;border-radius:4px;padding:2rem;box-shadow:0 20px 60px rgba(0,0,0,0.35);animation:dt-modal-in 0.25s ease-out;}
@keyframes dt-modal-in{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
.dt-modal-close{position:absolute;top:0.8rem;right:1rem;border:0;background:transparent;font-size:1.6rem;line-height:1;color:var(--bm-brown3);cursor:pointer;transition:color 0.2s;}
.dt-modal-close:hover{color:var(--bm-brown);}
.dt-modal-title{font-family:'Cormorant Garamond',serif;font-size:2rem;font-weight:400;color:var(--bm-green);margin:0 0 0.4rem;line-height:1.1;}
.dt-modal-lead{font-size:0.95rem;color:var(--bm-brown2);margin:0 0 1.6rem;line-height:1.6;}
.dt-modal-form{display:flex;flex-direction:column;gap:1.1rem;}
.dt-field{display:flex;flex-direction:column;gap:0.35rem;}
.dt-field span{font-size:0.7rem;letter-spacing:0.14em;text-transform:uppercase;color:var(--bm-brown2);font-weight:600;}
.dt-field input,.dt-field select{padding:0.75rem 0.9rem;border:1px solid var(--bm-ivory3);border-radius:3px;background:var(--bm-ivory);font-family:'Lato',sans-serif;font-size:1rem;color:var(--bm-brown);outline:none;transition:border-color 0.2s;}
.dt-field input:focus,.dt-field select:focus{border-color:var(--bm-gold);}
.dt-field input::placeholder{color:var(--bm-brown3);}
.dt-guest-name{margin-top:0.35rem;}
.dt-guest-name:first-of-type{margin-top:0;}
.dt-radio-group{display:flex;gap:1.2rem;padding:0.4rem 0;}
.dt-radio-group-attending{flex-direction:column;gap:0.7rem;padding:0.55rem 0;}
.dt-radio{display:flex;align-items:center;gap:0.5rem;cursor:pointer;font-size:1rem;color:var(--bm-brown);text-transform:none;letter-spacing:0;font-weight:400;}
.dt-radio input[type="radio"]{width:1.1rem;height:1.1rem;accent-color:var(--bm-green);cursor:pointer;}
.dt-dietary-note{margin-top:0.4rem;padding:0.75rem 0.9rem;border:1px solid var(--bm-ivory3);border-radius:3px;background:var(--bm-ivory);font-family:'Lato',sans-serif;font-size:1rem;color:var(--bm-brown);outline:none;transition:border-color 0.2s;}
.dt-dietary-note:focus{border-color:var(--bm-gold);}
.dt-dietary-note::placeholder{color:var(--bm-brown3);}
.dt-modal-submit{margin-top:0.4rem;padding:0.9rem 1.2rem;background:var(--bm-green);color:#fff;border:0;border-radius:3px;font-family:'Lato',sans-serif;font-size:0.8rem;letter-spacing:0.14em;text-transform:uppercase;font-weight:700;cursor:pointer;transition:background 0.2s;}
.dt-modal-submit:hover{background:var(--bm-green2);}
.dt-modal-submit:disabled{background:var(--bm-brown3);cursor:not-allowed;}
.dt-modal-error{margin:0;font-size:0.9rem;color:#b91c1c;background:#fef2f2;padding:0.6rem 0.8rem;border-radius:3px;border:1px solid #fecaca;}
.dt-modal-success{text-align:center;padding:1.5rem 0;}
.dt-modal-success-icon{width:56px;height:56px;margin:0 auto 1rem;display:flex;align-items:center;justify-content:center;background:var(--bm-green);color:#fff;border-radius:50%;font-size:1.6rem;}
.dt-modal-success p{font-size:1.05rem;color:var(--bm-brown2);margin:0;}
@media(max-width:640px){.dt-photo{aspect-ratio:4/3;}.dt-modal{padding:1.6rem 1.2rem;}}

.bm-footer{background:var(--bm-green);color:rgba(255,255,255,0.6);text-align:center;padding:2rem;font-size:0.8rem;letter-spacing:0.1em;}

@media(max-width:640px){
  .bm-nav{padding:0.8rem 1.2rem;}
  .bm-nav-links{display:none;position:absolute;top:100%;left:0;right:0;background:rgba(10,28,18,0.98);flex-direction:column;padding:1.2rem 1.5rem;gap:1rem;}
  .bm-nav-links.open{display:flex;}
  .bm-hamburger{display:flex;}
  .dt-section{padding:3.5rem 1.2rem;}
  .dt-grid>*{flex:0 1 100%;max-width:100%;}
  .dt-dresscode-grid{grid-template-columns:1fr !important;}
}

.dt-dresscode{background:var(--bm-ivory);}
.dt-dresscode-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-top:1.5rem;align-items:stretch;}
.dt-dresscode-card{margin:0;background:#fff;border:1px solid var(--bm-ivory3);border-radius:6px;overflow:hidden;display:grid;grid-template-rows:auto auto 1fr;box-shadow:0 4px 20px rgba(27,67,50,0.06);}
.dt-dresscode-card-media{position:relative;width:100%;aspect-ratio:4/3;overflow:hidden;background:var(--bm-ivory2);}
.dt-dresscode-card-media img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;display:block;padding:0.4rem;}
.dt-dresscode-card h3{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:500;color:var(--bm-green);margin:0;letter-spacing:0.02em;text-align:center;padding:1.1rem 1.5rem 0.4rem;border-top:1px solid var(--bm-ivory3);}
.dt-dresscode-card h3::after{content:'';display:block;width:38px;height:1px;background:var(--bm-gold);margin:0.55rem auto 0;opacity:0.7;}
.dt-dresscode-card figcaption{padding:0.9rem 1.5rem 1.6rem;display:flex;flex-direction:column;justify-content:flex-start;}
.dt-dresscode-card p{margin:0;font-size:0.95rem;color:var(--bm-brown2);line-height:1.65;text-align:center;}
.dt-dresscode-nogo-title{font-family:'Cormorant Garamond',serif;font-size:1.6rem;font-weight:400;color:var(--bm-green);margin:3rem 0 1.2rem;text-align:center;letter-spacing:0.02em;}
.dt-dresscode-nogo-title::before,.dt-dresscode-nogo-title::after{content:'—';color:var(--bm-gold);margin:0 0.7rem;opacity:0.5;}
.dt-dresscode-card-nogo .dt-dresscode-card-media{background:#faf5f4;}
.dt-dresscode-card-nogo .dt-dresscode-card-media img{filter:grayscale(0.15);opacity:0.92;}
.dt-dresscode-card-nogo{border-color:#e8d5d1;}
.dt-dresscode-card-nogo .dt-dresscode-card-media::before,
.dt-dresscode-card-nogo .dt-dresscode-card-media::after{content:'';position:absolute;top:50%;left:50%;width:90%;height:6px;background:rgba(185,28,28,0.92);border-radius:3px;z-index:2;box-shadow:0 2px 6px rgba(0,0,0,0.25);}
.dt-dresscode-card-nogo .dt-dresscode-card-media::before{transform:translate(-50%,-50%) rotate(45deg);}
.dt-dresscode-card-nogo .dt-dresscode-card-media::after{transform:translate(-50%,-50%) rotate(-45deg);}

.dt-modal-hint{font-size:0.8rem;color:var(--bm-brown2);margin:0 0 0.4rem;font-style:italic;letter-spacing:0;text-transform:none;font-weight:400;}
.dt-autocomplete{position:relative;margin-top:0.35rem;}
.dt-autocomplete:first-of-type{margin-top:0;}
.dt-guest-name-valid{border-color:var(--bm-green3) !important;background:#f0f7f2 !important;}
.dt-guest-name-invalid{border-color:#d97706 !important;background:#fff8ec !important;}
.dt-autocomplete-list{position:absolute;top:100%;left:0;right:0;z-index:10;margin:2px 0 0;padding:0.3rem 0;list-style:none;background:#fff;border:1px solid var(--bm-ivory3);border-radius:3px;box-shadow:0 10px 30px rgba(0,0,0,0.12);max-height:220px;overflow-y:auto;}
.dt-autocomplete-list li{padding:0.55rem 0.9rem;font-size:0.95rem;color:var(--bm-brown);cursor:pointer;}
.dt-autocomplete-list li.is-active,.dt-autocomplete-list li:hover{background:var(--bm-ivory2);color:var(--bm-green);}
.dt-autocomplete-empty{margin:0.4rem 0 0;font-size:0.82rem;color:#b45309;font-style:italic;letter-spacing:0;text-transform:none;font-weight:400;}
.dt-photo-section{position:relative;}
.dt-rsvp-wrap{position:relative;display:inline-flex;align-items:center;justify-content:center;pointer-events:none;}
.dt-cat{pointer-events:none;user-select:none;-webkit-user-drag:none;position:absolute;}
.dt-cat-black{width:clamp(70px,10vw,130px);height:auto;left:calc(100% + 0.4rem);bottom:-8px;filter:drop-shadow(0 6px 14px rgba(0,0,0,0.35));}
.dt-cat-white{width:clamp(90px,14vw,190px);height:auto;bottom:-40px;right:2vw;z-index:3;filter:drop-shadow(0 8px 18px rgba(0,0,0,0.35));}
.dt-hero{overflow:visible !important;}
@media(max-width:640px){
  .dt-corner-branches{width:110vw;opacity:0.85;}
  .dt-cat-black{width:56px;left:auto;right:-52px;bottom:-4px;}
  .dt-cat-white{width:80px;bottom:-22px;right:4vw;}
}
`;
