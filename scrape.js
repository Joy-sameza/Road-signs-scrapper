const axios = require("axios");
const cheerio = require("cheerio");

const WEBSITE_URL = "https://www.safetysignonline.co.za";

async function x() {
  const initialURL =
    "https://www.safetysignonline.co.za/collections/road-signs/";

  const roadSigns = [];
  let nextURL = initialURL;
  try {
    while (nextURL !== null) {
      const { data } = await axios.get(nextURL);
      const $ = cheerio.load(data);

      $(".grid__item.small--one-half.medium-up--one-fifth").each(
        async (_, element) => {
          const name = $(element).find(".product-card__name").text().trim();
          const cardLink =
            WEBSITE_URL + $(element).find("a.product-card").attr("href").trim();
          const imageLinks = $(element).find("noscript").html();
          const $$ = cheerio.load(imageLinks);
          let imgURL = "";
          $$("img").each((_, element) => (imgURL = $(element).attr("src")));
          imgURL = "https:" + imgURL;
          const descriptions = await scrapeDescription(cardLink);

          const final = {
            name,
            imgURL,
            cardLink,
            descriptions,
          };

          roadSigns.push(final);
        }
      );

      const exist = $(".pagination").find(".next").length;
      if (exist) {
        const n_url = $(".pagination .next").find("a").attr("href");
        console.log({ url: n_url });
        nextURL = n_url ? WEBSITE_URL + n_url : null;
      }
    }
  } catch (error) {
    console.error(error);
  }
  console.log(roadSigns.length);
  return roadSigns;
}

async function scrapeDescription(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const element = $(".rte.product-single__description").text().trim();
    return element;
  } catch (error) {
    console.error(`Error scraping page: ${error}`);
  }
}

module.exports = x;
