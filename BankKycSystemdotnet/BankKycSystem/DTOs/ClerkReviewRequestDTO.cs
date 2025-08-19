using System.ComponentModel.DataAnnotations;

namespace BankKycSystem.DTOs
{
    public class ClerkReviewRequestDTO
    
        {
        [Required]
        public bool SelfieVerified { get; set; }

        [Required]
        public bool PoiVerified { get; set; }

        [Required]
        public bool PoaVerified { get; set; }

        [Required]
        public bool LivenessPassed { get; set; }

        public string? Notes { get; set; }
    }


}
