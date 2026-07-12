import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/bm-logo.png";
import latoscanaAsset from "@/assets/latoscana.jpg.asset.json";

const ADDRESS_SHARE_URL = "https://share.google/RfJ5xwi1vwSWgSfvn";
const MAPS_EMBED_QUERY = encodeURIComponent(
  "La Toscana Pampulha, Belo Horizonte, Minas Gerais, Brasil",
);
const MAPS_EMBED_SRC = `https://www.google.com/maps?q=${MAPS_EMBED_QUERY}&output=embed`;

// Google Form configuration
// 1. Create a Google Form with these fields: Name, Anzahl der Gäste, Anreisetag, Essen (Ja/Nein), Essen Notiz
// 2. Get the form ID from the URL: https://docs.google.com/forms/d/e/{FORM_ID}/viewform
// 3. Get entry IDs by clicking "Get pre-filled link" ("Vorausgefüllter Link abrufen") and inspecting the generated URL
const GOOGLE_FORM_ID = "YOUR_FORM_ID_HERE";
const GOOGLE_FORM_ENTRIES = {
  name: "entry.YOUR_NAME_ENTRY_ID",
  guests: "entry.YOUR_GUESTS_ENTRY_ID",
  arrival: "entry.YOUR_ARRIVAL_ENTRY_ID",
  dietary: "entry.YOUR_DIETARY_ENTRY_ID",
  dietaryNote: "entry.YOUR_DIETARY_NOTE_ENTRY_ID",
};
const GOOGLE_FORM_ACTION = `https://docs.google.com/forms/d/e/${GOOGLE_FORM_ID}/formResponse`;

const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/#travel", label: "Anreise" },
  { href: "/#health", label: "Gesundheit" },
  { href: "/#hotels", label: "Unterkünfte" },
  { href: "/#discover", label: "Entdecken" },
  { href: "/#safety", label: "Sicherheit" },
  { href: "/#practical", label: "Praktisches" },
  { href: "/#language", label: "Sprache" },
];

