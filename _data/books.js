const fetch = require('node-fetch')

module.exports = function () {
  return fetch('https://eleventy-site-api.herokuapp.com/books/')
    .then(response => response.json())
    .then(data => data);
}
