const dao = require("../dao/MealDao");

class MealController {

  constructor() {}

  getAllMeals(req, res) {
    dao
      .getAllMeals()
      .then(meals => {
        // console.log("CONTROLLER || GET ALL MEALS", meals);
        res.json(meals);
      })
      .catch(err => res.json({ message: ("Err at controller " + err)}));

    // res.json({ message: "GET ALL MEALS" }); // STUB
  }

  getMeal(req, res) {
    const mealId = req.params.id;

    dao
      .getMeal(mealId)
      .then(meal => {
        // console.log("CONTROLLER || GET MEAL", meal);
        res.json(meal);
      })
      .catch(err => res.json({ message: ("Err at controller " + err) }));

    // TODO - Send Responses 1. 200, foundMeal 2. 400, "Not Found"

    // res.json({ message: "GET A MEAL" }); // STUB
  }

  addMeal(req, res) {
    // TODO - Validate Request Body
    const newMeal = {
      name: req.body.name,
      calories: parseInt(req.body.calories)
    };

    dao
      .addMeal(newMeal)
      .then(result => res.json(result))
      .catch(err => res.json({ message: ("Err at controller " + err) }));

    // TODO - Send Responses 1. Invalid Body => 400, "Invalid Body Params" 2. 200, "Meal Added"

    // res.json({ message: "ADD A MEAL" }); // STUB
  }

  updateMeal(req, res) {
    // TODO - Validate Request Body    
    const updatedMeal = {
      id: req.body.id,
      name: req.body.name,
      calories: parseInt(req.body.calories)
    };

    dao
      .updateMeal(updatedMeal)
      .then(result => res.json(result))
      .catch(err => res.json({ message: ("Err at controller " + err) }));

    // TODO - Send Response 1. Invalid Body => 400, "Invalid Body Params" 2. 200, "Meal Updated"

    // res.json({ message: "UPDATE A MEAL" }); // STUB
  }

  removeMeal(req, res) {
    const mealId = req.body.id;
    
    dao
      .removeMeal(mealId)
      .then(result => {
        // console.log("CONTROLLER || REMOVE A MEAL", result);
        res.json(result);
      })
      .catch(err => res.json({ message: ("Err at controller " + err) }));

    // TODO - Send Responses 1. 400, "Meal With ID not Found" 2. 200, "Meal Removed"

    // res.json({ message: "REMOVE A MEAL" }); // STUB
  }

}

const newMealController = new MealController();
module.exports = newMealController;