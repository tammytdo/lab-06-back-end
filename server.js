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
app.get('/location', (request, response) => {
  response.send( searchLatLng(request.query.data) );
})

app.use('*', (request, response) => {
  response.send('Our server runs.');
})

function searchLatLng(frontEndQuery) {
// this.long_name = long_name,
// this.short_name = short_name,
// this.type = types
  let test = {
    'search_query': 'seattle',
    'formatted_query': 'Seattle, WA, USA',
    'latitude': '47.606210',
    'longitude': '-122.332071'
  }
  return test;
}

//server start
app.listen(PORT, ()=> {
  console.log(`app is up on PORT ${PORT}`)
})
