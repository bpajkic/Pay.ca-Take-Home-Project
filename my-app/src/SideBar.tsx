import React from "react";
import { NavLink } from "react-router-dom";

function SideBar() {
    return (
      <aside className="sidebar">
        <nav className="nav-menu">
          <NavLink to = "/" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>📊 Dashboard</NavLink>
          <NavLink to = "/team-members" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>👥 Team Members</NavLink>
          <NavLink to = "/rewards" className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>🎉 Rewards</NavLink>
        </nav>
        <div className="rewards-section">
          <p>🎉</p> 
          <p>You have</p> 
          <p style={{ fontSize: "16px", fontWeight: "bold" }}>4,500 points</p>
          <NavLink to="/rewards">Explore Rewards →</NavLink>
        </div>
      </aside>
    );
  }
  
  export default SideBar;