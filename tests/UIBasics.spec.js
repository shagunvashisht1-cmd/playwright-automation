const {test, expect}  = require('@playwright/test');
test('Browser context pw test', async ({browser}) => { //browser is a fixture provided by Playwright and whatever we define in config file will be available here as a parameter and that browser will be launched, So that's how we can use it in our test. We can also use other fixtures like page, context, etc. depending on our needs.
    const context = await browser.newContext(); //new browser instance will be created and we can have multiple contexts in a single browser instance, each context will have its own cookies, cache, etc. and they will be isolated from each other. So we can use this to run our tests in parallel without any interference.
    const page = await context.newPage(); //new page will be created in the context and we can have multiple pages in a single context, each page will have its own URL, DOM, etc. and they will be isolated from each other. So we can use this to run our tests in parallel without any interference.
   //if you dont have cookies or plugins to specify in context and want to skip above 2 steps use page fixture provided by Playwright which will create a new context and a new page for each test automatically, so you don't have to worry about it. You can just use the page fixture directly in your test and it will take care of the rest.
       await page.goto('https://www.google.com/'); //navigate to the URL and wait for the page to load completely before moving to the next step. This is important because if we try to interact with the page before it is fully loaded, we might get errors or unexpected behavior.

});

test.only('Browser Network CSS block', async ({browser}) => { //browser is a fixture provided by Playwright and whatever we define in config file will be available here as a parameter and that browser will be launched, So that's how we can use it in our test. We can also use other fixtures like page, context, etc. depending on our needs.
    const context = await browser.newContext(); //new browser instance will be created and we can have multiple contexts in a single browser instance, each context will have its own cookies, cache, etc. and they will be isolated from each other. So we can use this to run our tests in parallel without any interference.
    const page = await context.newPage(); 

    //To block style and design of webpage
await page.route('**/*.css', route => route.abort()); //regular exp ending with css


await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator("input#username").fill("rahulshettyacademy");
await page.locator("input#password").fill("Learning@830$3mK2");

//To block images 
await page.route('**/*.{jpg,png}', route => route.abort()); 


//Listens to all request / response
page.on('request', request=>console.log(request.url()));
page.on('response', response=>console.log(response.url(), response.status()));
await page.locator("input#signInBtn").click();

await page.pause();

});
test('Page fixture test', async ({page}) => { //page is a fixture provided by Playwright and whatever we define in config file will be available here as a parameter and that page will be created, So that's how we can use it in our test. We can also use other fixtures like browser, context, etc. depending on our needs.
   const userName= page.locator("input#username");
   const titles= page.locator(".card-body a");
    // Since we're using the page fixture, we don't need to create a new context or page manually.
    // The page fixture will handle this for us.
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    // To assert whether page has expected title or not, we can use expect API provided by Playwright which is a powerful assertion library that allows us to write assertions in a more readable and maintainable way. We can use it to assert various conditions like element visibility, text content, attribute values, etc. In this case, we are asserting that the page title is "QA Automation Practice Sites | Playwright, Selenium & API Testing". If the assertion fails, it will throw an error and the test will fail. If the assertion passes, it will continue with the next steps in the test.
    // await expect(page).toHaveTitle("QA Automation Practice Sites | Playwright, Selenium & API Testing");
    await userName.fill("test"); //locate the element using the locator and fill it with the specified value. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, select, etc. depending on our needs.
// can just give #id  and avoid giving tagname before it, but it's a good practice to give the tagname as well to make it more specific and avoid any confusion with other elements that might have the same id. So it's better to use input#username instead of just #username to make it clear that we are targeting an input element with the id of username.
await page.locator("input#password").fill("testing"); //locate the element using the locator and clear the existing value from it. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, select, etc. depending on our needs.
 await page.locator("input#signInBtn").click();
console.log(await page.locator("[style*='block']").textContent());
//as we are waiting for error message to appear after clicking on sign in button, so we are using the locator to locate the element and then we are not explicitly providing wait.until as locator in pw automatically waits for the element to be visible and then it will perform the action on it, so we don't have to worry about it. We can just use the locator and it will take care of the rest.
await expect(page.locator("[style*='block']")).toContainText("Incorrect"); //asserting that the error message contains the text "Incorrect" which is expected to be shown when we enter wrong credentials. This is a common assertion that we perform in our tests, so it's important to know how to do it correctly. We can also use other assertions like toBeVisible, toHaveText, etc. depending on our needs.
await userName.fill(""); //clearing the existing value from the input field by filling it with an empty string. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like clear, click, etc. depending on our needs.
await userName.fill("rahulshettyacademy"); //filling the input field with the specified value after clearing it. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, select, etc. depending on our needs.
await page.locator("input#password").clear(); //clearing the existing value from the input field using the clear() method provided by Playwright. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like fill, click, etc. depending on our needs.
await page.locator("input#password").fill("Learning@830$3mK2"); //filling the input field with the specified value after clearing it. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, select, etc. depending on our needs.
await page.locator("input#signInBtn").click(); //clicking on the sign in button to submit the form. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like fill, select, etc. depending on our needs.
console.log(await page.title());
await expect(page).toHaveURL("https://rahulshettyacademy.com/angularpractice/shop");//locating the success message element and printing its text content to the console. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs.
//console.log(await page.locator(".card-body a").first().textContent()); //locating the element using the locator and printing its text content to the console. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs.
//console.log(await page.locator(".card-body a").nth(1).textContent()); //nth(0) will give first element and nth(1) will give second element
console.log(await titles.allTextContents()); //allTextContents() will give all the text contents of the elements in an array format. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs.
//allTextContents() will give list of array of text contents of all the elements located by the locator. 
//if allTextContents() is used first without using textContents() then it will return an empty array because allTextContents() is used to get the text contents of the elements located by the locator and if we don't use textContents() first then it will not be able to get the text contents of the elements and it will return an empty array. So we need to use textContents() first to get the text contents of the elements and then we can use allTextContents() to get the list of array of text contents of all the elements located by the locator.
});
 test("Test Exercise AutoWait", async({page})=>{
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

