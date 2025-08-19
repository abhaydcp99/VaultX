using BankKycSystem.Services.Interfaces;
using System.Net;
using System.Net.Mail;

namespace BankKycSystem.Services.Implementations
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendOtpEmailAsync(string email, string otp)
        {
            try
            {
                
                var smtpHost = _configuration["Smtp:Host"];
                var smtpPort = int.Parse(_configuration["Smtp:Port"]);
                var smtpUser = _configuration["Smtp:Username"];
                var smtpPass = _configuration["Smtp:Password"];
                var fromEmail = _configuration["Smtp:FromEmail"];

                using (var smtp = new SmtpClient(smtpHost, smtpPort))
                {
                    smtp.Credentials = new NetworkCredential(smtpUser, smtpPass);
                    smtp.EnableSsl = true;

                    var mail = new MailMessage
                    {
                        From = new MailAddress(fromEmail),
                        Subject = "Your OTP Code",
                        Body = $"Your OTP code is: {otp}. It is valid for 5 minutes.",
                        IsBodyHtml = false
                    };
                    mail.To.Add(email);

                    await smtp.SendMailAsync(mail);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to send OTP email.", ex);
            }
        }
    }
}
