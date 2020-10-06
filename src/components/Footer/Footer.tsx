import React from "react";

import "./footer.scss";

const Footer: React.FC = () => {
  return (
    <div className="footerContainer">
      <div className="footerbanner"></div>
      <div className="footerContainer">
        <p>
          React Articles®
          <br />
          All rights reserved
        </p>
        <span>2020</span>
      </div>
    </div>
  );
};

export default Footer;
