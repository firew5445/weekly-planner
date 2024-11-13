import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ApprovedReportsByDateBarChart = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApprovedReports = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/approved-reports"
        );

        // Transform the data to include the day of the week
        const chartData = response.data.map((item) => {
          const date = new Date(item.creationDate);
          const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

          return {
            day: dayName,
            count: item.approvedCount,
          };
        });
        setData(chartData);
      } catch (error) {
        setError("Error fetching approved reports");
        console.error("Error fetching approved reports:", error);
      }
    };

    fetchApprovedReports();
  }, []);
  
          
  return (
    <div>
      {error && <p>{error}</p>}
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={50}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ApprovedReportsByDateBarChart;
