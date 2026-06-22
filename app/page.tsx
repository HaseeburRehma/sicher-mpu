import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";

// Show the real founder portrait once it's added to public/images,
// otherwise fall back to the monogram placeholder.
const FOUNDER_PHOTO = "/images/natascha-bauer.jpg";

const services = [
  {
    idx: "01 · Vollbegleitung",
    title: "MPU Beratung 1-zu-1",
    desc: "Persönliche Vollbegleitung durch Anwälte, Ärzte und Psychologen. Aktenanalyse, Vorbereitung, Prüfungssimulation, Restzahlung erst nach Bestehen. Ausschließlich vor Ort in Düsseldorf.",
    href: "/beratung",
  },
  {
    idx: "02 · Nachhilfe",
    title: "MPU Nachhilfe",
    desc: "Fokussiertes Coaching für Selbstvorbereiter – inhaltliche Übung, Prüfungssimulation, gezielte Aufarbeitung einzelner Themen. Vor Ort oder online buchbar, stundenweise.",
    href: "/nachhilfe",
  },
  {
    idx: "03 · Gruppe",
    title: "Gruppenseminare",
    desc: "Strukturierte Vorbereitung in Kleingruppen für ausgewählte Themenfelder – ergänzend zu Beratung oder Nachhilfe.",
  },
  {
    idx: "04 · Ärztlich",
    title: "Ärztliche Untersuchungs-Vorbereitung",
    desc: "Spezielle Vorbereitung für ärztliche Untersuchungen – auch für Cannabispatienten und ähnliche Konstellationen.",
  },
  {
    idx: "05 · Sperrfrist",
    title: "Bericht zur Sperrfristverkürzung",
    desc: "Professionell erstellter Bericht zur Vorlage bei der Führerscheinstelle zur Verkürzung der Sperrfrist.",
  },
  {
    idx: "06 · § 64 StGB",
    title: "MPU bei Abhängigkeitsdiagnose nach § 64",
    desc: "Zertifizierte Begleitung bei Strafauffälligkeit mit Abhängigkeitsdiagnose. Anerkennung von 6 Monaten Abstinenz durch Therapie möglich.",
  },
  {
    idx: "07 · § 35 StGB",
    title: "MPU bei Abhängigkeitsdiagnose nach § 35",
    desc: "Spezialisierte Vorbereitung im Rahmen einer Therapie. Eng abgestimmt mit anerkannten Psychiatern und der Behörde.",
  },
  {
    idx: "08 · Aggression",
    title: "Anti-Aggressions-Training",
    desc: "Strukturiertes Training für Klienten mit auffälligem Verhalten – wird bei vielen MPU-Begutachtungen positiv gewichtet.",
  },
];

