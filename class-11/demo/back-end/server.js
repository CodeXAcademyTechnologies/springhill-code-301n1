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
// convert request.body from json
app.use(express.json());

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

// READ
//GET http://localhost:3001/dogs
app.get('/dogs', async (request, response) => {
  if (request.query.breed) { // a non empty string is truthy.
    const dogs = await Dog.find({breed: request.query.breed})
    response.send(dogs);
  } else {
    const dogs = await Dog.find({}); // use {} to find all dogs.
    response.send(dogs);
  }
});

// CREATE
// POST http://localhost:3001/dogs
app.post('/dogs', async (request, response) => {
  const dogObj = request.body;
  const dog = await Dog.create(dogObj);
  response.send(dog);
})

// DELETE
// DELETE http://localhost:3001/dogs/64e0f5927dad659eab9b0770
app.delete('/dogs/:id', async (request, response) => {
  // remember request.query.lat ?
  const dogId = request.params.id;
  // dogId = "64e0f5927dad659eab9b0770"
  await Dog.findByIdAndDelete(dogId); 
  response.send({"status": "OK"});
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


