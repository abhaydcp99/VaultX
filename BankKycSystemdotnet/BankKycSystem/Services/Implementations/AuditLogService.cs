using BankKycSystem.Data;
using BankKycSystem.Services.Interfaces;
using Vaultxback.Models;
using Microsoft.EntityFrameworkCore;

namespace BankKycSystem.Services.Implementations
{
    public class AuditLogService : IAuditLogService
    {
        private readonly ApplicationDbContext _context;

        public AuditLogService(ApplicationDbContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Records a new audit log entry.
        /// </summary>
        public async Task AddLogAsync(string action, string performedBy, string targetEntity)
        {
            var log = new AuditLog
            {
                Action = action,
                PerformedBy = performedBy,
                TargetEntity = targetEntity,
                Timestamp = DateTime.UtcNow
            };

            _context.AuditLogs.Add(log);
            await _context.SaveChangesAsync();
        }

        public async Task<List<AuditLog>> GetAllLogsAsync()
        {
            return await _context.AuditLogs
                .OrderByDescending(l => l.Timestamp)
                .ToListAsync();
        }

        public async Task<List<AuditLog>> GetLogsByUserAsync(string performedBy)
        {
            return await _context.AuditLogs
                .Where(l => l.PerformedBy == performedBy)
                .OrderByDescending(l => l.Timestamp)
                .ToListAsync();
        }

        public async Task<List<AuditLog>> GetLogsByActionAsync(string actionKeyword)
        {
            return await _context.AuditLogs
                .Where(l => l.Action.Contains(actionKeyword))
                .OrderByDescending(l => l.Timestamp)
                .ToListAsync();
        }
    }
}
