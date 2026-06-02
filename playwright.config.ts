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

/**
 * @see https://playwright.dev/docs/test-configuration
 */

//To RUN TS test in headless mode
// cd..to go to project root then run:-  npx playwright test tests/ClientAppDynamicFindPO.spec.ts --config=playwright.config.ts


//Keeping below code in desktop file as we are using the default configuration provided by Playwright and we don't need to specify anything in the config file for our tests to run. We can just use the default configuration and it will work fine. But if you want to customize the configuration, you can uncomment the below code and make the necessary changes as per your requirements.

//export defineConfig({ //basically a variable storing the configuration object which we will export at the end of the file and use it in our tests. We can also use this variable to define different configurations for different environments like staging, production, etc. and then we can use the appropriate configuration in our tests based on the environment we are running the tests in.
const configO = ({ //js object storing config in key value pair format, where key is the name of the configuration option and value is the value of that option. We can also use this object to define different configurations for different environments like staging, production, etc. and then we can use the appropriate configuration in our tests based on the environment we are running the tests in.
  testDir: './tests',

  retries: 1,//how many times it will retry 
  //If test pass in retry run then it is counted as flaky not passed


  //workers: 2, //disabling parallel mechanism //how many at a time Test files will run

  /* to override default timeout 30000ms */
  timeout: 30000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  reporter: 'html', //html reports gets generated in pw-report folder : index.html copy path and open in browser
//npm i -D @playwright/test allure-playwright  To Install allure plugin
//npx playwright test --grep "@Web" --reporter=line,allure-playwright //just like html report there is line report which generates plain text report which act as input for allure report
//npm install -g allure-commandline --save-dev to download report generation tool , Also need jdk installed and java path set
// after test execution run : open html report from allure-result folder:-  allure generate ./allure-results reads json format files and convert into html report
// allure generate ./allure-results --clean cleans folder first then generate new results
// allure open ./allure-report or allure open to open report

/* | Package              | Purpose                     |
| -------------------- | --------------------------- |
| `allure-playwright`  | Creates allure result files |
| `allure-commandline` | Generates/open HTML report  |

 */

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on', // 'only=on-failure'
    trace: 'on', //retain-on-failure, on, off

  },
});


module.exports = configO; //all options defined in the config variable will be exported and Will be available across the project and can be used in our tests. We can also export multiple configurations for different environments and then we can use the appropriate configuration in our tests based on the environment we are running the tests in.
