class APIUtils
{
constructor(apiContext,loginPayload) //so that it gets used throughout this class, Login would be mandatory steps for all flows
{
    this.apiContext=apiContext; //this.apiContext is instance variable of this class
    this.loginPayload=loginPayload; 
}
async getToken()
{
    const apiResponse= await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", 
        {
        data: this.loginPayload
        }  //make a POST API call to the login API to get the token which we can use in our tests. 
     )
   //  expect(apiResponse.ok()).toBeTruthy(); //to check if the API call is successful or not. We can also use other assertions like toBe, etc. depending on our needs. This is especially useful when we want to verify if the API call is successful or not.
    const loginResponseJson= await apiResponse.json();
     const token=loginResponseJson.token;
     console.log(token); //print the token in the console which we got from the login API call.
    return token;
}

async createOrder(orderPayload){ //specifically passed here and not in constructor as it is method specific

    let response={}; //JS object
    response.token= await this.getToken(); //response objects has been assigned token property in this step
    //url we can get from network tab before placing order 
    const orderApiResponse= await this.apiContext.post(" https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
        data:orderPayload,
        headers: {
            'Authorization': response.token,
            'Content-Type': 'application/json'
        }
    })
   // expect(orderApiResponse.ok()).toBeTruthy();  //Can be done in test class not required here so Commenting expect
    const orderResponseJson= await orderApiResponse.json();
    console.log(orderResponseJson);
    const orderID= orderResponseJson.orders[0]; //get the order ID from the response of the order API call which we will use in our tests to verify the order in the UI. This is especially useful when we want to verify the order in the UI after placing the order using API calls in our tests. We can also use other values from the response of the API call depending on our needs. This is especially useful when we want to verify the order in the UI after placing the order using API calls in our tests.
    console.log(orderID);
    response.orderID=orderID; //assigning js object properties like orderID here
    return response;
}
}
module.exports= {APIUtils} //file visible to the entire project //Otherwise no other class will be able to access this file