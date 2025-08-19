using BankKycSystem.DTOs;
using BankKycSystem.Entities;

namespace BankKycSystem.Services.Interfaces
{
    public interface ICustomerService
    {
        Task RegisterCustomerAsync(UserRegisterDTO dto);
        Task UploadKycDocumentsForCurrentUserAsync(KycUploadRequestDTO dto, string userEmail);
        Task<AccountInfoDTO> GetAccountInfoByEmailAsync(string email);
        Task<AccountInfoDTO> GetAccountInfoByUserIdAsync(long userId);
        Task<KycApplication> GetKycForCurrentUserAsync(string userEmail);
    }
}
