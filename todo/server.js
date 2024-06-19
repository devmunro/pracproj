const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

dotenv.config();


// PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//Body Parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

//Start server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
