using BankKycSystem.DTOs;

namespace BankKycSystem.Services.Interfaces
{
    public interface ITransactionService
    {
        void Deposit(string email, decimal amount);
        void Withdraw(string email, decimal amount);
        void Transfer(string fromEmail, string toEmail, decimal amount);
        List<TransactionDTO> GetTransactionHistory(string email);
        byte[] GenerateStatementPdf(string email);
    }
}
