import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-white fixed top-0 left-0 w-full z-50 shadow-md">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
              className="h-8 w-auto"
            />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
              className="size-6"
            >
              <path
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
          >
            Home
          </Link>
          <Link
            to="/addProduct"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
          >
            Add Product
          </Link>
          <Link
            to="/barcode"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
          >
            Barcodes
          </Link>
          <Link
            to="/signup"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
          >
            Signup
          </Link>
          <Link
            to="/signin"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-indigo-600"
          >
            Signin
          </Link>
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            to="/signin"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
