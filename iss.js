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

    callback(null, {latitude, longitude});
  });
};


module.exports = { fetchMyIP };
module.exports = { fetchCoordsByIP };
/*
const fetchBreedDescription = function(breedName, callback) {
  const url = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;

  request(url, (error, resp, body) => {
    if (error) {
      callback(`Error: ${error}`, null);
    }
    const data = JSON.parse(body);
    const breed = data[0];

    if (breed) {
      callback(null, breed.description);
    } else {
      callback("Breed not found");
    }
  });
};
*/