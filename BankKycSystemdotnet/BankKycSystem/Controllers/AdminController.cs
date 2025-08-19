using BankKycSystem.DTOs;
using BankKycSystem.Entities;
using BankKycSystem.Enums;
using BankKycSystem.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Vaultxback.Models;

namespace BankKycSystem.Controllers
{
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAuditLogService _auditLogService;

        public AdminController(IUserService userService, IAuditLogService auditLogService)
        {
            _userService = userService;
            _auditLogService = auditLogService;
        }

        // Clerk
        [HttpPost("clerk")]
        public ActionResult<UserResponseDTO> RegisterClerk(UserRegisterDTO dto)
        {
            return _userService.Register(dto, Role.CLERK);
        }

        [HttpGet("clerks")]
        public ActionResult<List<UserResponseDTO>> GetAllClerks()
        {
            return _userService.GetAllByRole(Role.CLERK);
        }

        [HttpPut("clerk/{id}")]
        public ActionResult<UserResponseDTO> UpdateClerk(long id, UpdateUserDTO dto)
        {
            return _userService.Update(id, dto, Role.CLERK);
        }

        [HttpDelete("clerk/{id}")]
        public IActionResult DeleteClerk(long id)
        {
            _userService.Delete(id);
            return NoContent();
        }

        // Manager
        [HttpPost("manager")]
        public ActionResult<UserResponseDTO> RegisterManager(UserRegisterDTO dto)
        {
            return _userService.Register(dto, Role.MANAGER);
        }

        [HttpGet("managers")]
        public ActionResult<List<UserResponseDTO>> GetAllManagers()
        {
            return _userService.GetAllByRole(Role.MANAGER);
        }

        [HttpPut("manager/{id}")]
        public ActionResult<UserResponseDTO> UpdateManager(long id, UpdateUserDTO dto)
        {
            return _userService.Update(id, dto, Role.MANAGER);
        }

        [HttpDelete("manager/{id}")]
        public IActionResult DeleteManager(long id)
        {
            _userService.Delete(id);
            return NoContent();
        }

        // Customer
        [HttpGet("customers")]
        public ActionResult<List<UserResponseDTO>> GetAllCustomers()
        {
            return _userService.GetAllByRole(Role.CUSTOMER);
        }

        [HttpPut("customer/{id}")]
        public ActionResult<UserResponseDTO> UpdateCustomer(long id, UpdateUserDTO dto)
        {
            return _userService.Update(id, dto, Role.CUSTOMER);
        }

        [HttpDelete("customer/{id}")]
        public IActionResult DeleteCustomer(long id)
        {
            _userService.Delete(id);
            return NoContent();
        }

        // Active accounts
        [HttpGet("active-accounts")]
        public ActionResult<List<BankAccountSummaryDTO>> GetAllActiveAccounts()
        {
            return _userService.GetAllActiveAccountsWithUserInfo();
        }

        [HttpPut("account/{accountId}/status")]
        public IActionResult UpdateAccountStatus(long accountId, AccountStatus status)
        {
            _userService.UpdateAccountStatus(accountId, status);
            return Ok($"Account status updated to: {status}");
        }

        // Audit Logs
        
        [HttpGet("audit-logs")]
        public async Task<ActionResult<List<AuditLog>>> GetAllAuditLogs()
        {
            var logs = await _auditLogService.GetAllLogsAsync();
            return Ok(logs);
        }

    }
}
