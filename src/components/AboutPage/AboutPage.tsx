import React, { CSSProperties, useEffect, useState } from "react";

// Components
import LazyImage from "../LazyImage/LazyImage";

// Style
import "./aboutPage.scss";

const AboutPage: React.FC = () => {
  const [offset, setOffset] = useState(0);

  const style: CSSProperties = {
    backgroundPositionY: `${offset * 0.5}px`,
  };

  const imageLogoHtml = {
    alt: "Html5",
    width: "79px",
    height: "110px",
    src: "https://live.staticflickr.com/65535/50375762576_b01ac0b821_o.png",
  };
  const imageLogoTs = {
    alt: "Typescript",
    width: "110px",
    height: "110px",
    src: "https://live.staticflickr.com/65535/50375934352_e29b64610c_o.png",
  };
  const imageLogoScss = {
    alt: "Sass",
    width: "148px",
    height: "110px",
    src: "https://live.staticflickr.com/65535/50375773251_a6687d4fac_o.png",
  };
  const imageLogoReact = {
    alt: "ReactJs",
    width: "96px",
    height: "110px",
    src: "https://live.staticflickr.com/65535/50375049578_86298fb86b_o.png",
  };
  const imageLogoRedux = {
    alt: "Redux",
    width: "87px",
    height: "110px",
    src: "https://live.staticflickr.com/65535/50516230533_ac4cb36f96_o.png",
  };
  const imageLogoNodeJs = {
    alt: "MongoDb",
    width: "101px",
    height: "110px",
    src: "https://live.staticflickr.com/65535/50375055268_d232b7d345_o.png",
  };
  const imageLogoExpress = {
    alt: "Express",
    width: "110px",
    height: "110px",
    src: "https://live.staticflickr.com/65535/50375043378_4a8b260ebb_o.png",
  };
  const imageLogoGraphQL = {
    alt: "Express",
    width: "98px",
    height: "110px",
    src: "https://live.staticflickr.com/65535/50517213947_a6e7fb8c31_o.png",
  };
  const imageLogoMongoDb = {
    alt: "MongoDb",
    width: "172px",
    height: "110px",
    src: "https://live.staticflickr.com/65535/50375005883_42c309563a_o.png",
  };
  const imageArchitecture = {
    alt: "3-Tier-Architecture",
    width: "90%",
    height: "auto",
    src: "https://miro.medium.com/max/3828/1*3E4w7rCe3eaz6gLlZoe6nQ.png",
  };

  useEffect(() => {
    const parallObject = document.querySelector(".aboutPage");
    if (parallObject !== null) {
      parallObject.addEventListener("scroll", () => {
        setOffset(parallObject.scrollTop);
      });
    }
  }, []);

  return (
    <div className="aboutPage">
      <div style={style} className="div1">
        <span className="titleAP">{"I'M GLAD TO HAVE YOU HERE!"}</span>
      </div>
      <div className="div2">
        <p className="paragraph">
          This software was born as a personal practice to improve skills in
          React.Js and the Node.Js environment, fullstack web application (CRUD)
          operational and <b>real time response</b>, also, this is a
          React-Router multi tab and mobile first application, global state
          provided by Redux and production bundling practice powered by
          Webpack4, all this working with a business GraphQL API layer conected
          to a MongoDB database.
        </p>

        <p className="paragraph">
          This application was made following the three-tier layer architecture,
          enabling client components to interact with data resources and legacy
          applications.
        </p>

        <p className="subtitle">Presentation tier technologies</p>

        <div className="rowWrap">
          <div className="marginPhoto">
            <LazyImage photo={imageLogoHtml} />
          </div>
          <div className="marginPhoto">
            <LazyImage photo={imageLogoTs} />
          </div>
          <div className="marginPhoto">
            <LazyImage photo={imageLogoScss} />
          </div>
          <div className="marginPhoto">
            <LazyImage photo={imageLogoReact} />
          </div>
          <div className="marginPhoto">
            <LazyImage photo={imageLogoRedux} />
          </div>
        </div>

        <p className="subtitle">Business logic tier technologies</p>
        <div className="rowWrap">
          <div className="marginPhoto">
            <LazyImage photo={imageLogoNodeJs} />
          </div>
          <div className="marginPhoto">
            <LazyImage photo={imageLogoExpress} />
          </div>
          <div className="marginPhoto">
            <LazyImage photo={imageLogoGraphQL} />
          </div>
        </div>

        <p className="subtitle">Data resource tier technologies</p>
        <div className="rowWrap">
          <div className="marginPhoto">
            <LazyImage photo={imageLogoMongoDb} />
          </div>
        </div>
      </div>
      <div className="div3">
        <span className="titleAP">{"And... what is it?"}</span>
      </div>
      <div className="div2">
        <div className="centerAP">
          <LazyImage photo={imageArchitecture} />
        </div>
        <p className="paragraph">
          <b>First tier.</b> Responsibility for presentation and user
          interaction resides with the first-tier components. These client
          components enable the user to interact with the second-tier processes
          in a secure and intuitive manner. WebSphere Application Server
          supports several client types. Clients do not access the third-tier
          services directly. For example, a client component provides a form on
          which a customer orders products. The client component submits this
          order to the second-tier processes, which check the product databases
          and perform tasks that are needed for billing and shipping.
        </p>
        <p className="paragraph">
          <b>Second tier.</b> The second-tier processes are commonly referred to
          as the application logic layer. These processes manage the business
          logic of the application, and are permitted access to the third-tier
          services. The application logic layer is where most of the processing
          work occurs. Multiple client components can access the second-tier
          processes simultaneously, so this application logic layer must manage
          its own transactions.
        </p>
        <p className="paragraph">
          In the previous example, if several customers attempt to place an
          order for the same item, of which only one remains, the application
          logic layer must determine who has the claim to that item, update the
          database to reflect the purchase, and inform the other customers that
          the item is no longer available. Without an application logic layer,
          client components access the product database directly. The database
          is required to manage its own connections, typically locking out a
          record that is being accessed. A lock can occur when an item is placed
          into a shopping cart, preventing other customers from considering it
          for purchase. Separating the second and third tiers reduces the load
          on the third-tier services, supports more effective connection
          management, and can improve overall network performance.
        </p>
        <p className="paragraph">
          <b>Third tier.</b> The third-tier services are protected from direct
          access by the client components residing within a secure network.
          Interaction must occur through the second-tier processes.
        </p>
        <p className="paragraph">
          (
          <a href="https://www.ibm.com/" target="blank">
            https://www.ibm.com/
          </a>
          , 2020 )
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
