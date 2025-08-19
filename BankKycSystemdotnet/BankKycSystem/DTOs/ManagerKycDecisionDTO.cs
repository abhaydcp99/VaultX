using BankKycSystem.Enums;


namespace BankKycSystem.DTOs
{
    public class ManagerKycDecisionDTO
    {
      
        public bool Approved { get; set; }

        
        public KycStatus KycStatus { get; set; }

        public string? Remarks { get; set; }
    }
}
