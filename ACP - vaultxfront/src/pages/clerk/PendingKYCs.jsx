// // src/pages/clerk/PendingKYCs.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ClerkLayout from "../../layouts/ClerkLayout";
// import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";

// const PendingKYCs = () => {
//   const [pendingKYCs, setPendingKYCs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchPendingKYCs = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("http://localhost:8080/api/clerk/kyc/pending", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setPendingKYCs(res.data);
//     } catch (err) {
//       console.error("Error fetching pending KYCs:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPendingKYCs();
//   }, []);

//   return (
//     <ClerkLayout>
//       <Container className="mt-4">
//         <h2>Pending KYC Applications</h2>
//         {loading ? (
//           <div className="d-flex justify-content-center mt-5">
//             <Spinner animation="border" />
//           </div>
//         ) : pendingKYCs.length === 0 ? (
//           <p>No pending KYC applications found.</p>
//         ) : (
//           <Row>
//             {pendingKYCs.map((kyc) => (
//               <Col md={6} lg={4} key={kyc.id} className="mb-4">
//                 <Card>
//                   <Card.Body>
//                     <Card.Title>
//                       User: {kyc.user?.firstName} {kyc.user?.lastName}
//                     </Card.Title>
//                     <Card.Text>
//                       <strong>Status:</strong> {kyc.status} <br />
//                       <strong>Account Type:</strong> {kyc.accountType} <br />
//                       <strong>Submitted At:</strong>{" "}
//                       {kyc.submittedAt
//                         ? new Date(kyc.submittedAt).toLocaleString()
//                         : "N/A"}
//                     </Card.Text>
//                     <Button variant="primary" size="sm">
//                       Review KYC
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//         )}
//       </Container>
//     </ClerkLayout>
//   );
// };

// export default PendingKYCs;

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
            <h2 className="text-center text-primary">Pending KYC Applications</h2>
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
              <Table responsive bordered hover className="mb-0">
                <thead className="table-dark text-center">
                  <tr>
                    <th>User Name</th>
                    <th>Status</th>
                    <th>Account Type</th>
                    <th>Submitted At</th>
                   
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingKYCs.map((kyc) => (
                    <tr key={kyc.id} className="text-center align-middle">
                      <td>{kyc.userName || "N/A"}</td>
                      <td>{kyc.status || "N/A"}</td>
                      <td>{kyc.accountType || "N/A"}</td>
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
