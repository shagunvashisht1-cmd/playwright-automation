import {test, expect}from "@playwright/test";
test("Select DropDown", async ({page})=>{
    //Select Dropdown are static dropdowns, they are not dynamic like the one we have in Angular or React. They are simple HTML select elements that we can interact with using the selectOption method. We can select an option by its value, label, or index. In this example, we will select an option by its value.
   const userName= page.locator("input#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshettyacademy");
    await page.locator("input#password").fill("Learning@830$3mK2");
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.pause(); //pause the test execution and open the Playwright Inspector to debug the test. This is a useful feature that allows us to inspect the state of the page and the elements on it at any point during the test execution. We can also use this feature to interact with the page and perform actions on it, such as clicking, filling, etc. This is especially useful when we are trying to debug a test that is failing or when we want to understand how a particular element is behaving on the page.
});