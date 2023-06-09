const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  for (let passOver of passTimes) {
    console.log("Next pass at", new Date(passOver.risetime * 1000).toString());
  }
});