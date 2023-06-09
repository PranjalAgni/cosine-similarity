const puppeteer = require("puppeteer");

/**
 *
 * @param {string} baseUrl
 */
const scrapeTweetReplies = async (baseUrl) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(baseUrl, {
    waitUntil: "networkidle0"
  });

  const tweetReplies = await page.evaluate(() => {
    const articles = [...document.getElementsByTagName("article")];
    articles.shift();
    return articles.map((article) => {
      return article.querySelector('[data-testid="tweetText"] > span').innerText;
    });
  });

  await browser.close();
  console.log("Twitter replies: ", tweetReplies);
  return tweetReplies;
};

module.exports = scrapeTweetReplies;
