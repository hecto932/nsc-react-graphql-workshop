"use strict";

const debug = require("debug")("todo:api:user-mutation");
const {
  AuthenticationError,
  UserInputError
} = require("apollo-server-express");
const { UserService } = require("../services");
const config = require("../config");
const { sign } = require("../lib/auth");
const { encryptPassword, verifyPassword } = require("../lib/utils");

module.exports = {
  userLogin: async (root, { email, password }) => {
    debug(`userLogin`);

    debug(email, password);
    try {
      const userService = new UserService(config.db);

      const user = await userService.find({ email });
      debug(`cono`, user);
      if (!user) {
        throw new AuthenticationError("Unauthorized");
      }

      const compare = await verifyPassword(password, user.password);
      if (!compare) {
        throw new UserInputError(`User or password incorrect...`);
      }

      debug(password, user.password, compare);

      const token = await sign(
        {
          userId: user._id,
          fullName: user.name,
          email: user.email
        },
        config.auth.secret,
        { expiresIn: "1h" }
      );

      return {
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        userToken: token
      };
    } catch (err) {
      debug(`Error -> ${err.message}`);
      return err;
    }
  },
  addUser: async (root, { input }) => {
    debug(`addUser`);
    debug(`input -> `, input);

    try {
      const userService = new UserService(config.db);
      const userDefault = {
        name: "",
        password: "",
        email: "",
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const existUser = await userService.find({ email: input.email });
      if (existUser) {
        throw new UserInputError(`User email exists...`);
      }
      const newUser = Object.assign(userDefault, input);
      newUser.password = await encryptPassword(
        input.password,
        config.bcrypt.saltRounds
      );
      const user = await userService.create(newUser);
      newUser._id = user;
      return newUser;
    } catch (err) {
      debug(`Error -> ${err.message}`);
      return err;
    }

    return args;
  }
};
