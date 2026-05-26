class LoginPage
{
constructor(page){ //at the time of object creation, constructor will be called and it will initialize the locators for the elements on the login page. We can also use other methods like click, fill, etc. depending on our needs. 
       this.page=page;
        this.emailInput = page.locator("input#userEmail");
        this.passwordInput = page.locator("input#userPassword");
        this.SignInBtn =page.locator("input#login");
    }

    
    //reusable utility method for login, we can use this method in our tests to perform login action. 
 async goTo(){
await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
 }


 async validLogin(email,password){
await this.emailInput.fill(email);
await this.passwordInput.fill(password);
await this.SignInBtn.click();
await this.page.waitForLoadState("networkidle"); //wait for the network to be idle before performing any action on the page. This is a common action that we perform in our tests, so it's important to know how to do it correctly. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some API calls to be completed before performing any action on the page.

 }

}
module.exports = { LoginPage }  //file visible to the entire project //Otherwise no other class will be able to access this file