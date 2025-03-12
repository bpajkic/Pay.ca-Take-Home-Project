import React, { useState } from "react";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <MainContent />
      <Header />
    </div>
  );
}

// Sidebar Component
function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="company-name">Company Name</h2>
      <nav className="nav-menu">
        <NavItem icon="📊" label="Dashboard" />
        <NavItem icon="👥" label="Team Members" active />
        <NavItem icon="🎉" label="Rewards" />
      </nav>
      <div className="rewards-section">
        <p>You have <span className="points">4,500 points</span></p>
        <a href="#" className="rewards-link">Explore Rewards →</a>
      </div>
    </aside>
  );
}

// Main Content Component
function MainContent() {
  const [menuOpen, setMenuOpen] = useState<number | null>(null);

  const teamMembers = [
    { id: 1, username: "cedwards", firstName: "Colleen", lastName: "Edwards", dob: "1990/10/01" },
    { id: 2, username: "alane", firstName: "Aubrey", lastName: "Lane", dob: "" },
    { id: 3, username: "rpeters", firstName: "Richard", lastName: "Peters", dob: "" },
    { id: 4, username: "alaney", firstName: "Aubrey", lastName: "Laney", dob: "1990/10/01" },
  ];

  return (
    <main className="main-content">
      <div className="content-header">
        <div>
          <h1 className="title">Team Members</h1>
          <p className="subtitle">Manage your team members below.</p>
        </div>
        <button className="add-btn">+ Add New Team Member</button>
      </div>

      <div className="table-container">
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
            {teamMembers.map((member, index) => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.username}</td>
                <td>{member.firstName}</td>
                <td>{member.lastName}</td>
                <td>{member.dob}</td>
                <td className="menu-cell">
                  <button onClick={() => setMenuOpen(menuOpen === index ? null : index)}>
                  </button>
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
    </main>
  );
}

// Header Component
function Header() {
  return (
    <header className="header">
      <div className="user-info">
        <p className="user-name">Cate Blanchett</p>
        <p className="company">ACME Incorporated</p>
      </div>
      <div className="user-avatar">CB</div>
    </header>
  );
}

// Navigation Item Component
function NavItem({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) {
  return (
    <div className={`nav-item ${active ? "active" : ""}`}>
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

export default App;
