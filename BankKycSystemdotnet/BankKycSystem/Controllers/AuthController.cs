using BankKycSystem.DTOs;
using BankKycSystem.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BankKycSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly IOtpService _otpService;

        public AuthController(IAuthService authService, IOtpService otpService)
        {
            _authService = authService;
            _otpService = otpService;
        }

        // Step 1: Send OTP
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO dto)
        {
            var result = await _authService.InitiateLoginAsync(dto);
            return Ok(result);
        }

        // Step 2: Confirm OTP and get JWT
        [HttpPost("confirm-login")]
        public async Task<IActionResult> ConfirmLogin([FromBody] ConfirmLoginRequestDTO dto)
        {
            var response = await _authService.ConfirmLoginAsync(dto);
            return Ok(response);
        }

        // Resend OTP
        [HttpPost("resend-otp")]
        public async Task<IActionResult> ResendOtp([FromBody] EmailDTO dto)
        {
            await _otpService.ResendOtpAsync(dto.Email);
            return Ok($"OTP resent to email: {dto.Email}");
        }

        // Optional direct OTP verify
        [HttpPost("verify-otp")]
        public async Task<IActionResult> VerifyOtp([FromQuery] string email, [FromQuery] string otp)
        {
            bool valid = await _otpService.ValidateOtpAsync(email, otp);
            return valid ? Ok("OTP verified") : BadRequest("Invalid or expired OTP");
        }
    }
}
