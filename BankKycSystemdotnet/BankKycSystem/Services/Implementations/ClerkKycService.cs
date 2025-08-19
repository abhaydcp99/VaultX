using BankKycSystem.Data;
using BankKycSystem.DTOs;
using BankKycSystem.Enums;
using BankKycSystem.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BankKycSystem.Services.Implementations
{
    public class ClerkKycService : IClerkKycService
    {
        private readonly ApplicationDbContext _context;

        public ClerkKycService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<KycApplicationDTO>> GetPendingKycApplicationsAsync(string clerkEmail)
        {
            var pendingApplications = await _context.KycApplications
                .Include(k => k.User)
                .Where(k => k.Status == KycStatus.PENDING)
                .Select(k => new KycApplicationDTO
                {
                    Id = k.Id,
                    CustomerName = k.User.FirstName + " " + k.User.LastName,
                    PoiDocumentPath = k.PoiDocumentPath,
                    PoaDocumentPath = k.PoaDocumentPath,
                    Remarks = k.Remarks,
                    Status = k.Status.ToString(),
                    SubmittedAt = k.SubmittedAt,
                    AccountType = k.AccountType.ToString()
                })
                .ToListAsync();

            return pendingApplications;
        }

        public async Task ForwardToManagerAsync(long applicationId, ClerkReviewRequestDTO reviewRequest, string clerkEmail)
        {
            var kycApplication = await _context.KycApplications
                .Include(k => k.User)
                .FirstOrDefaultAsync(k => k.Id == applicationId);

            if (kycApplication == null)
                throw new Exception("KYC application not found");

          
            var notes = $"Selfie: {reviewRequest.SelfieVerified}, PoI: {reviewRequest.PoiVerified}, PoA: {reviewRequest.PoaVerified}, " +
                        $"Liveness: {reviewRequest.LivenessPassed}. Notes: {reviewRequest.Notes}";

            kycApplication.Remarks = notes;
            kycApplication.Status = KycStatus.FORWARDED;

           
            var clerkUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == clerkEmail);
            kycApplication.Clerk = clerkUser;

            await _context.SaveChangesAsync();
        }
    }
}
