"use strict";

const debug = require("debug")("todo:db:mongoLib");
const { MongoClient, ObjectId } = require("mongodb");

class MongoLib {
  constructor(options) {
    !options || typeof options === "object"
      ? new Error(`Option must be a valid object...`)
      : "";
    this.dbName = options.dbName;
    const MONGO_URI = `mongodb://${
      options.dbUser || options.dbPass
        ? `${`${options.dbUser}:${options.dbPass}`}@`
        : ""
    }${options.dbHost}:${options.dbPort}/${this.dbName}`;
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  }

  connection() {
    debug(`Connecting to ${this.dbName}`);
    return new Promise((resolve, reject) => {
      this.client.connect(err => {
        if (err) {
          reject(err);
        }
        // debug(`Connected succesfully to mongo`);
        resolve(this.client.db(this.dbName));
      });
    });
  }

  getAll(collection, query, order) {
    debug(`${this.dbName} -> getAll -> ${collection}`);
    return this.connection().then(db => {
      return db
        .collection(collection)
        .find(query)
        .sort(order)
        .toArray();
    });
  }

  get(collection, id) {
    debug(`${this.dbName} -> ${collection} -> get -> ${id}`);
    return this.connection().then(db => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  find(collection, query) {
    debug(`${this.dbName} -> ${collection} -> find`);
    return this.connection().then(db => {
      return db.collection(collection).findOne(query);
    });
  }

  create(collection, data) {
    debug(`${this.dbName} -> ${collection} -> create`);
    return this.connection()
      .then(db => {
        return db.collection(collection).insertOne(data);
      })
      .then(result => result.insertedId);
  }
  update(collection, id, data) {
    debug(`${this.dbName} -> ${collection} -> update -> ${id}`);
    return this.connection().then(db => {
      return db
        .collection(collection)
        .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
    });
  }
  delete(collection, id) {
    debug(`${this.dbName} -> ${collection} -> delete -> ${id}`);
    return this.connection()
      .then(db => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(result => result.result);
  }

  // INSERT MANY
  insertMany(collection, data) {
    debug(`InsertMany ${this.dbName} -> ${collection}`);
    return this.connection()
      .then(db => {
        return db.collection(collection).insertMany(data);
      })
      .then(result => result.insertedIds);
  }

  dropDatabase() {
    debug(`DropDatabase -> ${this.dbName}`);
    return this.connection()
      .then(db => {
        return db.dropDatabase();
      })
      .then(result => result);
  }
}

module.exports = MongoLib;
