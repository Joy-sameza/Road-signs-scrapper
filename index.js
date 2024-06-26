const fs = require("fs");

const x = require("./scrape");

async function main() {
  const roadSigns = await x();
  if (roadSigns)
    fs.writeFileSync("road_signs.json", JSON.stringify(roadSigns, null, 2));
}

console.time("Started scrapping");
(async () => await main())();
console.timeEnd("Started scrapping");
