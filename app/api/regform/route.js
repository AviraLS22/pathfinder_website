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
  subject: "Registration Confirmed - PRARAMBH 2025 🎉",
  text: `Hello ${name},\n\n

The wait is over! 🚀\n
PRARAMBH 2025 is here to light up your evenings with energy, excitement, and unforgettable memories.\n\n

📅 Dates: 6 & 7 October 2025\n
🕒 Time: 5:15 PM\n
📍 Venue: Birla Auditorium, SIT\n\n

✨ Special Note: Bus facilities are arranged for girls' hostel students.\n\n

This is the event where new journeys begin, friendships are made, and moments turn into memories. Don’t miss it — you’ll want to be part of the vibe!\n

See you there with full energy! 🔥\n\n

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
