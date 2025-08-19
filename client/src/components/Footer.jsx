import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-8 mt-10">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Coding Platform. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
          <a href="#" className="hover:text-gray-300">Terms of Service</a>
          <a href="#" className="hover:text-gray-300">Contact Us</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
