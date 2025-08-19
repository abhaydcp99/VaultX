using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BankKycSystem.Enums;

namespace BankKycSystem.Entities
{
    
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long? Id { get; set; }

        [Column("first_name")]
        public string? FirstName { get; set; }

        [Column("last_name")]
        public string? LastName { get; set; }

        [Column("email", TypeName = "varchar(255)")]
        public string? Email { get; set; }

        [Column("password")]
        public string? Password { get; set; }

        [RegularExpression(@"^[0-9]{10}$", ErrorMessage = "Phone number must be 10 digits")]
        [Column("phoneno")]
        public string? PhoneNo { get; set; }
        [Required]
        [Column("role")]
        public Role? Role { get; set; }

        [Column("date_of_birth", TypeName = "date")]
        public DateTime? DateOfBirth { get; set; }

        [Column("address")]
        public string? Address { get; set; }

        [Column("city")]
        public string? City { get; set; }

        [Column("state")]
        public string? State { get; set; }

        [RegularExpression(@"^[0-9]{6}$", ErrorMessage = "Pincode must be 6 digits")]
        [Column("pincode")]
        public string? Pincode { get; set; }

        [Column("account_type")]
        public AccountType? AccountType { get; set; }

        [Column("is_verified")]
        public bool? IsVerified { get; set; } = false;

        [Column("created_at", TypeName = "date")]
        public DateTime? CreatedAt { get; set; }

        [Column("updated_at", TypeName = "date")]
        public DateTime? UpdatedAt { get; set; }
    }
}