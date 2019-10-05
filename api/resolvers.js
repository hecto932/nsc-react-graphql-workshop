'use strict'

const { merge } = require('lodash')
const GraphQLJSON = require('graphql-type-json')
const { GraphQLDateTime } = require('graphql-iso-date')
const taskResolvers = require('./tasks/resolvers')
const userResolvers = require('./users/resolvers')

const userTypes = require('./users/types')

const types = {
  ...userTypes
}

const resolvers = merge({
  JSON: GraphQLJSON,
  Date: GraphQLDateTime
}, taskResolvers, userResolvers, types)

module.exports = resolvers
