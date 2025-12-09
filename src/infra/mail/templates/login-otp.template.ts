export function getLoginOtpTemplate(otpCode: string) {
  return `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Seu Código Bukiz</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f5f6f7; font-family:Arial, Helvetica, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          
          <table width="100%" cellpadding="0" cellspacing="0" 
            style="max-width:520px; background:#ffffff; border-radius:12px; padding:32px; box-shadow:0 3px 12px rgba(0,0,0,0.05);">

            <!-- Logo -->
            <tr>
              <td style="text-align:center; padding-bottom:20px;">
                <div style="font-size:26px; font-weight:700; letter-spacing:-0.5px;">
                  <span style="color:#10b981;">B</span><span style="color:#111827;">ukiz</span>
                </div>
              </td>
            </tr>

            <!-- Título -->
            <tr>
              <td style="text-align:center;">
                <h2 style="margin:0; margin-bottom:16px; font-size:22px; color:#111827;">
                  Aqui está o seu código
                </h2>
                <p style="margin:0; font-size:14px; color:#6b7280;">
                  Use o código abaixo para entrar na Bukiz
                </p>
              </td>
            </tr>

            <!-- Código -->
            <tr>
              <td style="padding-top:28px; padding-bottom:12px;">
                <div style="
                  text-align:center;
                  background:#f9fafb;
                  padding:22px 0;
                  border-radius:8px;
                  border:1px solid #e5e7eb;">
                  
                  <span style="
                    font-size:38px;
                    font-weight:700;
                    letter-spacing:10px;
                    color:#111827;">
                    ${otpCode}
                  </span>
                </div>
              </td>
            </tr>

            <!-- Rodapé -->
            <tr>
              <td style="padding-top:20px; text-align:center; color:#9ca3af; font-size:12px;">
                Este código expira em 10 minutos.<br>
                Se você não solicitou este acesso, ignore este email.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
}
