const fs = require("fs");
const axios = require("axios");
const { dirname, filePath, myUrl } = require("./url");

require("dotenv").config();

let apiUrl = myUrl;

let counter = 0;

const fetchApi = (url, callback) => {
  axios({
    url,
    method: "GET"
  })
    .then(response => response.data)
    .then(json => {
      if (!json.hasOwnProperty("data")) {
        return;
      }

      json.data.map(data => {
        if (!data.hasOwnProperty("full_picture")) {
          return;
        }
        downloadImage(data.full_picture, filePath.replace(":fileName", data.id))
          .then(() => {
            callback();
          })
          .catch(error => {
            console.log(error);
          });
      });

      if (!json.hasOwnProperty("paging")) {
        return;
      }

      if (!json.paging.hasOwnProperty("next")) {
        return;
      }
      fetchApi(json.paging.next, logger);
    })
    .catch(error => {
      console.log(error);
    });
};

async function downloadImage(url, filePath) {
  const writer = fs.createWriteStream(filePath);

  const response = await axios({
    url,
    method: "GET",
    responseType: "stream"
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

const logger = () => {
  counter++;
  console.log(`${counter} images downloaded`);
};

if (!fs.existsSync(dirname)) {
  fs.mkdirSync(dirname);
}

fetchApi(apiUrl, logger);
