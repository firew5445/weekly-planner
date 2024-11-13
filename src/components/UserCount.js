import React, { useEffect, useState } from "react";
import axios from "axios";

const UserCount = () => {
  const [userCount, setUserCount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user-count"
        );
        setUserCount(response.data.userCount);
      } catch (error) {
        setError("Error fetching user count");
        console.error("Error fetching user count:", error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {userCount !== null ? <p>{userCount}</p> : <p>Loading...</p>}
    </div>
  );
};

export default UserCount;
