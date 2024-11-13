import React, { useEffect, useState } from "react";
import axios from "axios";

const ReceivedReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);  // Define loading state
  const [error, setError] = useState(null);       // Define error state

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true); // Start loading
      setError(null);   // Reset error
      try {
        const response = await axios.get("http://localhost:5000/api/received_reports", {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
        setReports(response.data);
      } catch (err) {
        console.error("Error fetching received reports:", err);
        setError("Failed to fetch reports. Please try again."); // Set error message
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchReports();
  }, []);
  const handleApprove = async (reportId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/update_report_status", // Backend route to update status
        { reportId, feedback: "approved" }, // Set feedback status as approved
      );
      // Update report feedback locally
      setReports(
        reports.map((report) =>
          report.id === reportId ? { ...report, feedback: "approved" } : report
        )
      );
    } catch (error) {
      console.error("Error approving report:", error);
    }
  };
  
 

  return (
    <div className="container mt-3">
      <h2>Received Reports</h2>
      {loading && <p>Loading reports...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Report Name</th>
            <th>Status</th>
            <th>Reason</th>
            <th>Feedback</th>
            
            <th>Created At</th>
            <th>Approve</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.name}</td>
              <td>
                {report.status === "green" ? (
                  <span className="badge bg-success">✔</span>
                ) : (
                  <span className="badge bg-danger">✘</span>
                )}
              </td>
              <td>{report.reason}</td>
              <td>{report.feedback || "Pending approval"}</td>
              <td>{new Date(report.created_at).toLocaleString()}</td>

              <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleApprove(report.id)}
                  >
                    Approve
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceivedReports;

