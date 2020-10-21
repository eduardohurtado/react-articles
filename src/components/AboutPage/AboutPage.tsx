import React, { CSSProperties, useEffect, useState } from "react";

// Style
import "./aboutPage.scss";

const AboutPage: React.FC = () => {
  const [offset, setOffset] = useState(0);

  const style: CSSProperties = {
    backgroundPositionY: `${offset * 0.5}px`,
  };

  useEffect(() => {
    const parallObject = document.querySelector(".aboutPage");
    if (parallObject !== null) {
      parallObject.addEventListener("scroll", () => {
        setOffset(parallObject.scrollTop);

        const parallObjectHTML = parallObject as HTMLElement;

        if (parallObject.scrollTop < 200 || parallObject.scrollTop >= 2100) {
          parallObjectHTML.style.background = "#071013";
        } else {
          parallObjectHTML.style.background = "";
        }
      });
    }
  }, []);

  return (
    <div className="aboutPage">
      <div style={style}>
        <h2>DIV 1</h2>
      </div>
      <div>
        <h2>DIV 2</h2>
      </div>
      <div>
        <h2>DIV 3</h2>
      </div>
      <div>
        <h2>DIV 4</h2>
      </div>
    </div>
  );
};

export default AboutPage;
