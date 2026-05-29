import { test, expect } from "@playwright/test";
//import LoginPage from "./pageObjects/LoginPage"; Can't use as module.exports used in js file, so we need to use require method to import the file.
const { POManager } = require("../pageObjects/POManager"); //this is the way to import the file when we are using module.exports in the js file. We can also use other methods like import, etc. depending on our needs. This is especially useful when we want to use the page object model in our tests.
// ./same folder  ../ other folder

//JSON ->string->js object
const dataSet = JSON.parse(JSON.stringify(require("../utils/CADFPlaceorderTestData.json")));
console.log(dataSet);
//when there are multiple test data that needs to be run for same data then in testdata.json file add array and here use for loop 

for (const data of dataSet)  //As multiple testdata 

{
    test(`Dynamic Find Product for ${data.productName}`, async ({ page }) => { //To specify name of test run when multiple testdata


        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage(); //No need to use new keyword to create an object of the class, we can directly call the method of the class to get the object of the class. This is especially useful when we are using the page object model in our tests. This is also a good way to reduce the code and make it more readable. 
        const dashboardPage = poManager.getDashboardPage();
        const checkOutPage = poManager.getCheckOutPage();
        const orderPage = poManager.getOrderPage();

        await loginPage.goTo();
        await loginPage.validLogin(data.email, data.password);
        //await page.locator("input#userEmail").fill(email);
        //await page.locator("//a[normalize-space()='Login here']").click(); 
        // await page.locator("input#userEmail").fill("");

        //await titles.waitFor(); //wait for the element located by the locator to be visible before performing any action on it. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.    
        //waitFor() works on single element locator so use first or last method
        await dashboardPage.selectProductAddCart(data.productName);

        //go to cart page
        await dashboardPage.goToCart();

        //wait for the first product to be visible in the cart page before performing any action on it. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
        // await page.locator("h3:has-text('ZARA COAT 3')").waitFor(); //wait for the product to be visible in the cart page before performing any action on it. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
       await  page.waitForLoadState("networkidle");
        await checkOutPage.goToCheckOut(); //this is a method that will click on the checkout link in the cart page and it will navigate to the checkout page. 
        //page.waitForTimeout(3000); //wait for 3 seconds before performing any action on the page. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
        await expect(page.locator(".user__name [type='text']").first()).toHaveText(data.email);
        //Step for assertion of Email

        await checkOutPage.checOutPageValidations();

        await checkOutPage.submitAndConfirm();


        // await expect(page.locator(".hero-primary").toHaveText("THANKYOU FOR THE ORDER.")); //this is another way to check if the confirmation text is visible in the checkout page or not. We can also use other assertions like toBeFalsy if it has to be false and other assertions like toBeVisible, toBeHidden, etc. depending on our needs. This is especially useful when we want to verify if the confirmation text is visible in the checkout page or not.
        //If we dont add await then step becomes async and it will not wait for the text to be visible before performing any action on it. This can cause issues in our tests, so it's important to add await before the assertion. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
        //If not added test will not run in sequential manner 


        const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
        console.log(orderID);

        //Go to Orders page

        await orderPage.goToOrdersPage();
        await orderPage.orderPageValidations(orderID); //this is a method that will click on the orders link in the dashboard page and it will navigate to the orders page. This is a method that will check if the order ID is visible in the orders page or not. We can also use other assertions like toBeFalsy if it has to be false and other assertions like toBeVisible, toBeHidden, etc. depending on our needs. This is especially useful when we want to verify if the order ID is visible in the orders page or not.
      //  await page.pause();

    }); //lesson learnt 1) find locator based on text with tag 2)if element we are searching for not eligible for auto wait
    //then wait with other element which is eligible for auto wait and then perform action on the element we are searching for. This is especially useful when we are waiting for some elements to be visible before performing any action on them. 3) if we want to check if the product is added to the cart or not, we can use the locator that will check if the product is visible in the cart page or not. We can also use other locators like text, css, etc. depending on our needs. This is especially useful when we want to verify if the product is added to the cart or not. 4) we can also use other assertions like toBeFalsy if it has to be false and other assertions like toBeVisible, toBeHidden, etc. depending on our needs. This is especially useful when we want to verify if the product is added to the cart or not.
}