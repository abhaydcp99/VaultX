namespace BankKycSystem.DTOs
{
    public class ConfirmLoginRequestDTO
    {
        public string? Email { get; set; }
        public string? Otp { get; set; }
    }
}
