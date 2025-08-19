using BankKycSystem.Data;
using BankKycSystem.DTOs;
using BankKycSystem.Entities;
using BankKycSystem.Enums;
using BankKycSystem.Services.Interfaces;
using iText.IO.Font.Constants;
using iText.Kernel.Font;
using iText.Kernel.Geom;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;

namespace BankKycSystem.Services.Implementations
{
    public class TransactionService : ITransactionService
    {
        private readonly ApplicationDbContext _context;

        public TransactionService(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Deposit(string email, decimal amount)
        {
            var account = GetAccountByEmail(email);
            account.Balance += amount;

            var txn = new Transaction
            {
                Amount = amount,
                Type = TransactionType.DEPOSIT,
                Description = "Deposit",
                AccountId = account.Id,
                Timestamp = DateTime.Now
            };

            _context.Transactions.Add(txn);
            _context.SaveChanges();
        }

        public void Withdraw(string email, decimal amount)
        {
            var account = GetAccountByEmail(email);

            if (account.Balance < amount)
                throw new Exception("Insufficient balance");

            account.Balance -= amount;

            var txn = new Transaction
            {
                Amount = amount,
                Type = TransactionType.WITHDRAW,
                Description = "Withdrawal",
                AccountId = account.Id,
                Timestamp = DateTime.Now
            };

            _context.Transactions.Add(txn);
            _context.SaveChanges();
        }

        public void Transfer(string fromEmail, string toEmail, decimal amount)
        {
            var fromAccount = GetAccountByEmail(fromEmail);
            var toAccount = GetAccountByEmail(toEmail);

            if (fromAccount.Balance < amount)
                throw new Exception("Insufficient balance");

            fromAccount.Balance -= amount;
            toAccount.Balance += amount;

            var txnFrom = new Transaction
            {
                Amount = amount,
                Type = TransactionType.TRANSFER,
                Description = $"Transfer to {toAccount.AccountNumber}",
                AccountId = fromAccount.Id,
                Timestamp = DateTime.Now
            };

            var txnTo = new Transaction
            {
                Amount = amount,
                Type = TransactionType.TRANSFER,
                Description = $"Transfer from {fromAccount.AccountNumber}",
                AccountId = toAccount.Id,
                Timestamp = DateTime.Now
            };

            _context.Transactions.AddRange(txnFrom, txnTo);
            _context.SaveChanges();
        }

        public List<TransactionDTO> GetTransactionHistory(string email)
        {
            var account = GetAccountByEmail(email);

            return _context.Transactions
                .Where(t => t.AccountId == account.Id)
                .OrderByDescending(t => t.Timestamp)
                .Select(t => new TransactionDTO
                {
                    Id = t.Id,
                    Amount = t.Amount ?? 0,
                    Type = t.Type.ToString(),
                    Description = t.Description,
                    Timestamp = t.Timestamp ?? DateTime.Now,
                    AccountNumber = account.AccountNumber
                })
                .ToList();
        }

        public byte[] GenerateStatementPdf(string email)
        {
            var transactions = GetTransactionHistory(email);

            using (var ms = new MemoryStream())
            {
                var writer = new PdfWriter(ms);
                var pdf = new PdfDocument(writer);
                var document = new Document(pdf, PageSize.A4);
                document.SetMargins(20, 20, 20, 20);

                // Set bold font
                PdfFont boldFont = PdfFontFactory.CreateFont(StandardFonts.HELVETICA_BOLD);
                PdfFont regularFont = PdfFontFactory.CreateFont(StandardFonts.HELVETICA);

                // Add title
                document.Add(new Paragraph("Bank Statement")
                    .SetTextAlignment(TextAlignment.CENTER)
                    .SetFontSize(18)
                    .SetFont(boldFont));

                // Add metadata
                document.Add(new Paragraph($"Email: {email}").SetFont(regularFont));
                document.Add(new Paragraph($"Generated: {DateTime.Now:yyyy-MM-dd HH:mm:ss}").SetFont(regularFont));
                document.Add(new Paragraph(" ").SetFont(regularFont));

                // Create table
                var table = new Table(5).UseAllAvailableWidth();
                table.AddHeaderCell(new Cell().Add(new Paragraph("ID").SetFont(boldFont)));
                table.AddHeaderCell(new Cell().Add(new Paragraph("Type").SetFont(boldFont)));
                table.AddHeaderCell(new Cell().Add(new Paragraph("Amount").SetFont(boldFont)));
                table.AddHeaderCell(new Cell().Add(new Paragraph("Description").SetFont(boldFont)));
                table.AddHeaderCell(new Cell().Add(new Paragraph("Timestamp").SetFont(boldFont)));

                foreach (var txn in transactions)
                {
                    table.AddCell(new Cell().Add(new Paragraph(txn.Id.ToString()).SetFont(regularFont)));
                    table.AddCell(new Cell().Add(new Paragraph(txn.Type).SetFont(regularFont)));
                    table.AddCell(new Cell().Add(new Paragraph(txn.Amount.ToString("C", CultureInfo.InvariantCulture)).SetFont(regularFont)));
                    table.AddCell(new Cell().Add(new Paragraph(txn.Description ?? "").SetFont(regularFont)));
                    table.AddCell(new Cell().Add(new Paragraph(txn.Timestamp.ToString("yyyy-MM-dd HH:mm:ss")).SetFont(regularFont)));
                }

                document.Add(table);
                document.Close();

                return ms.ToArray();
            }
        }

        private BankAccount GetAccountByEmail(string email)
        {
            var account = _context.BankAccounts
                .Include(a => a.User)
                .FirstOrDefault(a => a.User.Email == email);

            if (account == null)
                throw new Exception("Bank account not found");

            return account;
        }
    }
}
