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

const PlansByDayBarChart = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlansByDate = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/plans-by-date"
        );

        // Transform the data to include the day of the week
        const chartData = response.data.map((item) => {
          const date = new Date(item.date);
          const dayName = date.toLocaleDateString("en-US", { weekday: "long" });

          return {
            day: dayName,
            count: item.count,
          };
        });
        setData(chartData);
      } catch (error) {
        setError("Error fetching plans by date");
        console.error("Error fetching plans by date:", error);
      }
    };

    fetchPlansByDate();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      <ResponsiveContainer
        width="100%"
        height={220}
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
      >
        <BarChart data={data} barSize={50}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlansByDayBarChart;
