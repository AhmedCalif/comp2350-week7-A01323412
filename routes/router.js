const { reviews } = require("../databaseAccessLayer");

const router = require("express").Router();
const database = include("databaseConnection");
const dbModel = include("databaseAccessLayer");
//const dbModel = include('staticData');

router.get("/", async (req, res) => {
  console.log("page hit");

  try {
    const result = await dbModel.getRestaurants();
    res.render("index", { restaurant: result });

   
    console.log(result);
  } catch (err) {
    res.render("error", { message: "Error reading from MySQL" });
    console.log("Error reading from mysql");
  }
});

router.post("/addRestaurant", async (req, res) => {
  console.log("form submission completed");
  console.log(req.body);
  try {
    const success = await dbModel.addRestaurant(req.body);
    if (success) {
      res.redirect("/");
    } else {
      res.render("error", { message: "Error writing to MySQL" });
      console.log("Error writing to MySQL");
    }
  } catch (err) {
    res.render("error", { message: "Error writing to MySQL" });
    console.log("Error writing to MySQL");
    console.log(err);
  }
});

router.get('/deleteRestaurant', async (req, res) => {
    console.log("delete Restaurant");
   console.log(req.query);
   let restaurantID = req.query.id;
   if (restaurantID) {
   const success = await dbModel.deleteRestaurant(restaurantID);
   if (success) {
   res.redirect("/");
   }
   else {
   res.render('error', {message: 'Error writing to MySQL'});
   console.log("Error writing to mysql");
   
   }
   }
   });



   router.get("/review", async (req, res) => {
    const restaurantId = req.query.id;
  
    try {
        if (!restaurantId) {
            throw new Error("Restaurant ID is missing");
        }

        const getRestaurant = await dbModel.getRestaurantById(restaurantId);
        if (!getRestaurant) {
            throw new Error("Restaurant not found");
        }

        const result = await dbModel.getRestaurantById(restaurantId);
        if (!result) {
            throw new Error("Reviews not found for the restaurant");
        }

        res.render("rate", { restaurant: result, name: getRestaurant, id: restaurantId });
        console.log(result);
    } catch (err) {
        console.error("Error reading from MySQL:", err);
        res.render("error", { message: "Error reading from MySQL: " + err.message });
    }
});

  
router.post('/addReview', async (req, res) => {
  try {
    const { reviewer_name, details, rating } = req.body;
    if (!reviewer_name || !details || !rating) {  
      return res.status(400).send('Please provide all required fields.');
    }

    await dbModel.addReview({ restauarant_id, reviewer_name, details, rating });

    res.redirect('/'); 
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).send('Internal Server Error'); 
  }
});
``

module.exports = router;


