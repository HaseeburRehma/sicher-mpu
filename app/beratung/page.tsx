import type { Metadata } from "next";
import ServiceDetail from "@/components/ServiceDetail";

export const metadata: Metadata = {
  title: "MPU Beratung 1-zu-1 Düsseldorf",
  description:
    "Persönliche MPU Vollbegleitung in Düsseldorf – 1-zu-1 durch Anwälte, Ärzte und Psychologen. Aktenanalyse, Prüfungssimulation, Restzahlung erst nach bestandener MPU.",
  alternates: { canonical: "/beratung" },
};

const deliverables = [
  {
    n: "I",
    h: "Aktenanalyse",
    p: "Vollständige Auswertung deiner Führerscheinakte zur Identifikation der voraussichtlichen Prüfungsthemen.",
  },
  {
    n: "II",
    h: "Individueller Fahrweg",
    p: "Persönlicher Plan zur Erarbeitung deiner Verhaltensänderung – Schritt für Schritt.",
  },
  {
    n: "III",
    h: "Prüfungssimulation",
    p: "Realistische Übungs-Gespräche unter Prüfungsbedingungen mit anschließender Detail-Auswertung.",
  },
  {
    n: "IV",
    h: "Digitales Feedback",
    p: "Persönliche Rückmeldungen per Video oder Text – auch zwischen den Sitzungen verfügbar.",
  },
  {
    n: "V",
    h: "Anwaltliche Begleitung",
    p: "Bei Bedarf juristische Unterstützung durch unser Anwalts-Netzwerk – nahtlos integriert.",
  },
  {
    n: "VI",
    h: "Behördenkommunikation",
    p: "Direkte Abstimmung mit den Straßenverkehrsbehörden – über bestehende Kontakte und Verfahren.",
  },
];

export default function BeratungPage() {
  return (
    <ServiceDetail
      breadcrumb="MPU Beratung 1-zu-1"
      eyebrow="Leistung 01 · Vollbegleitung"
      title={
        <>
          MPU Beratung
          <br />
          <span className="accent">1-zu-1.</span>
        </>
      }
      lead="Persönliche Vollbegleitung durch die medizinisch-psychologische Untersuchung – ausschließlich vor Ort in unserem Büro in Düsseldorf. Keine Massenkurse, keine Videoschulungen. Du und dein Berater."
      meta={[
        { label: "Format", value: "1-zu-1" },
        { label: "Ort", value: "Nur vor Ort" },
        { label: "Dauer", value: "Nach Bedarf" },
        { label: "Zahlung", value: "Erfolgsbasiert" },
        { label: "Erfolgsquote", value: "99 %" },
      ]}
      contentTitle={
        <>
          Was du <span className="accent">bekommst.</span>
        </>
      }
      content={
        <>
          <p>
            Die MPU ist keine Prüfung über Wissen. Sie ist eine Prüfung über
            Selbstreflexion, Verhaltensänderung und Glaubwürdigkeit. Genau dort
            setzen wir an.
          </p>
          <p>
            Jeder Fall wird individuell aufgenommen. Wir analysieren deine
            Führerscheinakte, identifizieren die kritischen Punkte, und
            entwickeln gemeinsam eine ehrliche Erzählung deiner Veränderung.
            Diese Erzählung wird in unzähligen Übungen geschärft – bis sie
            sitzt.
          </p>
          <div className="detail-pull">
            <p>
              Wir bringen dich nicht dazu auswendig zu lernen. Wir bringen dich
              dazu zu verstehen warum was passiert ist – und das souverän zu
              erklären.
            </p>
          </div>
          <p>
            Über die ganze Vorbereitung hinweg simulieren wir prüfungsrelevante
            Fragen. Die Antworten werden analysiert und sofort persönlich, per
            Video oder Text mit konkreten Verbesserungsvorschlägen
            zurückgespiegelt – digital und direkt verfügbar.
          </p>
          <p>
            Bei Untersuchungen wegen Drogen begleiten wir dich zusätzlich beim
            Aufbau der Abstinenznachweise und stimmen das Vorgehen mit
            anerkannten Psychiatern ab.
          </p>
        </>
      }
      deliverEyebrow="Im Detail"
      deliverTitle={
        <>
          Was wir konkret <span className="accent">liefern.</span>
        </>
      }
      deliverables={deliverables}
    />
  );
}
