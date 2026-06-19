import type { Metadata } from "next";
import Link from "next/link";
import ServiceDetail from "@/components/ServiceDetail";

export const metadata: Metadata = {
  title: "MPU Nachhilfe Düsseldorf & Online",
  description:
    "Fokussierte MPU Nachhilfe in Düsseldorf oder online. Stundenweise Coaching, Prüfungssimulation und Antwort-Schärfung – flexibel und ohne Vollbegleitung.",
  alternates: { canonical: "/nachhilfe" },
};

const deliverables = [
  {
    n: "I",
    h: "Themen‑Coaching",
    p: "Vertiefte Übung zu deinen MPU‑relevanten Themen – Alkohol, Drogen, Punkte oder Aggression.",
  },
  {
    n: "II",
    h: "Prüfungssimulation",
    p: "Realistische Frage‑Antwort‑Übungen unter Prüfungsbedingungen – mit ehrlichem Feedback.",
  },
  {
    n: "III",
    h: "Antwort‑Schärfung",
    p: "Wir hören dir zu wie du deine Geschichte erzählst – und sagen dir wo es noch hakt.",
  },
  {
    n: "IV",
    h: "Schwachstellen‑Analyse",
    p: "Identifikation der Bereiche in denen du noch unsicher wirkst – plus konkrete Übungs‑Empfehlungen.",
  },
  {
    n: "V",
    h: "Online oder vor Ort",
    p: "Maximale Flexibilität: in Düsseldorf vor Ort oder per gesichertem Videocall – du wählst.",
  },
  {
    n: "VI",
    h: "Stundenweise Buchung",
    p: "Bezahle nur was du brauchst. Einzelne Sitzungen oder Pakete – ohne langfristige Bindung.",
  },
];

export default function NachhilfePage() {
  return (
    <ServiceDetail
      breadcrumb="MPU Nachhilfe"
      eyebrow="Leistung 02 · Selbstvorbereitung"
      title={
        <>
          MPU <span className="accent">Nachhilfe.</span>
        </>
      }
      lead="Fokussiertes Coaching für alle die sich selbst auf die MPU vorbereiten und gezielt einzelne Themen vertiefen wollen. Schlank, flexibel, stundenweise – vor Ort in Düsseldorf oder online."
      meta={[
        { label: "Format", value: "Stundenweise" },
        { label: "Ort", value: "Vor Ort & Online" },
        { label: "Dauer", value: "Pro Sitzung 60–90 Min" },
        { label: "Buchung", value: "Einzeln oder Paket" },
        { label: "Begleitung", value: "Coaching, keine Vollbegleitung" },
      ]}
      contentTitle={
        <>
          Für wen das <span className="accent">passt.</span>
        </>
      }
      content={
        <>
          <p>
            Nicht jeder braucht das volle Programm. Manche Menschen wissen schon
            sehr genau wo sie stehen, haben bereits an ihrer Geschichte
            gearbeitet und brauchen vor allem eines: jemanden der ihre Antworten
            kritisch spiegelt und ihnen sagt wo sie noch nachschärfen müssen.
          </p>
          <p>
            Genau dafür gibt es die MPU Nachhilfe. Du kommst mit deinen eigenen
            Themen und deinem eigenen Vorbereitungsstand – wir üben, simulieren
            und reflektieren gezielt das was du brauchst. Keine Vollbegleitung,
            keine Aktenanalyse, kein Anwalt im Hintergrund. Nur die Übung selbst.
          </p>
          <div className="detail-pull">
            <p>
              Du machst die Vorbereitung. Wir liefern den Sparringspartner der
              deine Antworten ehrlich auseinandernimmt – bevor es der Gutachter
              tut.
            </p>
          </div>
          <p>
            Du buchst einzelne Stunden oder ein Paket aus mehreren Sitzungen.
            Jede Sitzung dauert 60 bis 90 Minuten und folgt deiner Agenda. Du
            entscheidest welches Thema dran ist – Alkohol, Drogen, Punkte,
            Aggression, oder ein spezifischer Aspekt aus deiner Akte.
          </p>
          <p>
            Sitzungen finden in unserem Büro in Düsseldorf statt oder per
            Videocall. Das macht die Nachhilfe auch für Klienten außerhalb von
            NRW erreichbar – ohne Kompromisse bei der Qualität.
          </p>
        </>
      }
      deliverEyebrow="Was du bekommst"
      deliverTitle={
        <>
          Inhalte der <span className="accent">Nachhilfe.</span>
        </>
      }
      deliverables={deliverables}
      extra={
        <section className="section">
          <div className="container">
            <div className="crosslink">
              <span className="eyebrow">Zur Orientierung</span>
              <h2 className="h2">
                Nachhilfe oder <span className="accent">Vollbegleitung?</span>
              </h2>
              <p>
                Wenn du dir unsicher bist welcher Weg zu dir passt: Bei der
                Nachhilfe steht die reine Übung im Vordergrund. Wenn du
                zusätzlich Anwälte, Aktenanalyse und Ärzte an deiner Seite haben
                willst – und nur bei Erfolg voll zahlen möchtest – ist die{" "}
                <Link href="/beratung" className="inline">
                  MPU Beratung 1‑zu‑1
                </Link>{" "}
                der bessere Weg.
              </p>
              <p>
                Im kostenfreien Erstgespräch finden wir gemeinsam heraus was zu
                dir passt.
              </p>
              <Link href="/beratung" className="link-arrow">
                Zur MPU Beratung 1‑zu‑1 <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </section>
      }
    />
  );
}
