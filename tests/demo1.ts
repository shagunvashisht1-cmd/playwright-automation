import { expect, type Locator, type Page } from '@playwright/test';

let  message1 : string= "Hello;" //If type not provided then on compiling we will get error
//message1 =2; //Can't do this
//console.log(message1);
message1 = "bye";
console.log(message1);
let age1 :number =2;
console.log(age1);
let isActive: boolean = false;
console.log(isActive);
//define array
let  numbersArray : number[]  =[1,2,3];
console.log(numbersArray);
//if unaware of data type

let data :any = "this could be anything";
data =42; //it gets accepted because of usage of any
console.log(data);
function addT(a:number,b:number) : number
{
    return a+b;
}
addT(3,7);
console.log(addT(3,7));

//objects
let userT :{ name: string, age:number} = {name: "Bob", age:2};
//userT.location="hyderabad"; //Not Allowed addition bcz we have defined 2 properties earlier
//CT error
let userT1 :{ name: string, age:number, location:string} = {name: "Bob", age:2, location:"delhi"};
userT1.location="hyderabad";//will not give compile time error

class Person {

 page : Page; //For class members  we dont need let var or char const
    cartButton : Locator; //Defining type
 constructor(page: any){
this.page=page;
     this.cartButton = page.locator("[routerlink*='cart']");
 }
}