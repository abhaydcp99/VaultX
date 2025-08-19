

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Spinner,
  Button,
  Table,
  Alert,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import ClerkLayout from "../../layouts/ClerkLayout";

// Helper to extract filename
function getFileName(path) {
  if (!path) return "";
  return path.split(/[\\/]/).pop();
}

const PendingKYCs = () => {
  const [pendingKYCs, setPendingKYCs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchPendingKYCs = async () => {
    try {
      setError("");
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/api/clerk/kyc/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPendingKYCs(response.data);
    } catch (err) {
      console.error("Error fetching pending KYCs:", err);
      setError("Failed to load pending KYC applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingKYCs();
  }, []);

  return (
    <ClerkLayout>
      <Container className="mt-4">
        <Row className="mb-4">
          <Col>
            <h2 className="text-center text-primary">
              Pending KYC Applications
            </h2>
          </Col>
        </Row>

        {loading ? (
          <div className="d-flex justify-content-center mt-5">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        ) : pendingKYCs.length === 0 ? (
          <Alert variant="info" className="text-center">
            No pending KYC applications found.
          </Alert>
        ) : (
          <Card className="shadow-sm">
            <Card.Body>
              <Table responsive bordered hover className="mb-0 text-center">
                <thead className="table-dark">
                  <tr>
                    <th>User Name</th>
                    <th>Status</th>
                    <th>Account Type</th>
                    <th>Proof of Identity</th>
                    <th>Proof of Address</th>
                    <th>Submitted At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingKYCs.map((kyc) => (
                    <tr key={kyc.id} className="align-middle">
                      <td>{kyc.userName || "N/A"}</td>
                      <td>{kyc.status || "N/A"}</td>
                      <td>{kyc.accountType || "N/A"}</td>
                      <td>
                        {kyc.poiDocumentPath ? (
                          <a
                            href={`http://localhost:8080/kyc_docs/${getFileName(
                              kyc.poiDocumentPath
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td>
                        {kyc.poaDocumentPath ? (
                          <a
                            href={`http://localhost:8080/kyc_docs/${getFileName(
                              kyc.poaDocumentPath
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td>
                        {kyc.submittedAt
                          ? new Date(kyc.submittedAt).toLocaleString()
                          : "N/A"}
                      </td>
                      <td>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => navigate(`/clerk/kyc/${kyc.id}`)}
                        >
                          Start Video KYC
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        )}
      </Container>
    </ClerkLayout>
  );
};

export default PendingKYCs;
