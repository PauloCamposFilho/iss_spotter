const request = require("request");
const { API_IP_ENDPOINT, API_COORDS_ENDPOINT, API_FLYOVER_DATA } = require("./constants");

const fetchMyIP = (callback) => {
  request(API_IP_ENDPOINT, (error, response, body) => {
    if (error) callback(error, null);
    if (response && response.statusCode !== 200) {
      const errorMessage = `Status Code ${response.statusCode} was returned when fetching IP. Response: ${body}`;
      callback(errorMessage, null);
    }
    callback(null, JSON.parse(body).ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(API_COORDS_ENDPOINT, (error, response, body) => {
    if (error) callback(error, null);
    const JSONResponse = JSON.parse(body);
    
    if (response && response.statusCode !== 200) {
      const errorMessage = `Status Code ${response.statusCode} was returned when fetching Coords. Response: ${body}`;
      callback(errorMessage, null);
    }
    if (JSONResponse.success === false) {
      const errorMessage = `There was an error with the request: ${JSONResponse.message}`;
      callback(errorMessage, null);
      return;
    } else {
      const objResult = {
        latitude: JSONResponse.latitude,
        longitude: JSONResponse.longitude
      };
      callback(null, objResult);
    }
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const requestURLWithQuery = `${API_FLYOVER_DATA}?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(requestURLWithQuery, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response && response.statusCode !== 200) {
      callback(body, null);
      return;
    }
    callback(null, JSON.parse(body).response);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work.", error);
      return;
    }
    console.log("It worked! Returned IP:", ip);
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
      console.log('It worked! Returned coordinates:' , data);
      fetchISSFlyOverTimes(data, (error, data) => {
        if (error) {
          console.log("ISS Coords not fetched: ", error);
          return;
        }
        callback(null, data);
      });
    });
  });
};

module.exports = { nextISSTimesForMyLocation };