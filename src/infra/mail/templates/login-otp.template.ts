export function getLoginOtpTemplate(otpCode: string) {
  return `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Código de Autenticação</title>
  </head>

  <body style="margin:0; padding:40px 0; font-family:Arial, Helvetica, sans-serif; background:#ffffff;">

    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="left">

          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px; padding:0 22px; border-radius:8px;">
            
            <tr>
              <td style="padding-bottom:20px;">
                <div style="font-size:26px; font-weight:700;">
                  <span style="color:#10b981;">B</span><span style="color:#111827;">ukiz</span>
                </div>
              </td>
            </tr>

            <tr>
              <td style="font-size:15px; color:#111827; padding-bottom:6px;">
                Olá,
              </td>
            </tr>

            <tr>
              <td style="font-size:15px; color:#111827; line-height:1.6; padding-bottom:20px;">
                Aqui está o seu código de autenticação. Use-o para entrar na sua conta Bukiz.
              </td>
            </tr>

            <tr>
              <td style="padding-bottom:6px;">
                <div style="
                  display:inline-block;
                  font-size:32px;
                  font-weight:700;
                  padding:6px 0;
                  letter-spacing:8px;
                  color:#111827;
                ">
                  ${otpCode}
                </div>
              </td>
            </tr>

            <tr>
              <td style="font-size:14px; color:#6b7280; line-height:1.5; padding-bottom:12px;">
                Este código expira em 5 minutos.<br />
                Se você não solicitou este código, pode ignorar esta mensagem.
              </td>
            </tr>

            <tr>
              <td style="font-size:15px; color:#111827; line-height:1.6;">
                Obrigado,<br />
                Equipe Bukiz
              </td>
            </tr>

            <tr>
              <td style="padding-top:30px; font-size:12px; color:#9ca3af; border-top:1px solid #e5e7eb;">
                © ${new Date().getFullYear()} Bukiz.  
                <br />
                Esta mensagem foi enviada automaticamente pelo sistema.
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
