export function getLoginOtpTemplate(otpCode: string) {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Código Bukiz</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      
      <div style="width: 100%; padding: 40px 0;">
        
        <div style="max-width: 600px; margin: 0 auto; background-color: #f3f4f6; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden;">
          
          <div style="background-color: #111827; padding: 24px 40px;">
            <span style="font-size: 22px; font-weight: 700; letter-spacing: -0.5px; text-transform: uppercase; color: #ffffff;">
              <span style="color: #10b981;">B</span>ukiz
            </span>
          </div>

          <div style="padding: 40px;">
            
            <h1 style="color: #111827; font-size: 24px; text-align: center; font-weight: 700; margin: 0 0 16px;">
              Código de Autenticação  
            </h1>

            <div style="background-color: #f9fafb; border: 2px dashed #e5e7eb; border-radius: 8px; padding: 20px; text-align: center;">
              <span style="font-size: 36px; font-weight: 700; color: #111827; letter-spacing: 8px; display: block;">
                ${otpCode}
              </span>
            </div>
          </div>
        </div>
      </div>

    </body>
    </html>
  `;
}
