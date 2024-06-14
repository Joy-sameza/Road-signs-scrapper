const axios = require("axios");
const cheerio = require("cheerio");
const pretty = require("pretty");
const fs = require("fs");

const x = require("./scrape");

async function main() {
  const roadSigns = await x();
  if (roadSigns)
    fs.writeFileSync("dist/road_signs.json", JSON.stringify(roadSigns, null, 2));
}

console.time("Started scrapping");
(async () => await main())();
console.timeEnd("Started scrapping");
