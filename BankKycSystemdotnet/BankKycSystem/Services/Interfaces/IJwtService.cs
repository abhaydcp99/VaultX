using BankKycSystem.Entities;

namespace BankKycSystem.Services.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(User user, out DateTime expires);
    }
}
