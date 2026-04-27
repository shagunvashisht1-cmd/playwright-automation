const {test,expect} = require("@playwright/test");
//import {test,expect} from "@playwright/test";

test("Page Validations", async({page}) => {
await  page.goto("https://rahulshettyacademy.com/AutomationPractice/");
await page.goto("https://google.com");
//Page Validations
  expect( page.url()).toContain("google"); //to check if the url contains google or not. This is especially useful when we want to verify if we are on the correct page or not after performing some actions on the page. We can also use other assertions like toBe, etc. depending on our needs. This is especially useful when we want to verify if we are on the correct page or not after performing some actions on the page.
  expect( await page.title()).toBe("Google"); //to check if the title of the page is Google or not. This is especially useful when we want to verify if we are on the correct page or not after performing some actions on the page. We can also use other assertions like toContain, etc. depending on our needs. This is especially useful when we want to verify if we are on the correct page or not after performing some actions on the page.

//To Go back to previous page
await page.goBack();
await page.goForward();
await page.reload();
const newPage=await page.context().newPage(); //to open new tab
await newPage.goto("https://rahulshettyacademy.com/AutomationPractice/");
const allPages= page.context().pages();
console.log(allPages.length); //2


})