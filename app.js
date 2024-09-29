import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
let drinkData = null;

// Function to get a drink by name
async function getDrinkByName(drinkName) {
  const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`);
  return response.data.drinks;  // This should return the array of drinks
}

// Function to get a random drink
async function getRandomDrink() {
  const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
  return response.data.drinks;  // This should return the array of drinks
}

app.use(bodyParser.urlencoded({ extended: true }));

// Render home page with drinks data
app.get("/", (req, res) => {
  res.render("index.ejs", {
    drinks: drinkData
  });
});

// Search for a drink by name
app.get("/search", async (req, res) => {
  const drinkName = req.query.drinkName; // Use query parameters in GET requests
  if (drinkName) {
    drinkData = await getDrinkByName(drinkName);
  } else {
    drinkData = null;
  }
  res.redirect("/");
});

// Get a random drink
app.get("/suprise", async (req, res) => {
  drinkData = await getRandomDrink();  // Wait for the random drink data
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
});
