//const { LoginPage } = require("./LoginPage"); //js way to import the class from another file
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { OrderPage } from "./OrderPage";
import { CheckOutPage } from "./CheckOutPage";
import { expect, type Locator, type Page } from '@playwright/test';
export class POManager {
    page :Page;
    loginPage : LoginPage;
    dashboardPage : DashboardPage;
    checkOutPage : CheckOutPage;
    orderPage : OrderPage;
    constructor(page:any) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.checkOutPage = new CheckOutPage(this.page);
        this.orderPage = new OrderPage(this.page);
    }


    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }   
    getCheckOutPage() {
        return this.checkOutPage;
    }

    getOrderPage() {
        return this.orderPage;
    }   
}
//module.exports = { POManager }