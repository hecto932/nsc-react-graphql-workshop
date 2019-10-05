'use strict'

const path = require('path')
const { mergeTypes } = require('merge-graphql-schemas')
const { loadTypeDefs } = require('./lib/utils')

const rootTypeDefs = loadTypeDefs(path.join(__dirname, 'schema.graphql'))
const typeDefs = [
  rootTypeDefs,
  loadTypeDefs(path.join(__dirname, 'tasks', 'schema.graphql')),
  loadTypeDefs(path.join(__dirname, 'users', 'schema.graphql')),
]


module.exports = {
  typeDefs: mergeTypes(typeDefs, { all: true })
}