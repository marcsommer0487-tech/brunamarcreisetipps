import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import logo from "@/assets/bm-logo.png";

/* ─────────────────────────────────────────────────────────
   LANGUAGE CONTEXT
   ───────────────────────────────────────────────────────── */
type Lang = "de" | "en" | "pt";
const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "de",
  setLang: () => {},
});
const useLang = () => useContext(LangCtx);

/* Helper: pick translation for current language */
function T<T extends Record<Lang, ReactNode>>(map: T): ReactNode {
  const { lang } = useLang();
  return map[lang];
}

/* ─────────────────────────────────────────────────────────
   NAV
   ───────────────────────────────────────────────────────── */
function Nav() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const links: { href: string; label: Record<Lang, string> }[] = [
    { href: "#wedding", label: { de: "Die Hochzeit", en: "The Wedding", pt: "O Casamento" } },
    { href: "#travel", label: { de: "Anreise", en: "Travel", pt: "Como Chegar" } },
    { href: "#health", label: { de: "Gesundheit", en: "Health", pt: "Saúde" } },
    { href: "#hotels", label: { de: "Hotels", en: "Hotels", pt: "Hotéis" } },
    { href: "#discover", label: { de: "Entdecken", en: "Discover", pt: "Descobrir" } },
    { href: "#safety", label: { de: "Sicherheit", en: "Safety", pt: "Segurança" } },
    { href: "#practical", label: { de: "Praktisches", en: "Practical", pt: "Dicas" } },
    { href: "#faq", label: { de: "FAQ", en: "FAQ", pt: "FAQ" } },
    { href: "#contact", label: { de: "RSVP", en: "RSVP", pt: "Confirmação" } },
  ];

  return (
    <nav className="bm-nav">
      <a href="#hero" className="bm-nav-logo">18.10.2026</a>
      <ul className={`bm-nav-links ${open ? "open" : ""}`}>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} onClick={() => setOpen(false)}>{l.label[lang]}</a>
          </li>
        ))}
      </ul>
      <div className="bm-nav-right">
        <div className="bm-lang">
          {(["de", "en", "pt"] as Lang[]).map((l) => (
            <button
              key={l}
              className={`bm-lang-btn ${lang === l ? "active" : ""}`}
              onClick={() => setLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="bm-hamburger" onClick={() => setOpen((v) => !v)}>
          <span /><span /><span />
        </div>
      </div>
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
        s: pad(Math.floor((diff % 60000) / 1000)),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="bm-hero">
      <img className="bm-hero-logo" src={logo} alt="Bruna & Marc" />
      <p className="bm-hero-tagline">
        {T({
          de: "Wir laden euch herzlich ein",
          en: "We warmly invite you",
          pt: "Com grande alegria, convidamos vocês",
        })}
      </p>
      <h1 className="bm-hero-script">
        Bruna <span className="bm-amp">&amp;</span> Marc
      </h1>
      <div className="bm-ornament">— ✦ —</div>
      <p className="bm-hero-date">
        {T({
          de: "Sonntag, 18. Oktober 2026",
          en: "Sunday, October 18, 2026",
          pt: "Domingo, 18 de outubro de 2026",
        })}
      </p>
      <p className="bm-hero-location">Belo Horizonte · Minas Gerais · Brasil 🇧🇷</p>

      <div className="bm-countdown">
        <CdUnit n={cd.d} l={{ de: "Tage", en: "Days", pt: "Dias" }} />
        <span className="bm-dot">·</span>
        <CdUnit n={cd.h} l={{ de: "Stunden", en: "Hours", pt: "Horas" }} />
        <span className="bm-dot">·</span>
        <CdUnit n={cd.m} l={{ de: "Minuten", en: "Minutes", pt: "Minutos" }} />
        <span className="bm-dot">·</span>
        <CdUnit n={cd.s} l={{ de: "Sekunden", en: "Seconds", pt: "Segundos" }} />
      </div>

      <a href="#wedding" className="bm-scroll-hint">
        <span>{T({ de: "Mehr erfahren", en: "Scroll to explore", pt: "Role para baixo" })}</span>
        <span className="bm-scroll-arrow" />
      </a>
    </section>
  );
}

function CdUnit({ n, l }: { n: string; l: Record<Lang, string> }) {
  return (
    <div className="bm-cd-unit">
      <span className="bm-cd-num">{n}</span>
      <span className="bm-cd-label">{T(l)}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   GENERIC SECTION SHELL
   ───────────────────────────────────────────────────────── */
function Section({
  id, eyebrow, title, lead, children,
}: {
  id: string;
  eyebrow: Record<Lang, string>;
  title: Record<Lang, string>;
  lead?: Record<Lang, string>;
  children: ReactNode;
}) {
  return (
    <section id={id}>
      <div className="bm-container">
        <span className="bm-eyebrow">{T(eyebrow)}</span>
        <h2 className="bm-title">{T(title)}</h2>
        {lead && <p className="bm-lead">{T(lead)}</p>}
        {children}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   WEDDING DETAILS
   ───────────────────────────────────────────────────────── */
function WeddingDetails() {
  return (
    <Section
      id="wedding"
      eyebrow={{ de: "Der große Tag", en: "The big day", pt: "O grande dia" }}
      title={{ de: "Die Hochzeit", en: "The Wedding", pt: "O Casamento" }}
      lead={{
        de: "Wir freuen uns riesig, diesen besonderen Tag mit euch in Brasilien zu feiern. Alle wichtigen Details findet ihr hier.",
        en: "We are so excited to celebrate this special day with you in Brazil. All the important details are right here.",
        pt: "Estamos muito animados para celebrar este dia especial com vocês em Belo Horizonte. Todos os detalhes importantes estão aqui.",
      }}
    >
      <div className="bm-wedding-grid">
        <DetailCard icon="📅"
          h={{ de: "Datum", en: "Date", pt: "Data" }}
          p={{
            de: "Sonntag, 18. Oktober 2026",
            en: "Sunday, October 18, 2026",
            pt: "Domingo, 18 de outubro de 2026",
          }}
        />
        <DetailCard icon="⏰"
          h={{ de: "Uhrzeit", en: "Time", pt: "Horário" }}
          p={{
            de: "Wird noch bekannt gegeben",
            en: "To be announced",
            pt: "A confirmar",
          }}
          placeholder
        />
        <DetailCard icon="📍"
          h={{ de: "Location", en: "Venue", pt: "Local" }}
          p={{
            de: "Adresse wird noch bekannt gegeben",
            en: "Address to be announced",
            pt: "Endereço a confirmar",
          }}
          placeholder
          sub="Belo Horizonte, MG"
        />
        <DetailCard icon="👔"
          h={{ de: "Dresscode", en: "Dress code", pt: "Dress code" }}
          p={{
            de: "Elegant / Festlich — Oktober in BH ist warm (~28°C), leichte Stoffe empfohlen.",
            en: "Elegant / Formal — October in BH is warm (~28°C), light fabrics recommended.",
            pt: "Elegante / Formal — Outubro em BH é quente (~28°C), tecidos leves são recomendados.",
          }}
        />
      </div>
    </Section>
  );
}

function DetailCard({
  icon, h, p, placeholder, sub,
}: {
  icon: string;
  h: Record<Lang, string>;
  p: Record<Lang, string>;
  placeholder?: boolean;
  sub?: string;
}) {
  return (
    <div className="bm-detail-card">
      <div className="bm-detail-icon">{icon}</div>
      <h3>{T(h)}</h3>
      <p>
        <span className={placeholder ? "bm-placeholder" : ""}>{T(p)}</span>
        {sub && <><br /><small>{sub}</small></>}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   ROW LIST (Travel, Safety, Transport, Practical)
   ───────────────────────────────────────────────────────── */
type Row = { lbl: Record<Lang, string>; val: Record<Lang, ReactNode> };
function RowList({ rows }: { rows: Row[] }) {
  return (
    <ul className="bm-rows">
      {rows.map((r, i) => (
        <li key={i}>
          <span className="bm-lbl">{T(r.lbl)}</span>
          <span>{T(r.val)}</span>
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
      lbl: { de: "Flughafen", en: "Airport", pt: "Aeroporto" },
      val: {
        de: "Aeroporto Internacional Tancredo Neves (CNF / Confins) — 38 km nordöstlich vom Stadtzentrum. Für Inlandsflüge: Aeroporto Carlos Drummond de Andrade (PLU).",
        en: "Aeroporto Internacional Tancredo Neves (CNF / Confins) — 38 km northeast of the city centre. For domestic flights: Aeroporto Carlos Drummond de Andrade (PLU).",
        pt: "Aeroporto Internacional Tancredo Neves (CNF / Confins) — 38 km a nordeste do centro. Para voos domésticos: Carlos Drummond de Andrade (PLU).",
      },
    },
    {
      lbl: { de: "Flüge aus DE/EU", en: "Flights from Europe", pt: "Voos" },
      val: {
        de: "Typischerweise mit Zwischenstopp in São Paulo (GRU) oder Lissabon (LIS). Airlines: Lufthansa, TAP, LATAM, Azul. Flugzeit: ca. 14–16 Std. + Stopover.",
        en: "Typically via São Paulo (GRU) or Lisbon (LIS). Airlines: Lufthansa, TAP, LATAM, Azul. Flight time: ~14–16 h + stopover.",
        pt: "Conexões frequentes com São Paulo (GRU, CGH), Rio de Janeiro, Brasília. Airlines: LATAM, Azul, Gol.",
      },
    },
    {
      lbl: { de: "Transfer vom Flughafen", en: "Airport transfer", pt: "Transfer do aeroporto" },
      val: {
        de: <>Uber: ca. 45–60 Min., R$ 80–130. Empfehlenswert. Alternativ: <strong>Executivo</strong>-Shuttle-Bus.</>,
        en: <>Uber: ~45–60 min, R$ 80–130. Highly recommended. Alternative: <strong>Executivo</strong> shuttle bus.</>,
        pt: <>Uber: ~45–60 min, R$ 80–130. Altamente recomendado. Alternativa: ônibus Executivo.</>,
      },
    },
    {
      lbl: { de: "Beste Anreisezeit", en: "Best time to arrive", pt: "Quando chegar" },
      val: {
        de: "2–3 Tage vor der Hochzeit — um die Stadt kennenzulernen und den Jetlag zu überwinden.",
        en: "2–3 days before the wedding — to settle in and get over jet lag.",
        pt: "Recomendamos chegar 1–2 dias antes para aproveitar a cidade.",
      },
    },
  ];
  return (
    <Section
      id="travel"
      eyebrow={{ de: "Wie ihr ankommt", en: "Getting here", pt: "Como chegar" }}
      title={{ de: "Anreise nach Belo Horizonte", en: "Travel to Belo Horizonte", pt: "Chegando a Belo Horizonte" }}
      lead={{
        de: "Belo Horizonte liegt im Herzen von Minas Gerais. Die Anreise aus Europa dauert mit Zwischenstopp ca. 16–18 Stunden.",
        en: "Belo Horizonte is the capital of Minas Gerais. The journey from Europe takes about 16–18 hours including a stopover.",
        pt: "Belo Horizonte é a capital de Minas Gerais. Há voos diretos e com conexão de várias cidades.",
      }}
    >
      <RowList rows={rows} />
      <InfoBox>
        ✅ <strong>{T({ de: "Tipp:", en: "Tip:", pt: "Dica:" })}</strong>{" "}
        {T({
          de: "Flüge am besten 6–9 Monate vorher buchen — Direktverbindungen nach São Paulo sind gefragt und teuer.",
          en: "Book flights 6–9 months in advance — direct connections to São Paulo are popular and can be expensive.",
          pt: "Reserve passagens com antecedência, especialmente para outubro, alta temporada no Brasil.",
        })}
      </InfoBox>
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
      eyebrow={{ de: "Einreise", en: "Entry", pt: "Entrada no Brasil" }}
      title={{ de: "Visum & Einreiseformalitäten", en: "Visa & Entry Requirements", pt: "Visto & Documentação" }}
    >
      <div className="bm-card-grid" style={{ marginTop: "1.5rem" }}>
        <div className="bm-card">
          <div className="bm-card-top">
            <span className="bm-card-icon">🇩🇪🇪🇺</span>
            <h3>{T({ de: "Deutschland & EU", en: "Germany, UK & EU", pt: "Cidadãos Brasileiros" })}</h3>
          </div>
          <p>
            {T({
              de: <>Kein Visum erforderlich für touristische Aufenthalte bis zu <strong>90 Tage</strong>. Reisepass muss noch mindestens 6 Monate gültig sein.</>,
              en: <>No visa required for tourist stays of up to <strong>90 days</strong>. Passport must be valid for at least 6 months.</>,
              pt: <>Documento de identidade (RG) ou passaporte válido. Nenhuma documentação especial necessária.</>,
            })}
          </p>
          <span className="bm-tag bm-tag-green">
            {T({ de: "Visumsfrei", en: "Visa-free", pt: "Sem restrições" })}
          </span>
        </div>
        <div className="bm-card">
          <div className="bm-card-top">
            <span className="bm-card-icon">🌍</span>
            <h3>{T({ de: "Andere Länder", en: "Other Countries", pt: "Convidados Internacionais" })}</h3>
          </div>
          <p>
            {T({
              de: "Bitte prüft die aktuellen Einreisebestimmungen auf der Seite des brasilianischen Außenministeriums.",
              en: "Please check the latest entry requirements via the Brazilian Ministry of Foreign Affairs.",
              pt: "Verifique requisitos no site do Ministério das Relações Exteriores do Brasil.",
            })}
          </p>
          <span className="bm-tag bm-tag-gold">
            {T({ de: "Bitte prüfen", en: "Please verify", pt: "Verifique seu país" })}
          </span>
        </div>
      </div>
      <WarnBox>
        ⚠️ <strong>{T({ de: "Wichtig:", en: "Important:", pt: "Importante:" })}</strong>{" "}
        {T({
          de: "Alle Gäste sollten eine Krankenversicherung mit internationalem Krankentransport abschließen.",
          en: "All guests should arrange comprehensive travel insurance with international medical evacuation.",
          pt: "Recomendamos seguro viagem completo para convidados internacionais.",
        })}
      </WarnBox>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   HEALTH
   ───────────────────────────────────────────────────────── */
type VacRow = { name: string; tag: { cls: string; label: Record<Lang, string> }; note: Record<Lang, string> };
function HealthSection() {
  const rows: VacRow[] = [
    {
      name: "Yellow Fever / Gelbfieber / Febre Amarela",
      tag: { cls: "bm-tag-gold", label: { de: "Empfohlen", en: "Recommended", pt: "Recomendada" } },
      note: {
        de: "Für BH Stadt nicht zwingend. Für Ausflüge in bestimmte Bundesstaaten nötig. Impfausweis mitführen.",
        en: "Not strictly required for BH city, but required for some states. Carry your vaccination certificate.",
        pt: "Verifique os requisitos do seu país de origem. Tenha o cartão de vacinação.",
      },
    },
    {
      name: "Hepatitis A",
      tag: { cls: "bm-tag-red", label: { de: "Dringend empfohlen", en: "Strongly recommended", pt: "Recomendada" } },
      note: {
        de: "Standardimpfung für Reisen nach Brasilien.",
        en: "Standard for travel to Brazil.",
        pt: "Para convidados internacionais.",
      },
    },
    {
      name: "Hepatitis B",
      tag: { cls: "bm-tag-gold", label: { de: "Empfohlen", en: "Recommended", pt: "Recomendada" } },
      note: {
        de: "Bei nicht vorhandener Immunität empfehlenswert.",
        en: "Recommended if not already immune.",
        pt: "Para convidados internacionais.",
      },
    },
    {
      name: "Dengue",
      tag: { cls: "bm-tag-gold", label: { de: "Vorbeugung", en: "Prevention", pt: "Prevenção" } },
      note: {
        de: "Mückenschutz: DEET-Spray, lange Kleidung morgens/abends.",
        en: "Use DEET insect repellent and cover up, especially at dawn/dusk.",
        pt: "Use repelente com DEET, roupas compridas ao amanhecer e anoitecer.",
      },
    },
    {
      name: "MMR / Tetanus",
      tag: { cls: "bm-tag-red", label: { de: "Auffrischen", en: "Check & top up", pt: "Manter em dia" } },
      note: {
        de: "Impfschutz prüfen und ggf. auffrischen lassen.",
        en: "Verify immunity before travel and boost if needed.",
        pt: "Verifique se as vacinas estão em dia.",
      },
    },
  ];

  return (
    <Section
      id="health"
      eyebrow={{ de: "Gesundheit", en: "Health", pt: "Saúde" }}
      title={{ de: "Impfungen & Gesundheitstipps", en: "Vaccinations & Health Tips", pt: "Vacinas & Dicas de Saúde" }}
      lead={{
        de: "Frühzeitig mit dem Hausarzt oder einem Reisemediziner sprechen — mindestens 6 bis 8 Wochen vor Reiseantritt.",
        en: "Visit a travel medicine clinic or your GP at least 6 to 8 weeks before departure.",
        pt: "Consulte um médico com pelo menos 6 a 8 semanas de antecedência.",
      }}
    >
      <table className="bm-vac-table">
        <thead>
          <tr>
            <th>{T({ de: "Impfung", en: "Vaccination", pt: "Vacina" })}</th>
            <th>{T({ de: "Empfehlung", en: "Recommendation", pt: "Recomendação" })}</th>
            <th>{T({ de: "Hinweis", en: "Notes", pt: "Observações" })}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td><strong>{r.name}</strong></td>
              <td><span className={`bm-tag ${r.tag.cls}`}>{T(r.tag.label)}</span></td>
              <td>{T(r.note)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <InfoBox>
        🧳 <strong>{T({ de: "Reiseapotheke:", en: "Travel kit:", pt: "Kit de viagem:" })}</strong>{" "}
        {T({
          de: "Mückenspray (mind. 30% DEET), Sonnencreme (LSF 50+), Durchfallmittel, Pflaster, persönliche Medikamente.",
          en: "DEET repellent (30%+), high-SPF sunscreen, anti-diarrhoea medication, plasters, personal prescriptions.",
          pt: "Repelente (DEET 30%+), protetor solar FPS 50+, antidiarreico, antialérgico, medicamentos pessoais.",
        })}
      </InfoBox>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   CARD GRID (Hotels, Sights, Daytrips, Food)
   ───────────────────────────────────────────────────────── */
type Card = {
  icon: string;
  title: Record<Lang, string>;
  body: Record<Lang, ReactNode>;
  tag?: { cls: string; label: Record<Lang, string> };
};
function CardGrid({ cards }: { cards: Card[] }) {
  return (
    <div className="bm-card-grid">
      {cards.map((c, i) => (
        <div className="bm-card" key={i}>
          <div className="bm-card-top">
            <span className="bm-card-icon">{c.icon}</span>
            <h3>{T(c.title)}</h3>
          </div>
          <p>{T(c.body)}</p>
          {c.tag && <span className={`bm-tag ${c.tag.cls}`}>{T(c.tag.label)}</span>}
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
      icon: "⭐⭐⭐⭐⭐",
      title: { de: "Luxus", en: "Luxury", pt: "Luxo" },
      body: {
        de: <><strong>Ouro Minas Palace Hotel</strong> — Traditionshotel, elegantes Interieur, Pool, hervorragendes Frühstück.<br /><br /><strong>Hotel Mercure BH Lourdes</strong> — Modern, zentral, sehr guter Service.</>,
        en: <><strong>Ouro Minas Palace Hotel</strong> — BH's grand traditional hotel, elegant interiors, pool, excellent breakfast.<br /><br /><strong>Hotel Mercure BH Lourdes</strong> — Modern, central in Lourdes, great service.</>,
        pt: <><strong>Ouro Minas Palace Hotel</strong> — Hotel tradicional com piscina e café da manhã excelente.<br /><br /><strong>Hotel Mercure BH Lourdes</strong> — Moderno, central, ótimo serviço.</>,
      },
      tag: { cls: "bm-tag-green", label: { de: "Savassi / Lourdes", en: "Savassi / Lourdes", pt: "Savassi / Lourdes" } },
    },
    {
      icon: "⭐⭐⭐⭐",
      title: { de: "Mittelklasse", en: "Mid-range", pt: "Intermediário" },
      body: {
        de: <><strong>Ibis Styles BH Savassi</strong> — Komfortabel, gute Lage, faire Preise.<br /><br /><strong>Slaviero Essential BH</strong> — Preis-Leistungs-Sieger.</>,
        en: <><strong>Ibis Styles BH Savassi</strong> — Comfortable, great location, fair prices.<br /><br /><strong>Slaviero Essential BH</strong> — Excellent value.</>,
        pt: <><strong>Ibis Styles BH Savassi</strong> — Confortável, ótima localização, preço justo.<br /><br /><strong>Slaviero Essential BH</strong> — Boa relação custo-benefício.</>,
      },
      tag: { cls: "bm-tag-gold", label: { de: "Savassi", en: "Savassi", pt: "Savassi" } },
    },
    {
      icon: "⭐⭐⭐",
      title: { de: "Budget-freundlich", en: "Budget", pt: "Econômico" },
      body: {
        de: <><strong>Hostels & Pousadas in Savassi</strong> — Verschiedene günstige Gästehäuser im sicheren Savassi-Viertel.</>,
        en: <><strong>Hostels & Pousadas in Savassi</strong> — Various affordable guesthouses in the safe Savassi neighbourhood.</>,
        pt: <><strong>Pousadas e Hostels no Savassi</strong> — Diversas opções aconchegantes e seguras.</>,
      },
      tag: { cls: "bm-tag-blue", label: { de: "Ab R$ 80 / Nacht", en: "From R$ 80 / night", pt: "A partir de R$ 80 / noite" } },
    },
  ];
  return (
    <Section
      id="hotels"
      eyebrow={{ de: "Übernachtung", en: "Accommodation", pt: "Hospedagem" }}
      title={{ de: "Hotelempfehlungen", en: "Hotel Recommendations", pt: "Sugestões de Hotéis" }}
      lead={{
        de: "Wir empfehlen Hotels in den Vierteln Savassi oder Lourdes — zentral, sicher und mit vielen Restaurants.",
        en: "We recommend staying in Savassi or Lourdes — central, safe, and full of great restaurants.",
        pt: "Recomendamos os bairros Savassi ou Lourdes — centrais, seguros e cheios de restaurantes.",
      }}
    >
      <CardGrid cards={cards} />
      <InfoBox>
        📍 <strong>{T({ de: "Empfohlene Viertel:", en: "Recommended areas:", pt: "Bairros recomendados:" })}</strong>{" "}
        <strong>Savassi</strong> {T({ de: "und", en: "and", pt: "e" })} <strong>Lourdes</strong>.
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
      title: { de: "Conjunto Pampulha", en: "Pampulha Complex", pt: "Conjunto da Pampulha" },
      body: {
        de: "UNESCO-Kandidat. Oscar Niemeyers modernistisches Meisterwerk an der Lagoa da Pampulha.",
        en: "UNESCO candidate. Oscar Niemeyer's modernist masterpiece on Lagoa da Pampulha.",
        pt: "Patrimônio Mundial. Obra-prima modernista de Oscar Niemeyer na Lagoa.",
      },
    },
    {
      icon: "🏪",
      title: { de: "Mercado Central", en: "Mercado Central", pt: "Mercado Central" },
      body: {
        de: "Riesiger Markt mit über 400 Ständen: Cachaça, Pão de queijo, Gewürze, Handwerk.",
        en: "Huge market with 400+ stalls: cachaça, pão de queijo, spices, handicrafts.",
        pt: "Mais de 400 lojas: cachaça, pão de queijo, queijos, doces e artesanato.",
      },
    },
    {
      icon: "🌿",
      title: { de: "Praça da Liberdade", en: "Praça da Liberdade", pt: "Praça da Liberdade" },
      body: {
        de: "Eleganter Kulturplatz mit kostenlosem Zugang zu mehreren Museen.",
        en: "Elegant cultural square with free entry to several museums.",
        pt: "Circuito cultural com vários museus gratuitos.",
      },
    },
    {
      icon: "🌄",
      title: { de: "Mirante das Mangabeiras", en: "Mirante das Mangabeiras", pt: "Mirante das Mangabeiras" },
      body: {
        de: "Aussichtspunkt mit Panoramablick über ganz BH.",
        en: "Viewpoint with panoramic views over all of BH.",
        pt: "Vista panorâmica incrível de toda BH.",
      },
    },
    {
      icon: "🎨",
      title: { de: "Bairro Santa Teresa", en: "Bairro Santa Teresa", pt: "Bairro Santa Teresa" },
      body: {
        de: "Trendy Künstlerviertel mit Galerien, Cafés und Wochenendmarkt.",
        en: "Trendy arts neighbourhood with galleries, cafés and a weekend market.",
        pt: "Bairro boêmio com galerias, cafés e feira de fim de semana.",
      },
    },
    {
      icon: "⛪",
      title: { de: "Igreja São Francisco", en: "Igreja São Francisco", pt: "Igreja São Francisco" },
      body: {
        de: "Niemeyers bekannteste Kirche, dekoriert mit Azulejos von Portinari.",
        en: "Niemeyer's most celebrated church, decorated with azulejos by Portinari.",
        pt: "A mais famosa obra de Niemeyer em BH, com azulejos de Portinari.",
      },
    },
  ];

  const daytrips: Card[] = [
    {
      icon: "🏚️",
      title: { de: "Ouro Preto", en: "Ouro Preto", pt: "Ouro Preto" },
      body: {
        de: "Ca. 1,5 Std. — UNESCO-Welterbe. Barocke Kolonialarchitektur, steile Gassen, Goldschmiede.",
        en: "~1.5 hrs — UNESCO World Heritage. Breathtaking baroque colonial architecture.",
        pt: "~1,5 h — Patrimônio Mundial. Arquitetura barroca deslumbrante.",
      },
      tag: { cls: "bm-tag-green", label: { de: "★★★ Top-Empfehlung", en: "★★★ Top recommendation", pt: "★★★ Imperdível" } },
    },
    {
      icon: "🎭",
      title: { de: "Inhotim", en: "Inhotim", pt: "Inhotim" },
      body: {
        de: "Ca. 1,5 Std. — Weltklasse Freilicht-Kunstmuseum mit botanischem Garten. Mindestens 1 ganzer Tag!",
        en: "~1.5 hrs — World-class open-air art museum with vast botanical garden. Allow a full day!",
        pt: "~1,5 h — Museu a céu aberto com jardim botânico enorme. Reserve um dia inteiro!",
      },
      tag: { cls: "bm-tag-green", label: { de: "★★★ Top-Empfehlung", en: "★★★ Top recommendation", pt: "★★★ Imperdível" } },
    },
    {
      icon: "🕍",
      title: { de: "Tiradentes", en: "Tiradentes", pt: "Tiradentes" },
      body: {
        de: "Ca. 2,5 Std. — Charmantes Kolonialstädtchen mit Barockkirchen und hervorragenden Restaurants.",
        en: "~2.5 hrs — Charming small colonial town with baroque churches and excellent restaurants.",
        pt: "~2,5 h — Cidade histórica encantadora com igrejas barrocas e ótimos restaurantes.",
      },
      tag: { cls: "bm-tag-gold", label: { de: "★★ Sehr empfehlenswert", en: "★★ Highly recommended", pt: "★★ Muito recomendado" } },
    },
    {
      icon: "🏔️",
      title: { de: "Serra do Cipó", en: "Serra do Cipó", pt: "Serra do Cipó" },
      body: {
        de: "Ca. 1,5 Std. — Nationalpark mit Wasserfällen, Wanderwegen und Naturbädern.",
        en: "~1.5 hrs — Beautiful national park with waterfalls, hiking trails, and natural pools.",
        pt: "~1,5 h — Parque nacional com cachoeiras, trilhas e piscinas naturais.",
      },
      tag: { cls: "bm-tag-gold", label: { de: "★★ Sehr empfehlenswert", en: "★★ Highly recommended", pt: "★★ Muito recomendado" } },
    },
    {
      icon: "🏘️",
      title: { de: "Sabará", en: "Sabará", pt: "Sabará" },
      body: {
        de: "Ca. 30 Min. — Kleines Kolonialstädtchen vor den Toren von BH mit Barockkirchen.",
        en: "~30 min — Small colonial town right on the edge of BH with Baroque churches.",
        pt: "~30 min — Cidade colonial nas portas de BH com belas igrejas barrocas.",
      },
      tag: { cls: "bm-tag-blue", label: { de: "★ Lohnt sich", en: "★ Worth a visit", pt: "★ Vale a visita" } },
    },
  ];

  return (
    <section id="discover">
      <div className="bm-container">
        <span className="bm-eyebrow">{T({ de: "Sightseeing", en: "Sightseeing", pt: "Turismo" })}</span>
        <h2 className="bm-title">{T({ de: "Sehenswürdigkeiten in Belo Horizonte", en: "Sights in Belo Horizonte", pt: "O Que Ver em Belo Horizonte" })}</h2>
        <p className="bm-lead">
          {T({
            de: "BH überrascht mit Oscar-Niemeyer-Architektur, lebhaften Märkten und einer der lebendigsten Essensszenen Brasiliens.",
            en: "BH surprises with Oscar Niemeyer architecture, vibrant markets, and one of Brazil's most exciting food scenes.",
            pt: "BH surpreende com arquitetura de Niemeyer, mercados animados e uma cena gastronômica vibrante.",
          })}
        </p>
        <CardGrid cards={sights} />
        <div className="bm-ornament-divider">— ✦ —</div>
        <span className="bm-eyebrow">{T({ de: "Tagesausflüge", en: "Day Trips", pt: "Passeios" })}</span>
        <h2 className="bm-title">{T({ de: "Die schönsten Ausflugsziele", en: "Best Day Trips", pt: "Melhores Passeios de Um Dia" })}</h2>
        <p className="bm-lead">
          {T({
            de: "Rund um BH liegen echte Highlights — von UNESCO-Städten bis zu Kunstmuseen mitten in der Natur.",
            en: "Around BH there are real highlights — from UNESCO towns to world-class art museums in nature.",
            pt: "Ao redor de BH há destinos incríveis — de cidades coloniais a museus de arte renomados.",
          })}
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
      lbl: { de: "Viertel", en: "Neighbourhoods", pt: "Bairros seguros" },
      val: {
        de: "Bleibt in Savassi, Lourdes, Funcionários und Mangabeiras. Centro nach Einbruch der Dunkelheit meiden.",
        en: "Stay in Savassi, Lourdes, Funcionários and Mangabeiras. Avoid the Centro after dark.",
        pt: "Savassi, Lourdes, Funcionários e Mangabeiras são os melhores. Evite o Centro à noite.",
      },
    },
    {
      lbl: { de: "Wertsachen", en: "Valuables", pt: "Objetos de valor" },
      val: {
        de: "Keine teuren Uhren, Schmuck oder Kamera offen tragen. Handy nicht auf der Straße zücken.",
        en: "Avoid wearing expensive watches, jewellery, or carrying cameras openly. Keep your phone out of sight.",
        pt: "Evite exibir relógios caros, joias ou câmeras. Deixe o celular no bolso na rua.",
      },
    },
    {
      lbl: { de: "Transport", en: "Transport", pt: "Transporte" },
      val: {
        de: "Immer Uber oder 99 (App) nehmen. Keine Straßentaxis heranwinken.",
        en: "Always use Uber or 99 (app-based). Do not flag down street taxis.",
        pt: "Use sempre Uber ou 99. Evite pegar táxis na rua.",
      },
    },
    {
      lbl: { de: "Geld", en: "Money", pt: "Dinheiro" },
      val: {
        de: "Wenig Bargeld bei sich führen. An Geldautomaten von Bradesco oder Itaú abheben.",
        en: "Carry minimal cash. Use ATMs at Bradesco or Itaú banks.",
        pt: "Leve pouco em espécie. Caixas eletrônicos do Bradesco e Itaú são confiáveis.",
      },
    },
    {
      lbl: { de: "Notfallnummern", en: "Emergency numbers", pt: "Emergências" },
      val: {
        de: <>🚓 Polizei: <strong>190</strong> | 🚑 SAMU: <strong>192</strong> | 🚒 Feuerwehr: <strong>193</strong></>,
        en: <>🚓 Police: <strong>190</strong> | 🚑 SAMU: <strong>192</strong> | 🚒 Fire: <strong>193</strong></>,
        pt: <>🚓 Polícia: <strong>190</strong> | 🚑 SAMU: <strong>192</strong> | 🚒 Bombeiros: <strong>193</strong></>,
      },
    },
  ];
  return (
    <Section
      id="safety"
      eyebrow={{ de: "Sicherheit", en: "Safety", pt: "Segurança" }}
      title={{ de: "Sicherheitstipps", en: "Safety Tips", pt: "Dicas de Segurança" }}
      lead={{
        de: "Brasilien erfordert etwas mehr Aufmerksamkeit — aber mit den richtigen Vorsichtsmaßnahmen ist ein wunderbarer Aufenthalt problemlos möglich.",
        en: "Brazil requires a bit more awareness — but with the right precautions, a wonderful trip is perfectly possible.",
        pt: "Com atenção e algumas precauções simples, BH pode ser aproveitada com tranquilidade.",
      }}
    >
      <RowList rows={rows} />
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   TRANSPORT
   ───────────────────────────────────────────────────────── */
function TransportSection() {
  const rows: Row[] = [
    {
      lbl: { de: "Uber / 99", en: "Uber / 99", pt: "Uber / 99" },
      val: {
        de: "Die beste Option. Günstig, sicher, flächendeckend. 99 ist die brasilianische Alternative zu Uber.",
        en: "The best option. Cheap, safe, and widely available. 99 is the Brazilian alternative to Uber.",
        pt: "A melhor opção. Seguro, barato e disponível em toda a cidade.",
      },
    },
    {
      lbl: { de: "MOVE BH (BRT)", en: "MOVE BH (BRT)", pt: "MOVE BH / BRT" },
      val: {
        de: "Bus-Schnellsystem — gut ausgebaut, aber für Touristen komplexer.",
        en: "Bus Rapid Transit — well-developed but complex to navigate for tourists.",
        pt: "Ônibus expresso com boa cobertura.",
      },
    },
    {
      lbl: { de: "Mietwagen", en: "Car rental", pt: "Carro alugado" },
      val: {
        de: "Für Tagesausflüge sinnvoll. Anbieter am Flughafen: Localiza, Movida, Unidas.",
        en: "Useful for day trips. Rental companies at the airport: Localiza, Movida, Unidas.",
        pt: "Recomendado para passeios. Locadoras no aeroporto: Localiza, Movida, Unidas.",
      },
    },
    {
      lbl: { de: "Vom Flughafen", en: "From the airport", pt: "Do aeroporto" },
      val: {
        de: "Uber oder 99 direkt beim Ausgang. Ca. 45–60 Min. ins Zentrum.",
        en: "Book Uber or 99 in the arrivals hall. ~45–60 min to the city centre.",
        pt: "Uber ou 99 na saída do desembarque. ~45–60 min até o centro.",
      },
    },
  ];
  return (
    <Section
      id="transport"
      eyebrow={{ de: "Fortbewegung", en: "Getting around", pt: "Locomoção" }}
      title={{ de: "Transport vor Ort", en: "Transport", pt: "Como Se Locomover" }}
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
      title: { de: "Pão de Queijo", en: "Pão de Queijo", pt: "Pão de Queijo" },
      body: {
        de: "Brasiliens beliebtester Snack — warme Käsebrötchen aus Maniokstärke. Ursprünglich aus Minas Gerais!",
        en: "Brazil's favourite snack — warm cheesy bread rolls made from cassava starch. Originally from Minas Gerais!",
        pt: "O lanche favorito do Brasil — e orgulho de Minas Gerais!",
      },
    },
    {
      icon: "🍖",
      title: { de: "Tutu à Mineira", en: "Tutu à Mineira", pt: "Tutu à Mineira" },
      body: {
        de: "Herzhafter Klassiker: Maniokbrei mit schwarzen Bohnen, Würstchen, Kohl und Ei.",
        en: "Hearty classic: cassava-thickened black beans with sausage, cabbage and boiled egg.",
        pt: "Clássico da culinária mineira: feijão com mandioca, linguiça, couve e ovo.",
      },
    },
    {
      icon: "🍹",
      title: { de: "Caipirinha", en: "Caipirinha", pt: "Caipirinha" },
      body: {
        de: "Brasiliens Nationalcocktail aus Cachaça, Limette und Zucker.",
        en: "Brazil's national cocktail: cachaça, fresh lime, and sugar.",
        pt: "O coquetel nacional! Cachaça, limão e açúcar.",
      },
    },
    {
      icon: "🥤",
      title: { de: "Açaí & Guaraná", en: "Açaí & Guaraná", pt: "Açaí & Guaraná" },
      body: {
        de: "Frischer Açaí mit Granola ist unschlagbar. Guaraná: leicht koffeinhaltiges Softgetränk.",
        en: "Fresh açaí with granola is unbeatable. Guaraná is a fizzy, lightly caffeinated Brazilian soft drink.",
        pt: "Açaí com granola e guaraná natural são imperdíveis!",
      },
    },
    {
      icon: "⚖️",
      title: { de: "Comida a Quilo", en: "Comida a Quilo", pt: "Comida a Quilo" },
      body: {
        de: "Mittagessen nach Gewicht — riesige Auswahl, frisch, günstig und lecker.",
        en: "Pay-by-weight lunch — huge choice, freshly made, affordable and delicious.",
        pt: "Almoço por quilo — grande variedade, fresquinho e com preço justo.",
      },
    },
    {
      icon: "🍦",
      title: { de: "Queijo & Goiabada", en: "Queijo & Goiabada", pt: "Romeo e Julieta" },
      body: {
        de: "Mineirischer Klassiker: reifer Käse mit Guavengelee ('Romeo e Julieta').",
        en: "Mineiro classic: aged cheese with guava jelly ('Romeo e Julieta').",
        pt: "Clássico mineiro: queijo minas com goiabada.",
      },
    },
  ];
  return (
    <Section
      id="food"
      eyebrow={{ de: "Kulinarik", en: "Cuisine", pt: "Gastronomia" }}
      title={{ de: "Essen & Trinken", en: "Food & Drink", pt: "Comida & Bebida" }}
      lead={{
        de: "Belo Horizonte gilt in Brasilien als die Hauptstadt des guten Essens. Die Küche Minas Gerais' ist herzhaft und absolut lecker.",
        en: "Belo Horizonte is considered Brazil's food capital. Cuisine from Minas Gerais is hearty, rustic, and delicious.",
        pt: "BH é considerada a capital da gastronomia do Brasil. A culinária mineira é farta e irresistível.",
      }}
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
      lbl: { de: "Währung", en: "Currency", pt: "Moeda" },
      val: {
        de: "Brasilianischer Real (BRL / R$). 1 EUR ≈ 5,5–6,5 BRL. Am besten am Geldautomaten abheben.",
        en: "Brazilian Real (BRL / R$). 1 EUR ≈ 5.5–6.5 BRL. Best to withdraw at local ATMs.",
        pt: "Real Brasileiro (BRL / R$). Saques em caixas eletrônicos do Bradesco e Itaú.",
      },
    },
    {
      lbl: { de: "Kartenzahlung", en: "Card payments", pt: "Pagamento" },
      val: {
        de: "Meistens möglich. Etwas Bargeld für Märkte und Kleinhändler empfohlen.",
        en: "Widely accepted. Carry some cash for markets and street vendors.",
        pt: "Cartão aceito na maioria. Tenha R$ 100–200 em espécie para feiras.",
      },
    },
    {
      lbl: { de: "Strom & Steckdosen", en: "Electricity", pt: "Energia elétrica" },
      val: {
        de: <>⚠️ 127 V / 60 Hz. Steckdosen-Typ <strong>N</strong> — Adapter mitbringen!</>,
        en: <>⚠️ 127 V / 60 Hz. Plug type <strong>N</strong> — bring an adapter!</>,
        pt: <>⚠️ 127 V / 60 Hz. Tomadas Tipo N (ABNT NBR 14136).</>,
      },
    },
    {
      lbl: { de: "SIM-Karte", en: "SIM card", pt: "Chip/eSIM" },
      val: {
        de: "Tim, Vivo, Claro. Touristen-SIM ab ca. R$ 40–80. Alternative: eSIM via Airalo.",
        en: "Tim, Vivo, Claro. Tourist SIMs from ~R$ 40–80. Alternative: eSIM via Airalo.",
        pt: "Tim, Vivo, Claro disponíveis no aeroporto. eSIM via Airalo.",
      },
    },
    {
      lbl: { de: "Zeitzone", en: "Time zone", pt: "Fuso horário" },
      val: {
        de: "UTC-3 (keine Sommerzeit). Differenz zu DE: -5 Std. (Sommer) / -4 Std. (Winter).",
        en: "UTC-3 year-round (no daylight saving since 2019).",
        pt: "UTC-3 o ano todo. Sem horário de verão desde 2019.",
      },
    },
    {
      lbl: { de: "Wetter Oktober", en: "Weather in October", pt: "Clima em outubro" },
      val: {
        de: "22–30°C, meistens sonnig. Gelegentlich Schauer am Nachmittag. Leichte Sommersachen.",
        en: "22–30°C, mostly sunny. Occasional afternoon showers. Light summer clothes.",
        pt: "22–30°C, muito ensolarado. Pancadas de chuva à tarde. Roupas leves.",
      },
    },
    {
      lbl: { de: "Sprache", en: "Language", pt: "Idioma" },
      val: {
        de: <>Brasilianisches Portugiesisch — <strong>kein Spanisch!</strong> Ein paar Basics werden geschätzt.</>,
        en: <>Brazilian Portuguese — <strong>not Spanish!</strong> Even a few words go a long way.</>,
        pt: <>Português brasileiro.</>,
      },
    },
    {
      lbl: { de: "Trinkgeld", en: "Tipping", pt: "Gorjeta" },
      val: {
        de: "10% sind oft schon im Preis enthalten. Bei Uber/Taxi kein Trinkgeld erforderlich.",
        en: "10% service charge often already included. No tip expected for Uber/taxi.",
        pt: "10% normalmente já incluso. Gorjeta extra é opcional.",
      },
    },
  ];
  return (
    <Section
      id="practical"
      eyebrow={{ de: "Wissenswertes", en: "Good to know", pt: "Informações" }}
      title={{ de: "Praktische Infos", en: "Practical Information", pt: "Informações Práticas" }}
    >
      <RowList rows={rows} />
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   FAQ
   ───────────────────────────────────────────────────────── */
type Faq = { q: Record<Lang, string>; a: Record<Lang, string> };
function FaqSection() {
  const faqs: Faq[] = [
    {
      q: {
        de: "Brauche ich ein Visum für Brasilien?",
        en: "Do I need a visa for Brazil?",
        pt: "Convidados estrangeiros precisam de visto?",
      },
      a: {
        de: "Deutsche und EU-Bürger benötigen kein Visum — bis zu 90 Tage visumsfrei. Reisepass muss noch 6 Monate gültig sein.",
        en: "German and EU citizens do not need a visa — tourist entry is visa-free for up to 90 days. Passport valid 6 months.",
        pt: "Alemães e europeus em geral não precisam de visto por até 90 dias. Passaporte com validade mínima de 6 meses.",
      },
    },
    {
      q: {
        de: "Wie ist das Wetter im Oktober in Belo Horizonte?",
        en: "What's the weather like in October in Belo Horizonte?",
        pt: "Como é o clima em outubro em BH?",
      },
      a: {
        de: "Warm bis heiß (22–30°C), meistens sonnig, gelegentlich Regenschauer am Nachmittag.",
        en: "Warm to hot (22–30°C), mostly sunny, occasional afternoon showers.",
        pt: "22–30°C, muito sol, com pancadas de chuva à tarde.",
      },
    },
    {
      q: {
        de: "Welchen Dresscode gibt es für die Hochzeit?",
        en: "What's the dress code for the wedding?",
        pt: "Qual é o dress code?",
      },
      a: {
        de: "Festlich / elegant. Leichte Stoffe (Leinen, Viskose, Chiffon) sind sehr empfehlenswert.",
        en: "Smart/formal. Light fabrics (linen, viscose, chiffon) highly recommended.",
        pt: "Traje elegante / formal. Prefira tecidos leves como linho ou chiffon.",
      },
    },
    {
      q: {
        de: "Wie reise ich am besten an und was kostet es?",
        en: "How do I get there and what does it cost?",
        pt: "Como chegar a BH?",
      },
      a: {
        de: "Flüge typischerweise über São Paulo (GRU). Gesamtreisezeit ~16 h. Kosten: ca. 800–1.400 EUR hin und zurück.",
        en: "Flights via São Paulo (GRU) with a domestic connection (~1 h) to BH. Total ~16 h. EUR 800–1,400 return.",
        pt: "Voos internacionais via São Paulo, com conexão (~1 h) até BH.",
      },
    },
    {
      q: {
        de: "Wie teuer ist Brasilien?",
        en: "How expensive is Brazil?",
        pt: "Brasil é caro?",
      },
      a: {
        de: "Sehr günstig für Europäer. Restaurant-Mittag R$ 40–80, Uber R$ 15–40, Hotels ab R$ 150.",
        en: "Very affordable for Europeans. Restaurant lunch R$ 40–80, Uber R$ 15–40, hotels from R$ 150.",
        pt: "Almoço bom: R$ 40–80. Uber: R$ 15–40. Hotéis a partir de R$ 150.",
      },
    },
    {
      q: {
        de: "Ist Brasilien sicher?",
        en: "Is Brazil safe?",
        pt: "A cidade é segura?",
      },
      a: {
        de: "Savassi und Lourdes sind sehr sicher. Keine teuren Sachen tragen, immer Uber nehmen, Centro nachts meiden.",
        en: "Savassi and Lourdes are very safe. Avoid showing expensive items, always use Uber, avoid the Centro at night.",
        pt: "Savassi e Lourdes são muito seguros. Evite exibir objetos de valor e use sempre app de transporte.",
      },
    },
  ];

  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" style={{ background: "var(--bm-ivory2)" }}>
      <div className="bm-container">
        <span className="bm-eyebrow">FAQ</span>
        <h2 className="bm-title">{T({ de: "Häufige Fragen", en: "Frequently Asked Questions", pt: "Perguntas Frequentes" })}</h2>
        <div style={{ marginTop: "2rem" }}>
          {faqs.map((f, i) => (
            <div className="bm-faq-item" key={i}>
              <div
                className={`bm-faq-q ${open === i ? "open" : ""}`}
                onClick={() => setOpen(open === i ? null : i)}
              >
                {T(f.q)}
              </div>
              <div className={`bm-faq-a ${open === i ? "open" : ""}`}>
                <p>{T(f.a)}</p>
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
        <span className="bm-eyebrow">{T({ de: "Anmeldung", en: "RSVP", pt: "Confirmação" })}</span>
        <h2 className="bm-title">{T({ de: "Bitte meldet euch an!", en: "Please let us know you're coming!", pt: "Confirme sua presença!" })}</h2>
        <p className="bm-lead">
          {T({
            de: "Damit wir gut planen können, bitten wir um eine Rückmeldung bis zum angegebenen Datum.",
            en: "To help us plan, please confirm your attendance by the date below.",
            pt: "Pedimos que confirme sua presença até a data indicada.",
          })}
        </p>
        <a className="bm-rsvp-btn" href="mailto:eure-email@beispiel.de">
          {T({ de: "Jetzt zusagen", en: "Confirm attendance", pt: "Confirmar presença" })}
        </a>
        <div className="bm-contact-details">
          <div className="bm-contact-item">
            <div className="bm-ci-label">{T({ de: "Anmeldefrist", en: "RSVP by", pt: "Confirmar até" })}</div>
            <div className="bm-ci-value bm-placeholder">{T({ de: "TT.MM.JJJJ — wird bekannt gegeben", en: "DD/MM/YYYY — to be announced", pt: "DD/MM/AAAA — a confirmar" })}</div>
          </div>
          <div className="bm-contact-item">
            <div className="bm-ci-label">{T({ de: "WhatsApp-Gruppe", en: "WhatsApp group", pt: "Grupo WhatsApp" })}</div>
            <div className="bm-ci-value"><a href="#">{T({ de: "Link folgt", en: "Link coming soon", pt: "Link em breve" })}</a></div>
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
  const [lang, setLang] = useState<Lang>("de");
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <style>{CSS}</style>
      <Nav />
      <Hero />
      <WeddingDetails />
      <TravelSection />
      <VisaSection />
      <HealthSection />
      <HotelsSection />
      <DiscoverSection />
      <SafetySection />
      <TransportSection />
      <FoodSection />
      <PracticalSection />
      <FaqSection />
      <ContactSection />
      <footer className="bm-footer">
        <p>18. Oktober 2026 · Belo Horizonte, Brasil · Made with ♥</p>
      </footer>
    </LangCtx.Provider>
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

/* WEDDING DETAIL CARDS */
.bm-wedding-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1.5rem;margin-top:2rem;}
.bm-detail-card{background:#fff;border:1px solid var(--bm-ivory3);border-radius:3px;padding:1.8rem 1.5rem;text-align:center;}
.bm-detail-icon{font-size:1.6rem;margin-bottom:0.8rem;}
.bm-detail-card h3{font-family:'Cormorant Garamond',serif;font-size:1.05rem;color:var(--bm-green);font-weight:600;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:0.6rem;}
.bm-detail-card p{font-size:0.9rem;color:var(--bm-brown2);margin:0;line-height:1.5;}

/* ROWS */
.bm-rows{list-style:none;margin:1.5rem 0;padding:0;}
.bm-rows li{display:flex;gap:1rem;padding:0.75rem 0;border-bottom:1px solid var(--bm-ivory3);font-size:0.93rem;color:var(--bm-brown2);align-items:flex-start;}
.bm-rows li:last-child{border-bottom:none;}
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
