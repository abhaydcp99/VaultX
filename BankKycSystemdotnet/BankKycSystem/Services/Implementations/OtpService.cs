using BankKycSystem.Data;
using BankKycSystem.Entities;
using BankKycSystem.Services.Interfaces;
using Microsoft.EntityFrameworkCore; // Needed for FirstOrDefaultAsync

namespace BankKycSystem.Services.Implementations
{
    public class OtpService : IOtpService
    {
        private readonly ApplicationDbContext _context;
        private readonly IEmailService _emailService;

        public OtpService(ApplicationDbContext context, IEmailService emailService)
        {
            _context = context;
            _emailService = emailService;
        }

        public async Task<string> GenerateAndSendOtpAsync(string email)
        {
            var otp = new Random().Next(100000, 999999).ToString();

            var otpEntity = new OtpEntity
            {
                Email = email,
                Otp = otp,
                GeneratedAt = DateTime.UtcNow,
                ExpiryAt = DateTime.UtcNow.AddMinutes(5),
                IsUsed = false
            };

            _context.OtpEntities.Add(otpEntity);
            await _context.SaveChangesAsync();

            await _emailService.SendOtpEmailAsync(email, otp);
            return otp;
        }

        public async Task<bool> ValidateOtpAsync(string email, string otp)
        {
            var latestOtp = await _context.OtpEntities
                .Where(o => o.Email == email)
                .OrderByDescending(o => o.ExpiryAt)
                .FirstOrDefaultAsync();

            return latestOtp != null &&
                   latestOtp.Otp == otp &&
                   latestOtp.ExpiryAt > DateTime.UtcNow;
        }

        public async Task ResendOtpAsync(string email)
        {
            await GenerateAndSendOtpAsync(email);
        }
    }
}
