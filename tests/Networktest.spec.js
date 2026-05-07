import { test, expect, request } from "@playwright/test"; //request API is used to make API calls in our tests. We can use it to make GET, POST, PUT, DELETE, etc. API calls in our tests. This is especially useful when we want to verify the response of the API calls or when we want to perform some actions based on the response of the API calls. 

//Importing API Utils Class
const { APIUtils } = require('./utils/APIUtils');


const loginPayload = { userEmail: "sh.v1@gmail.com", userPassword: "123456789@aS" };//payload for the login API call 

let response;
// let token;
// let orderID; //when not initializing use let
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] }; //payload for the order API call which we will use to place the order in our tests. We can also use other payloads for other API calls depending on our needs. This is especially useful when we want to place an order using API calls in our tests. We can also use other payloads for other API calls depending on our needs. This is especially useful when we want to place an order using API calls in our tests.
const fakePayLoadorders = { data: [], message: "No Orders" }; //Javascript object payload


test.beforeAll(async () => { //before all test cases this will run
    //just like browser scontext creation and page creation we can also create request object which we can use to make API calls in our tests. 
    const apiContext = await request.newContext(); //create a new request context which we can use to make API calls in our tests. 
    //url from network header , data / body from payload and headers from request headers of the API call which we want to make in our tests. 
    // request.newContext  To be created in test class
    const ApiUtils = new APIUtils(apiContext, loginPayload);
    response = await ApiUtils.createOrder(orderPayload);
});

// test.beforeEach(async ()=>{ //before each test case this will run

// })

test("Netwoek Intercept", async ({ page }) => {

    const productTitle = page.locator(".card-body b");
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    await page.addInitScript(value => {
        window.localStorage.setItem("token", value); //set the token in the local storage of the browser before the page is loaded. This is especially useful when we want to set some values in the local storage before the page is loaded. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we want to set some values in the local storage before the page is loaded.
    }, response.token);
    await page.goto("https://rahulshettyacademy.com/client/"); //navigate to the page after setting the token in the local storage of the browser. This is especially useful when we want to navigate to a page after setting some values in the local storage of the browser. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we want to navigate to a page after setting some values in the local storage of the browser.

    //await page.waitForLoadState("networkidle"); //wait for the network to be idle before performing any action on the page. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some API calls to be completed before performing any action on the page.
    //await titles.waitFor(); //wait for the element located by the locator to be visible before performing any action on it. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.    
    //waitFor() works on single element locator so use first or last method


    //Mocking /Network Interception
    //route("which url you want to route","how you want to route") 
    //In url in the end instead of hardcoded value which is dynamic user we can use * instead of = for-customer/69d4ede4f86ba51a654f016b
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {
            //intercepting response = API response ->{playwright fakeresponse} ->browser -> render data on frontend
            const realResponse = await page.request.fetch(route.request());//first turn page mode to api mode to make api calls  by page.request helper
            let body = JSON.stringify(fakePayLoadorders); //convert javascript object to json
            route.fulfill( //while fulfilling response will be sent with fakebody //Response Modification
                {
                    realResponse, //sending same response
                    body, //overriding body
                }
            ) //fulfill means sending response to browser //in fulfill body if we dont send anything explicitly then whatever is present with that route will be sent, & if something is passed then that will be  overridden with existing
        }
    );

    //Rerouting has to happen before clicking on order


    //Go to Orders page
    await page.locator("button[routerlink*='orders']").click();
    //await page.pause();
    //" You have No Orders to show at this time."
    //await page.waitForLoadState("networkidle");
    //await page.waitForTimeout(1000);
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"); //if we use page.pause in place of this then also it works but if we dont use pause better use this
    //await page.locator(".mt-4").waitFor(); //This one dint work above mentioned worked
    const text = await page.locator(".mt-4").textContent();
    console.log(text);
    //await page.locator("tbody").waitFor(); //wait for the table body to be visible before performing any action on it. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
    //await page.waitForLoadState("networkidle"); //wait for the network to be idle before performing any action on the page. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some API calls to be completed before performing any action on the page.



}); //lesson learnt 1) find locator based on text with tag 2)if element we are searching for not eligible for auto wait
//then wait with other element which is eligible for auto wait and then perform action on the element we are searching for. This is especially useful when we are waiting for some elements to be visible before performing any action on them. 3) if we want to check if the product is added to the cart or not, we can use the locator that will check if the product is visible in the cart page or not. We can also use other locators like text, css, etc. depending on our needs. This is especially useful when we want to verify if the product is added to the cart or not. 4) we can also use other assertions like toBeFalsy if it has to be false and other assertions like toBeVisible, toBeHidden, etc. depending on our needs. This is especially useful when we want to verify if the product is added to the cart or not.



