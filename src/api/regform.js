import connectMongo from "../../../dbConfig/dbConfig";
import Contact from "../../../models/userModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectMongo();

      const { name, phonenumber, email, USN } = req.body;

      
      const newContact = new Contact({
        name,
        phonenumber,
        email,
        USN,
      });

      await newContact.save();

      return res.status(200).json({
        success: true,
        message: "Form submitted successfully.",
      });
    } catch (error) {
      console.error("Error saving form data:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error.",
      });
    }
  } else {
    return res.status(405).json({
      success: false,
      message: "Method not allowed.",
    });
  }
}
