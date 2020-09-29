import React from "react";
import { Link } from "react-router-dom";

//Icon
import { SiReact } from "react-icons/si";

//Style
import "./navBar.scss";

export default function NavBar() {
  const iconStyle = {
    margin: "15px",
    color: "white",
  };

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
        <SiReact size={40} style={iconStyle} />
        <h1>React Articles</h1>
      </div>
    </>
  );
}
