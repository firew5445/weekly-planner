import React, { useEffect, useState } from "react";
import axios from "axios";

const MyReports = () => {
  const [reports, setReports] = useState([]);
  const [token, setToken] = useState("");
  console.log(reports);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);

    const fetchReports = async () => {
      if (!storedToken) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/my_reports",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`, // corrected line
            },
          }
        );
        setReports(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="container mt-3">
      <h2>My Reports</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Report Name</th>
            <th>Status</th>
            <th>Reason</th>
            <th>Feedback</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.name}</td>
              <td>
                {report.status === "green" ? (
                  <span className="badge bg-success">✔️</span>
                ) : (
                  <span className="badge bg-danger">✘</span>
                )}
              </td>
              <td>{report.reason}</td>
              <td>{report.feedback || "N/A"}</td>
              <td>{new Date(report.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyReports;
