
using BankKycSystem.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Numerics;
// Assuming your enums are here


namespace BankKycSystem.Entities
{
    public class BankAccount
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long? Id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? AccountNumber { get; set; }

        public AccountType? AccountType { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string? BranchName { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string? IfscCode { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal? Balance { get; set; }

        public AccountStatus? Status { get; set; }

        public KycStatus? KycStatus { get; set; } = BankKycSystem.Enums.KycStatus.PENDING;

        
        public virtual List<Transaction>? Transactions { get; set; }

        [ForeignKey("UserId")]
        public long? UserId { get; set; }

        public virtual User? User { get; set; }
    }
}
