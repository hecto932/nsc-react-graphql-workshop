"use strict";

const debug = require("debug")("todo:api:user-types");
const config = require("../config");
const { TaskService } = require("../services");

module.exports = {
  User: {
    tasks: async (task, context, info) => {
      const { _id: userId } = task;
      const taskService = new TaskService(config.db);
      const tasks = await taskService.getAll({ userId });
      return tasks;
    }
  }
};
