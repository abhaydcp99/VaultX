using BankKycSystem.Enums;

namespace BankKycSystem.DTOs
{
    public class KycUploadRequestDTO
    {
        public string PoiType { get; set; } 
        public string PoaType { get; set; } 
        public IFormFile PoiDocument { get; set; } 
        public IFormFile PoaDocument { get; set; } 
        public AccountType AccountType { get; set; } 
    }
}
