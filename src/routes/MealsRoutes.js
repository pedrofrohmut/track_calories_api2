const express = require("express");
const router = express.Router();

const controller = require("../controller/MealController");

// Get All Meals
router.get("/meal", controller.getAllMeals);

// Get A Single Meal By ID
router.get("/meal/:id", controller.getMeal);

// Post A Meal Using Request Body As JSON
router.post("/meal", controller.addMeal);

// Put A Meal - json-body
router.put("/meal", controller.updateMeal);

// Delete A Meal by ID
router.delete("/meal", controller.removeMeal);

module.exports = router;