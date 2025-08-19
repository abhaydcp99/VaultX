// src/pages/Admin/AuditLogs.jsx
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);

  const fetchLogs = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:8080/api/admin', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setLogs(res.data);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <AdminLayout>
      <h4>Audit Logs</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Timestamp</th><th>Action</th><th>User</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, idx) => (
            <tr key={idx}>
              <td>{log.timestamp}</td>
              <td>{log.action}</td>
              <td>{log.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AdminLayout>
  );
};

export default AuditLogs;
