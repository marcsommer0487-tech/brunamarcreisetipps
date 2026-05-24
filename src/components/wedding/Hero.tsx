import { useEffect, useState } from "react";
import logo from "@/assets/bm-logo.png";

type Lang = "de" | "en" | "pt";

const t: Record<Lang, Record<string, string>> = {
  de: {
    tagline: "Wir laden euch herzlich ein",
    date: "Sonntag, 18. Oktober 2026",
    days: "Tage", hours: "Stunden", mins: "Minuten", secs: "Sekunden",
    scroll: "Mehr erfahren",
  },
  en: {
    tagline: "We warmly invite you",
    date: "Sunday, October 18, 2026",
    days: "Days", hours: "Hours", mins: "Minutes", secs: "Seconds",
    scroll: "Scroll to explore",
  },
  pt: {
    tagline: "Com grande alegria, convidamos vocês",
    date: "Domingo, 18 de outubro de 2026",
    days: "Dias", hours: "Horas", mins: "Minutos", secs: "Segundos",
    scroll: "Role para baixo",
  },
};

const TARGET = new Date("2026-10-18T16:00:00-03:00").getTime();

export function Hero() {
  const [lang, setLang] = useState<Lang>("de");
  const [cd, setCd] = useState({ d: "--", h: "--", m: "--", s: "--" });

  useEffect(() => {
    const tick = () => {
      const diff = TARGET - Date.now();
      if (diff <= 0) { setCd({ d: "0", h: "0", m: "0", s: "0" }); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCd({ d: String(d), h: String(h), m: String(m), s: String(s) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const tr = t[lang];

  return (
    <section className="bm-hero">
      <style>{css}</style>
      <nav className="bm-nav">
        <span className="bm-nav-logo">18.10.2026</span>
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
      </nav>

      <img className="bm-hero-logo" src={logo} alt="Bruna & Marc" />
      <p className="bm-hero-tagline">{tr.tagline}</p>
      <h1 className="bm-hero-script">
        Bruna <span className="bm-amp">&amp;</span> Marc
      </h1>
      <div className="bm-ornament">— ✦ —</div>
      <p className="bm-hero-date">{tr.date}</p>
      <p className="bm-hero-location">Belo Horizonte · Minas Gerais · Brasil 🇧🇷</p>

      <div className="bm-countdown">
        <Unit n={cd.d} l={tr.days} />
        <span className="bm-dot">·</span>
        <Unit n={cd.h} l={tr.hours} />
        <span className="bm-dot">·</span>
        <Unit n={cd.m} l={tr.mins} />
        <span className="bm-dot">·</span>
        <Unit n={cd.s} l={tr.secs} />
      </div>

      <a href="#rest" className="bm-scroll-hint">
        <span>{tr.scroll}</span>
        <span className="bm-scroll-arrow" />
      </a>
    </section>
  );
}

function Unit({ n, l }: { n: string; l: string }) {
  return (
    <div className="bm-cd-unit">
      <span className="bm-cd-num">{n}</span>
      <span className="bm-cd-label">{l}</span>
    </div>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Lato:wght@300;400;700&family=Great+Vibes&display=swap');
.bm-hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;background:#1B4332;padding:7rem 2rem 4rem;position:relative;overflow:hidden;color:#fff;font-family:'Lato',sans-serif;}
.bm-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 20% 50%,rgba(64,145,108,0.25) 0%,transparent 60%),radial-gradient(ellipse at 80% 20%,rgba(184,150,46,0.12) 0%,transparent 50%);pointer-events:none;}
.bm-nav{position:absolute;top:0;left:0;right:0;z-index:10;background:rgba(15,40,25,0.96);backdrop-filter:blur(12px);padding:0.9rem 2.5rem;display:flex;justify-content:space-between;align-items:center;}
.bm-nav-logo{font-family:'Great Vibes',cursive;font-size:1.6rem;color:#D4AF61;letter-spacing:0.02em;}
.bm-lang{display:flex;gap:0.4rem;}
.bm-lang-btn{background:none;border:1px solid rgba(255,255,255,0.25);color:rgba(255,255,255,0.6);padding:0.28rem 0.65rem;cursor:pointer;font-size:0.75rem;letter-spacing:0.08em;border-radius:2px;font-family:'Lato',sans-serif;transition:all 0.2s;}
.bm-lang-btn:hover,.bm-lang-btn.active{background:#B8962E;border-color:#B8962E;color:#fff;}
.bm-hero-logo{width:clamp(180px,28vw,320px);height:auto;margin-bottom:2rem;filter:brightness(0) saturate(100%) invert(78%) sepia(38%) saturate(548%) hue-rotate(8deg) brightness(95%) contrast(88%);position:relative;z-index:1;}
.bm-hero-tagline{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:clamp(1rem,2.5vw,1.35rem);color:rgba(255,255,255,0.6);font-weight:300;margin-bottom:0.8rem;letter-spacing:0.04em;}
.bm-hero-script{font-family:'Great Vibes',cursive;font-size:clamp(3.2rem,9vw,6.5rem);color:#D4AF61;line-height:1.05;margin-bottom:0.4rem;font-weight:400;}
.bm-amp{color:#F0D080;font-size:0.85em;}
.bm-ornament{color:#B8962E;font-size:1rem;letter-spacing:0.8rem;margin-bottom:3rem;opacity:0.6;}
.bm-hero-date{font-size:0.8rem;color:rgba(255,255,255,0.9);letter-spacing:0.22em;text-transform:uppercase;margin-bottom:0.35rem;}
.bm-hero-location{font-size:0.75rem;color:rgba(255,255,255,0.45);letter-spacing:0.2em;text-transform:uppercase;margin-bottom:3.5rem;}
.bm-countdown{display:flex;align-items:center;gap:1.5rem;}
.bm-cd-unit{text-align:center;}
.bm-cd-num{font-family:'Cormorant Garamond',serif;font-size:clamp(2.5rem,5vw,3.8rem);font-weight:300;color:#fff;line-height:1;display:block;}
.bm-cd-label{font-size:0.65rem;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-top:0.3rem;display:block;}
.bm-dot{font-family:'Cormorant Garamond',serif;font-size:2rem;color:#D4AF61;align-self:flex-start;margin-top:0.5rem;opacity:0.6;}
.bm-scroll-hint{position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:0.5rem;color:rgba(255,255,255,0.3);font-size:0.7rem;letter-spacing:0.15em;text-transform:uppercase;text-decoration:none;animation:bm-bounce 2s infinite;}
@keyframes bm-bounce{0%,100%{transform:translateX(-50%) translateY(0);}50%{transform:translateX(-50%) translateY(6px);}}
.bm-scroll-arrow{width:18px;height:10px;border-bottom:1px solid rgba(255,255,255,0.3);border-right:1px solid rgba(255,255,255,0.3);transform:rotate(45deg);margin-top:-6px;}
`;
