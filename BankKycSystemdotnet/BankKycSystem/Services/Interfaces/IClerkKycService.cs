using BankKycSystem.DTOs;

namespace BankKycSystem.Services.Interfaces
{
    public interface IClerkKycService
    {
        Task<List<KycApplicationDTO>> GetPendingKycApplicationsAsync(string clerkEmail);
        Task ForwardToManagerAsync(long applicationId, ClerkReviewRequestDTO reviewRequest, string clerkEmail);
    }
}
