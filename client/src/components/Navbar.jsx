import React from "react";
import "../CSS/Navbar.css";
import { CiSearch } from "react-icons/ci";

const Navbar = ({ searchTerm, setSearchTerm }) => {
  return (
    <nav className="nav">
      <div className="left-box">
        <h3>BookMarks</h3>
      </div>

      <div className="right-box">
        <div className="inputbox">
          <CiSearch className="icon" />
          <input
            type="search"
            name="search"
            className="input"
            id="search"
            placeholder="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="profile">
          <h5>Login</h5>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
