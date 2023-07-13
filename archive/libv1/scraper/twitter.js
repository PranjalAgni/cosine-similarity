const puppeteer = require("puppeteer");

/**
 * Goes to the given twitter URL and scrapes for the replies
 * @param {string} baseUrl
 */
const scrapeTweetReplies = async (baseUrl) => {
  let browser = null;
  let twitterReplies = [];
  try {
    browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(baseUrl, {
      waitUntil: "networkidle0"
    });

    twitterReplies = await page.evaluate(() => {
      const articles = [...document.getElementsByTagName("article")];
      articles.shift();
      return articles
        .map((article) => {
          return article.querySelector('[data-testid="tweetText"] > span')
            ?.innerText;
        })
        .filter((reply) => reply);
    });
  } catch (ex) {
    console.error("Error occured while scraping tweet replies ", ex);
  } finally {
    await browser.close();
  }

  return twitterReplies;
};

module.exports = scrapeTweetReplies;
