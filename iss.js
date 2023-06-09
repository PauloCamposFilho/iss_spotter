const request = require("request");
const { API_IP_ENDPOINT } = require("./constants");

const fetchMyIP = (callback) => {
  request(API_IP_ENDPOINT, (error, response, body) => {
    if (error) callback(error, null);
    if (response && response.statusCode !== 200) {
      const errorMessage = `Status Code ${response.statusCode} was returned when fetching IP. Response: ${body}`;
    }
    callback(null, JSON.parse(body).ip);    
  });
}

module.exports = { fetchMyIP };