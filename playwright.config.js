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


//Keeping below code in desktop file as we are using the default configuration provided by Playwright and we don't need to specify anything in the config file for our tests to run. We can just use the default configuration and it will work fine. But if you want to customize the configuration, you can uncomment the below code and make the necessary changes as per your requirements.

//export defineConfig({ //basically a variable storing the configuration object which we will export at the end of the file and use it in our tests. We can also use this variable to define different configurations for different environments like staging, production, etc. and then we can use the appropriate configuration in our tests based on the environment we are running the tests in.
  const configO = ({ //js object storing config in key value pair format, where key is the name of the configuration option and value is the value of that option. We can also use this object to define different configurations for different environments like staging, production, etc. and then we can use the appropriate configuration in our tests based on the environment we are running the tests in.
testDir: './tests',
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
  use: {
    browserName: 'chromium',
    headless :false,
    screenshot : 'on',
    trace:'on' , //retain-on-failure, on, off

  },
});


module.exports = configO; //all options defined in the config variable will be exported and Will be available across the project and can be used in our tests. We can also export multiple configurations for different environments and then we can use the appropriate configuration in our tests based on the environment we are running the tests in.
