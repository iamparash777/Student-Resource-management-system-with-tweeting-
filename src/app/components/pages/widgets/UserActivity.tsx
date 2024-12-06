import React, { useEffect, useState } from 'react';
import { db } from '../../../firebaseConfig';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserActivity = () => {
  const [activityData, setActivityData] = useState(Array(7).fill(0)); // Holds activity counts for each day of the week

  useEffect(() => {
    const fetchUserActivity = async () => {
      try {
        const today = new Date();
        const weekAgo = new Date();
        weekAgo.setDate(today.getDate() - 6);

        const activityQuery = query(
          collection(db, 'userActivity'), // Replace with your collection name
          where('timestamp', '>=', Timestamp.fromDate(weekAgo))
        );

        const activitySnapshot = await getDocs(activityQuery);
        const counts = Array(7).fill(0);

        activitySnapshot.forEach((doc) => {
          const activityDate = doc.data().timestamp.toDate();
          const dayIndex = (activityDate.getDay() + 6) % 7; // Adjust index for Mon-Sun order
          counts[dayIndex]++;
        });

        setActivityData(counts);
      } catch (error) {
        console.error("Error fetching user activity:", error);
      }
    };

    fetchUserActivity();
  }, []);

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'User Activity',
        data: activityData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-gray-800 text-white p-4 rounded-md mt-4 col-span-2" style={{ height: '400px' }}>
      <h3 className="font-semibold mb-4">User Activity</h3>
      <Bar data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default UserActivity;
