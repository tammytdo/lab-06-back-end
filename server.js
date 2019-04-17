'use strict';

// immediate import and configuration
require('dotenv').config();

// global constants
const PORT = process.env.PORT || 3000 ;
const express = require('express');
const cors = require('cors');

// server definition
const app = express();
app.use(cors());

// what the server does
//the route
//request = data from query. example, from a front end query
//can test in localhost:3000/location to verify

// Switched app.get from an anonymous function to a named callback. 
app.get('/location', searchLatLng);

// Standard response for when a route that does not exist is accessed. 
app.use('*', (request, response) => {
  response.send('Our server runs.');
})

function searchLatLng(request, response) {
  // take the data from the front end, as the searched for location ('berlin')
  console.log('proof of life B');
  const search_query = request.query.data;

  // Go out and get data, tomorrow
  const testData = require('./data/geo.json'); // go get some other data

  const formatted_query = testData.results[0].formatted_address;
  const latitude = testData.results[0].geometry.location.lat;
  const longitude = testData.results[0].geometry.location.lng;

  const responseObject = { search_query, formatted_query, latitude, longitude };
  console.log(responseObject);


  response.send(responseObject);
}

//server start
app.listen(PORT, ()=> {
  console.log(`app is up on PORT ${PORT}`)
})
