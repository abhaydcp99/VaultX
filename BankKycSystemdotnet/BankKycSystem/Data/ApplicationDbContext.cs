using BankKycSystem.Entities;
using Microsoft.EntityFrameworkCore;
using Vaultxback.Models;

namespace BankKycSystem.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSet declarations
        public DbSet<User> Users { get; set; }
        public DbSet<BankAccount> BankAccounts { get; set; }
        public DbSet<KycApplication> KycApplications { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<OtpEntity> OtpEntities { get; set; }
        public DbSet<AuditLog> AuditLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Convert enums to string in the database
            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion<string>();

            modelBuilder.Entity<User>()
                .Property(u => u.AccountType)
                .HasConversion<string>();

            // Relationships...
            modelBuilder.Entity<User>()
                .HasMany<BankAccount>()
                .WithOne(b => b.User)
                .HasForeignKey(b => b.UserId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<User>()
                .HasMany<KycApplication>()
                .WithOne(k => k.User)
                .HasForeignKey("UserId")
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<User>()
                .HasMany<KycApplication>()
                .WithOne(k => k.Clerk)
                .HasForeignKey("ClerkId")
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasMany<KycApplication>()
                .WithOne(k => k.Manager)
                .HasForeignKey("ManagerId")
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<User>()
                .HasMany<KycApplication>()
                .WithOne(k => k.Customer)
                .HasForeignKey("CustomerId")
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<KycApplication>()
    .Property(k => k.AccountType)
    .HasConversion<string>();

            modelBuilder.Entity<KycApplication>()
                .Property(k => k.Status)
                .HasConversion<string>();


            modelBuilder.Entity<BankAccount>()
                .HasMany<Transaction>(b => b.Transactions)
                .WithOne(t => t.Account)
                .HasForeignKey(t => t.AccountId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Transaction>()
    .Property(t => t.Type)
    .HasConversion<string>();

            modelBuilder.Entity<BankAccount>()
                .Property(b => b.AccountType)
                .HasConversion<string>();

            modelBuilder.Entity<BankAccount>()
                .Property(b => b.Status)
                .HasConversion<string>();

            modelBuilder.Entity<BankAccount>()
                .Property(b => b.KycStatus)
                .HasConversion<string>();

        }


    }
}
