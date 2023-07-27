// const express = require("express"); way one
// const router = express.Router() way one

const router = require("express").Router(); // way 2
const {
  getSingleMeal,
  getAllMeals,
  createMeal,
  updateMeal,
  getAbout,
  deleteMeal,
  getHomepage,
} = require("../controller/mealController");
//create a meal -
// router.post("/api/meals",createMeal ); way one
//get all meals
// router.get("/api/meals", getAllMeals); way one
router.route("/api/meals").get(getAllMeals).post(createMeal); //way two of doing it
// get single meal
// router.get("/api/meals/:mealId",getSingleMeal ); way one
//updating a meal
//Find what we want to update -get sth || undefined
//Provide what we want to update to
// router.patch("/api/meals/:mealId",updateMeal); way one

//Deleting meals
// router.delete("/api/meals/:mealId",deleteMeal); way one
router
  .route("/api/meals/:mealId")
  .get(getSingleMeal)
  .patch(updateMeal)
  .delete(deleteMeal); //way two of doing it
router.get("/", getHomepage);
router.get("/about", getAbout);

//redirecting
router.get("/about-us", (req, res) => {
  res.redirect("/about");
});

module.exports = router;
