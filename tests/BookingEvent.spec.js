const { test, expect } = require("@playwright/test");
test("Booking Event", async ({ page }) => {
  await page.goto("https://eventhub.rahulshettyacademy.com");
  await page.getByPlaceholder("you@email.com").fill("sh.v1@gmail.com");
  await page.getByPlaceholder("••••••").fill("123456789@sV");
  await page.getByRole("button", { name: 'Sign In' }).click();
  //1.

  const expectedButton = page.getByRole("link", { name: 'Browse Events →' }); //From the role attribute value and the text of the heading

  await expect(expectedButton).toBeVisible();

  //2. 
  const boolValue = await page.getByText("Browse Events →").isVisible();
  console.log(boolValue);

  //3.  getByText returns a locator and we can use isVisible method to check if the element located by the locator is visible or not. This is especially useful when we want to verify if the element is visible on the page or not. We can also use other assertions like toBeTruthy, toBeFalsy, etc. depending on our needs. This is especially useful when we want to verify if the element is visible on the page or not.
  expect(await page.getByText("Browse Events →").isVisible()).toBeTruthy(); //From the text content of the element


  await page.getByRole("button", { name: 'Admin' }).click();
  //await page.getByRole("link", {name:'Manage Events'}). first().click();
  await page.locator("a[href='/admin/events']").first().click();
  const eventName = `Test Event ${Date.now()}`;
  await page.getByLabel("Title").fill(eventName); //From the text of the label tag
  await page.getByPlaceholder("Describe the event…").fill("This is a test event created by Playwright automation script."); //From the placeholder attribute value
  await page.getByLabel("Category").selectOption("Workshop");
  await page.getByLabel("City").fill("Bangalore");
  await page.getByLabel("Venue").fill("Online");
  await page.getByLabel("Event Date & Time").click();
  function futureDateValue() {
    const date = new Date();
    date.setDate(date.getDate() + 2); // future date

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
  }
  //await page.locator('[id="event-date-&-time"]').fill(futureDateValue()); //From the id attribute value");
  await page.getByLabel("Event Date & Time").fill(futureDateValue());
  await page.getByLabel("Price ($)").fill("100");
  await page.getByLabel("Total Seats").fill("500");

  await page.getByRole("button", { name: '+ Add Event' }).click();
  await expect(page.getByText("Event created")).toBeVisible();
  await page.getByRole("link", { name: 'Events' }).first().click();

  await page.locator("[data-testid='event-card']").first().waitFor(); //wait for the first event card to be visible on the page before performing any action on it. This is especially useful when we are waiting for some elements to be visible before performing any action on them. We can also use other actions like click, fill, etc. depending on our needs. This is especially useful when we are waiting for some elements to be visible before performing any action on them.
  const firstCard = page.locator("[data-testid='event-card']").first();
  console.log(await firstCard.isVisible());
  expect(await firstCard.isVisible()).toBeTruthy();
  console.log(eventName);
  const visbileItem = await page.locator("[data-testid='event-card']").filter({ hasText: eventName }).isVisible(); //From the text content of the element
  console.log(visbileItem);
  expect(visbileItem).toBeTruthy();
  const seatsBeforeBookingLocator = await page.locator("[data-testid='event-card']").filter({ hasText: eventName }).locator("span.text-xs.font-semibold.text-emerald-600").textContent(); //From the text content of the element
const seatsBeforeBooking = parseInt(seatsBeforeBookingLocator);
  console.log("seatsBeforeBooking: ", seatsBeforeBooking);

  await page.locator("[data-testid='event-card']").filter({ hasText: eventName }).locator("[data-testid='book-now-btn']").click(); //From the text content of the element

  // Incorrect 
  // expect(page.locator("#ticket-count")).textContent().hasText("1"); //From the id attribute value
  //await expect(page.locator("#ticket-count")).toContainText("1"); when extra spaces arr there
  await expect(page.locator("#ticket-count")).toHaveText("1");

  //Or const text = await page.locator("#ticket-count").textContent();
  //expect(text).toContain("1");

  await page.getByLabel("Full Name").fill("Sh V");
  await page.locator("#customer-email").fill("shv1@gmail.com");
  await page.getByPlaceholder("+91 98765 43210").fill("9876543210");
  await page.locator(".confirm-booking-btn").click();

  const bookingReference = await page.locator(".booking-ref").first();
  const bookingRef = (await bookingReference.innerText()).trim(); //.trim()removes:spaces from startspaces from endnewline (\n)tabs

  console.log("Booking Ref:", bookingRef);


  expect(bookingReference).toBeVisible(); //toBeVisible only used with locator and not with string value. We can also use other assertions like toBeTruthy, toBeFalsy, etc. depending on our needs. This is especially useful when we want to verify if the element is visible on the page or not.
   
  const eventTitle= await page.locator("h1").first().innerText(); //div h1.text-2xl
  console.log("Event Title: ", eventTitle);
  
  await page.getByRole("link", { name: "My Bookings" }).first().click();
  await page.getByRole("link", { name: "My Bookings" }).first().waitFor(); //waits till loads
  //await page.pause();
  // await page.locator("a[href='/bookings']").waitFor();
  //await page.locator("a[href='/bookings']").first().click(); //From the href attribute value
  /* Other ways to locate My Bookings link:
  page.getByText("My Bookings")
  page.locator("a[href='/bookings']")
  page.getByTestId("nav-bookings")
  page.locator("#nav-bookings")
  */
  //expect(await page.url()).toContain("/bookings"); await expect(page).toHaveURL(/.*\/bookings/);
  //await expect(page.url()).toHaveURL("https://eventhub.rahulshettyacademy.com/bookings");
  const BASE_URL = "https://eventhub.rahulshettyacademy.com";

  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await expect(page.locator("#booking-card").first()).toBeVisible(); //waits till loads
  const bookingCards = page.locator("#booking-card");
  const countBookingCard = await bookingCards.count();
  console.log("countBookingCard: ", countBookingCard);

  await expect(bookingCards.first()).toBeVisible();
  for (let i = 0; i < countBookingCard; i++) {
    //bookingCard.nth(i).locator(".booking-ref").toMatch(bookingRef); //to Match can't be used directly with locator
    const refText = await bookingCards
      .nth(i)
      .locator(".booking-ref")
      .innerText();

    if (refText.trim() === bookingRef) {
      //expect(refText.trim()).toMatch(bookingRef) toMatch() is mainly for:regex matchingpartial string matching
      await expect(bookingCards.nth(i)).toBeVisible();
      
      await expect(bookingCards.nth(i))
        .toContainText(eventTitle);

      break;
    }

  }
  await page.getByText("Events").first().click();
await page.getByText("Events").first().waitFor(); //waits till loads
  const  eventsCard = await page.locator("#event-card");
  //await eventsCard.first().waitFor();
 await  page.waitForLoadState("networkidle"); //waits till network is idle
  expect(eventsCard.first()).toBeVisible();
  
  await expect(eventsCard.filter({hasText: eventTitle})).toBeVisible();

const seatsAfterBookingLocator = await page.locator("[data-testid='event-card']").filter({ hasText: eventTitle }).locator("span.text-xs.font-semibold.text-emerald-600").textContent(); //From the text content of the element
const seatsAfterBooking = parseInt(seatsAfterBookingLocator); // without parseInt "499 seats available" === "500 seats available" - 1
console.log("seatsAfterBooking: ", seatsAfterBooking);
//expect(seatsAfterBooking === seatsBeforeBooking-1).toBeTruthy(); 
expect(seatsAfterBooking)
  .toBe(seatsBeforeBooking - 1); //preferred assertion
 //await page.pause();
})