import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// All contact-form submissions are delivered here.
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

  const esc = (s: string) =>
    s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const fullName = `${vorname} ${nachname}`.trim();
  const sentAt = new Intl.DateTimeFormat("de-DE", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(new Date());

  const text = [
    "Neue Anfrage über das SicherMPU-Kontaktformular",
    "",
    `Name:     ${fullName}`,
    `E-Mail:   ${email}`,
    `Telefon:  ${telefon || "—"}`,
    `Grund:    ${grund}`,
    "",
    "Nachricht:",
    beschreibung || "—",
    "",
    `Gesendet: ${sentAt} · sichermpu.de`,
  ].join("\n");

  const row = (label: string, value: string) => `
        <tr>
          <td style="padding:11px 0;border-bottom:1px solid #EAE3D2;font:600 11px Arial,Helvetica,sans-serif;letter-spacing:1px;text-transform:uppercase;color:#6B6657;width:140px;vertical-align:top;">${label}</td>
          <td style="padding:11px 0;border-bottom:1px solid #EAE3D2;font-size:15px;line-height:1.5;color:#0E1A24;">${value}</td>
        </tr>`;

  const html = `
  <div style="margin:0;padding:0;background:#F3EFE6;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F3EFE6;padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#FBFAF6;border:1px solid #C6BFAE;border-radius:6px;overflow:hidden;">
          <tr>
            <td style="background:#0E1A24;border-top:3px solid #B4894C;padding:30px 36px;">
              <div style="font:600 11px/1 Arial,Helvetica,sans-serif;letter-spacing:2px;text-transform:uppercase;color:#C99E5E;margin-bottom:14px;">Neue Kontaktanfrage</div>
              <div style="font-family:Georgia,'Times New Roman',serif;font-size:26px;color:#FBFAF6;">Sicher<span style="font-weight:bold;">MPU</span><span style="color:#B4894C;">.</span></div>
            </td>
          </tr>
          <tr>
            <td style="padding:30px 36px 4px;font-family:Arial,Helvetica,sans-serif;">
              <p style="margin:0;font-size:15px;line-height:1.6;color:#1A2A38;">Eine neue Anfrage ist über das Kontaktformular eingegangen. Du kannst direkt auf diese E-Mail antworten, um <strong>${esc(fullName)}</strong> zu erreichen.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:14px 36px 4px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                ${row("Name", esc(fullName))}
                ${row("E-Mail", `<a href="mailto:${esc(email)}" style="color:#B4894C;text-decoration:none;">${esc(email)}</a>`)}
                ${row("Telefon", telefon ? esc(telefon) : "—")}
                ${row("Grund der MPU", esc(grund))}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:22px 36px 4px;font-family:Arial,Helvetica,sans-serif;">
              <div style="font:600 11px/1 Arial,Helvetica,sans-serif;letter-spacing:1.5px;text-transform:uppercase;color:#6B6657;margin-bottom:12px;">Nachricht</div>
              <div style="border-left:3px solid #B4894C;padding:4px 0 4px 18px;font-size:15px;line-height:1.65;color:#1A2A38;">${beschreibung ? esc(beschreibung).replace(/\n/g, "<br>") : "—"}</div>
            </td>
          </tr>
          <tr>
            <td style="padding:26px 36px 30px;">
              <a href="mailto:${esc(email)}" style="display:inline-block;background:#0E1A24;color:#F3EFE6;font:600 14px Arial,Helvetica,sans-serif;text-decoration:none;padding:14px 28px;border-radius:4px;">Antworten &rarr;</a>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 36px 30px;border-top:1px solid #C6BFAE;">
              <p style="margin:0;font:11px/1.6 Arial,Helvetica,sans-serif;letter-spacing:0.4px;color:#6B6657;">Gesendet am ${sentAt} &middot; automatisch über das Kontaktformular auf sichermpu.de</p>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
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
