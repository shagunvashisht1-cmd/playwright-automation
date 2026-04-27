import {test, expect}from "@playwright/test";

test("Dynamic Find Product", async({page})=>{
    const productTitle= page.locator(".card-body b"); 
    const products= page.locator(".card-body");
    const productName= "ZARA COAT 3";
    const email= "sh.v1@gmail.com";
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
 //await page.locator("//a[normalize-space()='Login here']").click(); 
// await page.locator("input#userEmail").fill("");
await page.getByPlaceholder("email@example.com").fill("sh.v1@gmail.com");
await page.getByPlaceholder("enter your passsword").fill("123456789@aS");
await page.getByRole("button", { name: "Login" }).click();
await page.waitForLoadState("networkidle"); //wait for the network to be idle before performing any action on the page. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some API calls to be completed before performing any action on the page.
//await titles.waitFor(); //wait for the element located by the locator to be visible before performing any action on it. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.    
//waitFor() works on single element locator so use first or last method
await productTitle.first().waitFor();  
//console.log(await productTitle.allTextContents());


await page.locator(".card-body").filter({hasText:productName}).getByRole("button", {name : 'Add To Cart'} ).click(); //From the text content of the element and the role attribute value of the button

//go to cart page
await page.getByRole("listitem").getByRole("button", {name : 'Cart'} ).click(); //Since there are multiple buttons with the same name "Cart" we can use getByRole first for parent locator and then use getByRole for child locator to locate the button we want to click. 
 //await page.locator("div li").first().waitFor(); //wait for the first product to be visible in the cart page before performing any action on it. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
 await page.locator("h3:has-text('ZARA COAT 3')").waitFor(); //wait for the product to be visible in the cart page before performing any action on it. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
await expect(page.getByText(productName)).toBeVisible(); //this is an assertion to check if the product is visible in the cart page or not. We can also use other assertions like toBeFalsy if it has to be false and other assertions like toBeVisible, toBeHidden, etc. depending on our needs. This is especially useful when we want to verify if the product is visible in the cart page or not. 

await page.getByRole("button", {name : 'Checkout'} ).click(); //From the role attribute value and the text of the button
 //page.waitForTimeout(3000); //wait for 3 seconds before performing any action on the page. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.


 await page.getByPlaceholder("Select Country").pressSequentially("ind"); //fill enters text in one go but for suggestion to show we need to type slowly, so we can use the presssequentially method to type the text slowly and then perform any action on the page. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
//await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 }); //this is another way to type the text slowly and then perform any action on the page. 
await page.getByRole("button", {name : 'India'} ).nth(1).click(); //From the role attribute value and the text of the button
 await page.getByText("Place Order").click();
await expect(page.getByText("Thankyou for the order.")).toBeVisible();

 

await  page.pause();

}); //lesson learnt 1) find locator based on text with tag 2)if element we are searching for not eligible for auto wait
//then wait with other element which is eligible for auto wait and then perform action on the element we are searching for. This is especially useful when we are waiting for some elements to be visible before performing any action on them. 3) if we want to check if the product is added to the cart or not, we can use the locator that will check if the product is visible in the cart page or not. We can also use other locators like text, css, etc. depending on our needs. This is especially useful when we want to verify if the product is added to the cart or not. 4) we can also use other assertions like toBeFalsy if it has to be false and other assertions like toBeVisible, toBeHidden, etc. depending on our needs. This is especially useful when we want to verify if the product is added to the cart or not.



