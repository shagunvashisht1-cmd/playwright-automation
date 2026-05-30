
const base=require("@playwright/test");
exports.customTest=base.test.extend( // creating object on test //Any fixture and property can be set here to customize test behavior
    {
        testDataFororder: //fixture
        {
            productName : "ZARA COAT 3",
    email : "sh.v1@gmail.com",
     password : "123456789@aS"
        }
    }
   
)