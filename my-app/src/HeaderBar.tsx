import React from "react";

function HeaderBar() {
  return (
    <header className="header">
      <div>Company Name</div>
      <div className="header-user-info">
        <div>
          <p className="header-user-name">Cate Blanchett</p>
          <p className="header-company">ACME Incorporated</p>
        </div>
        <div className="header-user-avatar">CB</div>
      </div>
    </header>
  );
}

export default HeaderBar;
