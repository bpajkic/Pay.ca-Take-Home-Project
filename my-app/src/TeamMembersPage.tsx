import React, { useEffect, useState } from "react";
import HeaderBar from "./HeaderBar";
import SideBar from "./SideBar";

function TeamMembersPage() {
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const API_URL = "http://127.0.0.1:8000/users/?skip=0&limit=10";

  interface User {
    id: number;
    user_name: string;
    first_name: string;
    last_name: string;
    date_of_birth: string;
  }

  const fetchUsers = async (): Promise<User[]> => {
    try {
      console.log("Fetching users...");
      const response = await fetch(API_URL);
      console.log("Response received:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data received:", data);
      return data;
    } catch (error) {
      console.error("Failed to load users:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <div>
      <HeaderBar />
      <SideBar />
      <div className="content">
        <h1>Team Members</h1>
        <p>Manage your team members below.</p>
        <button className="add-btn">+ Add New Team Member</button>
        <table className="team-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USERNAME</th>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>DATE OF BIRTH</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.user_name}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.date_of_birth}</td>
                <td className="menu-cell">
                  <button onClick={() => setMenuOpen(menuOpen === index ? null : index)}>⋮</button>
                  {menuOpen === index && (
                    <div className="menu-dropdown">
                      <button>Manage Member</button>
                      <button className="delete-btn">Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeamMembersPage;
