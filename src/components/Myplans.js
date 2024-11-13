import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import axios from "axios";

const PlanRow = ({ plan, onDelete, onEdit, onWeekChange }) => {
  const getDayName = (index) => {
    switch (index) {
      case 0: return "Monday";
      case 1: return "Tuesday";
      case 2: return "Wednesday";
      case 3: return "Thursday";
      case 4: return "Friday";
      default: return "";
    }
  };

  return (
    <tr style={{ borderBottom: "1px solid black" }}>
      <td style={{ border: "1px solid black", padding: "10px" }}>
        {plan.planNo}
      </td>
      <td style={{ border: "1px solid black", padding: "10px" }}>
        <input
          type="text"
          value={plan.plan_name}
          onChange={(e) => onEdit(plan.id, e.target.value)}
          style={{ width: "100%" }}
        />
      </td>
      {["monday", "tuesday", "wednesday", "thursday", "friday"].map(
        (day, index) => (
          <td key={index} style={{ border: "1px solid black", padding: "10px" }}>
            <input
              type="checkbox"
              checked={plan.days_of_week.includes(day)}
              onChange={() => onWeekChange(plan.id, day)}
            />
            <span style={{ marginLeft: "5px" }}>{getDayName(index)}</span>
          </td>
        )
      )}
      <td style={{ border: "1px solid black", padding: "10px" }}>
        <input
          type="text"
          value={plan.feedback}
          readOnly
          style={{ width: "100%" }}
        />
      </td>
      <td style={{ border: "1px solid black", padding: "10px" }}>
        <button onClick={() => onDelete(plan.id)} className="btn btn-danger">
          Delete
        </button>
      </td>
    </tr>
  );
};

const Myplans = () => {
  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user_plans", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setPlans(response.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  useEffect(() => {
    fetchPlans();
    const interval = setInterval(fetchPlans, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDeletePlan = async (planId) => {
    // Confirm deletion
    const confirmed = window.confirm("Are you sure you want to delete this plan?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/plans/${planId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      
      // Immediately update state to reflect the deletion
      setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== planId));
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const handleEditPlan = (planId, newName) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === planId ? { ...plan, plan_name: newName } : plan
      )
    );
  };

  const handleWeekChange = (planId, day) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              days_of_week: plan.days_of_week.includes(day)
                ? plan.days_of_week.filter((d) => d !== day)
                : [...plan.days_of_week, day],
            }
          : plan
      )
    );
  };

  const addWatermark = () => {
    const watermark = document.createElement("div");
    watermark.id = "watermark";
    watermark.style.position = "absolute";
    watermark.style.top = 0;
    watermark.style.left = 0;
    watermark.style.width = "100%";
    watermark.style.height = "100%";
    watermark.style.zIndex = 1;
    watermark.style.display = "flex";
    watermark.style.alignItems = "center";
    watermark.style.justifyContent = "center";
    watermark.style.transform = "rotate(-45deg)";
    watermark.style.pointerEvents = "none";

    const watermarkText = document.createElement("span");
    watermarkText.style.fontSize = "5em";
    watermarkText.style.color = "red";
    watermarkText.style.opacity = 0.3;
    watermarkText.innerText = "Unapproved";

    watermark.appendChild(watermarkText);
    document.getElementById("planTableContainer").appendChild(watermark);
  };

  const removeWatermark = () => {
    const watermark = document.getElementById("watermark");
    if (watermark) {
      watermark.remove();
    }
  };

  const handleSave = () => {
    const actionColumns = document.querySelectorAll(
      "#planTable td:last-child, #planTable th:last-child"
    );
    actionColumns.forEach((col) => (col.style.display = "none"));
    addWatermark();
    const element = document.getElementById("planTableContainer");
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = "plan_table.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      removeWatermark();
      actionColumns.forEach((col) => (col.style.display = ""));
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Sidama Science and Technology</h1>

      <div
        id="planTableContainer"
        style={{ position: "relative", margin: "auto", width: "100%" }}
      >
        <table
          id="planTable"
          style={{
            borderCollapse: "collapse",
            width: "80%",
            boxShadow: "0px 0px 10px teal",
            border: "1px solid teal",
            margin: "auto",
            position: "relative",
            zIndex: 0,
          }}
        >
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "10px" }}>
                Plan No
              </th>
              <th style={{ border: "1px solid black", padding: "10px" }}>
                Plan Name
              </th>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
                (day, index) => (
                  <th key={index} style={{ border: "1px solid black", padding: "10px" }}>
                    {day}
                  </th>
                )
              )}
              <th style={{ border: "1px solid green", padding: "15px" }}>
                Feedback
              </th>
              <th style={{ border: "1px solid black", padding: "15px" }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan, index) => (
              <PlanRow
                key={plan.id}
                plan={{ ...plan, planNo: index + 1 }}
                onDelete={handleDeletePlan}
                onEdit={handleEditPlan}
                onWeekChange={handleWeekChange}
              />
            ))}
            <tr>
              <td colSpan={7}></td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: "10px" }}>
          <button
            className="btn btn-info"
            onClick={handleSave}
            style={{ marginLeft: "10px" }}
          >
            Save as Image
          </button>
        </div>
      </div>
    </div>
  );
};

export default Myplans;