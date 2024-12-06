import { NextResponse } from 'next/server';
import connectMongo from "../../../dbConfig/dbConfig";
import Contact from "/models/userModel";

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Parse request body
    const body = await request.json();
    const { name, phonenumber, email, USN } = body;

    // Validate request body
    if (!name || !phonenumber || !email || !USN) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // Check for existing entry
    const existingContact = await Contact.findOne({ 
      $or: [{ email }, { USN }] 
    });

    if (existingContact) {
      return NextResponse.json(
        { success: false, message: "Email or USN already registered." },
        { status: 409 }
      );
    }

    // Create a new Contact document
    const newContact = new Contact({
      name,
      phonenumber,
      email,
      USN,
    });

    // Save to the database
    await newContact.save();

    // Respond with success
    return NextResponse.json(
      { success: true, message: "Form submitted successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving form data:", error);

    // Handle specific error types
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, message: "Invalid data format." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}