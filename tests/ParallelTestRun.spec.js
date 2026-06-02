//Test Files will trigger parallely
//Individual test in file will run in sequence

const {test, expect}  = require('@playwright/test');


//test.describe.configure({mode: 'parallel'}); //To run test in a file in parallel mode

test.describe.configure({mode: 'serial'}); //To run test in a file in serail mode //if first test fail remaining after that test will be skipped
//Best to use when inter dependent tests are present

//test.skip is used to skip a test run
//Basic reasons of test fail: 1)if multiple test are using same creds and same flows then either skip some test or put the retries run on 


//Define tag in test for segregrate test cases
//npx playwright test --grep "@Web" : 1) Mention particular tag eg. @Web in test and then run the command ""




test('@Web Test1', async ({browser}) => { //browser is a fixture provided by Playwright and whatever we define in config file will be available here as a parameter and that browser will be launched, So that's how we can use it in our test. We can also use other fixtures like page, context, etc. depending on our needs.
    const context = await browser.newContext(); //new browser instance will be created and we can have multiple contexts in a single browser instance, each context will have its own cookies, cache, etc. and they will be isolated from each other. So we can use this to run our tests in parallel without any interference.
    const page = await context.newPage(); //new page will be created in the context and we can have multiple pages in a single context, each page will have its own URL, DOM, etc. and they will be isolated from each other. So we can use this to run our tests in parallel without any interference.
   //if you dont have cookies or plugins to specify in context and want to skip above 2 steps use page fixture provided by Playwright which will create a new context and a new page for each test automatically, so you don't have to worry about it. You can just use the page fixture directly in your test and it will take care of the rest.
       await page.goto('https://www.google.com/'); //navigate to the URL and wait for the page to load completely before moving to the next step. This is important because if we try to interact with the page before it is fully loaded, we might get errors or unexpected behavior.

});

test("Test 2", async({page})=>{
    const titles= page.locator("div.card-body b");
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator("//a[normalize-space()='Register here']").click();    //if we try to click on the element before it is visible, it will throw an error and the test will fail. But if we use the locator and try to click on the element, Playwright will automatically wait for the element to be visible before performing the click action. This is a powerful feature of Playwright that helps us to avoid flaky tests and makes our tests more reliable. So we don't have to worry about waiting for the element to be visible, we can just use the locator and it will take care of the rest.
 //sh.v1@gmail.com
 await page.locator("//a[normalize-space()='Login here']").click(); 
 await page.locator("input#userEmail").fill("");
await page.locator("input#userEmail").fill("sh.v1@gmail.com");
await page.locator("input#userPassword").fill("123456789@aS");
await page.locator("input#login").click();
//await page.waitForLoadState("networkidle"); //wait for the network to be idle before performing any action on the page. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some API calls to be completed before performing any action on the page.
//await titles.waitFor(); //wait for the element located by the locator to be visible before performing any action on it. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.    
//waitFor() works on single element locator so use first or last method
await titles.first().waitFor();
console.log(await titles.allTextContents());
console.log(await titles.first().textContent());
console.log(await titles.nth(1).textContent());
console.log(await titles.allTextContents());

});
