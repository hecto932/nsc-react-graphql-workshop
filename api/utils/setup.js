'use strict'

const debug = require('debug')('todo-db:setup')
const chalk = require('chalk')
const inquirer = require('inquirer')
const minimist = require('minimist')
const config = require('./config')
const MongoLib = require('./lib/mongo')

const prompt = inquirer.createPromptModule()
const args = minimist(process.argv)
const Mongo = new MongoLib(config)

// Documentos
const TaskService = require('./lib/tasks')
const UserService = require('./lib/users')

// Mocks
const tasks = require('./utils/mocks/tasks')
const users = require('./utils/mocks/users')

async function setup () {
  try {
    if (!args.yes) {
      const answer = await prompt([{
        type: 'confirm',
        name: 'setup',
        message: `This operation will destroy the database, can you `
      }])

      if (!answer.setup) {
        return console.log(chalk.red(`Nothing happend :)`))
      }
    }

    // DROP THE DATABSE
    const dropDatabaseResult = await Mongo.dropDatabase();
    console.log(chalk.green(`DropDatabaseResult ${dropDatabaseResult}`))

    // CREATING USERS
    const userService = new UserService(config)
    const userInsertManyResult = await userService.insertMany(users)

    const taskService = new TaskService(config)
    const taskInsertManyResult = await taskService.insertMany(tasks.map(t => ({ ...t, userId: userInsertManyResult[0] })))
    console.log(chalk.green(`Created ${Object.keys(taskInsertManyResult).length} tasks`))
    console.log(chalk.green(`Created ${Object.keys(userInsertManyResult).length} users`))
    process.exit(0)
  } catch (err) {
    console.log(chalk.red(`Error: ${err.message}`))
    process.exit(1)
  }
}

setup()