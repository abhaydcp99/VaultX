namespace BankKycSystem.Services.Interfaces
{
    public interface IOtpService
    {
        Task<string> GenerateAndSendOtpAsync(string email);
        Task<bool> ValidateOtpAsync(string email, string otp);
        Task ResendOtpAsync(string email);
    }
}
