namespace BankKycSystem.DTOs
{
    public class BankAccountSummaryDTO
    {
        public long AccountId { get; set; }
        public string AccountNumber { get; set; }
        public string AccountType { get; set; }
        public string Status { get; set; }
        public string CustomerName { get; set; }
    }
}
