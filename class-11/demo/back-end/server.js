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
mongoose.connect(process.env.DATABASE_URL);

app.get('/cats', async (request, response) => {

  const filterQuery = {};

  if (request.query.location) {
    filterQuery.location = request.query.location;
  }

  const cats = await Cat.find(filterQuery);

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
// app.use();

app.listen(PORT, () => console.log('Listening on PORT', PORT));


