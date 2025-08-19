using BankKycSystem.Enums;

namespace BankKycSystem.DTOs
{
    public class AccountInfoDTO
    {
        public string AccountNumber { get; set; }
        public AccountType AccountType { get; set; }
        public string BranchName { get; set; }
        public string IFSCCode { get; set; }
        public decimal Balance { get; set; }
    }
}
