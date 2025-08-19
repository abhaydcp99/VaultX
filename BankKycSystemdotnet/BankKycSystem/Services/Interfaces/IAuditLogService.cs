using Vaultxback.Models;

namespace BankKycSystem.Services.Interfaces
{
    public interface IAuditLogService
    {
        Task<List<AuditLog>> GetAllLogsAsync();
        Task<List<AuditLog>> GetLogsByUserAsync(string performedBy);
        Task<List<AuditLog>> GetLogsByActionAsync(string actionKeyword);
        Task AddLogAsync(string action, string performedBy, string targetEntity);
    }


}
