const database = include("/databaseConnection");

async function getRestaurants(restaurant_id) {
  let sqlQuery = `
        SELECT restaurant_id, name, description
        FROM restaurant;
    `;
    let params = {
      restaurant_id: restaurant_id,
      
    };
    console.log(params)
  try {
    const results = await database.query(sqlQuery);
    console.log("results: ", results[0]);
    return results[0];
  } catch (err) {
    console.log("Cannot select restaurant table");
    console.log(err);
    return null;
  }
}


async function addRestaurant(postData) {
  console.log("postData: ", postData);

  let sqlInsertRestaurant = `
        INSERT INTO restaurant (name, description)
        VALUES (:name, :description);
    `;

  let params = {
    name: postData.name,
    description: postData.description,
  };

  console.log(sqlInsertRestaurant);

  try {
    const results = await database.query(sqlInsertRestaurant, params);
    let insertedID = results.insertId;

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function deleteRestaurant(restaurantId) {
  let sqlDeleteRestaurant = `
        DELETE FROM restaurant
        WHERE restaurant_id = :restaurantID
    `;
  let params = {
    restaurantID: restaurantId,
  };
  console.log(sqlDeleteRestaurant);
  try {
    await database.query(sqlDeleteRestaurant, params);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function getReviews() {
  let sqlReviews = `
  SELECT review_id,
  restaurant_id,
  reviewer_name, 
  details,
  rating FROM review;
  `
  let params = {
    restaurantId: restaurantId,
  };
  console.log(sqlReviews)

  try {
    await database.query(sqlReviews, params);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }

}

async function deleteReview(reviewId) {
  let sqlDeleteRestaurant = `
        DELETE FROM review
        WHERE review_id = :reviewId
    `;
    let params = {
      reviewId: reviewId,
    };
  console.log(sqlDeleteRestaurant);
  try {
    await database.query(sqlDeleteRestaurant, params);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
addReview

async function addReview(postData) {
  console.log("postData: ", postData);
  let sqlInsertRestaurant = `
        INSERT INTO review ( restaurant_id, reviewer_name, details, rating)
        VALUES (:restaurant_id, :name, :review, :rating);
    `;
  let params = {
    restaurant_id: postData.restaurant_id,
    name: postData.name,
    review: postData.review,
    rating: postData.rating
  };
  console.log(sqlInsertRestaurant);
  try {
    const results = await database.query(sqlInsertRestaurant, params);
    let insertedID = results.insertId;

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
module.exports = { getRestaurants, addRestaurant, deleteRestaurant, addReview, deleteReview, getReviews };
