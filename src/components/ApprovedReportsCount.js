import React, { useEffect, useState } from "react";
import axios from "axios";

const ApprovedReportsCount = () => {
  const [approvedReportCount, setApprovedReportCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApprovedReportCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/approved-reports-count"
        );
        setApprovedReportCount(response.data.approvedReportCount);
      } catch (error) {
        setError("Error fetching approved reports count");
        console.error("Error fetching approved reports count:", error);
      }
    };

    fetchApprovedReportCount();
  }, []);

  return (
    <div>
      {approvedReportCount !== null ? (
        <p>{approvedReportCount}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ApprovedReportsCount;
