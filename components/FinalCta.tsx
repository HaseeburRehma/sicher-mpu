import Link from "next/link";
import { site } from "@/lib/site";

export default function FinalCta() {
  return (
    <section className="section warm">
      <div className="container cta-center">
        <span className="eyebrow">Nächster Schritt</span>
        <h2 className="h2">
          Erstgespräch – <span className="accent">kostenfrei.</span>
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
  );
}
