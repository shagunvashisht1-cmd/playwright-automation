const { LoginPage } = require("./LoginPage"); 
const { CheckOutPage } = require("./CheckOutPage");
const { DashboardPage } = require("./DashboardPage");
const { OrderPage } = require("./OrderPage");
class POManager {
    constructor(page) {
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
module.exports = { POManager }