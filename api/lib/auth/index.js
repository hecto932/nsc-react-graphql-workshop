"use strict";

const debug = require("debug")("todo:api:auth");
const jwt = require("jsonwebtoken");
const config = require("../../config");
const { UserService } = require("../../services");

function sign(payload, secret, options = {}) {
  debug(`JWT -> sign`);
  return jwt.sign(payload, secret, options);
}

function verify(token, secret) {
  debug(`JWT -> verify`);
  return jwt.verify(token, secret);
}

async function getUser(payload) {
  debug(`getUser`, payload);

  try {
    const userService = new UserService(config.db);
    const { userId } = payload;
    const user = await userService.find({ _id: userId });
    return user || null;
  } catch (err) {
    debug(`Error -> ${err.message}`);
    return err;
  }
}

module.exports = {
  sign,
  verify,
  getUser
};
