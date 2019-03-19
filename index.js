const fs = require('fs');
const fetch = require('node-fetch');
const request = require('request');

const dirname = 'images';
const filePath = `${dirname}/:fileName.jpg`;

const accessToken =
  'EAAZAy5SWtTFQBAElHrghMYyD5CNv6mNQO27fP4CxkhnaGnhGZBlo1Kd1dxjqOWXD6hMNSDnVPEa68wzUQke7H12RF3qlXmupn6ZBZCdsvKxyiVZAWJTW8fP9bHZAVUGStmKNc1Vor1Y7TU6G8KZB0yMQwN4H0qAnStqgaakDfwVFQZDZD';

let apiUrl = `https://graph.facebook.com/v3.2/1081830048494691/feed?limit=100&access_token=${accessToken}&debug=all&fields=full_picture&format=json&method=get&pretty=0&suppress_http_code=1`;

let counter = 0;

const fetchApi = (uri, callback) => {
  fetch(uri)
    .then(res => res.json())
    .then(json => {
      if (!json.hasOwnProperty('data')) {
        return;
      }

      json.data.map(data => {
        if (!data.hasOwnProperty('full_picture')) {
          return;
        }
        downloadImage(
          data.full_picture,
          filePath.replace(':fileName', data.id),
          callback
        );
      });

      if (!json.hasOwnProperty('paging')) {
        return;
      }

      if (!json.paging.hasOwnProperty('next')) {
        return;
      }
      fetchApi(json.paging.next, logger);
    });
};

const downloadImage = (url, filePath, callback) => {
  request(url)
    .pipe(fs.createWriteStream(filePath))
    .on('close', callback);
};

const logger = () => {
  counter++;
  console.log(`${counter} images downloaded`);
};

if (!fs.existsSync(dirname)) {
  fs.mkdirSync(dirname);
}

fetchApi(apiUrl, logger);
