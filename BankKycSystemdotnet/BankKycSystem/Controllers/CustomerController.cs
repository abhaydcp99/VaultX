using BankKycSystem.DTOs;
using BankKycSystem.Entities;
using BankKycSystem.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BankKycSystem.Controllers
{
    [ApiController]
    [Route("api/customer")]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpPost("register-customer")]
        public async Task<IActionResult> RegisterCustomer([FromBody] UserRegisterDTO dto)
        {
            await _customerService.RegisterCustomerAsync(dto);
            return Created("", "Customer registered successfully");
        }
        [Authorize]
        [Authorize(Roles = "CUSTOMER")]
        [HttpPost("upload-kyc")]
        public async Task<IActionResult> UploadKyc([FromForm] KycUploadRequestDTO dto)
        {
            var email = User.FindFirstValue(ClaimTypes.Name);
            await _customerService.UploadKycDocumentsForCurrentUserAsync(dto, email);
            return Ok("KYC documents uploaded successfully");
        }

        [Authorize(Roles = "CUSTOMER")]
        [HttpGet("account")]
        public async Task<ActionResult<AccountInfoDTO>> GetAccountInfo()
        {
            var email = User.FindFirstValue(ClaimTypes.Name);
            var accountInfo = await _customerService.GetAccountInfoByEmailAsync(email);
            return Ok(accountInfo);
        }

        [Authorize(Roles = "ADMIN,MANAGER,CLERK")]
        [HttpGet("account/{userId}")]
        public async Task<ActionResult<AccountInfoDTO>> GetAccountInfoByUserId(long userId)
        {
            var accountInfo = await _customerService.GetAccountInfoByUserIdAsync(userId);
            return Ok(accountInfo);
        }

        [Authorize(Roles = "CUSTOMER")]
        [HttpGet("self-kyc")]
        public async Task<ActionResult<KycApplication>> GetOwnKyc()
        {
            var email = User.FindFirstValue(ClaimTypes.Name);
            var kyc = await _customerService.GetKycForCurrentUserAsync(email);
            return Ok(kyc);
        }
    }
}
