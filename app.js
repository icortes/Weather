'use strict';

const usCities = [
  {
    name: 'New York, NY',
    latitude: 40.7128,
    longitude: -74.006,
  },
  {
    name: 'Los Angeles, CA',
    latitude: 34.0522,
    longitude: -118.2437,
  },
  {
    name: 'Chicago, IL',
    latitude: 41.8781,
    longitude: -87.6298,
  },
  {
    name: 'Houston, TX',
    latitude: 29.7604,
    longitude: -95.3698,
  },
  {
    name: 'Phoenix, AZ',
    latitude: 33.4484,
    longitude: -112.074,
  },
  {
    name: 'Philadelphia, PA',
    latitude: 39.9526,
    longitude: -75.1652,
  },
  {
    name: 'San Antonio, TX',
    latitude: 29.4241,
    longitude: -98.4936,
  },
  {
    name: 'San Diego, CA',
    latitude: 32.7157,
    longitude: -117.1611,
  },
  {
    name: 'Dallas, TX',
    latitude: 32.7767,
    longitude: -96.797,
  },
  {
    name: 'San Francisco, CA',
    latitude: 37.7749,
    longitude: -122.4194,
  },
  {
    name: 'Miami, FL',
    latitude: 25.7617,
    longitude: -80.1918,
  },
  {
    name: 'Atlanta, GA',
    latitude: 33.749,
    longitude: -84.388,
  },
  {
    name: 'Seattle, WA',
    latitude: 47.6062,
    longitude: -122.3321,
  },
  {
    name: 'Denver, CO',
    latitude: 39.7392,
    longitude: -104.9903,
  },
  {
    name: 'Austin, TX',
    latitude: 30.25,
    longitude: -97.75,
  },
  {
    name: 'Boston, MA',
    latitude: 42.3601,
    longitude: -71.0589,
  },
  {
    name: 'Nashville, TN',
    latitude: 36.1627,
    longitude: -86.7816,
  },
  {
    name: 'Portland, OR',
    latitude: 45.5051,
    longitude: -122.675,
  },
  {
    name: 'Detroit, MI',
    latitude: 42.3314,
    longitude: -83.0458,
  },
  {
    name: 'Las Vegas, NV',
    latitude: 36.1699,
    longitude: -115.1398,
  },
  // Add more cities as needed
];

function addCitiesToDropdown() {
  usCities.forEach((city) => {
    document.getElementById('citySelect').appendChild(new Option(city.name, city.name));
  });
}

async function displayForecast() {
  let forecastUrl = await getForecastUrl();
  console.log(forecastUrl);
  let weatherData = await getWatherData(forecastUrl);
  let tbody = document.getElementById('tbody');
  weatherData.forEach((forecast) => {
    let row = tbody.insertRow(-1);
    let iconCell = row.insertCell(0);
    iconCell.innerHTML = `<img src='${forecast.icon}'>`;
    let nameCell = row.insertCell(1);
    nameCell.innerText = forecast.name;
    let tempCell = row.insertCell(2);
    tempCell.innerText = `${forecast.temperature}°${forecast.temperatureUnit}`;
    let windCell = row.insertCell(3);
    windCell.innerText = `${forecast.windSpeed} ${forecast.windDirection}`;
    let forecastCell = row.insertCell(4);
    forecastCell.innerText = forecast.shortForecast;
  });
}

async function getForecastUrl() {
  //get selected city
  let selectedCity = document.getElementById('citySelect').value;
  console.log(selectedCity);
  //find coords for city
  let selectedCityObj = usCities.find((city) => city.name == selectedCity);
  console.log(selectedCityObj);
  //fetch url with coords
  let response = await fetch(
    `https://api.weather.gov/points/${selectedCityObj.latitude},${selectedCityObj.longitude}`
  );
  let data = await response.json();
  return data.properties.forecast;
}

async function getWatherData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data.properties.periods;
}

onload = () => {
  addCitiesToDropdown();
  displayForecast();
  document.getElementById('citySelect').addEventListener('change', () => {
    document.getElementById('tbody').innerHTML = '';
    displayForecast();
  });
};
