using BankKycSystem.DTOs;

namespace BankKycSystem.Services.Interfaces
{
    public interface IAuthService
    {
        Task<string> InitiateLoginAsync(LoginRequestDTO dto);
        Task<LoginResponseDTO> ConfirmLoginAsync(ConfirmLoginRequestDTO dto);
    }
}
