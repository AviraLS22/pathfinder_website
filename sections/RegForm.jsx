"use client";
import React, { useState } from "react";
import "./Form.css";

export default function Contact() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending....");

    const formData = new FormData(event.target);
    const formDetails = {
      name: formData.get("name"),
      phonenumber: formData.get("phonenumber"),
      email: formData.get("email"),
      USN: formData.get("USN"),
    };

    try {
      const response = await fetch("/api/regform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDetails),
      });

      const responseText = await response.text();
      console.log("Raw response from server:", responseText);

      // Parse JSON if response is valid
      try {
        const data = JSON.parse(responseText);
        if (response.ok) {
          setResult(data.message || "Form Submitted Successfully");
          event.target.reset();
        } else {
          setResult(data.message || "Submission failed");
        }
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError);
        setResult("Invalid server response");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResult("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container" id="contact">
      <h2 className="form-title">
        Are You Ready to Shape the Future of Management?
      </h2>
      <form onSubmit={onSubmit} className="contact-form">
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          className="form-input"
        />
        <input
          type="tel"
          name="phonenumber"
          required
          placeholder="Phone Number"
          className="form-input"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="form-input"
        />
        <input
          type="text"
          name="USN"
          required
          placeholder="USN"
          className="form-input"
        />
        <button
          type="submit"
          className="form-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Register Now!"}
        </button>
      </form>
      {result && <span className="result-text">{result}</span>}
    </div>
  );
}
