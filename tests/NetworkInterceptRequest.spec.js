import { test, expect, request } from "@playwright/test"; //request API is used to make API calls in our tests. We can use it to make GET, POST, PUT, DELETE, etc. API calls in our tests. This is especially useful when we want to verify the response of the API calls or when we want to perform some actions based on the response of the API calls. 


test("Security test request Intercept", async ({ page }) => {
    const productTitle = page.locator(".card-body b");
    const email = "sh.v1@gmail.com";
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill("sh.v1@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("123456789@aS");
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForLoadState("networkidle"); //wait for the network to be idle before performing any action on the page. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some API calls to be completed before performing any action on the page.
    await productTitle.first().waitFor();

    await page.locator("button[routerlink*='myorders']").click(); 
    //route.abort in UI Basics test file

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        //continue for request modification
        route => route.continue({ //can also pass multiple things like header, url whatever needs to be changed do it as defines url :''
            url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=69f0a201f86ba51a658ef0f1 ' //not authoroiized data
        }));
   
    //login and reach my orders page to view
    await page.locator("button:has-text('View')").first().click(); //"text=View"
    //await page.pause();
   await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");  //p is tagname
}); 



