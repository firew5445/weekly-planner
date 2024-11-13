// Frontend: Notifications.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    setToken(storedToken);

    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/notifications",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        setNotifications(response.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    if (storedToken) {
      fetchNotifications();
    } else {
      console.error("No token found");
    }
  }, []);

  return (
    <div className="container mt-3">
      <h2>Notifications</h2>
      <ul className="list-group">
        {notifications.map((notification) => (
          <li key={notification.id} className="list-group-item">
            {notification.message} -{" "}
            {new Date(notification.created_at).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
