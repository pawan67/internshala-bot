const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const BasePage = require("./WebPage");

async function sleep(timeInS) {
  await new Promise((resolve) => setTimeout(resolve, timeInS * 1000));
}

async function startBot() {
  const page = new BasePage();
  let site = "https://internshala.com/login/student";
  await page.visit(site);

  await sleep(2);

  await page.signin();
  await sleep(2);

  site =
    "https://internshala.com/internships/matching-preferences/stipend-10000/";

  await sleep(2);
  await page.visit(site);

  for (let i = 3; i < 10000; i++) {
    if (i % 10 === 9) {
      page.visit(site);
      await sleep(8);
      
      await sleep(2);
    }
    try {
      await page.pressApplyNowButton();
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await sleep(3);
    } catch (e) {
      console.error(e);
    }
  }
  await new Promise((resolve) => setTimeout(resolve, 5000));
}

(async () => {
  await startBot();
})();
