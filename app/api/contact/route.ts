import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// All website inquiries are delivered here.
const TO = process.env.CONTACT_TO || "info@sichermpu.de";

type Payload = Record<string, string>;

async function parse(req: Request): Promise<Payload> {
  const ct = req.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    return (await req.json()) as Payload;
  }
  const fd = await req.formData();
  const out: Payload = {};
  fd.forEach((v, k) => {
    out[k] = String(v);
  });
  return out;
}

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = await parse(req);
  } catch {
    return NextResponse.json({ ok: false, error: "bad_request" }, { status: 400 });
  }

  // Honeypot — a filled "company" field means a bot. Pretend success.
  if (data.company) return NextResponse.json({ ok: true });

  const vorname = (data.vorname || "").trim();
  const nachname = (data.nachname || "").trim();
  const email = (data.email || "").trim();
  const telefon = (data.telefon || "").trim();
  const grund = (data.grund || "").trim();
  const beschreibung = (data.beschreibung || "").trim();

  if (!vorname || !nachname || !email || !grund) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const lines = [
    `Neue Anfrage über das SicherMPU-Kontaktformular`,
    ``,
    `Name:    ${vorname} ${nachname}`,
    `E-Mail:  ${email}`,
    `Telefon: ${telefon || "—"}`,
    `Grund:   ${grund}`,
    ``,
    `Nachricht:`,
    beschreibung || "—",
  ];
  const text = lines.join("\n");
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#0E1A24">
      <h2 style="margin:0 0 16px">Neue MPU-Anfrage</h2>
      <table cellpadding="6" style="border-collapse:collapse">
        <tr><td><strong>Name</strong></td><td>${vorname} ${nachname}</td></tr>
        <tr><td><strong>E-Mail</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td><strong>Telefon</strong></td><td>${telefon || "—"}</td></tr>
        <tr><td><strong>Grund</strong></td><td>${grund}</td></tr>
      </table>
      <p style="margin-top:16px;white-space:pre-line">${beschreibung || "—"}</p>
    </div>`;

  // If SMTP is not configured, don't fail the user — log and report not-delivered.
  const host = process.env.SMTP_HOST;
  if (!host) {
    console.warn(
      `[contact] SMTP not configured. Would have emailed ${TO}:`,
      { vorname, nachname, email, grund }
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const port = Number(process.env.SMTP_PORT || 587);
    const transport = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const from = process.env.SMTP_FROM || process.env.SMTP_USER || TO;
    await transport.sendMail({
      from: `"SicherMPU Website" <${from}>`,
      to: TO,
      replyTo: `"${vorname} ${nachname}" <${email}>`,
      subject: `Neue MPU-Anfrage: ${vorname} ${nachname} — ${grund}`,
      text,
      html,
    });

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }
}
