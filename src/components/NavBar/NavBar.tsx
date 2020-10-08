import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";

// Text scramble
import TextScramble from "@twistezo/react-text-scramble";

// Icon
import { SiReact } from "react-icons/si";
import { VscBook } from "react-icons/vsc";

// Style
import "./navBar.scss";

const NavBar: React.FC = () => {
  const iconStyle: CSSProperties = {
    color: "white",
    display: "inline-block",
  };

  return (
    <>
      <div className="navBar">
        <ul>
          <li>
            <Link to="/" replace>
              Home
            </Link>
          </li>
          <li>
            <Link to="/Metrics" replace>
              Metrics
            </Link>
          </li>
          <li>
            <Link to="/About" replace>
              About
            </Link>
          </li>
          <li className="item-r">
            <Link to="/Contact" replace>
              Contact
            </Link>
          </li>
        </ul>
      </div>
      <div className="banner">
        <div className="bannerIcon">
          <SiReact size={40} style={iconStyle} />
        </div>
        <TextScramble
          texts={["React Articles"]}
          letterSpeed={50}
          className="h1Title"
          nextLetterSpeed={200}
        />
        <div className="bannerIcon2">
          <VscBook size={40} style={iconStyle} />
        </div>
      </div>
    </>
  );
};

export default NavBar;
