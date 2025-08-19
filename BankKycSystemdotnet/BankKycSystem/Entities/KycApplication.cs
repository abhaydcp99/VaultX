
using BankKycSystem.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace BankKycSystem.Entities
{
    public class KycApplication
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public string? PoiDocumentPath { get; set; }

        public string? PoaDocumentPath { get; set; }

        public KycStatus? Status { get; set; }

        public string? Remarks { get; set; }

        public DateTime? SubmittedAt { get; set; }

        public AccountType? AccountType { get; set; }

        [ForeignKey("UserId")]
        public virtual User? User { get; set; }

        [ForeignKey("ClerkId")]
        public virtual User? Clerk { get; set; }

        [ForeignKey("ManagerId")]
        public virtual User? Manager { get; set; }

        [ForeignKey("CustomerId")]
        public virtual User? Customer { get; set; }
    }
}
