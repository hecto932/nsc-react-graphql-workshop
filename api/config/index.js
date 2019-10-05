const production = process.env.NODE_ENV === "production";
const development = process.env.NODE_ENV === "development";

module.exports = {
  appName: "graphql-todo-api",
  production,
  development,
  server: {
    auth: false
  },
  graphql: {
    playground: true,
    tracing: true,
    introspection: true,
    depth: 2,
    complexity: 3000
  },
  auth: {
    secret: process.env.AUTH_JWT_SECRET || "todo-secret" // HERE AUTHENTICATION SECRET
  },
  bcrypt: {
    saltRounds: 10
  },
  db: {
    dbUser: "nearsoft-ws",
    dbPass: "workshop2",
    dbHost: "ds229118.mlab.com",
    dbPort: "29118",
    dbName: "graphql-workshop"
  }
};
