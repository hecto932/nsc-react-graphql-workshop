'use strict'

const debug = require('debug')('todo:api:utils')
const bcrypt = require('bcrypt')
const fs = require('fs')
const { gql } = require('apollo-server-express')

function loadTypeDefs(schemaPath) {
  debug(`loading schema -> ${schemaPath}`)
  const schemaFile = fs.readFileSync(schemaPath, 'utf8');
  return gql(schemaFile)
}

function encryptPassword (str, saltRounds) {
  debug(`encryptPassword`)
  return bcrypt.hash(str, saltRounds)
}

function verifyPassword(plainText, hash) {
  return bcrypt.compare(plainText, hash)
}

module.exports = {
  loadTypeDefs,
  encryptPassword,
  verifyPassword
}