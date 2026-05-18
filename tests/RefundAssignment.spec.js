const {test, expect}= require("@playwright/test");

const BASE_URL= "https://eventhub.rahulshettyacademy.com";

//reusable code for login
/* test.beforeEach(async ({page})=>{
await page.goto(BASE_URL);
await page.getByPlaceholder("you@email.com").fill("sh.v1@gmail.com");
await page.getByPlaceholder("••••••").fill("123456789@sV");
await page.getByRole("button",{name: 'Sign In'}).click();
const expectedButton = page.getByText("Browse Events →");
await expect(expectedButton).toBeVisible();
}) */
async function loginAndGoToBooking(page){
    await page.goto(BASE_URL);
await page.getByPlaceholder("you@email.com").fill("sh.v1@gmail.com");
await page.getByPlaceholder("••••••").fill("123456789@sV");
await page.getByRole("button",{name: 'Sign In'}).click();
const expectedButton = page.getByText("Browse Events →");
await expect(expectedButton).toBeVisible();
}

//Test 1
test("Single ticket booking is eligible for refund", async ({page})=>{
//Step 1 — Login
await loginAndGoToBooking(page);
console.log("Booking with 1 ticket test case");

//Step 2 Book first event with 1 ticket (default)
await page.getByRole("link",{name:"Events"}).first().click();
const eventCard=await page.locator("[data-testid='event-card']").first();
await eventCard.waitFor();
await eventCard.locator("[data-testid='book-now-btn']").click();
await page.waitForLoadState("networkidle");
console.log("Clicked on book now button");

await page.getByLabel("Full Name").fill("Test User SV" + Date.now());
await page.getByLabel("Email").fill("sh.v1@gmail.com");
await page.getByLabel("Phone").fill("1234567890");
await page.locator(".confirm-booking-btn").click();
await expect(page.getByText("Booking Confirmed!")).toBeVisible();

//Step 3 — Navigate to booking detail
await page.getByRole("link",{name:"My Bookings"}).first().click();
await page.waitForLoadState("networkidle");
await page.getByText("View Details").first().click();
expect(page.url()).toContain("/bookings");
await page.waitForLoadState("networkidle");
await expect(page.getByRole("heading",{name:"Booking Information"})).toBeVisible();

//Step 4 — Validate booking ref
const bookingRef=await page.locator("main .font-bold").first().textContent();
console.log(bookingRef);
const eventTitle=await page.locator("h1").textContent();
console.log(eventTitle); 
expect(bookingRef[0]).toBe(eventTitle[0]); //.toEqual //.toMatch ===
 
//Step 5 — Check refund eligibility
await page.getByRole("button", {name:"Check eligibility for refund?"}).click();
 await expect(page.locator("#refund-spinner")).toBeVisible();
 await page.waitForTimeout(6000); //wait for 6 seconds to get the response from the server
  await expect(page.locator("#refund-spinner")).toBeHidden(); //.not.toBeVisible()


//Step 6 — Validate result
 const resultelement=await page.locator("#refund-result");
await expect(resultelement).toBeVisible();
await expect(resultelement).toContainText("Eligible for refund "); //From the text content of the element
await expect(resultelement).toContainText("Single-ticket bookings qualify for a full refund"); //From the text content of the element with regex
await page.pause();

})

//Test 2
test.only("Booking with 3 tickets", async ({page})=>{
    //Step 1 — Login
await loginAndGoToBooking(page);
console.log("Booking with 1 ticket test case");

//Step 2 Book first event with 1 ticket (default)
await page.getByRole("link",{name:"Events"}).first().click();
const eventCard=await page.locator("[data-testid='event-card']").first();
await eventCard.waitFor();
await eventCard.locator("[data-testid='book-now-btn']").click();
await page.waitForLoadState("networkidle");
console.log("Clicked on book now button");

//Change the number of tickets to 3
await page.locator("button:has-text('+')").click(); //From the text content of the button
await page.locator("button:has-text('+')").click();
await page.getByLabel("Full Name").fill("Test User SV" + Date.now());
await page.getByLabel("Email").fill("sh.v1@gmail.com");
await page.getByLabel("Phone").fill("1234567890");
await page.locator(".confirm-booking-btn").click();
await expect(page.getByText("Booking Confirmed!")).toBeVisible();
//Step 3 — Navigate to booking detail
await page.getByRole("link",{name:"My Bookings"}).first().click();
await page.waitForLoadState("networkidle");
await page.getByText("View Details").first().click();
expect(page.url()).toContain("/bookings");
await page.waitForLoadState("networkidle");
await expect(page.getByRole("heading",{name:"Booking Information"})).toBeVisible();

//Step 4 — Validate booking ref
const bookingRef=await page.locator("main .font-bold").first().textContent();
console.log(bookingRef);
const eventTitle=await page.locator("h1").textContent();
console.log(eventTitle); 
expect(bookingRef[0]).toBe(eventTitle[0]); //.toEqual //.toMatch ===
 
//Step 5 — Check refund eligibility
await page.getByRole("button", {name:"Check eligibility for refund?"}).click();
//Step 6 — Validate result
 const resultelement=await page.locator("#refund-result");
await expect(resultelement).toBeVisible();
await expect(resultelement).toContainText("Not eligible for refund");
await expect(resultelement).toContainText("Group bookings (3 tickets) are non-refundable");

})

