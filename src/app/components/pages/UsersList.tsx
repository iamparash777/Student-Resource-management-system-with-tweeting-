import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useRouter } from "next/router";

const UsersList = ({ currentUserId }) => {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersList = usersSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.id !== currentUserId); // Exclude current user
      setUsers(usersList);
    };

    fetchUsers();
  }, [currentUserId]);

  const startChat = (userId) => {
    const chatId = currentUserId < userId
      ? `${currentUserId}_${userId}`
      : `${userId}_${currentUserId}`;
    router.push(`/chat/${chatId}`);
  };

  return (
    <div>
      <h2>All Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} onClick={() => startChat(user.id)} style={{ cursor: "pointer" }}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
