import React, { useEffect, useState } from "react";
import HeaderBar from "./HeaderBar";
import SideBar from "./SideBar";

interface User {
  id: number;
  user_name: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
}

const TeamMembersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [sortField, setSortField] = useState<keyof User | null>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const API_URL = "http://127.0.0.1:8000/users/";

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  const sortUsers = (field: keyof User) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    setUsers([...users].sort((a, b) => (a[field] < b[field] ? (order === "asc" ? -1 : 1) : a[field] > b[field] ? (order === "asc" ? 1 : -1) : 0)));
  };

  const handleAddOrUpdateMember = async () => {
    if (!currentUser) return;
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_URL}${currentUser.id}` : API_URL;
    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentUser),
      });
      if (!response.ok) throw new Error("Failed to save user");
      fetchUsers();
      setIsOverlayOpen(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${API_URL}${id}`, { method: "DELETE" });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="team-page">
      <HeaderBar />
      <SideBar />
      <div className="content">
        <div className="content-header-container">
          <h1>Team Members</h1>
          <button className="add-btn" onClick={() => { setIsEditing(false); setCurrentUser({ id: 0, user_name: "", first_name: "", last_name: "", date_of_birth: "" }); setIsOverlayOpen(true); }}>+ Add New Team Member</button>
        </div>
        <p>Manage your team members below.</p>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                {(["id", "user_name", "first_name", "last_name", "date_of_birth"] as (keyof User)[]).map(field => (
                  <th key={field} onClick={() => sortUsers(field)}>
                    {field.toUpperCase()} {sortField === field ? (sortOrder === "asc" ? "⬇" : "⬆") : ""}
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.user_name}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.date_of_birth}</td>
                  <td className="menu-cell">
                    <button onClick={() => setMenuOpen(menuOpen === user.id ? null : user.id)}>⋮</button>
                    {menuOpen === user.id && (
                      <div className="menu-dropdown">
                        <button onClick={() => { setIsEditing(true); setCurrentUser(user); setIsOverlayOpen(true); }}>Manage Member</button>
                        <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isOverlayOpen && (
          <div className="overlay">
            <div className="overlay-content">
              <button className="close-btn" onClick={() => setIsOverlayOpen(false)}>✕</button>
              <h2>{isEditing ? "Manage Member" : "Add Team Member"}</h2>
              <input type="text" placeholder="Username" value={currentUser?.user_name || ""} onChange={e => setCurrentUser({ ...currentUser!, user_name: e.target.value })} />
              <input type="text" placeholder="First Name" value={currentUser?.first_name || ""} onChange={e => setCurrentUser({ ...currentUser!, first_name: e.target.value })} />
              <input type="text" placeholder="Last Name" value={currentUser?.last_name || ""} onChange={e => setCurrentUser({ ...currentUser!, last_name: e.target.value })} />
              <input type="date" placeholder="Date of Birth (optional)" value={currentUser?.date_of_birth || ""} onChange={e => setCurrentUser({ ...currentUser!, date_of_birth: e.target.value })} />
              <button className="submit-btn" onClick={handleAddOrUpdateMember}>{isEditing ? "Save Changes" : "Add Member"}</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMembersPage;
