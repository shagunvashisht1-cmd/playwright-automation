import {expect,test, request} from "@playwright/test";
const BASE_URL = "https://eventhub.rahulshettyacademy.com";
const  API_URL = "https://api.eventhub.rahulshettyacademy.com/api";
const api_url="https://api.eventhub.rahulshettyacademy.com/api/auth/login";
const api_events="https://api.eventhub.rahulshettyacademy.com/api/events";


const GMAIL_USER={
    email: "sh.v1@gmail.com",
    password: "123456789@sV"
};
async function loginAs(page, GMAIL_USER){
await page.goto(BASE_URL);
await page.getByLabel("Email").fill(GMAIL_USER.email);
await page.getByPlaceholder("••••••").fill(GMAIL_USER.password);
await page.getByRole("button",{name: 'Sign In'}).click();
await page.waitForLoadState("networkidle");

}

test("Login as Yahoo user",async ({request, page})=>{
console.log(BASE_URL+ "/api");
console.log(API_URL +"/auth/login");
const yahooUser={
    email: "ss@yahoo.com",
    password: "123456_A"
}
 //Pass { email, password } as the request body under the data key
const res=await request.post(api_url,{
    data:
    {
  email: yahooUser.email,
    password: yahooUser.password
    }
}
);
console.log(await res.status());
console.log(await res.text());
// Assert the response is OK (loginRes.ok() is truthy)
 expect(res.ok()).toBeTruthy();

 //Parse the JSON response and extract token 

const jsonResponse=await res.json();
const resToken=jsonResponse.token; //token is the key in the response which we get from the API call which we can use in our tests to verify the login functionality. This is especially useful when we want to verify the login functionality using API calls in our tests. We can also use other values from the response of the API call depending on our needs. This is especially useful when we want to verify the login functionality using API calls in our tests.
console.log(resToken);


//Step 2 — Fetch events via API to get a valid event ID

const resGet=await request.get(api_events,{
    headers: {
        Authorization: `Bearer ${resToken}`
    }
}
);
console.log( await  resGet.status());
console.log( await resGet.text());
expect(resGet.ok()).toBeTruthy();
const resGetJson=await resGet.json();
const eventID= await resGetJson.data[0].id; //get the event ID from the response of the get events API call 
console.log(eventID);

//Step 3 — Create a booking via API as Yahoo user
const bookingPayload={ 
  eventId : eventID,
  customerName: "Savi Sharma",
  customerEmail: yahooUser.email,
  customerPhone: "9876544210",
  quantity: 1
}
const bookingRequest=await request.post(`${API_URL}/bookings`, {
    data: bookingPayload,
    headers:{
        Authorization: `Bearer ${resToken}`
    },
}
);
expect(bookingRequest.ok()).toBeTruthy();
const bookingReqJson=await bookingRequest.json();
const yahooBookingId=bookingReqJson.data.id;
console.log(yahooBookingId);

//Step 4 — Login as Gmail user via browser UI
await loginAs(page, GMAIL_USER);

//Step 5 — Navigate to Yahoo's booking URL as Gmail user
console.log(`${BASE_URL}/bookings/${yahooBookingId}`);
await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`);
await page.waitForLoadState("networkidle");


//Step 6 — Validate Access Denied
await expect(page.getByText("Access Denied")).toBeVisible();
await expect(page.getByText("You are not authorized to view this booking.")).toBeVisible();
await page.pause();
})

/* Solution
import { test, expect } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL  = 'https://api.eventhub.rahulshettyacademy.com/api';

const YAHOO_USER = { email: 'Use your own credentials - 1', password: '' };
const GMAIL_USER = { email: 'Use your own credentials - 2', password: '' };

async function loginAs(page, user) {
  await page.goto(`${BASE_URL}/login`);
  await page.getByPlaceholder('you@email.com').fill(user.email);
  await page.getByLabel('Password').fill(user.password);
  await page.locator('#login-btn').click();
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

test('gmail user sees Access Denied when viewing yahoo user booking', async ({ page, request }) => {

  // ── Step 1: Login as Yahoo user via API and get token ─────────────────────
  const loginRes = await request.post(`${API_URL}/auth/login`, {
    data: { email: YAHOO_USER.email, password: YAHOO_USER.password },
  });
  expect(loginRes.ok()).toBeTruthy();
  const { token } = await loginRes.json();

  // ── Step 2: Fetch events via API to get a valid event ID ──────────────────
  const eventsRes = await request.get(`${API_URL}/events`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(eventsRes.ok()).toBeTruthy();
  const eventsData = await eventsRes.json();
  const eventId = eventsData.data[0].id;

  // ── Step 3: Create a booking via API as Yahoo user ────────────────────────
  const bookingRes = await request.post(`${API_URL}/bookings`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      eventId,
      customerName:  'Yahoo User',
      customerEmail: YAHOO_USER.email,
      customerPhone: '9999999999',
      quantity:      1,
    },
  });
  expect(bookingRes.ok()).toBeTruthy();
  const yahooBookingId = (await bookingRes.json()).data.id;

  console.log(`Yahoo booking created via API. ID: ${yahooBookingId}`);

  // ── Step 4: Login as Gmail user via UI ────────────────────────────────────
  await loginAs(page, GMAIL_USER);

  // ── Step 5: Navigate directly to Yahoo's booking URL as Gmail user ────────
  await page.goto(`${BASE_URL}/bookings/${yahooBookingId}`, { waitUntil: 'networkidle' });

  // ── Step 6: Validate Access Denied ───────────────────────────────────────
  await expect(page.getByText('Access Denied')).toBeVisible();
  await expect(page.getByText('You are not authorized to view this booking')).toBeVisible();
});
*/