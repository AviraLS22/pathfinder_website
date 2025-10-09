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
      subject: "Pathfinder Recruitments 2025 – Your Journey Starts Here! 🚀",
text: `Hello ${name},\n\n

The wait is over! 🎉\n
*Pathfinder* is back — and this time, it’s your chance to become a part of the legacy! 💫\n\n

Here’s what’s coming your way:\n\n
📅 14th & 15th October – **Recruitments 2025** ✨\n
Show your spark, your ideas, and your passion to lead, create, and inspire!\n\n

📍 Venue: GJCB, SIT\n
🕒 Time: 5:15 PM\n


This is more than just a recruitment — it’s the start of your *Pathfinder journey*, where creativity meets leadership and energy meets opportunity! 🔥\n\n

Don’t miss out — step up, stand out, and make your mark with *Pathfinder*! 💪\n\n

See you at the Recruitments 2025! 🚀\n\n

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
