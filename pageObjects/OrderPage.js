const { expect } = require('@playwright/test'); //Keep Expect out of js file as it is used in test files and not in page object files.
class OrderPage{
    
constructor(page){
    this.page=page;
    this.orderButton= page.locator("button[routerlink*='orders']");
    this.orderRow=  page.locator("tbody tr");

}
async goToOrdersPage(){
    await this.orderButton.click();
}
async orderPageValidations(orderID){
    await this.page.locator("tbody").waitFor(); //wait for the table body to be visible before performing any action on it. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
//await page.waitForLoadState("networkidle"); //wait for the network to be idle before performing any action on the page. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some API calls to be completed before performing any action on the page.

const orderCount = await this.orderRow.count(); //every variable should have let or const keyword, otherwise it will be treated as a global variable and it can cause issues in our tests.

console.log(orderCount);

for(let i=0; i<orderCount; ++i){
if(orderID.includes(await this.page.locator("tbody tr").nth(i).locator("th").textContent())){
     
   await this.page.locator("tbody tr").nth(i).locator("text=View").click();
   
    break;
}
}
const orderIdDetails = await this.page.locator(".col-text").textContent();
   expect(orderID.includes(orderIdDetails)).toBeTruthy();

}
}
module.exports = { OrderPage }