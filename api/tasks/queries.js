"use strict";

const debug = require("debug")("todo:api:user-resolver");
const config = require("../config");
const { TaskService } = require("../services");
const { AuthenticationError } = require("apollo-server-express");

module.exports = {
  getTasks: async (roor, args, { isAuth, user }) => {
    debug(`getTasks`);
    debug(isAuth, config.server.auth);

    if (!isAuth && config.server.auth) {
      throw new AuthenticationError(`Invalid token...`);
    }
    try {
      debug(`userContext -> `, user);
      const taskService = new TaskService(config.db);
      const tasks = await taskService.getAll({}, { createdAt: -1 });
      return tasks;
    } catch (err) {
      debug(`Error: ${err.message}`);
      return err;
    }
  }
};
