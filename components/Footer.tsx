import Image from "next/image";
import Link from "next/link";
import { site, footerCols } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image
              src="/images/logo-blue-dark.png"
              alt="SicherMPU"
              width={1375}
              height={300}
            />
            <p>{site.tagline}</p>
          </div>

          <div>
            <h4>Seiten</h4>
            <ul>
              {footerCols.seiten.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Leistungen</h4>
            <ul>
              {footerCols.leistungen.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>Kontakt</h4>
            <ul>
              <li>
                <a href={`tel:${site.phoneE164}`}>{site.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>{site.street}</li>
              <li>{site.city}</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {site.name} · 2026 · Alle Rechte vorbehalten</span>
          <span>Made in Düsseldorf</span>
        </div>
      </div>
    </footer>
  );
}
