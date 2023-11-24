// index.js
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');


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
