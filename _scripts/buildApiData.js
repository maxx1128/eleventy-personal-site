import fetch from 'node-fetch';
import { writeFileSync } from 'fs';

async function getBookData() {
  try {
    const response = await fetch('https://eleventy-site-api.herokuapp.com/books/');
    const data = await response.json();
    saveFile('_data/books.json', JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
}

const saveFile = (fileName, content) => {
  writeFileSync(fileName, content, function (err) {
    if (err) return console.log(err);
  });
}

getBookData();
