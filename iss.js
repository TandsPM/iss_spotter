const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const fetchMyIP = function(callback) {
  // use request to fetch IP address from JSON API
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    // pass through the error to the callback if an error occurs when requesting
    // the IP data
    if (error) {
      callback(`Error: ${error}`, null);
    }

    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    // parse and extract the IP address using JSON and then pass that through to
    // the callback (as the second argument) if there is no error
    const ip = JSON.parse(body).ip;
    callback(null, ip);


    // if we get here, all's well and we got the data
  });
};

// It should take in two arguments: ip (string) and callback
// Add the function to the object properties being exported from iss.js
// For now, it can have an empty body and do nothing
const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, resp, body) => {
    if (error) {
      callback(`Error: ${error}`, null);
    }

    const parsedBody = JSON.parse(body);

    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }
    // extract lat and long
    const { latitude, longitude } = parsedBody;

    callback(null, { latitude, longitude });
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
  // Make a request using the following URL: https://iss-flyover.herokuapp.com/json/?lat=YOUR_LAT_INPUT_HERE&lon=YOUR_LON_INPUT_HERE
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(`Error: ${error}`, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      return;
    }

    // output JSON format
    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};


/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS
 * fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    };

    fetchCoordsByIP('162.245.144.188', (error, data) => {
      if (error) {
        console.log('Error:', error);
        return;
      }

      const givenCoords = { latitude: '49.27670', longitude: '-123.13000' };

      fetchISSFlyOverTimes(givenCoords, (error, passTimes) => {
        if (error) {
          console.log("It didn't work!", error);
          return;
        }

        callback(null, passTimes)
      });
    });
  });
};




module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIP };
module.exports = { fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation };