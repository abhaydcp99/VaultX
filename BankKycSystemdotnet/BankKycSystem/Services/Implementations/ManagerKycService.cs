using BankKycSystem.Data;
using BankKycSystem.DTOs;
using BankKycSystem.Entities;
using BankKycSystem.Enums;
using BankKycSystem.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Net;
using System.Net.Mail;

namespace BankKycSystem.Services.Implementations
{
    public class ManagerKycService : IManagerKycService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public ManagerKycService(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<List<KycApplication>> GetPendingApplicationsAsync()
        {
            return await _context.KycApplications
                .Include(k => k.User)
                .Include(k => k.Clerk)
                .Where(k => k.Status == KycStatus.FORWARDED || k.Status == KycStatus.CLERK_VERIFIED)
                .ToListAsync();
        }

        public async Task<KycApplication?> GetKycByIdAsync(long id)
        {
            return await _context.KycApplications
                .Include(k => k.User)
                .Include(k => k.Clerk)
                .FirstOrDefaultAsync(k => k.Id == id);
        }

        public async Task ReviewKycAsync(long id, ManagerKycDecisionDTO dto, string managerEmail)
        {
            var application = await _context.KycApplications
                .Include(k => k.User)
                .FirstOrDefaultAsync(k => k.Id == id);

            if (application == null)
                throw new Exception("KYC application not found.");

            var manager = await _context.Users.FirstOrDefaultAsync(u => u.Email == managerEmail);
            if (manager == null)
                throw new Exception("Manager not found.");

            application.Manager = manager;
            application.Remarks = dto.Remarks;
            application.Status = dto.Approved ? KycStatus.APPROVED : KycStatus.REJECTED;

            if (dto.Approved)
            {
                await CreateBankAccountAndNotifyAsync(application.User!, application.AccountType);
            }

            await _context.SaveChangesAsync();
        }

        private async Task CreateBankAccountAndNotifyAsync(User user, AccountType? accountType)
        {
            // Avoid duplicate accounts
            if (await _context.BankAccounts.AnyAsync(b => b.UserId == user.Id))
                return;

            var accountNumber = GenerateAccountNumber();
            var branchName = "Main Branch";
            var ifsc = GenerateIfscCode();

            var account = new BankAccount
            {
                User = user,
                AccountNumber = accountNumber,
                AccountType = accountType,
                BranchName = branchName,
                IfscCode = ifsc,
                Balance = 0m,
                Status = AccountStatus.ACTIVE,
                KycStatus = KycStatus.APPROVED
            };

            _context.BankAccounts.Add(account);
            await _context.SaveChangesAsync();

            
            SendApprovalEmail(user.Email, user.FirstName, accountNumber, accountType, branchName, ifsc);
        }

        private void SendApprovalEmail(string toEmail, string firstName, string accountNumber, AccountType? accountType, string branchName, string ifsc)
        {
            var smtpHost = _configuration["Smtp:Host"];
            var smtpPort = int.Parse(_configuration["Smtp:Port"]);
            var smtpUser = _configuration["Smtp:Username"];
            var smtpPass = _configuration["Smtp:Password"];
            var fromEmail = _configuration["Smtp:FromEmail"];

            using (var client = new SmtpClient(smtpHost, smtpPort))
            {
                client.EnableSsl = true;
                client.Credentials = new NetworkCredential(smtpUser, smtpPass);

                var mail = new MailMessage
                {
                    From = new MailAddress(fromEmail, "Bank KYC System"),
                    Subject = "Bank Account Approved",
                    Body = $"Dear {firstName},\n\n" +
                           $"Congratulations! Your KYC is approved and your bank account has been created.\n\n" +
                           $"Account Number: {accountNumber}\n" +
                           $"Account Type: {accountType}\n" +
                           $"Account Status: ACTIVE\n" +
                           $"IFSC Code: {ifsc}\n" +
                           $"Branch: {branchName}\n\n" +
                           $"Thank you,\nBank Team",
                    IsBodyHtml = false
                };

                mail.To.Add(toEmail);
                client.Send(mail);
            }
        }

        public async Task<List<KycApplication>> GetApprovedKycsAsync()
        {
            return await _context.KycApplications
                .Include(k => k.User)
                .Where(k => k.Status == KycStatus.APPROVED)
                .ToListAsync();
        }

        public async Task<List<KycApplication>> GetRejectedKycsAsync()
        {
            return await _context.KycApplications
                .Include(k => k.User)
                .Where(k => k.Status == KycStatus.REJECTED)
                .ToListAsync();
        }

        private string GenerateAccountNumber()
        {
            var random = new Random();
            return string.Concat(Enumerable.Range(0, 12).Select(_ => random.Next(0, 10).ToString()));
        }

        private string GenerateIfscCode()
        {
            return "BANK" + new Random().Next(1000, 9999);
        }
    }
}
