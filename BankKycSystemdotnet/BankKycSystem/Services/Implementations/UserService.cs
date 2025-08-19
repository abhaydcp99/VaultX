using BankKycSystem.Data;
using BankKycSystem.DTOs;
using BankKycSystem.Entities;
using BankKycSystem.Enums;
using BankKycSystem.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BankKycSystem.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public UserResponseDTO Register(UserRegisterDTO dto, Role role)
        {
            var user = new User
            {
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                Email = dto.Email,
                Password = dto.Password, 
                PhoneNo = dto.PhoneNo,
                Role = role,
                DateOfBirth = dto.DateOfBirth,
                Address = dto.Address,
                City = dto.City,
                State = dto.State,
                Pincode = dto.Pincode,
                CreatedAt = DateTime.UtcNow,
                IsVerified = false
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return MapToResponse(user);
        }

        public List<UserResponseDTO> GetAllByRole(Role role)
        {
            return _context.Users
                .Where(u => u.Role == role)
                .Select(MapToResponse)
                .ToList();
        }

        public UserResponseDTO Update(long id, UpdateUserDTO dto, Role role)
        {
            var user = _context.Users.Find(id);
            if (user == null) throw new Exception("User not found");

            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;
            user.PhoneNo = dto.PhoneNo;
            user.Role = role;
            user.Address = dto.Address;
            user.City = dto.City;
            user.State = dto.State;
            user.Pincode = dto.Pincode;
            user.UpdatedAt = DateTime.UtcNow;

            _context.SaveChanges();
            return MapToResponse(user);
        }

        public void Delete(long id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }

        public List<BankAccountSummaryDTO> GetAllActiveAccountsWithUserInfo()
        {
            return _context.BankAccounts
                .Where(a => a.Status == AccountStatus.ACTIVE)
                .Include(a => a.User)
                .Select(a => new BankAccountSummaryDTO
                {
                    AccountId = a.Id.HasValue ? a.Id.Value : 0,
                    AccountNumber = a.AccountNumber,
                    AccountType = a.AccountType.ToString(),
                    Status = a.Status.ToString(),
                    CustomerName = $"{a.User.FirstName} {a.User.LastName}"
                })
                .ToList();
        }

        public void UpdateAccountStatus(long accountId, AccountStatus status)
        {
            var account = _context.BankAccounts.Find(accountId);
            if (account == null) throw new Exception("Account not found");

            account.Status = status;
            _context.SaveChanges();
        }

        private UserResponseDTO MapToResponse(User user)
        {
            return new UserResponseDTO
            {
                Id = user.Id ?? 0, 
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                PhoneNo = user.PhoneNo,
                Role = user.Role ?? Role.CUSTOMER,
                Address = user.Address,
                City = user.City,
                State = user.State,
                Pincode = user.Pincode,
                IsVerified = user.IsVerified ?? false 
            };
        }

    }
}
