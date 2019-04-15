const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;

const config = require("../../config");

class MealDao {

  constructor() { }

  getAllMeals() {
    const client = new MongoClient(config.DB_URL);
    const filter = {};
    
    return new Promise((resolve, reject) => {
      client
        .connect()
        .then(mongoClient => 
          mongoClient
            .db(config.DB_NAME)
            .collection(config.DB_COLLECTION_MEALS)
            .find(filter)
            .toArray()
        )
        .then(arr => {
          resolve(arr);
          client.close();          
        })
        .catch(err => reject(err));
    });
  }

  getMeal(mealId) {
    const client = new MongoClient(config.DB_URL);
    const filter = { _id: new ObjectID(mealId) };

    return new Promise((resolve, reject) => {
      client
        .connect()
        .then(connectedClient =>
          connectedClient
            .db(config.DB_NAME)  
            .collection(config.DB_COLLECTION_MEALS)
            .findOne(filter)
        )
        .then(found => {
          resolve(found);
          client.close();
        })
        .catch(err => reject(err));
    });
  }

  addMeal(newMeal) {
    const client = new MongoClient(config.DB_URL);
    const documentToInsert = { 
      name: newMeal.name, 
      calories: parseInt(newMeal.calories) 
    };

    return new Promise((resolve, reject) => {
      client
        .connect()
        .then(connectedClient =>
          connectedClient  
            .db(config.DB_NAME)
            .collection(config.DB_COLLECTION_MEALS)
            .insertOne(documentToInsert)
        )
        .then(() => {
          resolve("Meal Added");
          client.close();
        })
        .catch(err => reject(err));
    });
  }

  updateMeal(updatedMeal) {
    const client = new MongoClient(config.DB_URL);
    const filter = { _id: new ObjectID(updatedMeal.id) };
    const updateOperation = {
      $set: {
        name: updatedMeal.name,
        calories: updatedMeal.calories
      }
    };

    return new Promise((resolve, reject) => {
      client
        .connect()
        .then(connectedClient =>
          connectedClient
            .db(config.DB_NAME)
            .collection(config.DB_COLLECTION_MEALS)
            .updateOne(filter, updateOperation)
        )
        .then(() => {
          resolve("Meal Updated");
          client.close();
        })
        .catch(err => reject(err));
    });
  }

  removeMeal(mealId) {
    const client = new MongoClient(config.DB_URL);
    const filter = { _id: new ObjectID(mealId) };

    return new Promise((resolve, reject) => {
      client
        .connect()
        .then(connectedClient =>
          connectedClient
            .db(config.DB_NAME)  
            .collection(config.DB_COLLECTION_MEALS)
            .deleteOne(filter)
        )
        .then(() => {
          resolve("Meal Removed");
          client.close();
        })
        .catch(err => reject(err));
    });
  }

}

const newMealDao = new MealDao();
module.exports = newMealDao;