const PORT = 5500;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

var url = "https://www.theguardian.com/uk";

axios(url)
  .then((response) => {
    const html = response.data;
    console.log(html);
    const $ = cheerio.load(html);
    const articles = [];
    $(".fc-item__title", html).each(function () {
      const title = $(this).text();
      const url = $(this).find("a").attr("href");
      articles.push({
        title,
        url,
      });
    });
    console.log(articles);
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log("server running on PORT 5500"));
