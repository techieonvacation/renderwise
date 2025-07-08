import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";
import { sendContactNotification } from "@/app/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Get the referrer URL
    const sourceUrl = request.headers.get("referer") || "Direct Access";

    const client = await clientPromise;
    const db = client.db("eleservsoftech");

    const contact = {
      ...body,
      sourceUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to database
    const result = await db.collection("getintouch").insertOne(contact);

    // Send email notification
    const emailSent = await sendContactNotification({
      ...body,
      sourceUrl,
    });

    return NextResponse.json(
      {
        message: "Contact request submitted successfully",
        contactId: result.insertedId,
        emailSent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { message: "Error submitting contact request" },
      { status: 500 }
    );
  }
}
