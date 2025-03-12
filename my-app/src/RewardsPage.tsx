import React from "react";
import HeaderBar from "./HeaderBar";
import SideBar from "./SideBar";

function RewardsPage() {
  return (
    <div>
      <HeaderBar />
      <SideBar />
      <div className="content">
        <h1>Rewards</h1>
        <p> Rewards Page </p>
      </div>
    </div>
  );
}

export default RewardsPage;
