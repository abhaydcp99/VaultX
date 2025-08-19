using BankKycSystem.DTOs;
using BankKycSystem.Enums;

namespace BankKycSystem.Services.Interfaces
{
    public interface IUserService
    {
        UserResponseDTO Register(UserRegisterDTO dto, Role role);
        List<UserResponseDTO> GetAllByRole(Role role);
        UserResponseDTO Update(long id, UpdateUserDTO dto, Role role);
        void Delete(long id);
        List<BankAccountSummaryDTO> GetAllActiveAccountsWithUserInfo();
        void UpdateAccountStatus(long accountId, AccountStatus status);
    }
}
