import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum und rechtliche Angaben der SicherMPU – b&b MPU-Beratung Drecker UG (haftungsbeschränkt), Düsseldorf.",
  alternates: { canonical: "/impressum" },
  robots: { index: false, follow: true },
};

export default function ImpressumPage() {
  return (
    <div className="container">
      <article className="legal">
        <span className="eyebrow">Rechtliche Angaben</span>
        <h1 className="h1">Impressum.</h1>

        <section>
          <h2 className="h2">Angaben gemäß § 5 TMG</h2>
          <p>
            b&amp;b MPU‑Beratung Drecker UG (haftungsbeschränkt){"\n"}
            Achillesstr. 10{"\n"}
            40545 Düsseldorf
          </p>
        </section>

        <section>
          <h2 className="h2">Vertreten durch</h2>
          <p>Geschäftsführer: Michael Drecker</p>
        </section>

        <section>
          <h2 className="h2">Kontakt</h2>
          <p>
            Telefon: +49 176 21914166{"\n"}
            E‑Mail: info@sichermpu.de{"\n"}
            Website: www.sichermpu.de
          </p>
        </section>

        <section>
          <h2 className="h2">Registereintrag</h2>
          <p>
            Eintragung im Handelsregister.{"\n"}
            Registergericht: [Name des zuständigen Amtsgerichts]{"\n"}
            Registernummer: [Handelsregisternummer]
          </p>
        </section>

        <section>
          <h2 className="h2">Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer‑Identifikationsnummer gemäß §27a Umsatzsteuergesetz:
            {"\n"}103/5714/2317
          </p>
        </section>

        <section>
          <h2 className="h2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>
            Michael Drecker{"\n"}
            Achillesstr. 10{"\n"}
            40545 Düsseldorf
          </p>
        </section>
      </article>
    </div>
  );
}
