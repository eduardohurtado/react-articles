import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";

//Global style
import "./sass/app.scss";
import "./sass/normalize.scss";

//Components
import NavBar from "./components/NavBar/NavBar";
import MetricsPage from "./components/MetricsPage/MetricsPage";

function App() {
  return (
    <Router>
      <div className="gridContainer">
        <NavBar />
        <Route
          exact
          path="/Metrics"
          render={() => {
            return <MetricsPage />;
          }}
        ></Route>
      </div>
    </Router>
  );
}

export default App;
