"use client";
import React, { useState } from 'react';
import './Form.css'; // Import the CSS file

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    // dd4058ce-7e62-4d14-95e1-ec2e2aeef295 

    formData.append("access_key", "61396f2e-2d75-454e-a839-32b751eb1868");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message);
      }
    } catch (error) {
      console.error("Error submitting form", error);
      setResult("An error occurred. Please try again.");
    }
  };

  return (
    <div className="form-container" id="contact">
    <h2 style={{ fontSize: '2rem', textAlign: 'center', fontWeight: 'normal', color: 'white', margin:'5px' }}>
        Are You Ready to Shape the Future of Management?
    </h2>




      <form onSubmit={onSubmit} className="contact-form">
        <input type="text" name="name" required placeholder="Name" className="form-input" />
        <input type="text" name="phonenumber" required placeholder="PhoneNumber" className="form-input" />
        <input type="email" name="email" required placeholder="Email" className="form-input" />
        <input name="message" required placeholder="USN" className="form-input"></input>
        <button type="submit" className="form-button">Register Now !</button>
      </form>
      <span className="result-text">{result}</span>
    </div>
  );
}
