const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE_URL);

const Cat = require('./models/cat');
const Dog = require('./models/dog');

async function seed() {
  // seed the database with some cats, so I can retrieve them
  const myCat = new Cat({
    name: 'Jimmy John',
    color: 'orange',
    hasClaws: false,
    location: 'Seattle',
  });
  myCat.save(function (err) {
    if (err) console.error(err);
    else console.log('saved Jimmy John');
  });

  // alternately...
  await Cat.create({
    name: 'Jersey  Mike',
    color: 'calico',
    hasClaws: true,
    location: 'Paris'
  });

  console.log('saved Jersey Mike');

  await Dog.create({
    name: 'Buddy',
    breed: 'Boxer',
    age: 2,
    doesTricks: true,
    color: 'brown'
  });

  console.log('created Buddy the dog')

  await Dog.create({
    name: 'Dior',
    breed: 'Shorkie',
    age: 1,
    doesTricks: true,
    color: 'light brown'
  });

  console.log('created Dior the dog')

  mongoose.disconnect();
}

seed();
