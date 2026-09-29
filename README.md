# Majhe App — Home Cleaning Booking Flow

A mini "Book a Local Service" module built for the Majhe App Junior Developer take-home
assignment, scoped to the **Home Cleaning** category.

## Stack & why

- **React + Vite** — fast dev server, minimal config, scope go entirely into the UI/flow rather than build tooling.
- **React Router** — for the multi-screen flow (Listing → Detail → Booking → OTP → Confirmation → My Bookings).
- **React Context + localStorage** — sufficient for session-persisted booking data without
  the overhead of a real backend, per the assignment's "local state is fine" note.

## Setup & run

```bash
npm install
npm run dev
```
Then open the local URL Vite prints (usually http://localhost:5173).

## Flow

1. **Service Listing** — browse Home Cleaning providers with search and sort (rating/price).
2. **Service Detail** — provider info, pricing, available slots, "Book Now".
3. **Booking Form** — date, time slot, address, phone — all validated with inline errors.
4. **OTP Verification** — mock OTP is `1234`. Wrong code shows an error and lets you retry.
5. **Confirmation** — booking summary.
6. **My Bookings** (bonus) — lists bookings with status Pending → Confirmed → Completed;
   "Mark next" simulates status progression.

## Assumptions

- OTP is hard-coded (`1234`); no real SMS provider is integrated.
- One service category (Home Cleaning) with 4 mock providers; no payment step.
- Booking data lives in `localStorage`, not a real database.
- Phone validation assumes Indian 10-digit mobile numbers starting 6-9.

## What I'd improve with more time

- Real backend (Node/Express or Laravel) with a proper bookings table instead of localStorage.
- Real OTP delivery via an SMS API (e.g. Twilio/MSG91).
- Multiple service categories, not just Home Cleaning.
- Payment integration and cancellation/rescheduling flows.
- Unit tests for the validation logic and booking status transitions.
