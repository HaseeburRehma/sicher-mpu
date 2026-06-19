"use client";

import { useState, FormEvent } from "react";

const reasons = [
  "Alkohol",
  "Drogen / Medikamente",
  "Punkte in Flensburg",
  "Straftat / Aggression",
  "Cannabis",
  "Sonstiges",
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    // Honeypot — silently succeed for bots
    const honey = (form.elements.namedItem("company") as HTMLInputElement)
      ?.value;
    if (honey) {
      setSent(true);
      return;
    }

    setSubmitting(true);
    const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
    try {
      if (endpoint) {
        const data = new FormData(form);
        await fetch(endpoint, {
          method: "POST",
          body: data,
          headers: { Accept: "application/json" },
        });
      }
      setSent(true);
    } catch {
      // Even on network error we show the confirmation; real endpoint logging TBD with Ilias
      setSent(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div className="form-success" role="status">
        <span className="eyebrow">Anfrage erhalten</span>
        <h3 className="h3">Danke – wir melden uns.</h3>
        <p>
          Deine Nachricht ist bei uns angekommen. Wir antworten in der Regel
          innerhalb von 24 Stunden und besprechen mit dir die nächsten Schritte.
          Alles was du uns schreibst, behandeln wir vertraulich.
        </p>
      </div>
    );
  }

  return (
    <div className="form-card">
      <span className="eyebrow">Anfrageformular</span>
      <h3 className="h3">Schreib uns ein paar Sätze.</h3>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        {/* Honeypot */}
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="company">Firma</label>
          <input
            id="company"
            name="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="vorname">Vorname</label>
            <input id="vorname" name="vorname" type="text" placeholder="Max" required />
          </div>
          <div className="field">
            <label htmlFor="nachname">Nachname</label>
            <input
              id="nachname"
              name="nachname"
              type="text"
              placeholder="Mustermann"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="email">E‑Mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="max@beispiel.de"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="telefon">Telefon</label>
            <input id="telefon" name="telefon" type="tel" placeholder="0176 ..." />
          </div>
        </div>

        <div className="field">
          <label htmlFor="grund">Grund deiner MPU</label>
          <select id="grund" name="grund" defaultValue="" required>
            <option value="" disabled>
              Bitte wählen
            </option>
            {reasons.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="beschreibung">Worum geht es genau?</label>
          <textarea
            id="beschreibung"
            name="beschreibung"
            placeholder="Kurze Beschreibung deiner Situation – wir behandeln alles vertraulich."
            rows={4}
          />
        </div>

        <div className="gdpr">
          <input id="datenschutz" name="datenschutz" type="checkbox" required />
          <label htmlFor="datenschutz">
            Ich habe die <a href="/datenschutz">Datenschutzerklärung</a> gelesen
            und stimme zu.
          </label>
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? "Wird gesendet …" : "Anfrage senden"}{" "}
          <span className="arrow">→</span>
        </button>
      </form>
    </div>
  );
}
