const express = require('express');
// import our odm
// Object-Document-Mapper
const mongoose = require('mongoose');

const cors = require('cors');
require('dotenv').config();
const Cat = require('./models/cat');
const Dog = require('./models/dog');

const PORT = process.env.PORT;

const app = express();

app.use(cors());

// Our server maintains a connection to the database
// Mongoose can take care of the DB connection for us.
// Just use this line once in your code, and mongoose
// will be connected.
mongoose.set('strictQuery', true); // strict schemas
mongoose.connect(process.env.DATABASE_URL);

app.get('/cats', async (request, response, next) => {

  const filterQuery = {};
  let cats = [];
  if (request.query.location) {
    filterQuery.location = request.query.location;
  } 

  try {
    cats = await Cat.find(filterQuery);
  } catch(error) {
    return next(error);
  }

  response.send(cats);
});

app.get('/dogs', async (request, response) => {
  if (request.query.breed) { // a non empty string is truthy.
    const dogs = await Dog.find({breed: request.query.breed})
    response.send(dogs);
  } else {
    const dogs = await Dog.find({}); // use {} to find all dogs.
    response.send(dogs);
  }
});

// handle errors
// it's safe to just copy and paste this into your code.
// make sure it is after all your routes (get, post, ...)
// make sure it is before your app.listen call
function errorHandler(err, req, res, next) {
  console.log(err.message);
  res.status(500).send({ error: err.message })
}
app.use(errorHandler);


// start server
app.listen(PORT, () => console.log('Listening on PORT', PORT));


