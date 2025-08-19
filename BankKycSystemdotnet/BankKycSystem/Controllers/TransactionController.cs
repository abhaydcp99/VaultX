using BankKycSystem.DTOs;
using BankKycSystem.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BankKycSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "CUSTOMER")]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpPost("deposit")]
        public IActionResult Deposit([FromQuery] string email, [FromQuery] decimal amount)
        {
            _transactionService.Deposit(email, amount);
            return Ok("Deposit successful");
        }

        [HttpPost("withdraw")]
        public IActionResult Withdraw([FromQuery] string email, [FromQuery] decimal amount)
        {
            _transactionService.Withdraw(email, amount);
            return Ok("Withdrawal successful");
        }

        [HttpPost("transfer")]
        public IActionResult Transfer([FromQuery] string fromEmail, [FromQuery] string toEmail, [FromQuery] decimal amount)
        {
            _transactionService.Transfer(fromEmail, toEmail, amount);
            return Ok("Transfer successful");
        }

        [HttpGet("history")]
        public ActionResult<List<TransactionDTO>> GetHistory([FromHeader] string email)
        {
            return Ok(_transactionService.GetTransactionHistory(email));
        }

        [HttpGet("download")]
        public IActionResult DownloadStatement([FromQuery] string email)
        {
            var fileBytes = _transactionService.GenerateStatementPdf(email);
            return File(fileBytes, "application/pdf", "Statement.pdf");
        }
    }
}
