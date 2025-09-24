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
      subject: "PRARAMBH 2025 – The Journey Begins! 🚀",
  text: `Hello ${name},\n\n

The wait is over! 🎉\n
PRARAMBH 2025 is here – the signature event by *Pathfinder*, the club that brings the best of energy, fun, and unforgettable experiences to SIT!\n\n

Here’s what’s coming your way:\n\n
📅 9th October – **Carpe Diem** ✨\n
An evening full of fun, laughter, and exciting games!\n\n
📅 10th October – **Manthan** 🗝️\n
A thrilling treasure hunt where wit and teamwork take the spotlight!\n\n

📍 Venue: Birla Auditorium, SIT\n
🕒 Time: 5:15 PM\n
🚍 Bus facility arranged for girls' hostel students\n\n

This is more than just an event — it’s the start of your journey at SIT, powered by the most dynamic club on campus: *Pathfinder*! 🔥\n\n

Don’t miss out — be there, be loud, and be part of something extraordinary!\n\n

See you at PRARAMBH 2025! 🚀\n\n

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
