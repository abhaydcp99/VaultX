import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Table, Spinner, Alert } from 'react-bootstrap';
import ManagerLayout from '../../layouts/ManagerLayout';

const RejectedKycs = () => {
  const [kycs, setKycs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchKycs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/api/manager/rejected-kycs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setKycs(response.data);
      } catch (err) {
        setError('Failed to load rejected KYCs');
      } finally {
        setLoading(false);
      }
    };

    fetchKycs();
  }, []);

  return (
    <ManagerLayout>

    <Container className="mt-4">
      <h3 className="mb-4">❌ Rejected KYC Applications</h3>

      {loading && <Spinner animation="border" />}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && kycs.length === 0 && (
        <Alert variant="info">No rejected KYC applications found.</Alert>
      )}

      {!loading && kycs.length > 0 && (
        <Card className="p-3">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer Name</th>
                <th>Application ID</th>
                <th>Proof of Identity</th>
                <th>Proof of Address</th>
                <th>Rejected On</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {kycs.map((kyc, index) => (
                <tr key={kyc.id}>
                  <td>{index + 1}</td>
                  <td>{kyc.user?.firstName} {kyc.user?.lastName}</td>
                  <td>{kyc.id}</td>
                  <td>
                    {kyc.poiDocumentPath ? (
                      <a
                        href={`http://localhost:8080/kyc_docs/${getFileName(kyc.poiDocumentPath)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    ) : '—'}
                  </td>
                  <td>
                    {kyc.poaDocumentPath ? (
                      <a
                        href={`http://localhost:8080/kyc_docs/${getFileName(kyc.poaDocumentPath)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View
                      </a>
                    ) : '—'}
                  </td>
                  <td>{kyc.submittedAt ? new Date(kyc.submittedAt).toLocaleString() : '—'}</td>
                  <td>{kyc.remarks || '—'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>
      )}
    </Container>
    </ManagerLayout>
    
  );
};

// Helper function to extract the filename from a full path
function getFileName(path) {
  if (!path) return '';
  return path.split(/[\\/]/).pop();
}

export default RejectedKycs;
