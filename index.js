// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');


/** 
 * Input: 
 *   Array of data objects defining the next fly-overs of the ISS.
 *   [ { risetime: <number>, duration: <number> }, ... ]
 * Returns: 
 *   undefined
 * Sideffect: 
 *   Console log messages to make that data more human readable.
 *   Example output:
 *   Next pass at Mon Jun 10 2019 20:11:44 GMT-0700 (Pacific Daylight Time) for 468 seconds!
 */

const nextFlyOvers = function(time) {
  for (const pass of time) {
    // creat date object with timestampJun 10 2019 20:11:44 GMT-0700
    const dateStamp = new Date(0);
    // set seconds
    dateStamp.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next passing time is at ${datetime} for ${duration} seconds.`);
  }
};



nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  //success, print out the dates!
  console.log(passTimes);
});

// const givenCoords = { latitude: '49.27670', longitude: '-123.13000'};

// fetchISSFlyOverTimes(givenCoords, (error, passTimes) => {
//    if (error) {
//      console.log("It didn't work!" , error);
//      return;
//    }

//     console.log('It worked! Returned flyover times:' , passTimes);
//  });



// Require it in index.js
// For now, call the function and pass in our (IPv4) IP address
// string as the first argument to the function
// For now, our callback can simply print out the values for error and data

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });




// fetchCoordsByIP('162.245.144.188', (error, data) => {
//   if (error) {
//     console.log('Error:', error);
//     return;
//   } 
//     console.log('Coordinates:', data);
// });


