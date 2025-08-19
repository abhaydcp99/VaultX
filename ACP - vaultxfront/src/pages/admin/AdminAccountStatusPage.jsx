import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  if (loading) return <div>Loading accounts...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Active Bank Accounts</h2>
      <table className="min-w-full bg-white border border-gray-200 shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Holder Name</th>
            <th className="border p-2 text-left">Email</th>
            <th className="border p-2 text-left">Account Number</th>
            <th className="border p-2 text-left">Balance</th>
            <th className="border p-2 text-left">Status</th>
            <th className="border p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={index}>
              <td className="border p-2">{account.holderName}</td>
              <td className="border p-2">{account.email}</td>
              <td className="border p-2">{account.accountNumber}</td>
              <td className="border p-2">₹{account.balance?.toLocaleString()}</td>
              <td className="border p-2">{account.accountStatus}</td>
              <td className="border p-2">
                <select
                  value={account.accountStatus}
                  onChange={(e) => handleStatusChange(account.accountNumber, e.target.value)}
                  className="p-1 border rounded"
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
  );
};

export default AdminAccountManagement;
