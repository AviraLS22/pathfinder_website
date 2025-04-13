"use client";
import React, { useState } from "react";
import "./Form.css";

export default function Contact() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);

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
        Register Now for getting notified on the next event🔥
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


      {/* <button
        onClick={() => setShowModal(true)}
        className="rules-button"
      >
       Important Info Before You Sign Up
      </button>
 */}

      {/* {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="close-button" onClick={() => setShowModal(false)}>✖</button>
            <h4 style={{ textAlign: "center", marginBottom: "10px" }}>
              📝 Please read before registering:
            </h4>

            <div className="rules-card max-w-md w-full bg-white rounded-2xl shadow-lg p-6 space-y-4 mx-auto">


              <div className="space-y-3 text-gray-700 text-sm sm:text-base">
                <div className="flex items-start">
                  <span className="text-blue-600 mt-1">🕕</span>
                  <p className="ml-2">
                    <strong>Timing:</strong> Marathon/Walkathon starts at <strong>6:00 AM</strong> on <strong>Sunday, 13th April</strong>.
                  </p>
                </div>

                <div className="flex items-start">
                  <span className="text-blue-600 mt-1">👦</span>
                  <p className="ml-2">
                    <strong>Boys’ Starting Point:</strong> SIT AD Block
                  </p>
                </div>

                <div className="flex items-start">
                  <span className="text-pink-600 mt-1">👧</span>
                  <p className="ml-2">
                    <strong>Girls’ Starting Point:</strong> Siddaganga Oil Refinery
                  </p>
                </div>

                <div className="flex items-start">
                  <span className="text-green-600 mt-1">🚶</span>
                  <p className="ml-2">
                    <strong>Walkathon Starting Point:</strong> SIT Front Gate
                  </p>
                </div>

                <div className="flex items-start">
                  <span className="text-yellow-600 mt-1">🏁</span>
                  <p className="ml-2">
                    <strong>All events end at:</strong> Siddaganga Mutt
                  </p>
                </div>

                <div className="flex items-start">
                  <span className="text-purple-600 mt-1">📱</span>
                  <p className="ml-2">
                    Mobile phones are <strong>mandatory</strong> for all participants.
                  </p>
                </div>

                <div className="flex items-start">
                  <span className="text-red-600 mt-1">🚫</span>
                  <p className="ml-2">
                    <strong>Note:</strong> Walkathon is <strong>not open to students</strong>; only for adults.
                  </p>
                </div>

               
              </div>
            </div>


          </div>
        </div>
      )} */}
    </div>
  );
}
