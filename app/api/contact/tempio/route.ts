import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nome, cognome, email, telefono, corsi_labels, privacy } = body;

    // Validazione base
    if (!nome || !cognome || (!email && !telefono) || !corsi_labels || !privacy) {
      return NextResponse.json(
        { error: "Campi obbligatori mancanti" },
        { status: 400 }
      );
    }

    // URL del sito per le immagini
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';

    // Email HTML
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
            }
            .email-container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
            }
            .header {
              background-color: #ffffff;
              padding: 30px 20px;
              text-align: center;
              border-bottom: 3px solid #c7322b;
            }
            .header img {
              max-width: 200px;
              height: auto;
            }
            .content {
              padding: 30px 20px;
              color: #333333;
            }
            .title {
              font-size: 20px;
              font-weight: bold;
              color: #c7322b;
              margin-bottom: 20px;
            }
            .intro-text {
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 25px;
              color: #333333;
            }
            .courses {
              background-color: #c7322b;
              color: #ffffff;
              padding: 12px 15px;
              border-radius: 6px;
              font-weight: bold;
              margin-bottom: 25px;
            }
            .data-section {
              background-color: #f9f9f9;
              border-left: 4px solid #c7322b;
              padding: 20px;
              margin-bottom: 25px;
            }
            .data-title {
              font-size: 16px;
              font-weight: bold;
              color: #c7322b;
              margin-bottom: 15px;
            }
            .data-row {
              margin-bottom: 12px;
              font-size: 14px;
            }
            .data-label {
              font-weight: bold;
              color: #000000;
            }
            .data-value {
              color: #333333;
            }
            .privacy-notice {
              background-color: #e8f5e9;
              border: 1px solid #4caf50;
              padding: 15px;
              border-radius: 6px;
              margin-bottom: 25px;
              font-size: 14px;
            }
            .cta-text {
              background-color: #fff3cd;
              border-left: 4px solid #c7322b;
              padding: 15px;
              margin-bottom: 25px;
              font-size: 14px;
              font-weight: bold;
              color: #000000;
            }
            .footer {
              background-color: #ffffff;
              color: #444444;
              padding: 30px 20px;
              text-align: center;
              font-size: 12px;
              line-height: 1.6;
              border-top: 3px solid #c7322b;
            }
            .footer-logo {
              max-width: 80px;
              margin-bottom: 15px;
            }
            .footer-info {
              margin-bottom: 10px;
              color: #444444;
            }
            .footer-divider {
              border-top: 1px solid #e3e3e3;
              margin: 20px 0;
            }
            .auto-message {
              color: #999999;
              font-style: italic;
            }
            a {
              color: #c7322b;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <!-- Header con Logo -->
            <div class="header">
              <img src="${siteUrl}/tempio-logo.png" alt="Il Tempio Fitness Club" />
            </div>

            <!-- Contenuto -->
            <div class="content">
              <div class="title">
                💪 Richiesta informazioni corsi - Il Tempio Fitness Club
              </div>

              <div class="intro-text">
                È stata ricevuta una nuova richiesta di contatto per i corsi:
              </div>

              <div class="courses">
                ${corsi_labels}
              </div>

              <!-- Dati del richiedente -->
              <div class="data-section">
                <div class="data-title">Dati del richiedente</div>
                
                <div class="data-row">
                  <span class="data-label">Nome:</span>
                  <span class="data-value">${nome} ${cognome}</span>
                </div>

                ${email ? `
                <div class="data-row">
                  <span class="data-label">Email:</span>
                  <span class="data-value"><a href="mailto:${email}">${email}</a></span>
                </div>
                ` : ''}

                ${telefono ? `
                <div class="data-row">
                  <span class="data-label">Telefono:</span>
                  <span class="data-value"><a href="tel:${telefono}">${telefono}</a></span>
                </div>
                ` : ''}
              </div>

              <!-- Privacy -->
              <div class="privacy-notice">
                ✅ L'utente ha confermato la presa visione dell'informativa privacy e ha espresso il consenso al trattamento dei dati personali.
              </div>

              <!-- CTA -->
              <div class="cta-text">
                ⚡ Si consiglia di ricontattare il richiedente nel più breve tempo possibile.
              </div>
            </div>

            <!-- Footer -->
            <div class="footer">
              <img src="${siteUrl}/tempio-logo-monogram.png" alt="Il Tempio" class="footer-logo" />
              
              <div class="footer-info">
                <strong>Il Tempio Fitness Club</strong><br>
                via V. Maiorano, 27<br>
                70128 Bari - Palese (BA)<br>
                <a href="mailto:iltempiofitnessclub@gmail.com">iltempiofitnessclub@gmail.com</a><br>
                Tel: 392.097.8713
              </div>

              <div class="footer-divider"></div>

              <div class="auto-message">
                — Messaggio generato automaticamente dal form di contatto del sito web
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    // Invia email a Tempio e al team di test
    // NOTA: Con onboarding@resend.dev puoi inviare solo a iltempiofitnessclub@gmail.com
    // Per inviare a più destinatari, verifica un dominio su resend.com/domains
    const { data, error } = await resend.emails.send({
      from: "Il Tempio Fitness Club <onboarding@resend.dev>",
      to: ["iltempiofitnessclub@gmail.com"], // Temporaneo: solo email verificata
      subject: `Richiesta informazioni corsi - Il Tempio Fitness Club`,
      html: htmlContent,
      replyTo: email || undefined,
    });

    if (error) {
      console.error("Errore invio email:", error);
      return NextResponse.json(
        { error: "Errore nell'invio dell'email" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email inviata con successo", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Errore server:", error);
    return NextResponse.json(
      { error: "Errore interno del server" },
      { status: 500 }
    );
  }
}
