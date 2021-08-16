import React from "react";
import "./Header.css";
function Header() {
  return (
    <div className="header">
      <h1 className="header__logo">SERVcare</h1>
      <div className="header__right">
        <p className="header__right__data">
          Radio Tataouine{" "}
          <span className="header__right__data--network">@Ratazone</span>
        </p>
      </div>
    </div>
  );
}

export default Header;
