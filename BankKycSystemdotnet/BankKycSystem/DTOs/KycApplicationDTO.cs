namespace BankKycSystem.DTOs
{
    public class KycApplicationDTO
    {
        public long Id { get; set; }
        public string? CustomerName { get; set; }
        public string? PoiDocumentPath { get; set; }
        public string? PoaDocumentPath { get; set; }
        public string? Remarks { get; set; }
        public string? Status { get; set; }
        public DateTime? SubmittedAt { get; set; }
        public string? AccountType { get; set; }
    }
}
