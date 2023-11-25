const request = require('request-promise-native');

// Define and export fetchMyIP. This function should only
// have one line of code: fetch the IP address from the API,
// using the request function, and return the promise that is
// returned by request.

// Tip: request, when called, returns a promise, and we want our function to return this same promise.

const fetchMyIP = function() {
  return request(`https://api.ipify.org?format=json`);
};


const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`http://ipwho.is/${ip}`);
};

const fetchISSFlyOverTimes = function() {
  const { latitude, longitude } = JSON.parse(body);
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return request(url)
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then((data) => {
    const { response } = JSON.parse(data);
    return response;
  })
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };


