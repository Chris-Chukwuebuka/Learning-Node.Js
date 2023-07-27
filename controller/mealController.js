const meals =require("../models/meals")
//get all meals
const getAllMeals = (req, res) => {
    res.status(200).json({ numOfMeals: meals.length, meals });
};

//get a meal
const getSingleMeal = (req, res) => {
    res.send("get a single meal")
    //req.params 1 4 25
    //console,log(req.params.mealId)
    const { mealId } = req.params;
    const meals = meals.find((meal) => meal.id === parseInt(mealId));
    if (!meal) {
        return res.status(404).json({
            message: `Meal with the id ${mealId} not found`,
            success: false,
        });
    }
    res.status(200).json({ success: true, meal })
};

 //update
const updateMeal = (req, res) => {
    const { mealId } = req.params;
    const { name } = req.body;

    const meal = meals.find((meal) => meal.id === Number(mealId));
    if (!meal) {
        return res.status(404).json({ message: `meal with the id ${mealId} not found` });
    }
    if (!name) {
        return res.status(400).json({ message: "please provide a new meal name " });
    }
    const mealToBeUpdated = meals.map((meal) => {
        if (meal.id === Number(mealId)) {
            meal.name = name;
        }
        return meal;
    })
    return res.status(200).json({ success: true, meals: mealToBeUpdated });
};

 //delete
const deleteMeal= (req, res) => {
    const { mealId } = req.params;

    const meal = meals.find((meal) => meal.id === Number(mealId));
    if (!meal) {
        return res.status(404).json({ message: `meal with the id ${mealId} not found ` });
    }
    const remaningMeals = meals.filter((meal) => meal.id !== parseInt(mealId));
    res.status(200).json({ success: true, meals: remaningMeals });
};
const auth = (req, res, next) => {
    const authorized = false;
    if (authorized) {
        next();
    } else {
        res.send("you are not authorized");
    }
};
const getAccount =  (req, res) => {
    res.status(200).send("Your Acoount Details");
};


 //create
 const createMeal=(req, res) => {
    //req.body
    // console.log(req.body);
    const { name } = req.body
    if (!name) {
        return res.status(400).json({ message: "Please provide a meal name " });
    }
    const newMeal = { id: 8, name };
    res.status(201).json({ success: true, meals: [...meals, newMeal] });
    
}



 //get homepage
const getHomepage = (req, res) => {
    const user = "Funsho";
    const role = "Fullstack engineer";
    res.status(200).render("index", { user, role });
};   


 //get about
const getAbout = (req, res) => {
    res.status(200).render("about");
};

module.exports = {
    getHomepage,getSingleMeal,getAllMeals,getAbout,updateMeal,createMeal,deleteMeal
}