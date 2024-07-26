import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import axios from "axios";

const PlanRow = ({ plan, onDelete, onEdit, onWeekChange }) => {
  const getDayName = (index) => {
    switch (index) {
      case 0:
        return "Monday";
      case 1:
        return "Tuesday";
      case 2:
        return "Wednesday";
      case 3:
        return "Thursday";
      case 4:
        return "Friday";
      default:
        return "";
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
          value={plan.name}
          onChange={(e) => onEdit(plan.id, e.target.value)}
          style={{ width: "100%" }}
        />
      </td>
      {plan.weeks.map((isChecked, index) => (
        <td key={index} style={{ border: "1px solid black", padding: "10px" }}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => onWeekChange(plan.id, index)}
          />
          <span style={{ marginLeft: "5px" }}>{getDayName(index)}</span>
        </td>
      ))}
      <td style={{ border: "1px solid black", padding: "10px" }}>
        <input
          type="text"
          value={plan.feedback}
          readOnly
          style={{ width: "100%" }}
        />
      </td>
      <td style={{ border: "1px solid black", padding: "10px" }}>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(plan.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const PlanManagement = () => {
  const [plans, setPlans] = useState([]);
  const [submittedOn, setSubmittedOn] = useState("");
  const [endedOn, setEndedOn] = useState("");

  useEffect(() => {
    const today = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = today.toLocaleDateString("en-US", options);
    setSubmittedOn(formattedDate);
    const endedOnDate = new Date(today);
    endedOnDate.setDate(endedOnDate.getDate() + 5);
    const formattedEndedOnDate = endedOnDate.toLocaleDateString(
      "en-US",
      options
    );
    setEndedOn(formattedEndedOnDate);
  }, []);

  const handleAddPlan = () => {
    setPlans((prevPlans) => [
      ...prevPlans,
      {
        name: "",
        id: Date.now(),
        weeks: [false, false, false, false, false],
        feedback: "",
      },
    ]);
  };

  const handleDeletePlan = (planId) => {
    setPlans((prevPlans) =>
      prevPlans
        .filter((plan) => plan.id !== planId)
        .map((plan, index) => ({ ...plan, planNo: index + 1 }))
    );
  };

  const handleEditPlan = (planId, newName) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === planId ? { ...plan, name: newName } : plan
      )
    );
  };

  const handleWeekChange = (planId, weekIndex) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === planId
          ? {
              ...plan,
              weeks: [
                ...plan.weeks.slice(0, weekIndex),
                !plan.weeks[weekIndex],
                ...plan.weeks.slice(weekIndex + 1),
              ],
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

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/plans",
        plans
      );
      alert(response.data.message);
    } catch (error) {
      console.error("There was an error creating the plans!", error);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Sidama Science and Technology</h1>
      <p>
        Submitted on:{" "}
        <span style={{ textDecoration: "underline" }}>{submittedOn}</span>
      </p>
      <p>
        Ended on: <span style={{ textDecoration: "underline" }}>{endedOn}</span>
      </p>
      <div
        id="planTableContainer"
        style={{ position: "relative", margin: "auto" }}
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
              {[...Array(5)].map((_, index) => (
                <th
                  key={index}
                  style={{ border: "1px solid black", padding: "10px" }}
                >
                  {index === 0
                    ? "Monday"
                    : index === 1
                    ? "Tuesday"
                    : index === 2
                    ? "Wednesday"
                    : index === 3
                    ? "Thursday"
                    : "Friday"}
                </th>
              ))}
              <th style={{ border: "1px solid black", padding: "10px" }}>
                Feedback
              </th>
              <th style={{ border: "1px solid black", padding: "10px" }}>
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
              <td colSpan={6}></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button className="btn btn-primary" onClick={handleAddPlan}>
          Add Plan
        </button>
      </div>
      <div
        style={{ textAlign: "right", marginTop: "10px", marginRight: "102px" }}
      >
        <button className="btn btn-success" onClick={handleSave}>
          Save
        </button>{" "}
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default PlanManagement;
