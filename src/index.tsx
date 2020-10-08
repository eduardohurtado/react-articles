import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// GraphQL
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

// Global state Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/store";

// Create client
const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

// Create store
const store = createStore(reducer);

// Font selector
import "./fonts/fontSelector.scss";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
