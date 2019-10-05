import React from "react";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloProvider } from "react-apollo";
import { HttpLink } from "apollo-link-http";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "../page/Home";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: "http://localhost:3001/api"
});

const client = new ApolloClient({
  cache,
  link
});
function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
