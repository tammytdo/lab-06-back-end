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

// app.get('/location', (request, response) => {
//   const testData = {
//     "search_query": "seattle",
//     "formatted_query": "Seattle, WA, USA",
//     "latitude": "47.606210",
//     "longitude": "-122.332071"
//   };
//   response.send(testData);
// })
app.get('/location', (request, response) => {
  //commenting out so that you can search on any city and see lynnwood data
  // if(request.query.data !== 'lynnwood'){
  //   response.status(500).send('Hi there, I only have the lynnwood data.')
  // }
  response.send(searchLatLng(request.query.data));
});

//first parameter is a route or endpoint
app.get('/weather', (request, response) =>{
  const finalArrayOfWeather = [];

  const weatherJSON = require('./data/darksky.json');
  const dailyWeather = weatherJSON.daily;
  const dailyWeatherData = dailyWeather.data;
  //dayObj is our raw data
  dailyWeatherData.forEach(dayObj => {
    finalArrayOfWeather.push(new DailyWeather(dayObj));
  })
  response.send(finalArrayOfWeather);
})


app.use('*', (request, response) => {
  response.send('Our server runs.');
})

/////////Helper Functions /////////////////////////////////
function DailyWeather(rawDayObj) {
  this.forecast = rawDayObj.summary;
  this.time = new Date (rawDayObj.time * 1000).toString().slice(0, 15);
}


function searchLatLng(frontEndQuery) {

  //take the data from the front end as the searched for location
  const search_query = frontEndQuery;

  const testData = require('./data/geo.json'); //go get some other data

  const formatted_query = testData.results[0].formatted_address;
  const results = testData.results;
  const oneResult = results[0];
  const geometry = oneResult.geometry;
  const location = geometry.location;
  const latitude = location.lat;
  const longitude = location.lng;

  // const latitude = testData.results[0].geometry.location.lat;
  // const longitude = testData.results[0].geometry.location.lng;

  const responseObject = { search_query, formatted_query, latitude, longitude };

  return responseObject;
};

//server start
app.listen(PORT, ()=> {
  console.log(`app is up on PORT ${PORT}`)
})
