import {test, expect}from "@playwright/test";
test("Select DropDown", async ({page})=>{
   const userName= page.locator("input#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshettyacademy");
    await page.locator("input#password").fill("Learning@830$3mK2");
    const radioButton = page.locator(".form-check-inline input");
  await radioButton.last().click();
   const confirmOk = page.locator("#okayBtn"); //this is web based locator, not a native alert/java based, so we can use the locator to interact with it.
    await confirmOk.click();
   await expect(radioButton.last()).toBeChecked();  //this is an assertion to check if the radio button is checked or not. We can also use other assertions like toBeVisible, toBeHidden, etc. depending on our needs. This is especially useful when we want to verify the state of an element after performing some action on it. 
    console.log( await radioButton.last().isChecked()); // for logging purpose as it returns boolean value//this is an assertion to check if the radio button is checked or not. We can also use other assertions like toBeVisible, toBeHidden, etc. depending on our needs. This is especially useful when we want to verify the state of an element after performing some action on it. 
    await page.pause(); //pause the test execution and open the Playwright Inspector to debug the test. This is a useful feature that allows us to inspect the state of the page and the elements on it at any point during the test execution. We can also use this feature to interact with the page and perform actions on it, such as clicking, filling, etc. This is especially useful when we are trying to debug a test that is failing or when we want to understand how a particular element is behaving on the page.

});