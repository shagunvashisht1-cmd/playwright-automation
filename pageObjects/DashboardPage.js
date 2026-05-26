class DashboardPage{
    constructor(page){
this.page=page;
   this.productTitle= page.locator(".card-body b");
     this.products= page.locator(".card-body");
     this.cartButton = page.locator("[routerlink*='cart']");
    }
 async selectProductAddCart(productName){
    await this.productTitle.first().waitFor();
    //console.log(await productTitle.allTextContents());
    const count= await this.products.count();
    for(let i=0; i<count; ++i){
        if(await this.products.nth(i).locator("b").textContent() === productName){
          //add to cart
          console.log(await this.products.nth(i).locator("b").textContent());
            await this.products.nth(i).locator("text= Add To Cart").click(); //LOCATOR VIA TEXT, this is a locator that will find the element based on the text content of the element. We can also use other locators like css, xpath, etc. depending on our needs. This is especially useful when we want to find an element based on its text content.
           console.log("Found the product");
            break;
        }
    }
}
async goToCart(){
   await this.cartButton.click(); //*because of regular expression
}
}
module.exports = { DashboardPage }