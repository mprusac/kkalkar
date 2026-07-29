import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// KK Alkar Sinj brand palette (light theme)
const BRAND_NAVY = '#0E2A63';
const BRAND_NAVY_DARK = '#081C46';
const BRAND_GOLD = '#D4AF60';
const BRAND_GOLD_SOFT = '#E8CC8A';
const BRAND_CREAM = '#FBF6EB';
const BRAND_CARD = '#FFFFFF';
const BRAND_BORDER = '#E5D9B8';
const BRAND_TEXT = '#1F2937';
const BRAND_MUTED = '#6B7280';

const LOGO_URL = 'https://vfhveejsqopkqslpdbhw.supabase.co/storage/v1/object/public/email-assets/alkar-logo.png';
const CLUB_NAME = 'KK Alkar Sinj';
const CLUB_ADDRESS = 'Ulica Alajčauša Frane Bareze Šore 1, 21230 Sinj';
const CLUB_SITE = 'https://kkposusje-digital-court.lovable.app';
const CLUB_EMAIL = 'kontakt@kkalkar.hr';
const OWNER_EMAIL = 'mprusac0@gmail.com';
const RESEND_TEST_FALLBACK_EMAIL = 'mprusac23@student.foi.hr';

async function sendResendEmail(apiKey: string, payload: Record<string, unknown>) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return { response, data };
}

function isResendTestRecipientError(data: unknown): boolean {
  if (!data || typeof data !== 'object' || !('message' in data)) return false;
  const message = String((data as { message?: unknown }).message ?? '');
  return message.includes('You can only send testing emails to your own email address');
}

function baseHead(): string {
  return `<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only">`;
}

function footerBlock(): string {
  return `
    <tr><td style="background-color:${BRAND_NAVY_DARK};padding:24px 32px;border-radius:0 0 12px 12px;text-align:center;">
      <img src="${LOGO_URL}" alt="${CLUB_NAME}" width="42" height="42" style="display:inline-block;border:none;outline:none;margin-bottom:8px;" />
      <p style="margin:0;font-size:12px;color:${BRAND_GOLD_SOFT};font-weight:700;letter-spacing:1px;text-transform:uppercase;">${CLUB_NAME} · Osnovan 1955.</p>
      <p style="margin:6px 0 0;font-size:11px;color:#B8C4DC;">${CLUB_ADDRESS}</p>
      <p style="margin:2px 0 0;font-size:11px;color:#B8C4DC;">
        <a href="mailto:${CLUB_EMAIL}" style="color:${BRAND_GOLD_SOFT};text-decoration:none;">${CLUB_EMAIL}</a>
        &nbsp;·&nbsp;
        <a href="${CLUB_SITE}" style="color:${BRAND_GOLD_SOFT};text-decoration:none;">kkalkar.hr</a>
      </p>
    </td></tr>`;
}

function ownerEmailHtml(name: string, email: string, subject: string, message: string): string {
  const date = new Date().toLocaleDateString('hr-HR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  return `
<!DOCTYPE html>
<html lang="hr">
<head>${baseHead()}</head>
<body style="margin:0;padding:0;background-color:${BRAND_CREAM};font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND_CREAM};padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:${BRAND_CARD};border-radius:12px;border:1px solid ${BRAND_BORDER};box-shadow:0 4px 20px rgba(14,42,99,0.08);">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,${BRAND_NAVY} 0%,${BRAND_NAVY_DARK} 100%);padding:24px 32px;border-radius:12px 12px 0 0;border-bottom:3px solid ${BRAND_GOLD};">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="vertical-align:middle;">
                <h1 style="margin:0;font-size:22px;font-weight:800;color:#FFFFFF;letter-spacing:1.5px;text-transform:uppercase;">Nova poruka</h1>
                <p style="margin:4px 0 0;font-size:13px;color:${BRAND_GOLD_SOFT};font-weight:600;">Kontakt forma · ${CLUB_NAME}</p>
                <p style="margin:2px 0 0;font-size:12px;color:#B8C4DC;">${date}</p>
              </td>
              <td align="right" style="vertical-align:middle;width:70px;">
                <img src="${LOGO_URL}" alt="${CLUB_NAME}" width="64" height="64" style="display:block;border:none;outline:none;" />
              </td>
            </tr>
          </table>
        </td></tr>
        <!-- Body -->
        <tr><td style="background-color:${BRAND_CARD};padding:32px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;border:1px solid ${BRAND_BORDER};border-radius:8px;overflow:hidden;">
            <tr>
              <td style="padding:14px 18px;background-color:${BRAND_CREAM};border-bottom:1px solid ${BRAND_BORDER};">
                <span style="font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:${BRAND_NAVY};font-weight:700;">Ime i prezime</span>
                <p style="margin:4px 0 0;font-size:15px;color:${BRAND_TEXT};font-weight:600;">${name}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 18px;background-color:${BRAND_CARD};border-bottom:1px solid ${BRAND_BORDER};">
                <span style="font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:${BRAND_NAVY};font-weight:700;">Email</span>
                <p style="margin:4px 0 0;font-size:15px;"><a href="mailto:${email}" style="color:${BRAND_NAVY};text-decoration:none;font-weight:600;">${email}</a></p>
              </td>
            </tr>
            <tr>
              <td style="padding:14px 18px;background-color:${BRAND_CREAM};">
                <span style="font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:${BRAND_NAVY};font-weight:700;">Predmet</span>
                <p style="margin:4px 0 0;font-size:15px;color:${BRAND_TEXT};font-weight:600;">${subject}</p>
              </td>
            </tr>
          </table>
          <div style="background-color:${BRAND_CREAM};border-radius:8px;padding:20px;border-left:4px solid ${BRAND_GOLD};">
            <span style="font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:${BRAND_NAVY};font-weight:700;">Poruka</span>
            <p style="margin:8px 0 0;font-size:14px;line-height:1.7;color:${BRAND_TEXT};">${message.replace(/\n/g, '<br />')}</p>
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
            <tr><td align="center">
              <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,${BRAND_NAVY} 0%,${BRAND_NAVY_DARK} 100%);color:#FFFFFF;font-size:14px;font-weight:700;text-decoration:none;border-radius:8px;text-transform:uppercase;letter-spacing:1.5px;border:1px solid ${BRAND_GOLD};">↩ Odgovori</a>
            </td></tr>
          </table>
        </td></tr>
        ${footerBlock()}
      </table>
      <p style="margin:16px 0 0;font-size:11px;color:${BRAND_MUTED};">Automatski generirano putem kontakt forme na web stranici.</p>
    </td></tr>
  </table>
