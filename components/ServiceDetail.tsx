import { ReactNode } from "react";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import FinalCta from "@/components/FinalCta";
import { site } from "@/lib/site";

type Meta = { label: string; value: string };
type Deliverable = { n: string; h: string; p: string };

export default function ServiceDetail({
  breadcrumb,
  eyebrow,
  title,
  lead,
  meta,
  contentTitle,
  content,
  deliverEyebrow,
  deliverTitle,
  deliverables,
  extra,
}: {
  breadcrumb: string;
  eyebrow: string;
  title: ReactNode;
  lead: string;
  meta: Meta[];
  contentTitle: ReactNode;
  content: ReactNode;
  deliverEyebrow: string;
  deliverTitle: ReactNode;
  deliverables: Deliverable[];
  extra?: ReactNode;
}) {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Start", item: site.url },
      { "@type": "ListItem", position: 2, name: "Leistungen", item: site.url },
      { "@type": "ListItem", position: 3, name: breadcrumb },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbLd} />

      <div className="container">
        <nav className="breadcrumb" aria-label="Brotkrumen">
          <Link href="/">Start</Link>
          <span className="slash">/</span>
          <span>Leistungen</span>
          <span className="slash">/</span>
          <span>{breadcrumb}</span>
        </nav>

        {/* HEADER */}
        <header className="detail-header">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="h1">{title}</h1>
            <p className="lead">{lead}</p>
          </div>
          <div className="meta-panel">
            {meta.map((m) => (
              <div className="meta-row" key={m.label}>
                <span className="mr-label">{m.label}</span>
                <span className="mr-value">{m.value}</span>
              </div>
            ))}
          </div>
        </header>
      </div>

      {/* CONTENT */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container detail-content">
          <div className="sticky">
            <h2 className="h2">{contentTitle}</h2>
          </div>
          <div className="detail-body">{content}</div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="section dark">
        <div className="container">
          <span className="eyebrow">{deliverEyebrow}</span>
          <h2 className="h2" style={{ marginTop: 18 }}>
            {deliverTitle}
          </h2>
          <div className="deliver-grid">
            {deliverables.map((d) => (
              <div className="deliver-item" key={d.n}>
                <span className="dnum">{d.n}</span>
                <h4 className="h4">{d.h}</h4>
                <p>{d.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {extra}

      <FinalCta />
    </>
  );
}
