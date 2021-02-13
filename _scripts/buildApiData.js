const fetch = require('node-fetch');
const fs = require('fs');

async function getBookData () {
  try {
    return await fetch('https://eleventy-site-api.herokuapp.com/books/')
            .then(response => response.json())
            .then(data => (saveFile('_data/books.json', JSON.stringify(data))));
  } catch(err) {
    console.error(err);
  }
}

const saveFile = (fileName, content) => {
  fs.writeFileSync(fileName, content, function (err) {
    if (err) return console.log(err);
  });
}

getBookData();
