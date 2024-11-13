import React, { useEffect, useState } from "react";
import axios from "axios";

const ApproverPlansCount = () => {
  const [approverPlanCount, setApproverPlanCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApproverPlanCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/approver-plans-count"
        );
        setApproverPlanCount(response.data.approverPlanCount);
      } catch (error) {
        setError("Error fetching approver plans count");
        console.error("Error fetching approver plans count:", error);
      }
    };

    fetchApproverPlanCount();
  }, []);

  return (
    <div>
      {approverPlanCount !== null ? (
        <p>{approverPlanCount}</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ApproverPlansCount;