export function DerTag() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    guests: "",
    arrival: "",
    dietary: "",
    dietaryNote: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const submitRsvp = useServerFn(saveRsvp);

  const openModal = () => {
    setSubmitted(false);
    setSubmitting(false);
    setSubmitError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm({
      name: "",
      guests: "",
      arrival: "",
      dietary: "",
      dietaryNote: "",
    });
    setSubmitted(false);
    setSubmitting(false);
    setSubmitError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.guests.trim()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      await submitRsvp({
        data: {
          name: form.name.trim(),
          guests: Number(form.guests),
          arrival: form.arrival || undefined,
          dietary: form.dietary || undefined,
          dietaryNote: form.dietaryNote?.trim() || undefined,
        },
      });
      setSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Etwas ist schiefgelaufen."
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
        <Link to="/" className="bm-nav-logo">18.10.2026</Link>
        <ul className="bm-nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
          <li>
            <Link to="/dertag" activeProps={{ className: "active" }}>
              Der große Tag
            </Link>
          </li>
        </ul>
      </nav>

      <header className="dt-hero">
        <img className="dt-hero-logo" src={logo} alt="Bruna & Marc" />
        <div className="bm-ornament">— ✦ —</div>
        <p className="dt-hero-date">Sonntag, 18. Oktober 2026</p>
        <h1 className="dt-hero-title">Der große Tag</h1>
        <p className="dt-hero-sub">
          Alles Wichtige für den Hochzeitstag auf einen Blick
        </p>
      </header>

      <section className="dt-photo-section">
        <div className="dt-photo">
          <img src={latoscanaAsset.url} alt="La Toscana – Blick auf die Lagoa da Pampulha" />
          <div className="dt-photo-overlay">
            <button className="dt-rsvp-btn" type="button" onClick={openModal}>
              Bist du dabei? Hier kurz Rückmeldung geben
            </button>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="dt-modal-backdrop" onClick={closeModal}>
          <div className="dt-modal" onClick={(e) => e.stopPropagation()}>
            <button className="dt-modal-close" type="button" onClick={closeModal} aria-label="Schließen">
              ×
            </button>
            <h2 className="dt-modal-title">Rückmeldung</h2>
            <p className="dt-modal-lead">
              Wir freuen uns auf euch! Bitte gebt uns kurz Bescheid, wer von euch dabei ist.
            </p>
            {submitted ? (
              <div className="dt-modal-success">
                <div className="dt-modal-success-icon">✓</div>
                <p>Vielen Dank für eure Rückmeldung!</p>
              </div>
            ) : (
              <form className="dt-modal-form" onSubmit={handleSubmit}>
                <label className="dt-field">
                  <span>Name</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Vor- und Nachname"
                    required
                  />
                </label>
                <label className="dt-field">
                  <span>Anzahl der Gäste</span>
                  <select
                    value={form.guests}
                    onChange={(e) => setForm({ ...form, guests: e.target.value })}
                    required
                  >
                    <option value="" disabled>
                      Bitte wählen
                    </option>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Person" : "Personen"}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="dt-field">
                  <span>Anreisetag (optional)</span>
                  <input
                    type="date"
                    value={form.arrival}
                    onChange={(e) => setForm({ ...form, arrival: e.target.value })}
                  />
                </label>
                <div className="dt-field">
                  <span>Essen – Unverträglichkeiten & Wünsche</span>
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
                      <span>Nein</span>
                    </label>
                    <label className="dt-radio">
                      <input
                        type="radio"
                        name="dietary"
                        value="yes"
                        checked={form.dietary === "yes"}
                        onChange={(e) => setForm({ ...form, dietary: e.target.value })}
                      />
                      <span>Ja</span>
                    </label>
                  </div>
                  {form.dietary === "yes" && (
                    <input
                      className="dt-dietary-note"
                      type="text"
                      value={form.dietaryNote}
                      onChange={(e) => setForm({ ...form, dietaryNote: e.target.value })}
                      placeholder="z. B. Glutenunverträglichkeit, vegetarisch, vegan"
                    />
                  )}
                </div>
                {submitError && (
                  <p className="dt-modal-error" role="alert">
                    {submitError}
                  </p>
                )}
                <button
                  className="dt-modal-submit"
                  type="submit"
                  disabled={submitting}
                >
                  {submitting ? "Wird gesendet…" : "Absenden"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <section className="dt-section">
        <div className="bm-container">
          <div className="dt-grid">
            <InfoCard icon="📍" label="Adresse" tone="primary">
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
                In Google Maps öffnen ↗
              </a>
            </InfoCard>

            <InfoCard icon="🕰️" label="Beginn">
              <p className="dt-big">16:00 Uhr</p>
              <p className="dt-note">
                Bitte plant etwas Puffer für die Anfahrt ein.
              </p>
            </InfoCard>

            <InfoCard icon="👗" label="Dresscode">
              <p className="dt-big" style={{ fontSize: "1.6rem" }}>
                Elegant in Dunkel
              </p>
              <p className="dt-note">
                Dunkle, festliche Kleidung — schick und stilvoll.
              </p>
            </InfoCard>

            <InfoCard icon="🚗" label="Anfahrt & Parken">
              <p>
                Parkplätze vor Ort sind <strong>limitiert</strong>.
              </p>
              <p className="dt-note">
                Wir empfehlen die Anreise per <strong>Uber</strong> oder{" "}
                <strong>99</strong>, falls eure Unterkunft nicht fußläufig
                erreichbar ist.
              </p>
            </InfoCard>

            <InfoCard icon="🎁" label="Hochzeitsgeschenke">
              <p>
                Wir erwarten keine Geschenke, sondern freuen uns über jeden, der
                die lange Reise nach Brasilien auf sich nimmt.
              </p>
            </InfoCard>
          </div>
        </div>
      </section>

      <div className="dt-rsvp-standalone">
        <button className="dt-rsvp-btn" type="button" onClick={openModal}>
          Bist du dabei? Hier kurz Rückmeldung geben
        </button>
      </div>

      <section className="dt-section dt-section-alt">
        <div className="bm-container">
          <span className="bm-eyebrow">Location</span>
          <h2 className="bm-title">So findet ihr uns</h2>
          <p className="bm-lead">
            La Toscana liegt in Pampulha, direkt am See — einem der schönsten
            Ecken von Belo Horizonte.
          </p>
          <div className="dt-map">
            <iframe
              title="Karte zur Hochzeitslocation"
              src={MAPS_EMBED_SRC}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <p className="dt-map-hint">
            Für die exakte Adresse und Navigation:{" "}
            <a href={ADDRESS_SHARE_URL} target="_blank" rel="noreferrer noopener">
              in Google Maps öffnen ↗
            </a>
          </p>
          <div className="dt-rsvp-below-map">
            <button className="dt-rsvp-btn" type="button" onClick={openModal}>
              Bist du dabei? Hier kurz Rückmeldung geben
            </button>
          </div>
        </div>
      </section>

      <footer className="bm-footer">
        <p>18. Oktober 2026 · Belo Horizonte, Brasil · Made with ♥</p>
      </footer>
    </>
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

.dt-hero{min-height:70vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;background:var(--bm-green);padding:8rem 2rem 4rem;position:relative;overflow:hidden;color:#fff;}
.dt-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 20% 50%,rgba(64,145,108,0.25) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(184,150,46,0.12) 0%,transparent 50%);pointer-events:none;}
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
.dt-card-primary p{color:rgba(255,255,255,0.88);}
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
.dt-photo img{width:100%;height:100%;object-fit:cover;display:block;}
.dt-photo-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(to top,rgba(15,40,25,0.55) 0%,rgba(15,40,25,0.15) 50%,rgba(15,40,25,0.35) 100%);pointer-events:none;}
.dt-rsvp-btn{pointer-events:auto;border:0;padding:1.1rem 2rem;background:var(--bm-gold);color:#fff;font-family:'Lato',sans-serif;font-size:0.95rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;border-radius:4px;box-shadow:0 8px 28px rgba(0,0,0,0.35);cursor:pointer;transition:transform 0.2s,background 0.2s,box-shadow 0.2s;}
.dt-rsvp-btn:hover{background:var(--bm-gold2);transform:translateY(-2px);box-shadow:0 12px 34px rgba(0,0,0,0.45);}
@media(max-width:640px){.dt-rsvp-btn{padding:0.95rem 1.4rem;font-size:0.8rem;}}

.dt-rsvp-standalone,.dt-rsvp-below-map{display:flex;justify-content:center;}
.dt-rsvp-standalone{padding:3rem 1.2rem;background:var(--bm-ivory);}
.dt-rsvp-below-map{padding-top:2rem;}
@media(max-width:640px){.dt-rsvp-standalone{padding:2.2rem 1.2rem;}.dt-rsvp-below-map{padding-top:1.6rem;}}

.dt-modal-backdrop{position:fixed;inset:0;z-index:2000;display:flex;align-items:center;justify-content:center;background:rgba(15,40,25,0.82);backdrop-filter:blur(4px);padding:1.2rem;}
.dt-modal{position:relative;width:100%;max-width:460px;background:#fff;border-radius:4px;padding:2rem;box-shadow:0 20px 60px rgba(0,0,0,0.35);animation:dt-modal-in 0.25s ease-out;}
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
.dt-radio-group{display:flex;gap:1.2rem;padding:0.4rem 0;}
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
  .bm-nav-links{gap:1rem;}
  .dt-section{padding:3.5rem 1.2rem;}
  .dt-grid>*{flex:0 1 100%;max-width:100%;}
}
`;
