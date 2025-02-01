import React from "react";
import Navbar from "./Navbar";
import { AluminiMembers } from "./Alumini";

const AluminiSection = () => {
  return (
    <>
      <div className="relative bg-[#1a232f] min-h-screen overflow-hidden">
        <Navbar showHomeOnly={true} /> {/* Only shows the Home button */}

        {/* Background gradients */}
        <div className="gradient-04"></div>

        {/* Team content */}
        <div className="relative z-10 py-10 px-5 text-center">
          <h2 className="lg:text-7xl font-bold text-neutral-50 sm:text-[46px]">Our Charms !</h2>

          {/* Team members grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mt-10 auto-rows-fr">
            {AluminiMembers.map((member, index) => (
              <div
                key={index}
                className="bg-[#1f2a37] overflow-hidden rounded-lg shadow-lg p-5 transform transition-transform hover:scale-105"
              >
                <div className="w-48 h-48 mx-auto overflow-hidden rounded-3xl border-4 border-gray-300">
                  <img
                    src={member.profilePic}
                    alt={`${member.name}'s profile`}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-purple-100 mt-3">{member.name}</h3>
                <h2 className="text-md font-medium text-gray-300">{member.academicYear}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="gradient-03"></div>
    </>
  );
};

export default AluminiSection;
