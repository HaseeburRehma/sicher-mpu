import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt · Kostenfreies Erstgespräch",
  description:
    "Kostenfreies MPU Erstgespräch in Düsseldorf. Erzähl uns wo du stehst – wir klären ehrlich was möglich ist. Ausschließlich vor Ort, keine Online-Beratung.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <div className="container">
        <nav className="breadcrumb" aria-label="Brotkrumen">
          <Link href="/">Start</Link>
          <span className="slash">/</span>
          <span>Kontakt</span>
        </nav>

        <header className="detail-header contact-header" style={{ paddingBottom: 20 }}>
          <div>
            <span className="eyebrow">Erstgespräch · Kostenfrei</span>
            <h1 className="h1">
              Lass uns reden.
              <br />
              <span className="accent">Ohne Vorab-Kosten.</span>
            </h1>
            <p className="lead">
              Erzähl uns kurz wo du stehst. Im kostenfreien Erstgespräch klären
              wir ehrlich was möglich ist und wie wir dich am schnellsten zum
              Erfolg bringen.
            </p>
          </div>
        </header>
      </div>

      <section style={{ paddingBottom: "var(--section-y)" }}>
        <div className="container contact-grid">
          <ContactForm />

          <aside className="info-card">
            <h3 className="h3">Direkter Kontakt.</h3>
            <div className="info-rows">
              <div className="info-row">
                <div className="ir-label">Telefon</div>
                <div className="ir-value">
                  <a href={`tel:${site.phoneE164}`}>{site.phone}</a>
                </div>
                <div className="ir-note">Erreichbar Mo–Fr · 9 – 18 Uhr</div>
              </div>
              <div className="info-row">
                <div className="ir-label">E-Mail</div>
                <div className="ir-value">
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </div>
                <div className="ir-note">Antwort innerhalb von 24 Std.</div>
              </div>
              <div className="info-row">
                <div className="ir-label">Adresse</div>
                <div className="ir-value">{site.street}</div>
                <div className="ir-note">{site.city}</div>
              </div>
              <div className="info-row">
                <div className="ir-label">Termine</div>
                <div className="ir-value">Nur nach Vereinbarung</div>
              </div>
            </div>
            <div className="info-flag">
              Ausschließlich vor Ort. Keine Online-Beratung.
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
