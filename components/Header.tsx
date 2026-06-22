"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="header">
        <div className="container header-inner">
        <Link href="/" className="logo" aria-label="SicherMPU Startseite">
          <Image
            src="/images/logo-blue.png"
            alt="SicherMPU"
            width={1375}
            height={300}
            priority
          />
        </Link>

        <nav className="nav" aria-label="Hauptnavigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link${pathname === item.href ? " active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/kontakt" className="btn btn-primary">
            Termin vereinbaren <span className="arrow">→</span>
          </Link>
        </nav>

        <button
          className={`hamburger${open ? " open" : ""}`}
          aria-label="Menü öffnen"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
        </div>
      </header>

      <div className={`mobile-menu${open ? " open" : ""}`}>
        {nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <Link href="/kontakt" className="btn btn-primary">
          Termin vereinbaren <span className="arrow">→</span>
        </Link>
      </div>
    </>
  );
}