</body>
</html>`;
}

function userConfirmationHtml(name: string, subject: string, message: string): string {
  return `
<!DOCTYPE html>
<html lang="hr">
<head>${baseHead()}</head>
<body style="margin:0;padding:0;background-color:${BRAND_CREAM};font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND_CREAM};padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:${BRAND_CARD};border-radius:12px;border:1px solid ${BRAND_BORDER};box-shadow:0 4px 20px rgba(14,42,99,0.08);">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,${BRAND_NAVY} 0%,${BRAND_NAVY_DARK} 100%);padding:36px 32px;border-radius:12px 12px 0 0;border-bottom:3px solid ${BRAND_GOLD};text-align:center;">
          <img src="${LOGO_URL}" alt="${CLUB_NAME}" width="80" height="80" style="display:inline-block;border:none;outline:none;margin-bottom:12px;" />
          <h1 style="margin:0;font-size:26px;font-weight:800;color:#FFFFFF;letter-spacing:2px;text-transform:uppercase;">${CLUB_NAME}</h1>
          <p style="margin:6px 0 0;font-size:12px;color:${BRAND_GOLD_SOFT};font-weight:600;letter-spacing:2px;text-transform:uppercase;">Košarkaški klub · Osnovan 1955.</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="background-color:${BRAND_CARD};padding:36px 32px;text-align:center;">
          <h2 style="margin:0 0 8px;font-size:22px;color:${BRAND_NAVY};font-weight:700;">Hvala Vam, ${name}!</h2>
          <p style="margin:0 0 6px;font-size:15px;line-height:1.6;color:${BRAND_TEXT};">
            Vaša poruka je uspješno zaprimljena.
          </p>
          <p style="margin:0 0 28px;font-size:14px;line-height:1.6;color:${BRAND_MUTED};">
            Odgovorit ćemo Vam u najkraćem mogućem roku.
          </p>
          <div style="background-color:${BRAND_CREAM};border-radius:8px;padding:20px;border-left:4px solid ${BRAND_GOLD};text-align:left;">
            <span style="font-size:11px;text-transform:uppercase;letter-spacing:1.5px;color:${BRAND_NAVY};font-weight:700;">Vaša poruka</span>
            <p style="margin:10px 0 8px;font-size:13px;color:${BRAND_TEXT};">
              <strong style="color:${BRAND_NAVY};">Predmet:</strong> ${subject}
            </p>
            <p style="margin:0;font-size:14px;line-height:1.7;color:${BRAND_TEXT};">${message.replace(/\n/g, '<br />')}</p>
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:28px;">
            <tr><td align="center">
              <a href="${CLUB_SITE}" style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,${BRAND_NAVY} 0%,${BRAND_NAVY_DARK} 100%);color:#FFFFFF;font-size:14px;font-weight:700;text-decoration:none;border-radius:8px;text-transform:uppercase;letter-spacing:1.5px;border:1px solid ${BRAND_GOLD};">Posjetite našu web stranicu</a>
            </td></tr>
          </table>
        </td></tr>
        ${footerBlock()}
      </table>
      <p style="margin:16px 0 0;font-size:11px;color:${BRAND_MUTED};">Ovo je automatska potvrda. Molimo ne odgovarajte na ovaj email.</p>
    </td></tr>
  </table>
</body>
</html>`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Sva polja su obavezna' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const FROM = `${CLUB_NAME} <onboarding@resend.dev>`;

    let { response: ownerRes, data: ownerData } = await sendResendEmail(RESEND_API_KEY, {
      from: FROM,
      to: [OWNER_EMAIL],
      subject: `[Kontakt forma] ${subject}`,
      reply_to: email,
      html: ownerEmailHtml(name, email, subject, message),
    });

    if (!ownerRes.ok && ownerRes.status === 403 && isResendTestRecipientError(ownerData)) {
      console.warn('Resend test mode: primary owner recipient rejected, retrying with verified account email.');
      ({ response: ownerRes, data: ownerData } = await sendResendEmail(RESEND_API_KEY, {
        from: FROM,
        to: [RESEND_TEST_FALLBACK_EMAIL],
        subject: `[Kontakt forma] ${subject}`,
        reply_to: email,
        html: ownerEmailHtml(name, email, subject, message),
      }));
    }

    if (!ownerRes.ok) {
      console.error('Resend API error (owner):', JSON.stringify(ownerData));
      throw new Error(`Resend API error [${ownerRes.status}]: ${JSON.stringify(ownerData)}`);
    }

    const { response: userRes, data: userData } = await sendResendEmail(RESEND_API_KEY, {
      from: FROM,
      to: [email],
      subject: `Potvrda poruke - ${CLUB_NAME}`,
      html: userConfirmationHtml(name, subject, message),
    });
    if (!userRes.ok) {
      console.error('Resend API error (user confirmation):', JSON.stringify(userData));
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
