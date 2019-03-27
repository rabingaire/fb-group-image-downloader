require('dotenv').config();

const dirname = process.env.DIR_NAME;
const filePath = `${dirname}/:fileName.jpg`;
const myUrl = `https://graph.facebook.com/v3.2/${
  process.env.FACEBOOK_GROUP_ID
}/feed?limit=100&access_token=${
  process.env.ACCESS_TOKEN
}&debug=all&fields=full_picture&format=json&method=get&pretty=0&suppress_http_code=1`;

module.exports = {
  dirname,
  filePath,
  myUrl
};
