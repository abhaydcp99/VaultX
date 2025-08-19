using BankKycSystem.Data;
using BankKycSystem.DTOs;
using BankKycSystem.Services.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace BankKycSystem.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IOtpService _otpService;
        private readonly IJwtService _jwtService;

        public AuthService(ApplicationDbContext context, IOtpService otpService, IJwtService jwtService)
        {
            _context = context;
            _otpService = otpService;
            _jwtService = jwtService;
        }

        public async Task<string> InitiateLoginAsync(LoginRequestDTO dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null) throw new Exception("User not found");

            await _otpService.GenerateAndSendOtpAsync(dto.Email); // 

            return "OTP sent successfully";
        }

        public async Task<LoginResponseDTO> ConfirmLoginAsync(ConfirmLoginRequestDTO dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null) throw new Exception("User not found");

            bool otpValid = await _otpService.ValidateOtpAsync(dto.Email, dto.Otp);
            if (!otpValid) throw new Exception("Invalid OTP");

            var token = _jwtService.GenerateToken(user, out DateTime expires);

            return new LoginResponseDTO
            {
                Token = token,
                Role = user.Role?.ToString() ?? "User",
                Email = user.Email ?? string.Empty,
                Expiration = expires
            };
        }
    }
    }
