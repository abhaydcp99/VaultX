using BankKycSystem.DTOs;
using BankKycSystem.Entities;

namespace BankKycSystem.Services.Interfaces
{
    public interface IManagerKycService
    {
        Task<List<KycApplication>> GetPendingApplicationsAsync();
        Task<KycApplication?> GetKycByIdAsync(long id);
        Task ReviewKycAsync(long id, ManagerKycDecisionDTO dto, string managerEmail);
        Task<List<KycApplication>> GetApprovedKycsAsync();
        Task<List<KycApplication>> GetRejectedKycsAsync();
    }
}
