import React, { useEffect, useState } from "react";

// Style
import "./aboutPage.scss";

const AboutPage: React.FC = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setOffset(window.pageYOffset);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (offset) {
      console.log(offset);
    }
  }, [offset]);

  return (
    <div className="aboutPage">
      <div>
        <h2
          className="parallax"
          style={{
            backgroundPositionY: `translateY(${offset * 0.5}px)`,
          }}
        >
          DIV 1
        </h2>
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
