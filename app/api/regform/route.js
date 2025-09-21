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

    // Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // your gmail
        pass: process.env.EMAIL_PASS, // your app password (no spaces)
      },
    });

    // Email content
    const mailOptions = {
      from: `"Pathfinder Club" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Registration Confirmed - Fresher's Event 🎉",
      text: `Hello ${name},\n\nThanks for connecting with us! 🎊\nWe look forward to your participation in the Fresher's Event.\n\n📅 Date: X Date\n🕒 Time: Y Time\n\nSee you there!\n\n- Team Pathfinder`,
    };

    // Send email
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
