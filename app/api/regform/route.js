import { NextResponse } from 'next/server';
import connectMongo from "../../../dbConfig/dbConfig"; // Ensure path is correct
import Contact from "../../../models/userModel"; // Ensure path is correct

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectMongo();
    console.log("✅ Connected to MongoDB");

    // Parse the request body
    const body = await request.json();
    const { name, phonenumber, email, USN } = body;

    // Validate input
    if (!name || !phonenumber || !email || !USN) {
      console.log("❌ Validation failed: Missing fields");
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Check if the email or USN is already registered
    const existingContact = await Contact.findOne({
      $or: [{ email }, { USN }],
    });

    if (existingContact) {
      console.log("❌ Email or USN already exists");
      return NextResponse.json(
        { success: false, message: "Email or USN already registered." },
        { status: 409 }
      );
    }

    // Save new user
    const newContact = new Contact({ name, phonenumber, email, USN });
    await newContact.save();
    console.log("✅ User registered:", newContact);

    return NextResponse.json(
      { success: true, message: "User registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error saving form data:", error);

    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
