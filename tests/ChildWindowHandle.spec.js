import {test, expect}from "@playwright/test";
test("ChildWindow", async ({browser})=>{
    const context = await browser.newContext(); //new browser instance will be created and we can have multiple contexts in a single browser instance, each context will have its own cookies, cache, etc. and they will be isolated from each other. So we can use this to run our tests in parallel without any interference.
    const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
   const docLink= page.locator("[href*='documents-request']");

//when we want to execute steps parallely i,e asynchronously, we can use the Promise.all method to execute multiple steps in parallel and wait for all of them to be completed before moving to the next step. This is especially useful when we want to perform some actions on the new page after it is opened. We can also use the waitForEvent method to wait for the new page to be opened and then perform actions on it.
//Use promise.all() it takes array of promises and it will wait for all the promises to be resolved before moving to the next step. This is especially useful when we want to perform some actions on the new page after it is opened. We can also use the waitForEvent method to wait for the new page to be opened and then perform actions on it.
//steps defines needs to be fulfilled before moving to the next step, so we can use the Promise.all method to execute multiple steps in parallel and wait for all of them to be completed before moving to the next step. This is especially useful when we want to perform some actions on the new page after it is opened. We can also use the waitForEvent method to wait for the new page to be opened and then perform actions on it.
//If in below step 2 new pages open then pass newPage2 in array and then we can perform actions on newPage2 as well. This is especially useful when we want to perform some actions on the new page after it is opened. We can also use the waitForEvent method to wait for the new page to be opened and then perform actions on it.
const [newPage]=await Promise.all( //[Next 2 steps getting tied]wrapping for steps that are opening a new page, so that we can wait for the new page to be opened before performing any actions on it. This is especially useful when we want to perform some actions on the new page after it is opened. We can also use the waitForEvent method to wait for the new page to be opened and then perform actions on it.
//when we execute any step through js it returns a promise, promise can be pending, rejected, fulfilled, so we can use the then method to handle the promise and get the new page object that is created when we click on the link. We can also use the async/await syntax to handle the promise and get the new page object. This is especially useful when we want to perform some actions on the new page after it is opened.

[
    context.waitForEvent("page"),//this will wait for the new page to be opened and then we can perform actions on it.
docLink.click(),//this will open a new tab in the same browser instance and we can .then(async newPage => {
]
) //new page object will be returned when the new page is opened and we can perform actions on it.

const text=await newPage.locator(".red").textContent();
console.log(text);

//To stop async to make it sync, we can use the async/await syntax to handle the promise and get the new page object. This is especially useful when we want to perform some actions on the new page after it is opened. We can also use the then method to handle the promise and get the new page object that is created when we click on the link. This is especially useful when we want to perform some actions on the new page after it is opened.

//1 Now to get only email from red part of text
const arrayText=text.split("@");
const domain=arrayText[1].split(" ")[0]; //splitting by white space //this will give us the email id from the text and we can use it for further actions on the page. This is especially useful when we want to perform some actions on the new page after it is opened.
console.log(domain);
expect(domain).toBe("rahulshettyacademy.com");

//2.work on parent page pass domain in username
await page.locator("#username").fill(domain);
console.log("Show output in parent page");
console.log(await page.locator("#username").textContent()); //This doesnt work as textContent is used to get the text of the element and input element does not have text, it has value, so we can use the value property to get the value of the input element. This is especially useful when we want to perform some actions on the new page after it is opened.
//dynamic update of value in parent page without using any locator, we can use the inputValue method to get the value of the input element and we can use it for further actions on the page. This is especially useful when we want to perform some actions on the new page after it is opened.
console.log("Show Now correct output in parent page");
console.log(await page.locator("#username").inputValue()); //this is the correct way to get the value of the input element and we can use it for further actions on the page. This is especially useful when we want to perform some actions on the new page after it is opened.


//await page.pause();
});