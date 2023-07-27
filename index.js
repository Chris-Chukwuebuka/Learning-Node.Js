const express = require("express");
const app = express();
const port = 3000;
const mealRouter = require("./routes/mealRouter");
// app.get, app.delete, app.patch, app.put, app.set, app.listen.
// status code 200
// setting the view engine
app.set("view engine", "ejs");

// middleware
// app.use((req, res, next) => {
//     console.log("request made");
//     next();
// });
app.use(express.json()); // Allows is to access the json file
//routes
app.use(mealRouter);

app.use((req, res, next) => {
    const requestInfo = {
        url: req.url,
        method: req.method,
        time: new Date().getDate(),
    };
    console.log(requestInfo);
    next();
});

const auth = (req, res, next) => {
    const authorized = false;
    if (authorized) {
        next();
    } else {
        res.send("you are not authorized");
    }
};


// error route
// app.all("*", (req, res) => {
//   res.status(404).render("error");
// });

app.use((req, res) => {
    res.status(404).render("error");
});

app.listen(port, () => {
    console.log(`server running on port ${port}...`);
});