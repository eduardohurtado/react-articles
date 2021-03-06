import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

// Global style
import "./sass/app.scss";
import "./sass/normalize.scss";

// Components
import NavBar from "./components/NavBar/NavBar";
import MetricsPage from "./components/MetricsPage/MetricsPage";
import HomePage from "./components/HomePage/HomePage";
import AboutPage from "./components/AboutPage/AboutPage";
import ContactPage from "./components/ContactPage/ContactPage";

// Notification component
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const App: React.FC = () => {
  return (
    <Router>
      <ReactNotification />
      <div className="gridContainer">
        <NavBar />
        <Route
          exact
          path="/Metrics"
          render={() => {
            return <MetricsPage />;
          }}
        ></Route>
        <Route
          exact
          path="/"
          render={() => {
            return <HomePage />;
          }}
        ></Route>
        <Route
          exact
          path="/About"
          render={() => {
            return <AboutPage />;
          }}
        ></Route>
        <Route
          exact
          path="/Contact"
          render={() => {
            return <ContactPage />;
          }}
        ></Route>
      </div>
    </Router>
  );
};

export default App;
