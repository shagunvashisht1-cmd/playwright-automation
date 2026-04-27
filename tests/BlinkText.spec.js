import {test, expect}from "@playwright/test";
test("Select Checkbox", async ({page})=>{
   const userName= page.locator("input#username");
   const docLink= page.locator("[href*='documents-request']");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshettyacademy");
    await page.locator("input#password").fill("Learning@830$3mK2");
    await expect(docLink).toHaveAttribute("class", "blinkingText");
});