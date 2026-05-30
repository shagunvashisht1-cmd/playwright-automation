// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { config } from 'node:process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });


// This is used for cross browser testing

/* //If want to create different config then
//Terminal command to run different config file: npx pw test fileName.js --config newConfigName.js

//If dont want to create diff config use projects: [] array and define properties 
// npx playwright test CustomTestFixturePassed.spec.js --config playwright.configNew.js --project="chrome execution"
// If project name not specified while run then it will run all the browsers mentioned with settings defined*/


/**
 * @see https://playwright.dev/docs/test-configuration
 */


//Keeping below code in desktop file as we are using the default configuration provided by Playwright and we don't need to specify anything in the config file for our tests to run. We can just use the default configuration and it will work fine. But if you want to customize the configuration, you can uncomment the below code and make the necessary changes as per your requirements.

//export defineConfig({ //basically a variable storing the configuration object which we will export at the end of the file and use it in our tests. We can also use this variable to define different configurations for different environments like staging, production, etc. and then we can use the appropriate configuration in our tests based on the environment we are running the tests in.
const configO = ({ //js object storing config in key value pair format, where key is the name of the configuration option and value is the value of that option. We can also use this object to define different configurations for different environments like staging, production, etc. and then we can use the appropriate configuration in our tests based on the environment we are running the tests in.
  testDir: './tests',
  
  //Config at object level set retry to  run flaky test Retries applied at overall project
  retries: 1 ,//how many times it will retry 
  //If test pass in retry run then it is counted as flaky not passed


    /* to override default timeout 30000ms */
    timeout: 30000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  reporter: 'html',
  projects: [ //Use this if dont want to create multiple configs

    {
      name: "safari execution",
      use: {
        browserName: 'Webkit',  //Updated config
        headless: true,  //Updated config
        screenshot: 'off', // 'only=on-failure'
        trace: 'on', //retain-on-failure, on, off


      //  ...devices['iPhone 11'] //browser size defined based on device provided

      }
    },

    {
      name: "chrome execution",
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on', // 'only=on-failure'
        trace: 'on', //retain-on-failure, on, off Using Trace we can generate logs in pw

        //For testing webresponsive testing where we check elements fitting in webpage or not
        viewport: { width: 720, height: 720 }, //Another option if not provided takes default size , browser size 
        //If app is mobile friendly then decreasing viewport should work

        //...devices['Galaxy A55'] //browser size defined based on device provided

        ignoreHttpsErrors: true, //to avoid ssl certificate error on page where advanced nutton needs to be clicked
        permissions: ['geolocation'], //when location pop up appears on page, this can be used to handle

        video: 'retain-on-failure'
      }
    }

  ]

});


module.exports = configO; //all options defined in the config variable will be exported and Will be available across the project and can be used in our tests. We can also export multiple configurations for different environments and then we can use the appropriate configuration in our tests based on the environment we are running the tests in.
