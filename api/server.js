"use strict";

const debug = require("debug")("todo:server");
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./resolvers");
const depthLimit = require("graphql-depth-limit");
const { typeDefs } = require("./schema");
const { createComplexityLimitRule } = require("graphql-validation-complexity");
const config = require("./config");

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());

const api = new ApolloServer({
  typeDefs,
  resolvers,
  async context({ req }) {
    let userData = null;
    let isAuth = false;

    if (config.server.auth) {
      // get the user token from the headers
      const token = req.headers.authentication || "";

      try {
        const tokenPayload = await verify(token, config.auth.secret);
        userData = await getUser(tokenPayload);
        isAuth = false;
        debug(`isAuth -> ${isAuth}`);
        debug(`tokenPayload -> `, tokenPayload);
      } catch (err) {
        debug(`Error -> ${err.message}`);
        userData = null;
        isAuth = false;
      }
    }

    return { isAuth, userData };
  },
  formatError: err => {
    if (config.production) {
      return { message: err.message };
    }
    return err;
  },
  validationRules: [
    depthLimit(config.graphql.depth),
    createComplexityLimitRule(config.graphql.complexity, {
      onCost(cost) {
        debug(`Current query cost ${cost}`);
      },
      formatErrorMessage(cost) {
        return `current query with cost ${cost} exceeds complexity limit of ${config.graphql.complexity}`;
      }
    })
  ], // Plugins or middlewares
  playground: config.graphql.playground,
  tracing: config.graphql.tracing,
  introspection: config.graphql.introspection
});

api.applyMiddleware({
  app,
  path: "/api"
});

if (!process.env.NOW_REGION) {
  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
}

module.exports = app;
