require("dotenv").config();
const { Builder, By, until } = require("selenium-webdriver");

const chrome = require("selenium-webdriver/chrome");

function initOptions(o) {
  //   o.addArguments("headless");
  o.addArguments("disable-infobars");
  o.addArguments("no-sandbox");
  o.addArguments(
    "user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36 RuxitSynthetic/1.0 v6419931773 t38550 ath9b965f92 altpub"
  );
  o.setUserPreferences({
    credential_enable_service: false,
  });
}

const BasePage = function (customAudio = null) {
  let o = new chrome.Options();
  initOptions(o);

  this.driver = new Builder()
    .withCapabilities({ acceptSslCerts: true, acceptInsecureCerts: true })
    .setChromeOptions(o)
    .forBrowser("chrome")
    .build();

  this.visit = async function (theUrl) {
    return await this.driver.get(theUrl);
  };

  this.findById = async function (id) {
    await this.driver.wait(
      until.elementLocated(By.id(id)),
      15000,
      "Looking for element"
    );
    return await this.driver.findElement(By.id(id));
  };

  this.findByClassName = async function (name) {
    const els = await this.driver.wait(
      until.elementsLocated(By.className(name)),
      15000,
      "Looking for element"
    );
    return els[els.length - 1];
    return await this.driver.findElement(By.className(name));
  };

  this.findByClassNameAll = async function (name) {
    return await this.driver.wait(
      until.elementsLocated(By.className(name)),
      15000,
      "Looking for element"
    );
  };

  this.signin = async function () {
    let name = process.env.USERNAME || "";
    let password = process.env.PASSWORD || "";
    let input = await this.findById("email");
    await input.sendKeys(name);
    let input2 = await this.findById("password");
    await input2.sendKeys(password);
    let button = await this.findById("login_submit");
    console.log(button);
    await button.click();
  };

  this.pressAcceptButton = async function () {
    let buttons = await this.findByClassName(
      "artdeco-button--secondary invitation-card__action-btn"
    );
    await buttons.click();
  };

  this.pressApplyNowButton = async function () {
    let buttons = await this.findByClassName("btn btn-primary easy_apply");
    await buttons.click();

    let continueBtn = await this.findById("continue_button");
    await continueBtn.click();

    let copyBtn = await this.findByClassName("copy_cover_letter_button");
    await copyBtn.click();

    // this.fillText(
    //   "textarea form-control",
    //   "Yes I'am interested in this internship and I'am pawan 9 months experienced fullstack developer MERN stack you can check more about me at https://pawan67.vercel.app"
    // );

    let submitBtn = await this.findById("submit");
    await submitBtn.click();
  };

  this.fillText = async function (classname, text) {
    let inputs = await this.driver.findElements(
      By.xpath(`//${classname}[contains(@class, "form-control")]`)
    );

    for (let i = 0; i < inputs.length; i++) {
      await inputs[i].sendKeys(text);
    }
  };

  this.scrollToBottom = async function () {
    this.driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
  };
};

module.exports = BasePage;
