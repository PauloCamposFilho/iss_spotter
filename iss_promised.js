const { API_IP_ENDPOINT, API_COORDS_ENDPOINT, API_FLYOVER_DATA } = require("./constants");
const request = require("request-promise-native");

const fetchMyIP = () => {
  return (request(API_IP_ENDPOINT));
};

const fetchCoordsByIP = (body) => {
  const IP = JSON.parse(body).ip;
  return (request(API_COORDS_ENDPOINT + IP));
};

const fetchISSFlyOverTimes = (body) => {
  const { latitude, longitude } = JSON.parse(body);
  return (request(`${API_FLYOVER_DATA}?lat=${latitude}&lon=${longitude}`));
};

const nextISSTimesForMyLocation = () => {
  fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then(body => {
      const passTimes = JSON.parse(body).response;
      for (let passOver of passTimes) {
        console.log("Next pass at", new Date(passOver.risetime * 1000).toString());
      }
    });
};

module.exports = { nextISSTimesForMyLocation };