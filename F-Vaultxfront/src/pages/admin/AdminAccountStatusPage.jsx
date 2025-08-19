import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';

const AdminAccountManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token'); // Get JWT from localStorage

  const fetchAccounts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/admin/active-accounts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAccounts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch accounts');
      setLoading(false);
    }
  };

  const handleStatusChange = async (accountNumber, newStatus) => {
    try {
      await axios.put(
        `http://localhost:8080/api/admin/account/${accountNumber}/status?status=${newStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAccounts(); // Refresh after update
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update account status');
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  if (loading)
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-lg font-semibold text-gray-600">
          Loading accounts...
        </div>
      </AdminLayout>
    );

  if (error)
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64 text-lg font-semibold text-red-500">
          {error}
        </div>
      </AdminLayout>
    );

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
          <h2 className="text-2xl font-bold">Active Bank Accounts</h2>
        </div>

        {/* Table Container */}
        <div className="bg-white shadow-lg rounded-b-lg overflow-hidden">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
                <th className="border-b p-3 text-left">Holder Name</th>
                <th className="border-b p-3 text-left">Email</th>
                <th className="border-b p-3 text-left">Account Number</th>
                <th className="border-b p-3 text-left">Balance</th>
                <th className="border-b p-3 text-left">Status</th>
                <th className="border-b p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors"
                  style={{
                    backgroundColor: index % 2 === 0 ? '#fafafa' : 'white',
                  }}
                >
                  <td className="border-b p-3 font-medium">{account.holderName}</td>
                  <td className="border-b p-3">{account.email}</td>
                  <td className="border-b p-3">{account.accountNumber}</td>
                  <td className="border-b p-3 font-semibold text-green-600">
                    ₹{account.balance?.toLocaleString()}
                  </td>
                  <td className="border-b p-3">{account.accountStatus}</td>
                  <td className="border-b p-3">
                    <select
                      value={account.accountStatus}
                      onChange={(e) =>
                        handleStatusChange(account.accountNumber, e.target.value)
                      }
                      className="px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                      <option value="ACTIVE">ACTIVE</option>
                      <option value="INACTIVE">INACTIVE</option>
                      <option value="CLOSED">CLOSED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminAccountManagement;
