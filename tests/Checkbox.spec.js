import {test, expect}from "@playwright/test";
test("Select Checkbox", async ({page})=>{
   const userName= page.locator("input#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshettyacademy");
    await page.locator("input#password").fill("Learning@830$3mK2");
    const checkBox= page.locator("#terms");
     await checkBox.click();
     await expect(checkBox).toBeChecked(); //this is an assertion to check if the checkbox is checked or not. We can also use other assertions like toBeVisible, toBeHidden, etc. depending on our needs. This is especially useful when we want to verify the state of an element after performing some action on it.
    console.log(await checkBox.isChecked()); // for logging purpose as it returns boolean value//this is an assertion to check if the checkbox is checked or not. We can also use other assertions like toBeVisible, toBeHidden, etc. depending on our needs. This is especially useful when we want to verify the state of an element after performing some action on it.
      await checkBox.uncheck();
      //we dont have method to check if element is unchecked or not, so we can use the isChecked method to check if the checkbox is unchecked or not. This is especially useful when we want to verify the state of an element after performing some action on it.
      expect(await checkBox.isChecked()).toBeFalsy(); //this is an assertion to check if the checkbox is unchecked or not. We can also use other assertions like toBeTruthy if it has to be true and other assertions like toBeVisible, toBeHidden, etc. depending on our needs. This is especially useful when we want to verify the state of an element after performing some action on it.
  //expect is outside and await is inside as action is inside
  
      // await page.pause();
});