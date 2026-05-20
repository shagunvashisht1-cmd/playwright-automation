import { test, expect } from "@playwright/test";
const BASE_URL = "https://eventhub.rahulshettyacademy.com";

//- SIX_EVENTS_RESPONSE — a JSON object with data array of 6 event objects and pagination (total: 6)
const SIX_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
    { id: 6, title: 'AI & ML Expo', category: 'Conference', eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};

//- FOUR_EVENTS_RESPONSE — same shape but only 4 events in data (total: 4)

const FOUR_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};

async function loginAndGoToEvents(page) {
  await page.goto(BASE_URL);
  await page.getByPlaceholder("you@email.com").fill("sh.v1@gmail.com");
  await page.getByPlaceholder("••••••").fill("123456789@sV");
  await page.getByRole("button", { name: 'Sign In' }).click();
  await page.waitForNavigation();
}

test(" Banner IS visible when 6 events are returned", async ({ page }) => {

  //Step 1 — Set up the API mock
  await page.route("**/api/events**", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(SIX_EVENTS_RESPONSE),
    });
  });



  // Step 2 - Login and navigate
  await loginAndGoToEvents(page);

  // navigate AFTER mock setup
  await page.goto(`${BASE_URL}/events`);
  // await page.getByRole("link", { name: "Events" }).first().click();
  await page.waitForLoadState("networkidle"); //wait for all network calls to finish, including the mocked one
  //Step 3 — Verify cards loaded from mock
  const eventCards = page.getByTestId("event-card");
  await expect(eventCards.first()).toBeVisible();
  await expect(eventCards).toHaveCount(6);

  //Step 4 — Verify banner is visible
  await page.waitForLoadState("networkidle");
  const banner = page.getByText(/sandbox holds up to/); //getByText() accepts a real JavaScript regex, not a string. ".*/sandbox holds up to/i" is string})
  await expect(banner).toBeVisible();
  await expect(banner).toContainText("9 bookings"); //toContainText() already checks for partial text.

  await page.pause();

}
)

test.only("Banner is NOT visible when 4 events are returned", async ({ page }) => {
  //Step 1 — Set up the API mock
  await page.route("**/api/events**", async route => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(FOUR_EVENTS_RESPONSE),
    });
  });

  // Step 2 - Login and navigate
  await loginAndGoToEvents(page);
  // navigate AFTER mock setup
  await page.goto(`${BASE_URL}/events`);
  // await page.getByRole("link", { name: "Events" }).first().click();
  await page.waitForLoadState("networkidle");
  //Step 3 — Verify cards loaded from mock
  const eventCards = page.getByTestId("event-card");
  await expect(eventCards.first()).toBeVisible();
  await expect(eventCards).toHaveCount(4);

  //Step 4 — Verify banner is hidden
  await page.waitForLoadState("networkidle");
  const banner = page.getByText(/sandbox holds up to/); //getByText() accepts a real JavaScript regex, not a string. ".*/sandbox holds up to/i" is string})
  // await expect(banner).not.toBeVisible();
  await expect(banner).toBeHidden(); //toBeHidden() checks for both visibility and presence in the DOM. It will pass if the element is either not visible or not present in the DOM, making it a more comprehensive assertion for cases where an element should not be displayed at all.
})
