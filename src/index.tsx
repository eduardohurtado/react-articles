import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

//Global state Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/store";

//Create store
const store = createStore(reducer);

//Font selector
import "./fonts/fontSelector.scss";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
