// src/pages/Admin/AuditLogs.jsx
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/api/admin', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogs(res.data);
    } catch (err) {
      console.error('Error fetching logs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const formatTimestamp = (ts) => {
    const date = new Date(ts);
    return date.toLocaleString(); // e.g., "Aug 9, 2025, 2:15 PM"
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-6xl mx-auto">
        {/* Gradient Header */}
        <div
          className="text-white px-6 py-4 rounded-t-lg shadow-md"
          style={{
            background: 'linear-gradient(90deg, #6a11cb, #ff4b2b)',
          }}
        >
          <h2 className="text-xl font-bold">Audit Logs</h2>
        </div>

        {/* Table Container */}
        <div className="bg-white shadow-lg rounded-b-lg overflow-hidden">
          {loading ? (
            <div className="p-6 text-center text-gray-500">Loading logs...</div>
          ) : logs.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No audit logs found.
            </div>
          ) : (
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                  <th className="border-b p-3 text-left">Timestamp</th>
                  <th className="border-b p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 transition-colors"
                    style={{
                      backgroundColor: idx % 2 === 0 ? '#fafafa' : 'white',
                    }}
                  >
                    <td className="border-b p-3">
                      {formatTimestamp(log.timestamp)}
                    </td>
                    <td className="border-b p-3">{log.action}</td>
                    <td className="border-b p-3">{log.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AuditLogs;
