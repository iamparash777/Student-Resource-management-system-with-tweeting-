import React, { useEffect, useState } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const TotalUsers = () => {
  const [userCount, setUserCount] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const userCollection = collection(db, 'users'); // Replace 'users' with your collection name
        const userSnapshot = await getDocs(userCollection);
        const totalUsers = userSnapshot.size;
        setUserCount(totalUsers);

        // For demonstration, setting a static +12% increase
        setPercentageChange(12);
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div className="bg-gray-800 text-white p-4 rounded-md">
      <h2 className="text-3xl font-semibold">{userCount}</h2>
      <p className="text-green-500">+{percentageChange}%</p>
      <p>Total Users</p>
    </div>
  );
};

export default TotalUsers;
