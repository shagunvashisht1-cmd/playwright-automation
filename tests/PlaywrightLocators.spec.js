import {test,expect} from "@playwright/test";
test("Locators in Playwright", async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

// we can use both click and check method for checkbox and radio operations but for assertion we have to use toBeChecked method as it is the only method which can be used for both radio and checkbox.
//Action should be associated with label only then it works
   expect(await page.getByLabel("Check me out if you Love IceCreams!").isChecked()).toBeFalsy() ; //From the text of the label tag
    //1.Using getByLabel -For click and check method it is suitable to use getByLabel
    await page.getByLabel("Check me out if you Love IceCreams!").check(); //From the text of the label tag
    await  expect( page.getByLabel("Check me out if you Love IceCreams!")).toBeChecked(); //From the text of the label tag
    await page.getByLabel("Employed").click(); //From the text of the label tag
    await page.getByLabel("Gender").selectOption("Female"); //From the text of the label tag //selectOption works with select tag only
    
// Note: In terminal if used  npx playwright test  --ui  will open the Playwright test runner UI and we can see the test execution in the browser with screenshot and video recording of the test execution. It is very useful for debugging and analyzing the test execution.
  

//2. getByPlaceholder - For input field we can use getByPlaceholder method to locate the element by its placeholder attribute value.
    await page.getByPlaceholder("Password").fill("abs123"); 

//3. getByRole - For button and link we can use getByRole method to locate the element by its role attribute value.
//when multiple buttons are present then we can use getByRole method with name option to locate the button by its text content.If multiple nuttons are not present then we can use getByRole method without name option to locate the button by its role attribute value.
await page.getByRole("button", { name: "Submit" }).click(); //From the role attribute value and the text of the button

//4.getByText - For any element we can use getByText method to locate the element by its text content.
await page.getByText("Success! The Form has been submitted successfully!.").isVisible(); //From the text content of the element
expect(await page.getByText("Success! The Form has been submitted successfully!.").isVisible()).toBeTruthy(); //From the text content of the element

await page.getByRole("link", { name: "Shop" }).click(); //From the role attribute value and the text of the link


//5. filter - For filtering the elements based on the text content of the element and the role attribute value of the button we can use filter method. //Chaining of locators
await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button").click(); //From the text content of the element and the role attribute value of the button
//another argument of name not required as there is only 1 button in app card element

await page.pause();
});