/* Solution

import { test, expect } from '@playwright/test';

const BASE_URL   = 'https://eventhub.rahulshettyacademy.com';

// Change these to match a registered account in your local sandbox
const GMAIL_USER = { email: 'rahulshetty1@gmail.com', password: 'Magiclife1!' };

async function loginAndGoToBooking(page) {
  await page.goto(`${BASE_URL}/login`);
  await page.getByLabel('Email').fill(GMAIL_USER.email);
  await page.getByPlaceholder('••••••').fill(GMAIL_USER.password);
  await page.locator('#login-btn').click();
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}



// ── Test 1: 1 ticket → eligible ───────────────────────────────────────────────
test('refund eligible for single ticket booking', async ({ page }) => {
  await loginAndGoToBooking(page);

  // Book event with 1 ticket via UI
  await page.goto(`${BASE_URL}/events`);
  await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();


  await page.getByLabel('Full Name').fill('Test User');
  await page.locator('#customer-email').fill(GMAIL_USER.email);
  await page.getByPlaceholder('+91 98765 43210').fill('9999999999');
  await page.locator('.confirm-booking-btn').click();

  // Navigate to booking detail
  await page.getByRole('link', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByRole('link', { name: 'View Details' }).first().click();
  await expect(page.getByText('Booking Information')).toBeVisible();

  // Validate booking ref first letter matches event name first letter
  const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
  const eventTitle = await page.locator('h1').innerText();
  expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

  await page.locator('#check-refund-btn').click();

  // Spinner must appear immediately
  await expect(page.locator('#refund-spinner')).toBeVisible();

  // Wait for spinner to disappear after 4s
  await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

  // Validate eligible message
  const result = page.locator('#refund-result');
  await expect(result).toBeVisible();
  await expect(result).toContainText('Eligible for refund');
  await expect(result).toContainText('Single-ticket bookings qualify for a full refund');
});

// ── Test 2: 3 tickets → not eligible ─────────────────────────────────────────
test('refund not eligible for group ticket booking', async ({ page }) => {
  await loginAndGoToBooking(page);

  // Book event with 3 tickets via UI
  await page.goto(`${BASE_URL}/events`);
  await page.getByTestId('event-card').first().getByTestId('book-now-btn').click();


  // Increase quantity to 3
  await page.locator('button:has-text("+")').click();
  await page.locator('button:has-text("+")').click();

  await page.getByLabel('Full Name').fill('Test User');
  await page.locator('#customer-email').fill(GMAIL_USER.email);
  await page.getByPlaceholder('+91 98765 43210').fill('9999999999');
  await page.locator('.confirm-booking-btn').click();

  // Navigate to booking detail
  await page.getByRole('link', { name: 'View My Bookings' }).click();
  await expect(page).toHaveURL(`${BASE_URL}/bookings`);
  await page.getByRole('link', { name: 'View Details' }).first().click();
  await expect(page.getByText('Booking Information')).toBeVisible();

  // Validate booking ref first letter matches event name first letter
  const bookingRef = await page.locator('span.font-mono.font-bold').innerText();
  const eventTitle = await page.locator('h1').innerText();
  expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));

  await page.locator('#check-refund-btn').click();

  // Spinner must appear immediately
  await expect(page.locator('#refund-spinner')).toBeVisible();

  // Wait for spinner to disappear after 4s
  await expect(page.locator('#refund-spinner')).not.toBeVisible({ timeout: 6000 });

  // Validate ineligible message
  const result = page.locator('#refund-result');
  await expect(result).toBeVisible();
  await expect(result).toContainText('Not eligible for refund');
  await expect(result).toContainText('Group bookings (3 tickets) are non-refundable');
}); */
