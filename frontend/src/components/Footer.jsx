import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          {/* Logo / Title */}
          <h1 className="text-lg font-semibold text-gray-800">Mini ATS</h1>

          {/* Navigation Links */}
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
            >
              Contact
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-6 border-t border-gray-200 pt-4 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Mini ATS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
