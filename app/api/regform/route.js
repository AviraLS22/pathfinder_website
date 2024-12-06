import { NextResponse } from 'next/server';
import connectMongo from "../../../dbConfig/dbConfig"; // Ensure the path is correct
import Contact from "../../../models/userModel"; // Ensure the path is correct

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectMongo();

    // Parse the request body
    const body = await request.json();
    const { name, phonenumber, email, USN } = body;

    // Validate the request body
    if (!name || !phonenumber || !email || !USN) {
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
      return NextResponse.json(
        { success: false, message: "Email or USN already registered." },
        { status: 409 }
      );
    }

    // Create and save a new contact
    const newContact = new Contact({ name, phonenumber, email, USN });
    await newContact.save();

    return NextResponse.json(
      { success: true, message: "Form submitted successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving form data:", error);

    // Check if the error is related to validation
    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, message: "Invalid data format." },
        { status: 400 }
      );
    }

    // General server error
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
