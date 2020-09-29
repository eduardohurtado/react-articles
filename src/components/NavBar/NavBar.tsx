import React from "react";
import { Link } from "react-router-dom";

//Icon
import { ImHome3 } from "react-icons/im";

//Style
import "./navBar.scss";

const iconStyle = {
  margin: "15px",
  color: "white",
};

export default function NavBar() {
  return (
    <>
      <div className="navBar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Metrics">Metrics</Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
          <li className="item-r">
            <Link to="/Contact">Contact</Link>
          </li>
        </ul>
      </div>
      <div className="banner">
        <ImHome3 size={40} style={iconStyle} />
        <h1>Page title</h1>
      </div>
    </>
  );
}
