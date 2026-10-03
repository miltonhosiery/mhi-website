import { NextResponse } from "next/server";

// This route currently just validates and logs the enquiry.
// Before launch, wire it up to one of:
//  - An email service (Resend, SendGrid, Postmark) to email the team
//  - A CRM / spreadsheet (Airtable, Google Sheets, HubSpot) via their API
// See README.md for suggested next steps.

export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, company, email, phone, brand, message } = data || {};

  if (!name || !company || !email || !phone || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // TODO: replace this with a real integration (email/CRM).
  console.log("New wholesale enquiry:", {
    name,
    company,
    email,
    phone,
    brand,
    message,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
