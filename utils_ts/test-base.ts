
import {test as baseTest} from "@playwright/test";
interface TestDataForOrder
{
    productName : string,       
    email : string,
    password : string
}
//Passing interface as generic to the base test to create a custom test with the properties of the interface. This is especially useful when we want to create a custom test with specific properties that we want to use in our tests. This is also a good way to reduce the code and make it more readable.
export const customTest=baseTest.extend<{testDataFororder:TestDataForOrder}>( // creating object on test //Any fixture and property can be set here to customize test behavior
    {
        testDataFororder://fixture
        {
            productName : "ZARA COAT 3",
    email : "sh.v1@gmail.com",
     password : "123456789@aS"
        }
    }
   
)