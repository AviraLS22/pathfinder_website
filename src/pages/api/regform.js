import connectMongo from "../../../dbConfig/dbConfig";
import Contact from "../../../models/userModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Connect to MongoDB
      await connectMongo();

      // Parse request body
      const { name, phonenumber, email, USN } = req.body;

      // Validate request body
      if (!name || !phonenumber || !email || !USN) {
        return res.status(400).json({
          success: false,
          message: "All fields are required.",
        });
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
      return res.status(200).json({
        success: true,
        message: "Form submitted successfully.",
      });
    } catch (error) {
      // Log the error
      console.error("Error saving form data:", error);

      // Respond with an error
      return res.status(500).json({
        success: false,
        message: "Internal server error. Please try again later.",
      });
    }
  } else {
    // Respond with a 405 Method Not Allowed for unsupported methods
    return res.status(405).json({
      success: false,
      message: "Method not allowed. Use POST method.",
    });
  }
}
