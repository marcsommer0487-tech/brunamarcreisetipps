import { useState, useEffect, type ReactNode } from "react";
import logo from "@/assets/bm-logo.png";

/* ─────────────────────────────────────────────────────────
   NAV
   ───────────────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  const links: { href: string; label: string }[] = [
    
    { href: "#travel", label: "Anreise" },
    { href: "#health", label: "Gesundheit" },
    { href: "#hotels", label: "Unterkünfte" },
    { href: "#discover", label: "Entdecken" },
    { href: "#safety", label: "Sicherheit" },
    { href: "#practical", label: "Praktisches" },
    { href: "#language", label: "Sprache" },
    { href: "#contact", label: "RSVP" },
  ];

  return (
    <nav className="bm-nav">
      <a href="#hero" className="bm-nav-logo">18.10.2026</a>
      <ul className={`bm-nav-links ${open ? "open" : ""}`}>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
      </ul>
      </nav>
  );
}

/* ─────────────────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────────────────── */
const TARGET = new Date("2026-10-18T14:00:00-03:00").getTime();

function Hero() {
  const [cd, setCd] = useState({ d: "--", h: "--", m: "--", s: "--" });
  useEffect(() => {
    const tick = () => {
      const diff = TARGET - Date.now();
      if (diff <= 0) { setCd({ d: "0", h: "0", m: "0", s: "0" }); return; }
      const pad = (n: number) => String(n).padStart(2, "0");
      setCd({
        d: pad(Math.floor(diff / 86400000)),
        h: pad(Math.floor((diff % 86400000) / 3600000)),
        m: pad(Math.floor((diff % 3600000) / 60000)),
        s: pad(Math.floor((diff % 60000) / 1000))});
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="bm-hero">
      <img className="bm-hero-logo" src={logo} alt="Bruna & Marc" />
      <div className="bm-ornament">— ✦ —</div>
      <p className="bm-hero-date">
        Sonntag, 18. Oktober 2026
      </p>
      <p className="bm-hero-location">La Toscana (Pamplulha)  · Belo Horizonte · Minas Gerais · Brasil 🇧🇷</p>

      <div className="bm-countdown">
        <CdUnit n={cd.d} l="Tage" />
        <span className="bm-dot">·</span>
        <CdUnit n={cd.h} l="Stunden" />
        <span className="bm-dot">·</span>
        <CdUnit n={cd.m} l="Minuten" />
        <span className="bm-dot">·</span>
        <CdUnit n={cd.s} l="Sekunden" />
      </div>

    </section>
  );
}

function CdUnit({ n, l }: { n: string; l: string }) {
  return (
    <div className="bm-cd-unit">
      <span className="bm-cd-num">{n}</span>
      <span className="bm-cd-label">{l}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   GENERIC SECTION SHELL
   ───────────────────────────────────────────────────────── */
function Section({
  id, eyebrow, title, lead, children}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  children: ReactNode;
}) {
  return (
    <section id={id}>
      <div className="bm-container">
        <span className="bm-eyebrow">{eyebrow}</span>
        <h2 className="bm-title">{title}</h2>
        {lead && <p className="bm-lead">{lead}</p>}
        {children}
      </div>
    </section>
  );
}


/* ─────────────────────────────────────────────────────────
   ROW LIST (Travel, Safety, Transport, Practical)
   ───────────────────────────────────────────────────────── */
type Row = { lbl: string; val: ReactNode };
function RowList({ rows }: { rows: Row[] }) {
  return (
    <ul className="bm-rows">
      {rows.map((r, i) => (
        <li key={i}>
          <span className="bm-lbl">{r.lbl}</span>
          <span>{r.val}</span>
        </li>
      ))}
    </ul>
  );
}

function InfoBox({ children }: { children: ReactNode }) {
  return <div className="bm-info-box"><p>{children}</p></div>;
}
function WarnBox({ children }: { children: ReactNode }) {
  return <div className="bm-warn-box"><p>{children}</p></div>;
}

/* ─────────────────────────────────────────────────────────
   TRAVEL
   ───────────────────────────────────────────────────────── */
function TravelSection() {
  const rows: Row[] = [
    {
      lbl: "Flughafen",
      val: "Aeroporto Internacional Tancredo Neves (CNF / Confins) — 38 km nordöstlich vom Stadtzentrum."},
    {
      lbl: "Flüge aus DE/EU",
      val: "Typischerweise mit Zwischenstopp in São Paulo, Rio de Janeiro oder Lissabon. Wenn nicht via Lissabon, dann Inlandsflug bis nach Belo Horizonte (z.B. Azul oder Latam)."},
    {
      lbl: "Transfer vom Flughafen",
      val: <>Uber: ca. 45–60 Min., R$ 80–130 (ca. 13–22 €).</>},
    {
      lbl: "Beste Anreisezeit",
      val: "2–3 Tage vor der Hochzeit — um die Stadt kennenzulernen und den Jetlag zu überwinden."},
  ];
  return (
    <Section
      id="travel"
      eyebrow="Wie ihr ankommt"
      title="Anreise nach Belo Horizonte"
      lead="Belo Horizonte liegt im Herzen von Minas Gerais. Die Anreise aus Europa dauert mit Zwischenstopp ca. 16–18 Stunden."
    >
      <div className="bm-table-wrap">
        <table className="bm-table">
          <thead>
            <tr>
              <th>Thema</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.lbl}</td>
                <td>{r.val}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   VISA
   ───────────────────────────────────────────────────────── */
function VisaSection() {
  return (
    <Section
      id="visa"
      eyebrow="Einreise"
      title="Visum & Einreiseformalitäten"
    >
      <div className="bm-card-grid" style={{ marginTop: "1.5rem" }}>
        <div className="bm-card">
          <div className="bm-card-top">
            <span className="bm-card-icon">🇩🇪🇪🇺</span>
            <h3>Deutschland & EU</h3>
          </div>
          <p>
            {<>Kein Visum erforderlich für touristische Aufenthalte bis zu <strong>90 Tage</strong>. Reisepass muss noch mindestens 6 Monate gültig sein.</>}
          </p>
          <span className="bm-tag bm-tag-green">Visumsfrei</span>
        </div>
      </div>
      <WarnBox>
        ⚠️ <strong>Wichtig:</strong>{" "}
        {"Alle Gäste sollten eine Krankenversicherung mit internationalem Krankentransport abschließen."}
      </WarnBox>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   HEALTH
   ───────────────────────────────────────────────────────── */
type VacRow = { name: string; tag: { cls: string; label: string }; note: string };
function HealthSection() {
  const rows: VacRow[] = [
    {
      name: "Yellow Fever / Gelbfieber / Febre Amarela",
      tag: { cls: "bm-tag-gold", label: "Empfohlen" },
      note: "Für BH Stadt nicht zwingend. Für Ausflüge in bestimmte Bundesstaaten nötig. Impfausweis mitführen."},
    {
      name: "Hepatitis A",
      tag: { cls: "bm-tag-red", label: "Dringend empfohlen" },
      note: "Standardimpfung für Reisen nach Brasilien."},
    {
      name: "Hepatitis B",
      tag: { cls: "bm-tag-gold", label: "Empfohlen" },
      note: "Bei nicht vorhandener Immunität empfehlenswert."},
    {
      name: "Dengue",
      tag: { cls: "bm-tag-gold", label: "Vorbeugung" },
      note: "Mückenschutz: DEET-Spray, lange Kleidung morgens/abends."},
    {
      name: "MMR / Tetanus",
      tag: { cls: "bm-tag-red", label: "Auffrischen" },
      note: "Impfschutz prüfen und ggf. auffrischen lassen."},
  ];

  return (
    <Section
      id="health"
      eyebrow="Gesundheit"
      title="Impfungen & Gesundheitstipps"
      lead="Frühzeitig mit dem Hausarzt oder einem Reisemediziner sprechen — mindestens 6 bis 8 Wochen vor Reiseantritt."
    >
      <table className="bm-vac-table">
        <thead>
          <tr>
            <th>Impfung</th>
            <th>Empfehlung</th>
            <th>Hinweis</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td><strong>{r.name}</strong></td>
              <td><span className={`bm-tag ${r.tag.cls}`}>{r.tag.label}</span></td>
              <td>{r.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <InfoBox>
        🧳 <strong>Reiseapotheke:</strong>{" "}
        {"Mückenspray (mind. 30% DEET), Sonnencreme (LSF 50+), Durchfallmittel, Pflaster, persönliche Medikamente."}
      </InfoBox>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   CARD GRID (Hotels, Sights, Daytrips, Food)
   ───────────────────────────────────────────────────────── */
type Card = {
  icon: string;
  title: string;
  body: ReactNode;
  tag?: { cls: string; label: string };
};
function CardGrid({ cards }: { cards: Card[] }) {
  return (
    <div className="bm-card-grid">
      {cards.map((c, i) => (
        <div className="bm-card" key={i}>
          <div className="bm-card-top">
            <span className="bm-card-icon">{c.icon}</span>
            <h3>{c.title}</h3>
          </div>
          <p>{c.body}</p>
          {c.tag && <span className={`bm-tag ${c.tag.cls}`}>{c.tag.label}</span>}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   HOTELS
   ───────────────────────────────────────────────────────── */
function HotelsSection() {
  const cards: Card[] = [
    {
      icon: "🏙️",
      title: "Savassi & Lourdes",
      body: <>Moderne und sichere Viertel mit vielen Restaurants, Bars und Cafés. Zentral gelegen und ideal, um die Stadt zu Fuß zu erkunden.</>,
      tag: { cls: "bm-tag-green", label: "Top-Empfehlung" }},
    {
      icon: "🏘️",
      title: "Funcionários & Santa Teresa",
      body: <>Ebenfalls sehr gute Wahl — angesagte Viertel mit lokaler Atmosphäre, Galerien und alternativen Läden.</>,
      tag: { cls: "bm-tag-green", label: "Sehr empfohlen" }},
    {
      icon: "🌳",
      title: "Pampulha",
      body: <>Nicht ganz zentral, dafür viel Natur und direkt in der Nähe unserer Hochzeitslocation. Ruhiger und grüner.</>,
      tag: { cls: "bm-tag-gold", label: "Nähe Location" }},
  ];
  return (
    <Section
      id="hotels"
      eyebrow="Übernachtung"
      title="Unterkünfte"
      lead="Hotels und Airbnb sind beide gute Optionen. Wir empfehlen diese Viertel, da sie modern, sicher und gastronomisch vielfältig sind."
    >
      <CardGrid cards={cards} />
      <InfoBox>
        💡 <strong>Tipp:</strong> Bucht am besten frühzeitig — besonders um die Hochzeitsdaten herum ist die Nachfrage hoch.
      </InfoBox>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   DISCOVER (Sights + Daytrips)
   ───────────────────────────────────────────────────────── */
function DiscoverSection() {
  const sights: Card[] = [
    {
      icon: "🏛️",
      title: "Conjunto Pampulha",
      body: "UNESCO-Kandidat. Oscar Niemeyers modernistisches Meisterwerk an der Lagoa da Pampulha — inklusive Igreja São Francisco de Assis, seiner bekanntesten Kirche, dekoriert mit Azulejos von Portinari."},
    {
      icon: "🏪",
      title: "Mercado Central",
      body: "Riesiger Markt mit über 400 Ständen: Cachaça, Pão de queijo, Gewürze, Handwerk."},
    {
      icon: "🌿",
      title: "Praça da Liberdade",
      body: "Eleganter Kulturplatz mit kostenlosem Zugang zu mehreren Museen."},
    {
      icon: "🌄",
      title: "Mirante das Mangabeiras",
      body: "Aussichtspunkt mit Panoramablick über ganz BH."},
    {
      icon: "🏟️",
      title: "Mineirão",
      body: "Legendäres Fußballstadion — bekannt für die 7:1-Halbfinale 2014. Für Fußballfans empfohlen: Führungen buchbar.",
      tag: { cls: "bm-tag-blue", label: "Für Fans" }},
  ];

  const daytrips: Card[] = [
    {
      icon: "🏚️",
      title: "Ouro Preto",
      body: "Ca. 1,5 Std. — UNESCO-Welterbe. Barocke Kolonialarchitektur, steile Gassen, Goldschmiede.",
      tag: { cls: "bm-tag-green", label: "★★★ Top-Empfehlung" }},
    {
      icon: "🎭",
      title: "Inhotim",
      body: "Ca. 1,5 Std. — Weltklasse Freilicht-Kunstmuseum mit botanischem Garten. Mindestens 1 ganzer Tag!",
      tag: { cls: "bm-tag-green", label: "★★★ Top-Empfehlung" }},
    {
      icon: "🕍",
      title: "Tiradentes",
      body: "Ca. 2,5 Std. — Charmantes Kolonialstädtchen mit Barockkirchen und hervorragenden Restaurants.",
      tag: { cls: "bm-tag-gold", label: "★★ Sehr empfehlenswert" }},
    {
      icon: "🏔️",
      title: "Serra do Cipó",
      body: "Ca. 1,5 Std. — Nationalpark mit Wasserfällen, Wanderwegen und Naturbädern.",
      tag: { cls: "bm-tag-gold", label: "★★ Sehr empfehlenswert" }},
    {
      icon: "🚂",
      title: "São João del-Rei",
      body: "Ca. 2 Std. — Historische Stadt mit einem der schönsten Kolonialkerne Minas Gerais. Mit der dampfbetriebenen Maria-Fumaça nach Tiradentes fahren — ein echtes Erlebnis!",
      tag: { cls: "bm-tag-gold", label: "★★ Sehr empfohlenswert" }},
  ];

  return (
    <section id="discover">
      <div className="bm-container">
        <span className="bm-eyebrow">Sightseeing</span>
        <h2 className="bm-title">Sehenswürdigkeiten in Belo Horizonte</h2>
        <p className="bm-lead">
          BH überrascht mit Oscar-Niemeyer-Architektur, lebhaften Märkten und einer der lebendigsten Essensszenen Brasiliens.
        </p>
        <CardGrid cards={sights} />
        <div className="bm-ornament-divider">— ✦ —</div>
        <span className="bm-eyebrow">Tagesausflüge</span>
        <h2 className="bm-title">Die schönsten Ausflugsziele</h2>
        <p className="bm-lead">
          Rund um BH liegen echte Highlights — von UNESCO-Städten bis zu Kunstmuseen mitten in der Natur.
        </p>
        <CardGrid cards={daytrips} />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   SAFETY
   ───────────────────────────────────────────────────────── */
function SafetySection() {
  const rows: Row[] = [
    {
      lbl: "Viertel",
      val: "Bleibt in Savassi, Lourdes, Funcionários und Mangabeiras. Centro nach Einbruch der Dunkelheit meiden."},
    {
      lbl: "Wertsachen",
      val: "Keine teuren Uhren, Schmuck oder Kamera offen tragen. Handy nicht auf der Straße zücken."},
    {
      lbl: "Transport",
      val: "Immer Uber oder 99 (App) nehmen. Keine Straßentaxis heranwinken."},
    {
      lbl: "Geld",
      val: "Wenig Bargeld bei sich führen. An Geldautomaten von Bradesco oder Itaú abheben."},
    {
      lbl: "Notfallnummern",
      val: <>🚓 Polizei: <strong>190</strong> | 🚑 SAMU: <strong>192</strong> | 🚒 Feuerwehr: <strong>193</strong></>},
  ];
  return (
    <Section
      id="safety"
      eyebrow="Sicherheit"
      title="Sicherheitstipps"
      lead="Brasilien erfordert etwas mehr Aufmerksamkeit — aber mit den richtigen Vorsichtsmaßnahmen ist ein wunderbarer Aufenthalt problemlos möglich."
    >
      <RowList rows={rows} />
    </Section>
  );
}


/* ─────────────────────────────────────────────────────────
   FOOD
   ───────────────────────────────────────────────────────── */
function FoodSection() {
  const cards: Card[] = [
    {
      icon: "🧀",
      title: "Pão de Queijo",
      body: "Brasiliens beliebtester Snack — warme Käsebrötchen aus Maniokstärke. Ursprünglich aus Minas Gerais!"},
    {
      icon: "🍖",
      title: "Tutu à Mineira",
      body: "Herzhafter Klassiker: Maniokbrei mit schwarzen Bohnen, Würstchen, Kohl und Ei."},
    {
      icon: "🍹",
      title: "Caipirinha",
      body: "Brasiliens Nationalcocktail aus Cachaça, Limette und Zucker."},
    {
      icon: "🥤",
      title: "Açaí & Guaraná",
      body: "Frischer Açaí mit Granola ist unschlagbar. Guaraná: leicht koffeinhaltiges Softgetränk."},
    {
      icon: "🍗",
      title: "Coxinha",
      body: "Beliebter brasilianischer Snack: zartes Hühnerfleisch in Teig, paniert und frittiert."},
    {
      icon: "🫘",
      title: "Feijão Tropeiro",
      body: "Typisch mineirisch: Bohnen mit Speck, Wurst, Maniokmehl, Knoblauch und Ei."},
    {
      icon: "🥩",
      title: "Picanha",
      body: "Das berühmteste brasilianische Steak — saftig, marmoriert und perfekt vom Grill."},
    {
      icon: "🍦",
      title: "Queijo & Goiabada",
      body: "Mineirischer Klassiker: reifer Käse mit Guavengelee ('Romeo e Julieta')."},
  ];
  return (
    <Section
      id="food"
      eyebrow="Kulinarik"
      title="Essen & Trinken"
      lead="Belo Horizonte gilt in Brasilien als die Hauptstadt des guten Essens. Die Küche Minas Gerais' ist herzhaft und absolut lecker."
    >
      <CardGrid cards={cards} />
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   PRACTICAL
   ───────────────────────────────────────────────────────── */
function PracticalSection() {
  const rows: Row[] = [
    {
      lbl: "Währung",
      val: "Brasilianischer Real (BRL / R$). 1 EUR ≈ 5,5–6,5 BRL. Am besten am Geldautomaten abheben."},
    {
      lbl: "Kartenzahlung",
      val: "Meistens möglich. Etwas Bargeld für Märkte und Kleinhändler empfohlen."},
    {
      lbl: "Strom & Steckdosen",
      val: <>⚠️ 127 V / 60 Hz. Steckdosen-Typ <strong>N</strong> — Adapter mitbringen!</>},
    {
      lbl: "Internet",
      val: <>Die meisten Restaurants, Cafés und Unterkünfte haben WLAN. Wer unterwegs online sein möchte, braucht für eine brasilianische SIM-Karte eine CPF-Nummer. Meldet euch bei uns, wenn ihr Hilfe dabei braucht!</>},
    {
      lbl: "Zeitzone",
      val: "UTC-3 (keine Sommerzeit). Differenz zu DE: -5 Std. (Sommer) / -4 Std. (Winter)."},
    {
      lbl: "Wetter Oktober",
      val: "22–30°C, meistens sonnig. Gelegentlich Schauer am Nachmittag. Leichte Sommersachen."},
    {
      lbl: "Sprache",
      val: <>Brasilianisches Portugiesisch — <strong>kein Spanisch!</strong> Ein paar Basics werden geschätzt.</>},
    {
      lbl: "Trinkgeld",
      val: "10% sind oft schon im Preis enthalten. Bei Uber/Taxi kein Trinkgeld erforderlich."},
  ];
  return (
    <Section
      id="practical"
      eyebrow="Wissenswertes"
      title="Praktische Infos"
    >
      <RowList rows={rows} />
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   LANGUAGE — Portugiesisch für Anfänger
   ───────────────────────────────────────────────────────── */
type Phrase = { pt: string; de: string };
function LanguageSection() {
  const groups: { title: string; items: Phrase[] }[] = [
    {
      title: "Begrüßung & Höflichkeit",
      items: [
        { pt: "Oi / Olá", de: "Hi / Hallo" },
        { pt: "Bom dia", de: "Guten Morgen" },
        { pt: "Boa tarde", de: "Guten Tag (nachmittags)" },
        { pt: "Boa noite", de: "Guten Abend / Gute Nacht" },
        { pt: "Tchau", de: "Tschüss" },
        { pt: "Até logo", de: "Bis später" },
        { pt: "Por favor", de: "Bitte" },
        { pt: "Obrigado / Obrigada", de: "Danke (m./w. Sprecher)" },
        { pt: "De nada", de: "Gern geschehen" },
        { pt: "Desculpa", de: "Entschuldigung" },
      ],
    },
    {
      title: "Kennenlernen",
      items: [
        { pt: "Tudo bem?", de: "Wie geht's? / Alles gut?" },
        { pt: "Tudo bem!", de: "Alles gut!" },
        { pt: "Qual é o seu nome?", de: "Wie heißt du?" },
        { pt: "Meu nome é …", de: "Ich heiße …" },
        { pt: "Prazer!", de: "Freut mich!" },
        { pt: "Eu sou da Alemanha", de: "Ich komme aus Deutschland" },
      ],
    },
    {
      title: "Im Restaurant & unterwegs",
      items: [
        { pt: "A conta, por favor", de: "Die Rechnung, bitte" },
        { pt: "Uma cerveja, por favor", de: "Ein Bier, bitte" },
        { pt: "Água, por favor", de: "Wasser, bitte" },
        { pt: "Saúde!", de: "Prost! / Gesundheit!" },
        { pt: "Está delicioso!", de: "Es ist köstlich!" },
        { pt: "Quanto custa?", de: "Wie viel kostet das?" },
        { pt: "Onde fica o banheiro?", de: "Wo ist die Toilette?" },
      ],
    },
    {
      title: "Nützliches",
      items: [
        { pt: "Sim / Não", de: "Ja / Nein" },
        { pt: "Não falo português", de: "Ich spreche kein Portugiesisch" },
        { pt: "Você fala inglês?", de: "Sprichst du Englisch?" },
      ],
    },
  ];

  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="language" style={{ background: "var(--bm-ivory2)" }}>
      <div className="bm-container">
        <span className="bm-eyebrow">Sprache</span>
        <h2 className="bm-title">Portugiesisch für Anfänger</h2>
        <p className="bm-lead" style={{ marginBottom: "2rem" }}>
          Die 25 wichtigsten Wörter und Sätze, um in Brasilien zu glänzen.
        </p>
        <div>
          {groups.map((g, i) => (
            <div className="bm-faq-item" key={i}>
              <div
                className={`bm-faq-q ${open === i ? "open" : ""}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {g.title}
              </div>
              <div className={`bm-faq-a ${open === i ? "open" : ""}`}>
                <ul className="bm-phrase-list">
                  {g.items.map((p, j) => (
                    <li key={j}>
                      <span className="bm-phrase-pt">{p.pt}</span>
                      <span className="bm-phrase-de">{p.de}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   CONTACT / RSVP
   ───────────────────────────────────────────────────────── */
function ContactSection() {
  return (
    <section id="contact">
      <div className="bm-container">
        <span className="bm-eyebrow">Anmeldung</span>
        <h2 className="bm-title">Bitte meldet euch an!</h2>
        <p className="bm-lead">
          Damit wir gut planen können, bitten wir um eine Rückmeldung bis zum angegebenen Datum.
        </p>
        <a className="bm-rsvp-btn" href="mailto:eure-email@beispiel.de">Jetzt zusagen</a>
        <div className="bm-contact-details">
          <div className="bm-contact-item">
            <div className="bm-ci-label">Anmeldefrist</div>
            <div className="bm-ci-value bm-placeholder">TT.MM.JJJJ — wird bekannt gegeben</div>
          </div>
          <div className="bm-contact-item">
            <div className="bm-ci-label">WhatsApp-Gruppe</div>
            <div className="bm-ci-value"><a href="#">Link folgt</a></div>
          </div>
          <div className="bm-contact-item">
            <div className="bm-ci-label">Email</div>
            <div className="bm-ci-value"><a href="mailto:eure-email@beispiel.de">eure-email@beispiel.de</a></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   ROOT
   ───────────────────────────────────────────────────────── */
export function WeddingSite() {

  return (
    <>
      <style>{CSS}</style>
      <Nav />
      <Hero />
      
      <TravelSection />
      <VisaSection />
      <HealthSection />
      <HotelsSection />
      <DiscoverSection />
      <SafetySection />
      <FoodSection />
      <PracticalSection />
      <LanguageSection />
      <ContactSection />
      <footer className="bm-footer">
        <p>18. Oktober 2026 · Belo Horizonte, Brasil · Made with ♥</p>
      </footer>
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   GLOBAL CSS (scoped via .bm- prefixes)
   ───────────────────────────────────────────────────────── */
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

/* NAV */
.bm-nav{position:fixed;top:0;width:100%;z-index:1000;background:rgba(15,40,25,0.96);backdrop-filter:blur(12px);padding:0.9rem 2.5rem;display:flex;justify-content:space-between;align-items:center;}
.bm-nav-logo{font-family:'Great Vibes',cursive;font-size:1.6rem;color:var(--bm-gold2);text-decoration:none;letter-spacing:0.02em;}
.bm-nav-links{display:flex;gap:1.8rem;list-style:none;margin:0;padding:0;}
.bm-nav-links a{color:rgba(255,255,255,0.75);text-decoration:none;font-size:0.75rem;letter-spacing:0.12em;text-transform:uppercase;transition:color 0.2s;}
.bm-nav-links a:hover{color:var(--bm-gold2);}
.bm-nav-right{display:flex;align-items:center;gap:1.5rem;}
.bm-lang{display:flex;gap:0.4rem;}
.bm-lang-btn{background:none;border:1px solid rgba(255,255,255,0.25);color:rgba(255,255,255,0.6);padding:0.28rem 0.65rem;cursor:pointer;font-size:0.75rem;letter-spacing:0.08em;border-radius:2px;font-family:'Lato',sans-serif;transition:all 0.2s;}
.bm-lang-btn:hover,.bm-lang-btn.active{background:var(--bm-gold);border-color:var(--bm-gold);color:#fff;}
.bm-hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:4px;}
.bm-hamburger span{display:block;width:22px;height:1.5px;background:rgba(255,255,255,0.8);}

/* HERO */
.bm-hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;background:var(--bm-green);padding:7rem 2rem 4rem;position:relative;overflow:hidden;color:#fff;}
.bm-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 20% 50%,rgba(64,145,108,0.25) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(184,150,46,0.12) 0%,transparent 50%);pointer-events:none;}
.bm-hero-logo{width:clamp(180px,28vw,320px);height:auto;margin-bottom:2rem;filter:brightness(0) saturate(100%) invert(78%) sepia(38%) saturate(548%) hue-rotate(8deg) brightness(95%) contrast(88%);position:relative;z-index:1;}
.bm-hero-tagline{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(1rem,2.5vw,1.35rem);color:rgba(255,255,255,0.6);font-weight:300;margin-bottom:0.8rem;letter-spacing:0.04em;}
.bm-hero-script{font-family:'Great Vibes',cursive;font-size:clamp(3.2rem,9vw,6.5rem);color:var(--bm-gold2);line-height:1.05;margin-bottom:0.4rem;font-weight:400;}
.bm-amp{color:var(--bm-gold3);font-size:0.85em;}
.bm-ornament{color:var(--bm-gold);font-size:1rem;letter-spacing:0.8rem;margin-bottom:3rem;opacity:0.6;}
.bm-hero-date{font-size:0.8rem;color:rgba(255,255,255,0.9);letter-spacing:0.22em;text-transform:uppercase;margin-bottom:0.35rem;}
.bm-hero-location{font-size:0.75rem;color:rgba(255,255,255,0.45);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:3.5rem;}
.bm-countdown{display:flex;align-items:center;gap:1.5rem;}
.bm-cd-unit{text-align:center;}
.bm-cd-num{font-family:'Cormorant Garamond',serif;font-size:clamp(2.5rem,5vw,3.8rem);font-weight:300;color:#fff;line-height:1;display:block;}
.bm-cd-label{font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-top:0.3rem;display:block;}
.bm-dot{font-family:'Cormorant Garamond',serif;font-size:2rem;color:var(--bm-gold2);align-self:flex-start;margin-top:0.5rem;opacity:0.6;}
.bm-scroll-hint{position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:0.5rem;color:rgba(255,255,255,0.3);font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;animation:bm-bounce 2s infinite;}
@keyframes bm-bounce{0%,100%{transform:translateX(-50%) translateY(0);}50%{transform:translateX(-50%) translateY(6px);}}
.bm-scroll-arrow{width:18px;height:10px;border-bottom:1px solid rgba(255,255,255,0.3);border-right:1px solid rgba(255,255,255,0.3);transform:rotate(45deg);margin-top:-6px;}

/* SECTIONS */
section{padding:5.5rem 2rem;}
section:nth-of-type(even):not(#hero){background:var(--bm-ivory2);}
#contact{background:var(--bm-green);text-align:center;}
.bm-container{max-width:880px;margin:0 auto;}
.bm-eyebrow{font-size:0.7rem;letter-spacing:0.28em;text-transform:uppercase;color:var(--bm-gold);display:block;margin-bottom:0.7rem;font-weight:400;}
.bm-title{font-family:'Cormorant Garamond',serif;font-size:clamp(2rem,4vw,2.8rem);font-weight:400;color:var(--bm-green);margin-bottom:0.5rem;line-height:1.15;}
.bm-lead{font-size:1.05rem;color:var(--bm-brown2);margin-bottom:2.5rem;max-width:620px;}
.bm-ornament-divider{text-align:center;margin:2.5rem 0;color:var(--bm-gold2);letter-spacing:0.7rem;font-size:0.9rem;opacity:0.5;}
.bm-placeholder{color:var(--bm-gold);font-style:italic;}


/* ROWS */
.bm-rows{list-style:none;margin:1.5rem 0;padding:0;}
.bm-rows li{display:flex;gap:1rem;padding:0.75rem 0;border-bottom:1px solid var(--bm-ivory3);font-size:0.93rem;color:var(--bm-brown2);align-items:flex-start;}
.bm-rows li:last-child{border-bottom:none;}
.bm-table-wrap{margin:2rem 0;overflow-x:auto;}
.bm-table{width:100%;border-collapse:collapse;font-size:0.93rem;color:var(--bm-brown2);background:var(--bm-ivory);}
.bm-table th,.bm-table td{padding:0.85rem 1rem;text-align:left;border-bottom:1px solid var(--bm-ivory3);vertical-align:top;}
.bm-table thead th{background:var(--bm-ivory2);font-family:var(--bm-serif,serif);font-weight:600;color:var(--bm-brown);letter-spacing:0.04em;text-transform:uppercase;font-size:0.78rem;}
.bm-table tbody tr:last-child td{border-bottom:none;}
.bm-table td:first-child{font-weight:600;color:var(--bm-brown);white-space:nowrap;}
.bm-lbl{font-weight:700;color:var(--bm-green);min-width:150px;font-size:0.8rem;letter-spacing:0.06em;text-transform:uppercase;padding-top:0.05rem;flex-shrink:0;}

/* CARDS */
.bm-card-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.4rem;margin-top:2rem;}
.bm-card{background:#fff;border:1px solid var(--bm-ivory3);border-radius:3px;padding:1.5rem;}
.bm-card-top{display:flex;align-items:center;gap:0.8rem;margin-bottom:1rem;}
.bm-card-icon{font-size:1.4rem;}
.bm-card h3{font-family:'Cormorant Garamond',serif;font-size:1.3rem;font-weight:400;color:var(--bm-green);margin:0;}
.bm-card p{font-size:0.88rem;color:var(--bm-brown2);margin:0;}

/* TAGS */
.bm-tag{display:inline-block;font-size:0.68rem;padding:0.2rem 0.65rem;border-radius:2px;letter-spacing:0.07em;text-transform:uppercase;font-weight:700;margin-top:0.8rem;}
.bm-tag-green{background:#E8F5E9;color:#1B4332;}
.bm-tag-gold{background:#FFF8E1;color:#6D4C00;}
.bm-tag-red{background:#FFEBEE;color:#7B1F1F;}
.bm-tag-blue{background:#E3F2FD;color:#0D47A1;}

/* INFO BOXES */
.bm-info-box{background:#F1F8F4;border-left:3px solid var(--bm-green3);padding:1rem 1.4rem;margin:1.5rem 0;border-radius:0 3px 3px 0;}
.bm-info-box p{margin:0;font-size:0.9rem;color:var(--bm-brown);}
.bm-warn-box{background:#FFFBEB;border-left:3px solid #F59E0B;padding:1rem 1.4rem;margin:1.5rem 0;border-radius:0 3px 3px 0;}
.bm-warn-box p{margin:0;font-size:0.9rem;color:var(--bm-brown);}

/* VAC TABLE */
.bm-vac-table{width:100%;border-collapse:collapse;margin-top:1.5rem;font-size:0.88rem;}
.bm-vac-table th{background:var(--bm-green);color:#fff;padding:0.7rem 1rem;text-align:left;font-weight:700;font-size:0.75rem;letter-spacing:0.08em;text-transform:uppercase;}
.bm-vac-table td{padding:0.7rem 1rem;border-bottom:1px solid var(--bm-ivory3);color:var(--bm-brown2);vertical-align:top;}
.bm-vac-table tr:last-child td{border-bottom:none;}

/* FAQ */
.bm-faq-item{border-bottom:1px solid var(--bm-ivory3);}
.bm-faq-q{font-family:'Cormorant Garamond',serif;font-size:1.15rem;color:var(--bm-green);cursor:pointer;padding:1.2rem 0;display:flex;justify-content:space-between;align-items:center;font-weight:400;user-select:none;}
.bm-faq-q::after{content:'+';font-size:1.6rem;font-weight:300;color:var(--bm-gold2);flex-shrink:0;margin-left:1rem;transition:transform 0.25s;}
.bm-faq-q.open::after{transform:rotate(45deg);}
.bm-faq-a{display:none;padding:0 0 1.2rem;font-size:0.93rem;color:var(--bm-brown2);line-height:1.75;}
.bm-faq-a.open{display:block;}
.bm-faq-a p{margin:0 0 0.6rem;}

/* CONTACT */
#contact .bm-title{color:var(--bm-gold2);}
#contact .bm-lead{color:rgba(255,255,255,0.7);max-width:540px;margin-left:auto;margin-right:auto;}
#contact .bm-eyebrow{color:rgba(255,255,255,0.4);}
.bm-rsvp-btn{display:inline-block;background:var(--bm-gold);color:#fff;padding:1rem 2.8rem;text-decoration:none;font-size:0.8rem;letter-spacing:0.15em;text-transform:uppercase;border-radius:2px;margin-top:2rem;transition:background 0.2s;font-family:'Lato',sans-serif;font-weight:700;}
.bm-rsvp-btn:hover{background:var(--bm-gold2);}
.bm-contact-details{display:flex;justify-content:center;gap:3rem;margin-top:2.5rem;flex-wrap:wrap;}
.bm-contact-item{text-align:center;}
.bm-ci-label{font-size:0.7rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:0.4rem;}
.bm-ci-value{color:rgba(255,255,255,0.85);font-size:0.95rem;}
.bm-contact-item a{color:var(--bm-gold2);text-decoration:none;}

/* FOOTER */
.bm-footer{background:#0C1F14;color:rgba(255,255,255,0.3);text-align:center;padding:2rem;font-size:0.78rem;letter-spacing:0.06em;}

/* RESPONSIVE */
@media(max-width:768px){
  .bm-nav{padding:0.8rem 1.2rem;}
  .bm-nav-links{display:none;position:absolute;top:100%;left:0;right:0;background:rgba(10,28,18,0.98);flex-direction:column;padding:1.2rem 1.5rem;gap:1rem;}
  .bm-nav-links.open{display:flex;}
  .bm-hamburger{display:flex;}
  section{padding:4rem 1.2rem;}
  .bm-lbl{min-width:120px;}
  .bm-countdown{gap:0.8rem;}
  .bm-dot{font-size:1.4rem;}
  .bm-vac-table{font-size:0.8rem;}
  .bm-vac-table th,.bm-vac-table td{padding:0.5rem 0.6rem;}
  .bm-contact-details{gap:1.5rem;}
}
`;