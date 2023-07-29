'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

const PORT = process.env.PORT;

// We need a route to handle requests like this:
// http://localhost:3001/photos?searchQuery=smoothies




app.get('*', notFound);

function notFound(request, response) {
  response.status(404).send('the page you are looking for is not there');
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
