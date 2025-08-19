using BankKycSystem.Data;
using BankKycSystem.DTOs;
using BankKycSystem.Entities;
using BankKycSystem.Enums;
using BankKycSystem.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BankKycSystem.Services.Implementations
{
    public class CustomerService : ICustomerService
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        public CustomerService(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public async Task RegisterCustomerAsync(UserRegisterDTO dto)
        {
            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Password = dto.Password, 
                PhoneNo = dto.PhoneNo,
                DateOfBirth = dto.DateOfBirth,
                Address = dto.Address,
                City = dto.City,
                State = dto.State,
                Pincode = dto.Pincode,
                Role = Role.CUSTOMER,
                IsVerified = false,
                CreatedAt = DateTime.UtcNow
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }
        public async Task UploadKycDocumentsForCurrentUserAsync(KycUploadRequestDTO dto, string userEmail)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
            if (user == null)
                throw new Exception("User not found");

         
            string webRoot = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            string uploadsFolder = Path.Combine(webRoot, "uploads");

            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            
            string poiFileName = $"{Guid.NewGuid()}_{Path.GetFileName(dto.PoiDocument.FileName)}";
            string poiFullPath = Path.Combine(uploadsFolder, poiFileName);
            using (var poiStream = new FileStream(poiFullPath, FileMode.Create))
            {
                await dto.PoiDocument.CopyToAsync(poiStream);
            }

            string poaFileName = $"{Guid.NewGuid()}_{Path.GetFileName(dto.PoaDocument.FileName)}";
            string poaFullPath = Path.Combine(uploadsFolder, poaFileName);
            using (var poaStream = new FileStream(poaFullPath, FileMode.Create))
            {
                await dto.PoaDocument.CopyToAsync(poaStream);
            }

            
            var kyc = new KycApplication
            {
                User = user,
                PoiDocumentPath = Path.Combine("uploads", poiFileName).Replace("\\", "/"),
                PoaDocumentPath = Path.Combine("uploads", poaFileName).Replace("\\", "/"),
                Status = KycStatus.PENDING,
                AccountType = dto.AccountType,
                SubmittedAt = DateTime.UtcNow
            };

            _context.KycApplications.Add(kyc);
            await _context.SaveChangesAsync();
        }


        public async Task<AccountInfoDTO> GetAccountInfoByEmailAsync(string email)
        {
            var account = await _context.BankAccounts.FirstOrDefaultAsync(a => a.User.Email == email);
            if (account == null) throw new Exception("Account not found");

            return new AccountInfoDTO
            {
                AccountNumber = account.AccountNumber,
                AccountType = (AccountType)(account.AccountType ?? default),
                BranchName = account.BranchName,
                IFSCCode = account.IfscCode,
                Balance = account.Balance ?? 0
            };

        }

        public async Task<AccountInfoDTO> GetAccountInfoByUserIdAsync(long userId)
        {
            var account = await _context.BankAccounts.FirstOrDefaultAsync(a => a.User.Id == userId);
            if (account == null) throw new Exception("Account not found");

            return new AccountInfoDTO
            {
                AccountNumber = account.AccountNumber,
                AccountType = (AccountType)(account.AccountType ?? default),
                BranchName = account.BranchName,
                IFSCCode = account.IfscCode, 
                Balance = account.Balance ?? 0
            };

        }

        public async Task<KycApplication> GetKycForCurrentUserAsync(string userEmail)
        {
            var kyc = await _context.KycApplications
                .Include(k => k.User)
                .FirstOrDefaultAsync(k => k.User.Email == userEmail);

            if (kyc == null) throw new Exception("KYC record not found");
            return kyc;
        }
    }
}
