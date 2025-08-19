
using BankKycSystem.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace BankKycSystem.Entities
{
    public class Transaction
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public decimal? Amount { get; set; }

        public TransactionType? Type { get; set; }

        public string? Description { get; set; }

        public DateTime? Timestamp { get; set; } = DateTime.Now;

        [ForeignKey("AccountId")]
        public long? AccountId { get; set; }

        public virtual BankAccount? Account { get; set; }

       
        public void SetTimestamp()
        {
            if (Timestamp == null)
            {
                Timestamp = DateTime.Now;
            }
        }
    }
}
