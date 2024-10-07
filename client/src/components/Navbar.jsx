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
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:
            ANd9GcSbAIXfpo2d4j2ahyA4bY3-L1Ne2Apk4s9P1kfT3LTT-pqzFTVh-
            GFhAwZfaj9bzKowD8Y&usqp=CAU"
            alt="profile photo"
          />
          

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
