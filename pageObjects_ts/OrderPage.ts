import { expect, type Locator, type Page } from '@playwright/test';
export class OrderPage{
    page: Page;
    orderButton: Locator;
    orderRow: Locator;

constructor(page:any){
    this.page=page;
    this.orderButton= page.locator("button[routerlink*='orders']");
    this.orderRow=  page.locator("tbody tr");

}
async goToOrdersPage(){
    await this.orderButton.click();
}
async orderPageValidations(orderID:any){//use any if not certain of type
    await this.page.locator("tbody").waitFor(); //wait for the table body to be visible before performing any action on it. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
//await page.waitForLoadState("networkidle"); //wait for the network to be idle before performing any action on the page. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some API calls to be completed before performing any action on the page.

const orderCount = await this.orderRow.count(); //every variable should have let or const keyword, otherwise it will be treated as a global variable and it can cause issues in our tests.

console.log(orderCount);
//const orderIDStr:any = orderID.toString();
for(let i=0; i<orderCount; ++i){
if(orderID.includes(await this.page.locator("tbody tr").nth(i).locator("th").textContent())){ //includes for string
  //   if(orderIDStr.includes(await this.page.locator("tbody tr").nth(i).locator("th").textContent())){ //orderID:number
   await this.page.locator("tbody tr").nth(i).locator("text=View").click();
   
    break;
}
}
const orderIdDetails = await this.page.locator(".col-text").textContent();
  // expect(orderIDStr.includes(orderIdDetails)).toBeTruthy(); //orderID:number
expect(orderID.includes(orderIdDetails)).toBeTruthy();

}
}
//module.exports = { OrderPage }