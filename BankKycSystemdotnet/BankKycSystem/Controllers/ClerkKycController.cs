using BankKycSystem.DTOs;
using BankKycSystem.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BankKycSystem.Controllers
{
    [ApiController]
    [Route("api/clerk/kyc")]
    [Authorize(Roles = "CLERK")]
    public class ClerkKycController : ControllerBase
    {
        private readonly IClerkKycService _clerkKycService;

        public ClerkKycController(IClerkKycService clerkKycService)
        {
            _clerkKycService = clerkKycService;
        }

        // 1. Get all pending KYC applications
        [HttpGet("pending")]
        public async Task<ActionResult<List<KycApplicationDTO>>> GetPendingApplications()
        {
            var email = User.FindFirstValue(ClaimTypes.Name);
            var applications = await _clerkKycService.GetPendingKycApplicationsAsync(email);
            return Ok(applications);
        }

        // 2. Forward application to manager after review
        [HttpPost("forward/{applicationId}")]
        public async Task<IActionResult> ForwardToManager(long applicationId, [FromBody] ClerkReviewRequestDTO reviewRequest)
        {
            var email = User.FindFirstValue(ClaimTypes.Name);
            await _clerkKycService.ForwardToManagerAsync(applicationId, reviewRequest, email);
            return Ok("Application forwarded to manager for review.");
        }
    }
}
