"use strict";

const debug = require("debug")("todo:api:user-queries");
const { AuthenticationError } = require("apollo-server-express");
const { UserService } = require("../services");
const config = require("../config");

module.exports = {
  getUsers: async (root, args, { isAuth }) => {
    debug(`getUsers`);
    if (!isAuth) throw new AuthenticationError(`Invalid token...`);

    try {
      const userService = new UserService(config.db);
      const users = await userService.getAll({});
      return users;
    } catch (err) {
      debug(`Error -> ${err.message}`);
      return err;
    }
  }
};
