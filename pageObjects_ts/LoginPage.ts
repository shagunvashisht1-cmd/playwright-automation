import { expect, type Locator, type Page } from '@playwright/test';
export class LoginPage //for ts, we can use export keyword to make this class visible to the entire project. This is a common practice in TypeScript to organize our code and make it reusable across different files. We can also use other keywords like export default, export const, etc. depending on our needs. This is especially useful when we have a large codebase and we want to keep our code organized and maintainable.
{
    page:Page;
    emailInput:Locator ;
    passwordInput:Locator;
    SignInBtn:Locator;

constructor(page:Page){ //at the time of object creation, constructor will be called and it will initialize the locators for the elements on the login page. We can also use other methods like click, fill, etc. depending on our needs. 
       this.page=page;
        this.emailInput = page.locator("input#userEmail");
        this.passwordInput = page.locator("input#userPassword");
        this.SignInBtn =page.locator("input#login");
    }

    
    //reusable utility method for login, we can use this method in our tests to perform login action. 
 async goTo(){
await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
 }


 async validLogin(email: string,password: string){
await this.emailInput.fill(email);
await this.passwordInput.fill(password);
await this.SignInBtn.click();
await this.page.waitForLoadState("networkidle"); //wait for the network to be idle before performing any action on the page. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some API calls to be completed before performing any action on the page.

 }

}
//Below step with js was to make this class visible to the entire project, so that we can use this class in our tests. But in TypeScript we can use export keyword to make this class visible to the entire project.
//module.exports = { LoginPage }  //file visible to the entire project //Otherwise no other class will be able to access this file