using BankKycSystem.DTOs;
using BankKycSystem.Entities;
using BankKycSystem.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BankKycSystem.Controllers
{
    [ApiController]
    [Route("api/manager")]
    [Authorize(Roles = "MANAGER")]
    public class ManagerKycController : ControllerBase
    {
        private readonly IManagerKycService _managerKycService;

        public ManagerKycController(IManagerKycService managerKycService)
        {
            _managerKycService = managerKycService;
        }

        [HttpGet("pending-kyc")]
        public async Task<ActionResult<List<KycApplication>>> GetPendingKycApplications()
        {
            return Ok(await _managerKycService.GetPendingApplicationsAsync());
        }

        [HttpGet("kyc/{id}")]
        public async Task<ActionResult<KycApplication>> GetKycById(long id)
        {
            var kyc = await _managerKycService.GetKycByIdAsync(id);
            if (kyc == null) return NotFound();
            return Ok(kyc);
        }

        [HttpPost("review/{id}")]
        public async Task<IActionResult> ReviewKyc(long id, [FromBody] ManagerKycDecisionDTO dto)
        {
            var email = User.FindFirstValue(ClaimTypes.Name);
            await _managerKycService.ReviewKycAsync(id, dto, email);
            return Ok("KYC reviewed successfully");
        }

        [HttpGet("approved-kycs")]
        public async Task<ActionResult<List<KycApplication>>> GetApprovedKycs()
        {
            return Ok(await _managerKycService.GetApprovedKycsAsync());
        }

        [HttpGet("rejected-kycs")]
        public async Task<ActionResult<List<KycApplication>>> GetRejectedKycs()
        {
            return Ok(await _managerKycService.GetRejectedKycsAsync());
        }
    }
}
