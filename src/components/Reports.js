import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";

const ReportRow = ({ report, onNameChange, onStatusChange, onReasonChange, onDelete }) => {
  return (
    <tr style={{ borderBottom: "1px solid black" }}>
      <td style={{ border: "1px solid black", padding: "10px" }}>{report.reportNo}</td>
      <td style={{ border: "1px solid black", padding: "10px" }}>
        <input
          type="text"
          value={report.name}
          onChange={(e) => onNameChange(report.id, e.target.value)}
          style={{ width: "100%" }}
        />
      </td>
      <td style={{ border: "1px solid black", padding: "10px" }}>
        <input
          type="checkbox"
          checked={report.status === "green"}
          onChange={() => onStatusChange(report.id, "green")}
        />
        <span style={{ marginLeft: "5px", color: "green" }}>✔</span>
        <input
          type="checkbox"
          checked={report.status === "red"}
          onChange={() => onStatusChange(report.id, "red")}
        />
        <span style={{ marginLeft: "5px", color: "red" }}>✘</span>
      </td>
      <td style={{ border: "1px solid black", padding: "10px" }}>
      </td>
      <td style={{ border: "1px solid black", padding: "10px" }}>
        <input
          type="text"
          value={report.reason}
          onChange={(e) => onReasonChange(report.id, e.target.value)}
          style={{ width: "100%" }}
        />
      </td>
      <td style={{ border: "1px solid black", padding: "10px" }}>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => onDelete(report.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const ReportManagement = () => {
  const [reports, setReports] = useState([]);
  const [submittedOn, setSubmittedOn] = useState("");

  useEffect(() => {
    const today = new Date();

    // Format current date
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
    const formattedDate = today.toLocaleDateString("en-US", options);
    setSubmittedOn(formattedDate);
  }, []);

  const handleNameChange = (reportId, newName) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId ? { ...report, name: newName } : report
      )
    );
  };

  const handleStatusChange = (reportId, newStatus) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId ? { ...report, status: newStatus } : report
      )
    );
  };

  const handleReasonChange = (reportId, newReason) => {
    setReports((prevReports) =>
      prevReports.map((report) =>
        report.id === reportId ? { ...report, reason: newReason } : report
      )
    );
  };

  const handleDeleteReport = (reportId) => {
    setReports((prevReports) =>
      prevReports.filter((report) => report.id !== reportId).map((report, index) => ({ ...report, reportNo: index + 1 }))
    );
  };

  const handleAddReport = () => {
    setReports((prevReports) => [
      ...prevReports,
      { name: "", id: Date.now(), status: "", reason: "" },
    ]);
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
    watermarkText.innerText = "unchecked";

    watermark.appendChild(watermarkText);
    document.getElementById("reportTableContainer").appendChild(watermark);
  };

  const removeWatermark = () => {
    const watermark = document.getElementById("watermark");
    if (watermark) {
      watermark.remove();
    }
  };

  const handleSave = () => {
    const actionColumns = document.querySelectorAll("#reportTable td:last-child, #reportTable th:last-child");
    actionColumns.forEach((col) => (col.style.display = "none"));
    addWatermark();
    const element = document.getElementById("reportTableContainer");
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.download = "report_table.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      removeWatermark();
      actionColumns.forEach((col) => (col.style.display = ""));
    });
  };

  const handleSubmit = () => {
    
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Report Management</h2>
      <p>Submitted on: <span style={{ textDecoration: "underline" }}>{submittedOn}</span></p>
      <div id="reportTableContainer" style={{ position: "relative", margin: "auto" }}>
        <table id="reportTable" style={{ borderCollapse: "collapse", width: "80%", boxShadow: "0px 0px 10px teal", border: "1px solid teal", margin: "auto", position: "relative", zIndex: 0 }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid black", padding: "10px" }}>Report No</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Report Name</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Plan Status</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Feedback</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Reason</th>
              <th style={{ border: "1px solid black", padding: "10px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <ReportRow
                key={report.id}
                report={{ ...report, reportNo: index + 1 }}
                onNameChange={handleNameChange}
                onStatusChange={handleStatusChange}
                onReasonChange={handleReasonChange}
                onDelete={handleDeleteReport}
              />
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary mt-3" onClick={handleAddReport}>Add Report</button>
      <button className="btn btn-success mt-3 ml-2" onClick={handleSave}>Save</button>
      <button className="btn btn-primary mt-3 ml-2" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default ReportManagement;
