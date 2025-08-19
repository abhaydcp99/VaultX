using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Vaultxback.Models
{
    public class AuditLog
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public string? Action { get; set; }

        public string? PerformedBy { get; set; }

        public DateTime? Timestamp { get; set; }

        public string? TargetEntity { get; set; }

        public string? Details { get; set; }
    }
}
