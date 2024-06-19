const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const dotenv = require("dotenv")
const todoRoutes = require("./routes/todoRoutes");




dotenv.config();


//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Use routes
app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});


//Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
