"use strict";

const debug = require("debug")("todo:api:task-mutation");
const config = require("../config");
const { TaskService, UserService } = require("../services");

module.exports = {
  createTask: async function(root, { input }) {
    debug(`Function: createTask`);
    const userService = new UserService(config.db);
    const user = await userService.find({ _id: input.userId });

    if (!input.userId || !user) {
      throw Error("userId must be correct...");
    }

    const taskDefault = {
      name: "",
      done: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const newTask = Object.assign(taskDefault, input);

    try {
      const taskService = new TaskService(config.db);
      newTask._id = await taskService.create(newTask);
    } catch (err) {
      console.log(`Error - ${err.message}`);
      return err;
    }
    return newTask;
  },
  editTask: async function(root, { _id, input }) {
    debug(`Function: updateTask`);

    const defaultTask = {
      updatedAt: new Date()
    };

    const updatedTask = Object.assign(defaultTask, input);

    try {
      const taskService = new TaskService(config.db);
      await taskService.update(_id, updatedTask);
      const task = await taskService.getById(_id);
      return task;
    } catch (err) {
      console.log(`Error - ${err.message}`);
      return err;
    }
  },
  deleteTask: async function(root, { _id }) {
    debug(`Function: deleteTask`);
    try {
      const taskService = new TaskService(config.db);
      const deletedTask = await taskService.delete(_id);

      return deletedTask.n !== 0;
    } catch (err) {
      console.log(`Error - ${err.message}`);
      return err;
    }
  }
};
