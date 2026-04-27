const {expect,test}=require("@playwright/test");
test("Calendar Validations", async ({page})=>{
const monthNumber= "6";
const date= "15";
const year= "2027";
const expectedList=[monthNumber, date, year];
//const expectedList=[monthNumber, date, year].join("/"); 
const actualList=[];
console.log(expectedList); //6/15/2027 output will be in this format as we have joined the month number, date and year with "/" separator. This is especially useful when we want to compare the expected date with the actual date selected from the calendar. We can also use other separators like "-", etc. depending on our needs. This is especially useful when we want to compare the expected date with the actual date selected from the calendar in a specific format.
await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    await page.locator("div.react-date-picker__inputGroup ").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.getByText(year).click();
    await page.locator(".react-calendar__year-view__months button").nth(Number(monthNumber)-1).click(); //array starts from 0
    //month number-1 //Convert string to Number by wrapping
    //await page.getByText(date).click(); //cant use getByText as there is one more element with text 15 on page
    await page.locator("//abbr[text()='"+date+"']").click(); //we can also use this xpath to locate the date element and click on it. This is especially useful when we have multiple elements with the same text on the page and we want to click on a specific one. We can also use other locators like css, etc. depending on our needs. This is especially useful when we want to click on a specific element among multiple elements with the same text on the page.
   const inputLocator= page.locator(".react-date-picker__inputGroup__input");
   //const UIValue= await inputLocator.first().inputValue(); //get the value of the input field after selecting the date from the calendar. This is especially useful when we want to verify if the value of the input field is equal to the expected list or not after selecting the date from the calendar. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we want to verify if the value of the input field is equal to the expected list or not after selecting the date from the calendar.
   //console.log(UIValue);//2027-06-15 output got
    const inputCount =  await inputLocator.count(); //click on the calendar input field to close the calendar popup after selecting the date. This is especially useful when we want to close the calendar popup after selecting the date. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we want to close the calendar popup after selecting the date.
   //console.log(inputCount); //3
    for(let i=0; i<inputCount; i++){
        const value= await inputLocator.nth(i).inputValue(); //input value or getAttributeOf as it is dynamix text
      //  console.log(value); 
        actualList.push(value); //add the value of the input field to the actual list after selecting the date from the calendar. This is especially useful when we want to compare the expected date with the actual date selected from the calendar. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we want to compare the expected date with the actual date selected from the calendar in a specific format.
       
    }
    console.log(actualList); //[ '6', '15', '2027' ] output
expect(actualList).toEqual(expectedList); //compare the actual list with the expected list after selecting the date from the calendar. This is especially useful when we want to verify if the actual date selected from the calendar is equal to the expected date or not. We can also use other assertions like toBe, etc. depending on our needs. This is especially useful when we want to verify if the actual date selected from the calendar is equal to the expected date or not in a specific format.
  
//OtherWay

/*for(let i=0;i<expectedList.length; i++){
 const valueActual=await inputLocator.nth(i).inputValue();
 console.log(valueActual); 
 expect(valueActual).toEqual(expectedList[i]); //compare the value of the input field with the expected list after selecting the date from the calendar. This is especially useful when we want to verify if the value of the input field is equal to the expected list or not after selecting the date from the calendar. We can also use other actions like click, fill, etc. depending on our needs.
 //difference in toBe and toEqual is that toBe is used for primitive data types like string, number, boolean, etc. and toEqual is used for non-primitive data types like array, object, etc.  
    }
*/
    await  page.pause(); 
})