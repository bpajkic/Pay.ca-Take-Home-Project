import React from "react";
import { NavLink } from "react-router-dom";

function NavItem({ icon, label, to }: { icon: string; label: string; to: string }) {
  return (
    <NavLink to={to} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
      <span>{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
function SideBar() {
    return (
      <aside className="sidebar">
        <nav className="nav-menu">
          <NavItem icon="📊" label="Dashboard" to="/" />
          <NavItem icon="👥" label="Team Members" to="/team-members" />
          <NavItem icon="🎉" label="Rewards" to="/rewards" />
        </nav>
        <div className="rewards-section">
          <p>🎉</p> 
          <p>You have</p> 
          <p className="points">4,500 points</p>
          <NavLink to="/rewards">Explore Rewards →</NavLink>
        </div>
      </aside>
    );
  }
  
  export default SideBar;