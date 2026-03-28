const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "../../data/posts.json");

const read = () => {
  return JSON.parse(fs.readFileSync(file));
};

const write = (data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

module.exports = { read, write };
