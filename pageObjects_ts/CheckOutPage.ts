//import { expect, type Locator, type Page } from '@playwright/test';
import { expect,  Locator,  Page } from '@playwright/test';

export class CheckOutPage{
    page: Page;
    checkOutLink: Locator;
    suggestions: Locator;
    submit: Locator;
    confirmationText: Locator;
    input: Locator;
    constructor(page: any){
        this.page=page;
        this.checkOutLink=page.locator("text=Checkout");
       this.suggestions=  page.locator(".ta-results");
       this.submit=page.locator(".action__submit");
      this.confirmationText = page.locator(".hero-primary");
       this.input=page.locator(".user__name [type='text']").first();
    }     
    async goToCheckOut(){
        await this.checkOutLink.click();  
        await this.page.waitForLoadState("networkidle"); 
}
async checOutPageValidations(){
     await this.page.locator("input[placeholder='Select Country']").pressSequentially("ind"); //fill enters text in one go but for suggestion to show we need to type slowly, so we can use the presssequentially method to type the text slowly and then perform any action on the page. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
    //await this.page.locator("[placeholder*='Country']").pressSequentially("ind", { delay: 150 }); //this is another way to type the text slowly and then perform any action on the page. 
    
     
    await this.suggestions.waitFor(); //wait for the suggestions to be visible before performing any action on it. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
    const optionscount=await this.suggestions.locator("button").count(); //every variable should have let or const keyword, otherwise it will be treated as a global variable and it can cause issues in our tests. 
    for(let i=0; i<optionscount; ++i){
        if(await this.suggestions.locator("button").nth(i).textContent() === " India"){ //if space dont want to provide then can use trim method to remove the space from the text content and can also use other methods like includes (text.includes("India") if search list has only 1 india), indexOf, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
            await this.suggestions.locator("button").nth(i).click();
            break;
        }
    }
}

async submitAndConfirm(){
    await this.submit.click();
    await this.page.waitForLoadState("networkidle"); 
 
  const ConfirmationText: any = await this.confirmationText.textContent();
   console.log(ConfirmationText);
  expect(ConfirmationText.trim()).toBe("Thankyou for the order.");
}
}
//module.exports = { CheckOutPage }