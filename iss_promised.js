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
  return fetchMyIP()
    .then(data => fetchCoordsByIP(data))
    .then(data => fetchISSFlyOverTimes(data))
    .then(data => {
      const passTimes = JSON.parse(data).response;
      return passTimes;      
    });
};

module.exports = { nextISSTimesForMyLocation };