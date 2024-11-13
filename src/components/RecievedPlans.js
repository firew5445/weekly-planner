import React, { useEffect, useState } from "react";
import axios from "axios";

const ReceivedPlans = () => {
  const [plans, setPlans] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);

    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/received_plans",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        setPlans(response.data);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    if (storedToken) {
      fetchPlans();
    } else {
      console.error("No token found");
    }
  }, []);

  const handleApprove = async (planId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/approve_plan",
        { planId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPlans(
        plans.map((plan) =>
          plan.id === planId ? { ...plan, feedback: "approved" } : plan
        )
      );
    } catch (error) {
      console.error("Error approving plan:", error);
    }
  };

  return (
    <div className="container mt-3">
      <h2 className="text-center">Received Plans</h2>

      {/* Table for larger screens */}
      <div className="table-responsive d-none d-lg-block">
        <table className="table table-hover table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Plan Name</th>
              <th>Days of Week</th>
              <th>Created At</th>
              <th>Username</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan, index) => (
              <tr key={index}>
                <td>{plan.plan_name}</td>
                <td>
                  {plan.days_of_week.split(",").map((day) => (
                    <span key={day} className="badge bg-primary me-1">
                      {day}
                    </span>
                  ))}
                </td>
                <td>{new Date(plan.created_at).toLocaleString()}</td>
                <td>{plan.username}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleApprove(plan.id)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for smaller screens */}
      <div className="d-lg-none">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="card mb-3"
            style={{
              borderRadius: "15px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{plan.plan_name}</h5>
              <div className="d-flex flex-wrap mb-2">
                <strong className="me-1">Days of Week:</strong>
                {plan.days_of_week.split(",").map((day) => (
                  <span key={day} className="badge bg-primary me-1">
                    {day}
                  </span>
                ))}
              </div>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(plan.created_at).toLocaleString()}
              </p>
              <p>
                <strong>Username:</strong> {plan.username}
              </p>
              <button
                className="btn btn-success mt-auto"
                style={{
                  alignSelf: "flex-end",
                  minWidth: "100px",
                }}
                onClick={() => handleApprove(plan.id)}
              >
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @media (max-width: 576px) {
          .card {
            padding: 10px;
            margin: 10px;
            font-size: 0.9rem;
          }
          .card-title {
            font-size: 1.2rem;
          }
          .btn {
            font-size: 0.9rem;
          }
        }

        @media (max-width: 768px) {
          .table {
            font-size: 0.9rem;
          }
        }

        .table thead th {
          background-color: #f8f9fa;
          text-align: center;
        }

        .badge {
          font-size: 0.8rem;
        }
      `}</style>
    </div>
  );
};

export default ReceivedPlans;

