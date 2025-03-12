import React from "react";
import HeaderBar from "./HeaderBar";
import SideBar from "./SideBar";

function Dashboard() {
  return (
    <div>
      <HeaderBar />
      <SideBar />
      <div className="content">
        <h1>Dashboard</h1>
        <p> Dashboard Page </p>
      </div>
    </div>
  );
}

export default Dashboard;
