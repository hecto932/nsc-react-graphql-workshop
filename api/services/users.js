'use strict'

const { ObjectId } = require('mongodb')
const MongoLib = require('./mongo')

class UserService {
  constructor (options) {
    this.collection = 'users';
    this.mongoDB = new MongoLib(options)
  }

  insertMany (dataArray) {
    return this.mongoDB.insertMany(this.collection, dataArray)
  }

  async getAll(queryParams) {
    const query = queryParams || {}
    const users = await this.mongoDB.getAll(this.collection, query)

    return users || []
  }

  async create(data) {
    const user = await this.mongoDB.create(this.collection, data)
    return user
  }

  async find(queryParams) {
    const query = queryParams || {}
    if (query && query._id) {
      query._id = ObjectId(query._id)
    }
    const user = await this.mongoDB.find(this.collection, query)
    return user || null
  }
}

module.exports = UserService
