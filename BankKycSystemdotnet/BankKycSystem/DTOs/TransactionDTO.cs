using System;

namespace BankKycSystem.DTOs
{
    public class TransactionDTO
    {
        public long Id { get; set; }
        public decimal Amount { get; set; }
        public string Type { get; set; }
        public string? Description { get; set; }
        public DateTime Timestamp { get; set; }
        public string AccountNumber { get; set; }
    }
}
