const { nextISSTimesForMyLocation } = require("./iss_promised");

nextISSTimesForMyLocation()
  .then(passTimes => {
    for (let passOver of passTimes) {
      console.log("Next pass at", new Date(passOver.risetime * 1000).toString());
    }
  })
  .catch((error) => console.log("It didn't work:", error.message));