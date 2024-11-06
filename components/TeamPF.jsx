import React from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import Navbar from './Navbar';
import { teamMembers } from './Team';

const TeamSection = () => {
  return (
    <>
     

      <div className="relative bg-[#1a232f] min-h-screen overflow-hidden">
      <Navbar showHomeOnly={true} /> {/* Only shows the Home button */}
        {/* Background gradients */}
        <div className="gradient-04"></div>

        {/* Team content */}
        <div className="relative z-10 py-10 px-5 text-center">
          {/* Logo and heading */}
          
          <h2 className="lg:text-7xl font-bold text-neutral-50 sm:text-[46px]">Meet Our Team</h2>

          {/* Team members grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-5xl mx-auto mt-10">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-transparent overflow:hidden rounded-lg shadow-lg p-5 transform transition-transform hover:scale-105"
              >
                <img
                  src={member.profilePic}
                  alt={`${member.name}'s profile`}
                  className="w-52 h-52 rounded-3xl object-cover mx-auto border-4 border-gray-300 mb-4"
                />
                <h3 className="text-lg font-semibold text-purple-100">{member.name}</h3>
                <div className="flex justify-center space-x-4 mt-4">
                  <a
                    href={member.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-700 transition-colors"
                  >
                    <FaInstagram size={24} />
                  </a>
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FaLinkedin size={24} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="gradient-03"></div>
    </>
  );
};

export default TeamSection;
