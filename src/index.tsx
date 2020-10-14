import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// GraphQL
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";

// Global state Redux
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/store";

// Apollo client
const wsLink = new WebSocketLink({
  uri: "/graphql",
  options: {
    reconnect: true,
  },
});

const client = new ApolloClient({
  link: wsLink,
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
