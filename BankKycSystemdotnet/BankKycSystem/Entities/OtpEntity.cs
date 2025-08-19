using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankKycSystem.Entities
{
    
    public class OtpEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long? Id { get; set; }

        [Required] 
        [Column("email")]
        public string? Email { get; set; }

        [Column("otp")]
        public string? Otp { get; set; }

        [Column("generated_at")]
        public DateTime? GeneratedAt { get; set; }

        [Column("expiry_at")]
        public DateTime? ExpiryAt { get; set; }

        [Column("is_used")]
        public bool? IsUsed { get; set; } = false;
    }
}
