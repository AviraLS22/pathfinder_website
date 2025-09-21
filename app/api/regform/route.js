import { NextResponse } from "next/server";
import connectMongo from "../../../dbConfig/dbConfig";
import Contact from "../../../models/userModel";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    await connectMongo();
    console.log("✅ Connected to MongoDB");

    const body = await request.json();
    const { name, phonenumber, email, USN } = body;

    if (!name || !phonenumber || !email || !USN) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const existingContact = await Contact.findOne({
      $or: [{ email }, { USN }],
    });

    if (existingContact) {
      return NextResponse.json(
        { success: false, message: "Email or USN already registered." },
        { status: 409 }
      );
    }

    const newContact = new Contact({ name, phonenumber, email, USN });
    await newContact.save();
    console.log("✅ User registered:", newContact);

    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
      },
    });

    
    const mailOptions = {
  from: `"Aviral Sharma" <${process.env.EMAIL_USER}>`,
  to: email,
  subject: "Registration Confirmed - Fresher's Event 🎉",
  text: `Hello ${name},\n\n

The wait is over! 🚀\n
Get ready for an unforgettable Fresher's Event, packed with energy, ideas, and new connections.\n\n

📅 Date: soon Date\n
🕒 Time: soon Time\n\n

Can’t wait to see you there!\n\n

- Team Pathfinder`,
};


   
    try {
      await transporter.sendMail(mailOptions);
      console.log("✅ Email sent to:", email);
    } catch (mailErr) {
      console.error("❌ Failed to send email:", mailErr);
    }

    return NextResponse.json(
      { success: true, message: "Registered and confirmation email sent." },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error in API:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
