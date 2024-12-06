"use client";
import React, { useState } from 'react';
import './Form.css'; // Import the CSS file

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
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

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.error("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setResult("An error occurred. Please try again.");
    }
  };

  return (
    <div className="form-container" id="contact">
      <h2
        style={{
          fontSize: '2rem',
          textAlign: 'center',
          fontWeight: 'normal',
          color: 'white',
          margin: '5px',
        }}
      >
        Are You Ready to Shape the Future of Management?
      </h2>

      <form onSubmit={onSubmit} className="contact-form">
        <input type="text" name="name" required placeholder="Name" className="form-input" />
        <input type="text" name="phonenumber" required placeholder="PhoneNumber" className="form-input" />
        <input type="email" name="email" required placeholder="Email" className="form-input" />
        <input name="USN" required placeholder="USN" className="form-input"></input>
        <button type="submit" className="form-button">Register Now !</button>
      </form>
      <span className="result-text">{result}</span>
    </div>
  );
}
