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

const API_URL = "http://127.0.0.1:8000/users/";

const TeamMembersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [sortField, setSortField] = useState<keyof User>("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);


  // Form fields
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      console.log("Fetching users...");
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setUsers(sortData(data, sortField, sortOrder));
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  const sortData = (data: User[], field: keyof User, order: "asc" | "desc") => {
    return [...data].sort((a, b) => {
      if (a[field] < b[field]) return order === "asc" ? -1 : 1;
      if (a[field] > b[field]) return order === "asc" ? 1 : -1;
      return 0;
    });
  };

  const sortUsers = (field: keyof User) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
    setUsers(sortData(users, field, order));
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
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      const response = await fetch(`${API_URL}${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error(`Failed to delete user. Status: ${response.status}`);

      fetchUsers(); // Refresh the user list after deletion
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
          <button className="add-btn" onClick={() => setIsOverlayOpen(true)}>+ Add New Team Member</button>
        </div>
        <p>Manage your team members below.</p>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th onClick={() => sortUsers("id")}>ID {sortField === "id" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
                <th onClick={() => sortUsers("user_name")}>USERNAME {sortField === "user_name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
                <th onClick={() => sortUsers("first_name")}>FIRST NAME {sortField === "first_name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
                <th onClick={() => sortUsers("last_name")}>LAST NAME {sortField === "last_name" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
                <th onClick={() => sortUsers("date_of_birth")}>DATE OF BIRTH {sortField === "date_of_birth" ? (sortOrder === "asc" ? "▲" : "▼") : ""}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
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
                        <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Team Member Overlay */}
        {isOverlayOpen && (
          <div className="overlay">
            <div className="overlay-content">
              <button className="close-btn" onClick={() => { setIsOverlayOpen(false); setShowSuccessMessage(false); }}>✕</button>
              
              {showSuccessMessage ? (
                <div className="success-message">
                  <h1>✨👨🏻‍🌾👨🏻‍🦰👨🏽‍🎤✨</h1>
                  <h2>{isEditing ? "Team member successfully updated." : "Team member successfully added."}</h2>
                  {isEditing ? "" : <button className="submit-btn" onClick={() => { setShowSuccessMessage(false); }}>Add another member</button>}
                  <button className="view-btn" onClick={() => { setIsOverlayOpen(false); setShowSuccessMessage(false); }}>View all team members</button>
                </div>
              ) : (
                <div className="overlay-content">
                  <h2>{isEditing ? "Manage Member" : "Add Team Member"}</h2>
                  <input type="text" placeholder="Username" value={currentUser?.user_name || ""} onChange={e => setCurrentUser({ ...currentUser!, user_name: e.target.value })} />
                  <input type="text" placeholder="First Name" value={currentUser?.first_name || ""} onChange={e => setCurrentUser({ ...currentUser!, first_name: e.target.value })} />
                  <input type="text" placeholder="Last Name" value={currentUser?.last_name || ""} onChange={e => setCurrentUser({ ...currentUser!, last_name: e.target.value })} />
                  <input type="date" placeholder="Date of Birth (optional)" value={currentUser?.date_of_birth || ""} onChange={e => setCurrentUser({ ...currentUser!, date_of_birth: e.target.value })} />
                  <button className="submit-btn" onClick={handleAddOrUpdateMember}>{isEditing ? "Save Changes" : "Add Member"}</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMembersPage;
