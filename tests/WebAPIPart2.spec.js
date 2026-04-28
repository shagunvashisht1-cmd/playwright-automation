//In Part 1 we checked how to inject token in application storage
/*   await page.addInitScript(value => {
    window.localStorage.setItem("token", value); */
//Login once through UI and then using PW function storage state get all session details storage,local etc & save in json file

/* If there are 5 test scenarios like cart, order, order details, history
then for second scenario we can inject same storage state json in the test browser.newContext(json) */ //SHIFT+ALT+A comment multiple lines
 const {test, expect} =require ("@playwright/test");
let webContext; //created globally so can be accessed everywhere

 test.beforeAll( async({browser})=>{

  const context=  await browser.newContext();
  const page=await context.newPage();

await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.getByPlaceholder("email@example.com").fill("sh.v1@gmail.com");
await page.getByPlaceholder("enter your passsword").fill("123456789@aS");
await page.getByRole("button", { name: "Login" }).click();
await page.waitForLoadState("networkidle"); 

//storageState
await context.storageState({path: 'state.json'}); //storageStet() belongs to browser fixture
webContext=await browser.newContext({storageState: 'state.json'});

 })
test("Test 1", async()=>{ //since page is created again dynamically need not to pass as fixture
      
    
    const productName= "ZARA COAT 3";
    const email= "sh.v1@gmail.com";
     const page=await webContext.newPage(); //CREATED new page
   await page.goto("https://rahulshettyacademy.com/client");
   const products= page.locator(".card-body");
   const titles=await page.locator(".card-body b").allTextContents();
   console.log(titles);

//console.log(await productTitle.allTextContents());
const count= await products.count();
for(let i=1; i<count; ++i){
    if(await products.nth(i).locator("b").textContent() === productName){
      //add to cart
      console.log(await products.nth(i).locator("b").textContent());
        await products.nth(i).locator("text= Add To Cart").click(); //LOCATOR VIA TEXT, this is a locator that will find the element based on the text content of the element. We can also use other locators like css, xpath, etc. depending on our needs. This is especially useful when we want to find an element based on its text content.
       console.log("Found the product");
        break;
    }
}
//go to cart page
 await page.locator("[routerlink*='cart']").click(); //*because of regular expression
 //await page.locator("div li").first().waitFor(); //wait for the first product to be visible in the cart page before performing any action on it. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
 await page.locator("h3:has-text('ZARA COAT 3')").waitFor(); //wait for the product to be visible in the cart page before performing any action on it. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
 const bool=await  page.locator("h3:has-text('ZARA COAT 3')").isVisible(); //this is a locator that will check if the product is visible in the cart page or not. We can also use other locators like text, css, etc. depending on our needs. This is especially useful when we want to verify if the product is added to the cart or not.
 expect(bool).toBeTruthy(); //this is an assertion to check if the product is visible in the cart page or not. We can also use other assertions like toBeFalsy if it has to be false and other assertions like toBeVisible, toBeHidden, etc. depending on our needs. This is especially useful when we want to verify if the product is added to the cart or not.
 await page.locator("text=Checkout").click();
 //page.waitForTimeout(3000); //wait for 3 seconds before performing any action on the page. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.

//Step for assertion of Email

 await expect(page.locator(".user__name [type='text']").first()).toHaveText(email); //this is an assertion to check if the email is visible in the checkout page or not. We can also use other assertions like toBeFalsy if it has to be false and other assertions like toBeVisible, toBeHidden, etc. depending on our needs. This is especially useful when we want to verify if the email is visible in the checkout page or not.

 await page.locator("input[placeholder='Select Country']").pressSequentially("ind"); //fill enters text in one go but for suggestion to show we need to type slowly, so we can use the presssequentially method to type the text slowly and then perform any action on the page. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
//await page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 }); //this is another way to type the text slowly and then perform any action on the page. 

 const suggestions=  page.locator(".ta-results");
await suggestions.waitFor(); //wait for the suggestions to be visible before performing any action on it. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
const optionscount=await suggestions.locator("button").count(); //every variable should have let or const keyword, otherwise it will be treated as a global variable and it can cause issues in our tests. 
for(let i=0; i<optionscount; ++i){
    if(await suggestions.locator("button").nth(i).textContent() === " India"){ //if space dont want to provide then can use trim method to remove the space from the text content and can also use other methods like includes (text.includes("India") if search list has only 1 india), indexOf, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
        await suggestions.locator("button").nth(i).click();
        break;
    }
}

 await page.locator(".action__submit").click();
 const confirmationText = await page.locator(".hero-primary").textContent();
 console.log(confirmationText);
expect(confirmationText).toBe(" Thankyou for the order. "); //this is an assertion to check if the confirmation text is visible in the checkout page or not. We can also use other assertions like toBeFalsy if it has to be false and other assertions like toBeVisible, toBeHidden, etc. depending on our needs. This is especially useful when we want to verify if the confirmation text is visible in the checkout page or not.
 

// await expect(page.locator(".hero-primary").toHaveText("THANKYOU FOR THE ORDER.")); //this is another way to check if the confirmation text is visible in the checkout page or not. We can also use other assertions like toBeFalsy if it has to be false and other assertions like toBeVisible, toBeHidden, etc. depending on our needs. This is especially useful when we want to verify if the confirmation text is visible in the checkout page or not.
 //If we dont add await then step becomes async and it will not wait for the text to be visible before performing any action on it. This can cause issues in our tests, so it's important to add await before the assertion. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
//If not added test will not run in sequential manner 


const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderID);

//Go to Orders page

await page.locator("button[routerlink*='orders']").click();
await page.locator("tbody").waitFor(); //wait for the table body to be visible before performing any action on it. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
//await page.waitForLoadState("networkidle"); //wait for the network to be idle before performing any action on the page. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some API calls to be completed before performing any action on the page.

const orderCount = await page.locator("tbody tr").count();

console.log(orderCount);

for(let i=0; i<orderCount; ++i){
if(orderID.includes(await page.locator("tbody tr").nth(i).locator("th").textContent())){
     
   await page.locator("tbody tr").nth(i).locator("text=View").click();
   
    break;
}
}
const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderID.includes(orderIdDetails)).toBeTruthy();


})

test("Test 2", async()=>{ //since page is created again dynamically need not to pass as fixture
      
    
    const productName= "ZARA COAT 3";
    const email= "sh.v1@gmail.com";
     const page=await webContext.newPage(); //CREATED new page
   await page.goto("https://rahulshettyacademy.com/client");
   const products= page.locator(".card-body");
   const titles=await page.locator(".card-body b").allTextContents();
   console.log(titles);
await  page.pause();
})

//This approach is beneficial if there are multiple test cases requiring login