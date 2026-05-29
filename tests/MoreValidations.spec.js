const {test,expect} = require("@playwright/test");
//import {test,expect} from "@playwright/test";

test("Popup Validations", async({page}) => {
await  page.goto("https://rahulshettyacademy.com/AutomationPractice/");

//Element Visibility

console.log(await page.locator("#displayed-text").isVisible()); //From the id attribute value 
await expect(page.locator("#displayed-text")).toBeVisible(); //From the id attribute value

await page.locator("#hide-textbox").click(); //From the id attribute value
console.log(await page.locator("#displayed-text").isHidden()); 
console.log(await page.locator("#displayed-text").isVisible()); 
await expect(page.locator("#displayed-text")).toBeHidden(); //From the id attribute value


//Handle Dialog which is alert, confirm and prompt popup all java based popup can't do inspectron as it is not browser based but we can do handle dialog in playwright We can use page.on method to handle the dialog popup and we can use dialog.accept method to accept the dialog popup and dialog.dismiss method to dismiss the dialog popup. We can also use dialog.message method to get the message of the dialog popup. This is especially useful when we want to handle the dialog popup in our test script. 
//on is listening event and dialog is the event which is triggered when the dialog popup is displayed on the page. We can use page.on method to listen to the dialog event and then we can use dialog.accept method to accept the dialog popup and dialog.dismiss method to dismiss the dialog popup. We can also use dialog.message method to get the message of the dialog popup. This is especially useful when we want to handle the dialog popup in our test script.

 page.on('dialog',dialog => dialog.accept());
await page.locator("#confirmbtn").click(); 

//To Hover over element and click on the element which is visible after hovering
await page.locator("#mousehover").hover();
await page.locator("a:has-text('Top')").click(); //From the text content of the element
expect( page.url()).toContain("top"); 
console.log(page.url().includes("top")); //true output //can't use toContain as it is not an assertion but a method which returns a boolean value. This is especially useful when we want to verify if the url contains a specific text or not after performing some actions on the page. We can also use other assertions like toBe, etc. depending on our needs. 

//await page.locator("li a[href*='lifetime-access']:visible").click(); //Test timeout of 30000ms exceeded. as element is in different frame so we need to switch to that frame before performing any action on the element. This is especially useful when we want to perform some actions on the elements which are present in different frames on the page. 
//Handle Frame
const frame=page.frameLocator("#courses-iframe");

await frame.locator("li a[href*='lifetime-access']:visible").click(); //From the href attribute value and visible state of the element
const text= await frame.locator("div.text h2").textContent();
console.log(text);


//Text splitting and getting the first word from the text content of the element. This is especially useful when we want to get a specific part of the text content of the element after performing some actions on the page. We can also use other string methods like slice, substring, etc. depending on our needs. 
 console.log(text.split(" ")[1]); //split the text and get the first word and trim the white spaces from the text. This is especially useful when we want to get a specific part of the text content of the element. We can also use other string methods like slice, substring, etc. depending on our needs. This is especially useful when we want to get a specific part of the text content of the element after performing some actions on the page.

})

test("Screenshot & Visual Comparison", async({page})=>{
await  page.goto("https://rahulshettyacademy.com/AutomationPractice/");

//Element Visibility
//await page.screenshot({path: 'screenshot.png'}); //SS at page level
console.log(await page.locator("#displayed-text").isVisible()); //From the id attribute value 
await expect(page.locator("#displayed-text")).toBeVisible(); //From the id attribute value

await page.locator("#displayed-text").screenshot({path: 'partialscreenshot.png'}); //SS at locator level

await page.locator("#hide-textbox").click(); //From the id attribute value

console.log(await page.locator("#displayed-text").isHidden()); 
})


//screenshot-store-screenshot  : comparison of current with expected
test.only("Test of Screenshot Comparison",async({page})=>{

await  page.goto("https://google.com/"); //where page not getting updated after a minute or so then we can use toMatchSnapshot method to compare the current screenshot with the expected screenshot which we have stored in the screenshots folder.
expect(await page.screenshot()).toMatchSnapshot('expectedScreenshot.png'); //at first it fails as there is no expected screenshot in the screenshots folder but after we run the test it will create the expected screenshot in the screenshots folder and then we can run the test again to compare the current screenshot with the expected screenshot.
})