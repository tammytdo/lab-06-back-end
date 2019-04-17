'use strict';

//==========================================
// Configure
//==========================================

require('dotenv').config();

//==========================================
// Global Variables
//==========================================

const PORT = process.env.PORT || 3000;
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');

//==========================================
// Server Definition
//==========================================

const app = express();
app.use(cors());

//==========================================
// Server
//==========================================

//the route
//request = data from query. example, from a front end query
//can test in localhost:3000/location to verify

// Switched app.get from an anonymous function to a named callback.
app.get('/location', searchLatLng);

app.get('/weather', searchWeather);

// Standard response for when a route that does not exist is accessed.
app.use('*', (request, response) => {
  response.send('Our server runs.');
})

//==========================================
// Helper Functions
//==========================================

function searchLatLng(request, response) {
  // take the data from the front end, as the searched for location ('berlin')
  const query = request.query.data;
  const geocodeData = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${process.env.GEOCODE_API_KEY}`;
  console.log('in search');

  superagent.get(geocodeData).then(result => {
    console.log(result);
    const first = result.body.results[0];
    const responseObject = new Location(query, first);
    console.log(responseObject);
    response.send(responseObject);
  })

}

function searchWeather(request, response) {
  const weatherData = require('./data/darksky.json');
  const weeklyWeatherArray = weatherData.daily.data.map(dayObj => new DailyWeather(dayObj.summary, dayObj.time));

  response.send(weeklyWeatherArray);
}

//==========================================
// Constructors
//==========================================

function DailyWeather(forecast, time) {
  this.forecast = forecast;
  this.time = new Date(time * 1000).toString().slice(0, 15);
}

function Location(query, data) {
  this.search_query = query;
  this.formatted_query = data.formatted_address;
  this.latitude = data.geometry.location.lat;
  this.longitude = data.geometry.location.lng;
}

//==========================================

//server start
app.listen(PORT, () => {
  console.log(`app is up on PORT ${PORT}`)
})