const processSteps = [
  {
    n: "I",
    h: "Erstgespräch",
    p: "Kostenfrei und unverbindlich. Wir hören zu, schauen uns deine Situation an und sagen dir ehrlich was möglich ist.",
  },
  {
    n: "II",
    h: "Aktenanalyse",
    p: "Wir werten deine Führerscheinakte aus und leiten daraus die voraussichtlichen Prüfungsfragen ab.",
  },
  {
    n: "III",
    h: "Vorbereitung",
    p: "Individuelle 1-zu-1 Sessions, Prüfungssimulation, persönliche Auswertung – digital und vor Ort.",
  },
  {
    n: "IV",
    h: "MPU bestehen",
    p: "Du gehst sicher in die Untersuchung.",
  },
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    image: `${site.url}/images/logo.png`,
    url: site.url,
    telephone: site.phoneE164,
    email: site.email,
    priceRange: "€€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      postalCode: "40474",
      addressLocality: "Düsseldorf",
      addressCountry: "DE",
    },
    areaServed: "Düsseldorf",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/images/logo.png`,
    founder: { "@type": "Person", name: site.founder },
    areaServed: "Düsseldorf",
  },
];

export default function Home() {
  const hasFounderPhoto = fs.existsSync(
    path.join(process.cwd(), "public", FOUNDER_PHOTO)
  );

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">MPU Beratung · Düsseldorf · Seit 2015</span>
            <h1 className="h1">
              Den Führerschein
              <br />
              <span className="accent">zurückholen.</span>
              <br />
              Mit Strategie statt Stress.
            </h1>
            <p className="lead">
              1-zu-1 Beratung in Düsseldorf durch ein erfahrenes Team aus
              Anwälten, Psychologen und Ärzten. Persönlich – nie online. Du
              zahlst den Restbetrag erst nach bestandener Prüfung.
            </p>
            <div className="hero-cta">
              <Link href="/kontakt" className="btn btn-primary">
                Kostenfreies Erstgespräch <span className="arrow">→</span>
              </Link>
              <a href={`tel:${site.phoneE164}`} className="btn btn-secondary">
                ☏ {site.phone}
              </a>
            </div>
          </div>

          <div className="stat-card">
            <span className="eyebrow">Erfolgsquote</span>
            <div className="stat-big">
              99<sup>%</sup>
            </div>
            <p className="stat-note">
              Über 95 Klienten mit perfekter 5-Sterne-Bewertung. Erfahrene
              Begleitung durch jeden Schritt der medizinisch-psychologischen
              Untersuchung.
            </p>
            <div className="stat-metrics">
              <div>
                <div className="num">10+</div>
                <div className="lbl">Jahre Erfahrung</div>
              </div>
              <div>
                <div className="num">10+</div>
                <div className="lbl">Experten im Team</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <div>
              <span className="eyebrow">Der Ablauf</span>
              <h2 className="h2">
                Vier Schritte <span className="accent">zur Mobilität.</span>
              </h2>
            </div>
            <p className="lead">
              Jeder Fall ist anders. Unser Vorgehen folgt aber immer der
              gleichen, bewährten Struktur – damit du weißt was als nächstes
              kommt und nichts dem Zufall überlassen wird.
            </p>
          </div>

          <div className="process-grid">
            {processSteps.map((s) => (
              <div className="proc-step" key={s.n}>
                <span className="proc-num">{s.n}</span>
                <h3 className="h3">{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER — JOHANN BÄR */}
      <section className="section">
        <div className="container founder-grid partner-grid">
          <div className="founder-photo">
            <Image
              src="/images/johann-baer.jpg"
              alt="Johann Bär – Partner und Diplom-Psychologe"
              fill
              sizes="(max-width: 980px) 100vw, 40vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div>
            <span className="eyebrow">Partner · Psychologische Begleitung</span>
            <div className="partner-quote">
              <h2 className="h2 partner-heading">Tiefe wo es nötig ist.</h2>
              <p className="lead" style={{ marginTop: 18 }}>
                Als diplomierter Psychologe, systemischer Coach und
                Entspannungspädagoge ergänzt Johann Bär unser Team mit
                psychologischer Tiefe und einer ruhigen, klaren
                Gesprächsführung. Er begleitet unsere Klienten bei der
                Aufarbeitung der Ursachen hinter dem Verhalten und unterstützt
                gezielt bei der Vorbereitung auf die psychologische Komponente
                der MPU. Durch seine Zweisprachigkeit in Deutsch und Russisch
                betreut er auch russischsprachige Klienten ohne Sprachbarriere.
              </p>
            </div>
            <div className="founder-name" style={{ marginTop: 30 }}>
              Johann Bär
            </div>
            <div className="founder-title">
              Dipl. Psychologe · Systemischer Coach · Entspannungspädagoge ·
              Deutsch &amp; Russisch
            </div>
            <Image
              src="/images/johann-baer-logo.jpg"
              alt="Johann Bär"
              width={254}
              height={180}
              className="partner-logo"
            />
          </div>
        </div>
      </section>

      {/* TWO PATHS */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <div>
              <span className="eyebrow">Zwei Wege</span>
              <h2 className="h2">
                Was passt <span className="accent">zu dir?</span>
              </h2>
            </div>
            <p className="lead">
              Wir bieten zwei klare Wege durch die MPU. Die Vollbegleitung für
              alle die sich rundum sicher aufgehoben fühlen wollen – und die
              Nachhilfe für Selbstvorbereiter die gezielt einzelne Themen
              schärfen möchten.
            </p>
          </div>

          <div className="paths-grid">
            <Link href="/beratung" className="path-card featured">
              <span className="tag">Weg 01 · Vollbegleitung</span>
              <h3>
                MPU Beratung <span className="accent">1-zu-1.</span>
              </h3>
              <p className="sub">
                Komplettpaket mit Anwälten, Ärzten und Psychologen. Wir
                übernehmen den ganzen Weg – von Aktenanalyse bis zur bestandenen
                MPU.
              </p>
              <ul className="path-list">
                <li><span className="b">·</span> Persönliche Begleitung durch das gesamte Team</li>
                <li><span className="b">·</span> Vollständige Aktenanalyse und Strategie</li>
                <li><span className="b">·</span> Prüfungssimulation mit Auswertung</li>
                <li><span className="b">·</span> Anwaltliche und ärztliche Unterstützung inklusive</li>
                <li><span className="b">·</span> Restzahlung erst nach bestandener MPU</li>
              </ul>
              <div className="path-meta">
                <div>
                  <div className="pm-label">Format</div>
                  <div className="pm-value">1-zu-1</div>
                </div>
              </div>
              <span className="link-arrow">
                Beratung ansehen <span className="arrow">→</span>
              </span>
            </Link>

            <Link href="/nachhilfe" className="path-card">
              <span className="tag">Weg 02 · Selbstvorbereitung</span>
              <h3>
                MPU <span className="accent">Nachhilfe.</span>
              </h3>
              <p className="sub">
                Fokussiertes Coaching für alle die sich selbst vorbereiten und
                gezielt einzelne Themen üben wollen. Schlank, flexibel,
                stundenweise.
              </p>
              <ul className="path-list">
                <li><span className="b">·</span> Inhaltliche Übung zu deinen MPU-Themen</li>
                <li><span className="b">·</span> Prüfungssimulation und Feedback</li>
                <li><span className="b">·</span> Gezielte Aufarbeitung schwieriger Fragen</li>
                <li><span className="b">·</span> Stundenweise buchbar, keine Vollbegleitung</li>
                <li><span className="b">·</span> Flexibel: vor Ort in Düsseldorf oder online</li>
              </ul>
              <div className="path-meta">
                <div>
                  <div className="pm-label">Format</div>
                  <div className="pm-value">Stundenweise</div>
                </div>
                <div>
                  <div className="pm-label">Ort</div>
                  <div className="pm-value">Vor Ort &amp; Online</div>
                </div>
              </div>
              <span className="link-arrow">
                Nachhilfe ansehen <span className="arrow">→</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section dark">
        <div className="container">
          <div className="sec-head">
            <div>
              <span className="eyebrow">Leistungen</span>
              <h2 className="h2">
                Mehr als nur <span className="accent">Vorbereitung.</span>
              </h2>
            </div>
            <p className="lead">
              Unser Team aus Anwälten, Psychologen und Ärzten begleitet jeden
              Fall – von der Standard-MPU bis zur komplexen Begutachtung mit
              Abhängigkeitsdiagnose.
            </p>
          </div>

          <div className="services-grid">
            {services.map((s) =>
              s.href ? (
                <Link
                  key={s.idx}
                  href={s.href}
                  className="service-card clickable"
                >
                  <div className="idx">{s.idx}</div>
                  <h3 className="h3">{s.title}</h3>
                  <p>{s.desc}</p>
                  <span className="more">
                    Mehr erfahren <span className="arrow">→</span>
                  </span>
                </Link>
              ) : (
                <div key={s.idx} className="service-card">
                  <div className="idx">{s.idx}</div>
                  <h3 className="h3">{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="section warm">
        <div className="container">
          <div className="sec-head">
            <div>
              <span className="eyebrow">Der Unterschied</span>
              <h2 className="h2">
                Nicht jede Vorbereitung <span className="accent">ist gleich.</span>
              </h2>
            </div>
            <p className="lead">
              Standardvorlagen und Massenabfertigung gibt es genug. Wir machen
              das Gegenteil: maßgeschneiderte Begleitung durch echte Experten –
              mit dem klaren Versprechen dass du nur bei Erfolg vollständig
              zahlst.
            </p>
          </div>

          <div className="compare-grid">
            <div className="compare-card good">
              <span className="ctag">SicherMPU</span>
              <h3 className="h3">Individuell. Persönlich. Erfolgsbasiert.</h3>
              <ul className="compare-list">
                <li><span className="plus">+</span> Maßgeschneidertes Programm auf Basis deiner Führerscheinakte</li>
                <li><span className="plus">+</span> 1-zu-1 Betreuung durch Anwälte, Ärzte und Psychologen</li>
                <li><span className="plus">+</span> Persönliche Sitzungen in unserem Büro in Düsseldorf</li>
                <li><span className="plus">+</span> Prüfungssimulation mit individueller Auswertung</li>
                <li><span className="plus">+</span> Restbetrag wird erst nach bestandener MPU fällig</li>
                <li><span className="plus">+</span> Mitglied im Berufsverband deutscher Psychologinnen und Psychologen</li>
              </ul>
            </div>

            <div className="compare-card bad">
              <span className="ctag">Standard-Anbieter</span>
              <h3 className="h3">Theorie. Vorlagen. Vorkasse.</h3>
              <ul className="compare-list">
                <li><span className="dot">·</span> Standardisierte Module für alle Klienten gleich</li>
                <li><span className="dot">·</span> Reine Theorieschulung, kaum praktische Übung</li>
                <li><span className="dot">·</span> Häufig Online-Kurse statt persönlicher Begleitung</li>
                <li><span className="dot">·</span> Volle Vorkasse vor Beginn der Arbeit</li>
                <li><span className="dot">·</span> Quantität statt Qualität, wenig individuelle Unterstützung</li>
                <li><span className="dot">·</span> Veraltete Methoden und oberflächliche Betreuung</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* RISK-FREE PAYMENT */}
      <section className="section dark risk">
        <span className="risk-watermark" aria-hidden="true">€</span>
        <div className="container risk-grid">
          <div>
            <span className="eyebrow">Zahlung</span>
            <h2 className="h2">
              Erst zahlen wenn du <span className="accent">bestanden</span> hast.
            </h2>
            <p>
              Wir sind so überzeugt von unserer Arbeit dass du nur einen
              Teilbetrag im Voraus zahlst. Den Rest erst dann wenn dein
              Führerschein wieder in deiner Hand ist.
            </p>
            <p>
              Kein finanzielles Risiko. Kein Druck. Volle Konzentration auf das
              was zählt: deine MPU.
            </p>
            <p className="caption" style={{ marginTop: 24 }}>
              Erfolgsbasierte Zahlung gilt für die MPU Beratung 1-zu-1.
            </p>
          </div>

          <div className="risk-split">
            <div className="risk-col">
              <div className="pm-label">Teil 1</div>
              <div className="pm-value">Anfang</div>
              <p className="pm-note">
                Beim Start der Vorbereitung – fairer Teilbetrag.
              </p>
            </div>
            <div className="risk-col">
              <div className="pm-label">Teil 2</div>
              <div className="pm-value">Bestanden</div>
              <p className="pm-note">
                Erst nach erfolgreicher MPU. Vorher zahlst du nichts mehr.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="section">
        <div className="container founder-grid">
          <div className="founder-photo">
            {hasFounderPhoto ? (
              <Image
                src={FOUNDER_PHOTO}
                alt="Natascha Bauer – Gründerin von SicherMPU"
                fill
                sizes="(max-width: 980px) 100vw, 40vw"
                style={{ objectFit: "cover" }}
                priority
              />
            ) : (
              <>
                <span className="initials">NB</span>
                <span className="ph-caption">Natascha Bauer · Foto</span>
              </>
            )}
          </div>
          <div>
            <span className="eyebrow">Gründerin &amp; Beraterin</span>
            <blockquote className="blockquote">
              <p>
                Ein Neuanfang ist immer möglich. Meine Aufgabe ist es dafür zu
                sorgen dass du diesen Neuanfang vorbereitet, ehrlich und mit
                klarem Kopf gehst.
              </p>
            </blockquote>
            <div className="founder-name">Natascha Bauer</div>
            <div className="founder-title">
              Gründerin · Beraterin · 10+ Jahre Erfahrung
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="cta-strip">
        <div className="container cta-inner">
          <h2 className="h2">
            Bereit den <span className="accent">nächsten Schritt</span> zu gehen?
          </h2>
          <div className="cta-buttons">
            <Link href="/kontakt" className="btn btn-primary">
              Termin vereinbaren <span className="arrow">→</span>
            </Link>
            <a href={`tel:${site.phoneE164}`} className="btn btn-secondary">
              ☏ {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
