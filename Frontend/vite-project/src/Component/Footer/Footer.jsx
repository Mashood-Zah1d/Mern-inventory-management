import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <footer className="bg-white border-t mt-10">
      <div className="container mx-auto py-6 text-center">
        <p className="mb-3 text-gray-700 font-semibold">
          Followed & Managed by <span className="text-blue-600">Cartinix</span>
        </p>

        <div className="flex justify-center space-x-6 mb-3 text-gray-600">
          <i className="fab fa-facebook-f text-blue-600 text-xl hover:scale-125 transition-transform cursor-pointer"></i>
          <i className="fab fa-twitter text-blue-400 text-xl hover:scale-125 transition-transform cursor-pointer"></i>
          <i className="fab fa-instagram text-pink-500 text-xl hover:scale-125 transition-transform cursor-pointer"></i>
          <i className="fab fa-linkedin-in text-blue-700 text-xl hover:scale-125 transition-transform cursor-pointer"></i>
        </div>

        <small className="text-gray-500 block">&copy; 2025 Cartinix. All rights reserved.</small>
      </div>
    </footer>
  );
}

export default Footer;
