import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, Button, Spinner, Alert, Form } from "react-bootstrap";
import {jwtDecode} from "jwt-decode"; // ✅ Added for decoding JWT
import ManagerLayout from "../../layouts/ManagerLayout";

const ManagerKycReview = () => {
  const { id } = useParams(); // KYC ID from URL
  const navigate = useNavigate();
  const [kyc, setKyc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [remarks, setRemarks] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 🔄 Fetch KYC by ID
  const fetchKycDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/api/manager/kyc/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setKyc(response.data);
    } catch (err) {
      setError("Failed to fetch KYC details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKycDetails();
  }, []);

  // ✅ Handle Approve/Reject
  const handleDecision = async (approved) => {
    if (!approved && !remarks.trim()) {
      alert("Please enter remarks for rejection.");
      return;
    }

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");

      if (!token) {
        alert("No token found. Please login again.");
        return;
      }

      // ✅ Decode token to get managerId
      const decoded = jwtDecode(token);
      const managerId = decoded.id || decoded.managerId || decoded.sub; // adjust based on backend payload

      if (!managerId) {
        alert("Manager ID not found in token. Please login again.");
        return;
      }

      await axios.post(
        `http://localhost:8080/api/manager/review/${id}`,
        {
          managerId,
          approved,
          remarks: approved ? "" : remarks,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`KYC ${approved ? "APPROVED" : "REJECTED"} successfully`);
      navigate("/manager/review-kycs");
    } catch (err) {
      console.error("Review error:", err);
      alert("Error while reviewing KYC");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner animation="border" variant="primary" className="mt-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!kyc) return <Alert variant="warning">No KYC found.</Alert>;

  return (
    <ManagerLayout>

    <div className="container mt-4">
      <Card>
        <Card.Header>
          <h4>KYC Review - ID: {kyc.id}</h4>
        </Card.Header>
        <Card.Body>
          <p><strong>Customer Name:</strong> {kyc.user?.firstName} {kyc.user?.lastName}</p>
          <p><strong>Email:</strong> {kyc.user?.email}</p>
          <p><strong>Phone:</strong> {kyc.user?.phoneno}</p>
          <p><strong>Address:</strong> {kyc.user?.address}, {kyc.user?.city}, {kyc.user?.state}</p>
          <p><strong>Status:</strong> {kyc.status}</p>
          <p><strong>Remarks:</strong> {kyc.remarks || '—'}</p>
          <p><strong>Submitted By Clerk:</strong> {kyc.clerk?.firstName} {kyc.clerk?.lastName}</p>

          <hr />

          <p><strong>Documents:</strong></p>
          <ul>
            <li>
              <a href={`http://localhost:8080/kyc_docs/${getFileName(kyc.poiDocumentPath)}`} target="_blank" rel="noopener noreferrer">
                Proof of Identity
              </a>
            </li>
            <li>
              <a href={`http://localhost:8080/kyc_docs/${getFileName(kyc.poaDocumentPath)}`} target="_blank" rel="noopener noreferrer">
                Proof of Address
              </a>
            </li>
          </ul>

          <Form.Group className="mt-3">
            <Form.Label><strong>Remarks (required if rejecting)</strong></Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Write remarks for rejection or leave empty if approving"
            />
          </Form.Group>

          <div className="d-flex gap-3 mt-4">
            <Button
              variant="success"
              className="px-4"
              disabled={submitting}
              onClick={() => handleDecision(true)}
            >
              ✅ Approve
            </Button>
            <Button
              variant="danger"
              className="px-4"
              disabled={submitting}
              onClick={() => handleDecision(false)}
            >
              ❌ Reject
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
    </ManagerLayout>
    
  );
};

// Helper to extract filename from full path
function getFileName(path) {
  if (!path) return "";
  return path.split(/[\\/]/).pop(); // works for Windows or Linux path
}

export default ManagerKycReview;
