const { nextISSTimesForMyLocation } = require("./iss");

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);    
  }
  for(let passOver of passTimes) {
    console.log("Next pass at", new Date(passOver.risetime * 1000).toString());
  }
});

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work.", error);
//     return;
//   }
//   console.log("It worked! Returned IP:", ip);
//   fetchCoordsByIP(ip, (error, data) => {
//     if (error) {
//       console.log("It didn't work!" , error);
//       return;
//     }
//     console.log('It worked! Returned coordinates:' , data);
//     fetchISSFlyOverTimes(data, (error, data) => {
//       if (error) {
//         console.log("ISS Coords not fetched: ", error);
//         return;
//       }
//       console.log("Flyover times:", data);
//     });
//   });
// });

