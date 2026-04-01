function resetPasswordEmail  (code){
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Password Reset Code</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f9; font-family:Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9; padding:20px;">
    <tr>
      <td align="center">

        <!-- CARD -->
        <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; padding:30px; box-shadow:0 5px 15px rgba(0,0,0,0.1);">
          
          <!-- HEADER -->
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h2 style="margin:0; color:#333;">Reset Your Password</h2>
            </td>
          </tr>

          <!-- TEXT -->
          <tr>
            <td style="color:#555; font-size:14px; line-height:1.6;">
              Hello,<br><br>
              You requested to reset your password. Use the verification code below to continue:
            </td>
          </tr>

          <!-- CODE -->
          <tr>
            <td align="center" style="padding:25px 0;">
              <div style="font-size:28px; letter-spacing:5px; font-weight:bold; color:#2c3e50; background:#f1f3f6; padding:15px 25px; border-radius:8px; display:inline-block;">
                ${code}
              </div>
            </td>
          </tr>

          <!-- WARNING -->
          <tr>
            <td style="color:#888; font-size:13px;">
              This code will expire in 10 minutes. If you did not request this, please ignore this email.
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td align="center" style="padding-top:30px; font-size:12px; color:#aaa;">
              © 2026 Your App. All rights reserved.
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>`}

module.exports= resetPasswordEmail 