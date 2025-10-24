import React from 'react'
import { Link } from "react-router-dom";
function Home() {
    return (
        <div className="min-h-screen w-full bg-white flex flex-col">
            <header className="w-full flex justify-between items-center px-10 py-5 shadow-sm bg-white border-b border-gray-200">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 tracking-tight">
                    🏷️ Inventory System
                </h1>

                <nav className="flex text-gray-700 font-medium">
                    <Link
                        to="/signin"
                        className="hover:text-indigo-600 transition duration-200"
                    >
                        Login/
                    </Link>
                    <Link
                        to="/signup"
                        className="hover:text-indigo-600 transition duration-200"
                    >
                        Signup
                    </Link>
                </nav>
            </header>

            <main className="flex-grow flex items-center justify-center px-6 py-16">
                <div className="max-w-5xl w-full text-center">
                    <h2 className="text-4xl font-extrabold text-gray-800 mb-12">
                        Manage Your Inventory Effortlessly
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                        <Link
                            to="/addproduct"
                            className="block bg-gray-50 border border-gray-200 hover:bg-indigo-50 hover:border-indigo-300 text-gray-800 font-semibold py-10 rounded-2xl shadow-sm transform hover:scale-105 transition duration-300"
                        >
                            Add Product
                        </Link>

                        <Link
                            to="/view-inventory"
                            className="block bg-gray-50 border border-gray-200 hover:bg-green-50 hover:border-green-300 text-gray-800 font-semibold py-10 rounded-2xl shadow-sm transform hover:scale-105 transition duration-300"
                        >
                            View Inventory
                        </Link>

                        <Link
                            to="/manage-stock"
                            className="block bg-gray-50 border border-gray-200 hover:bg-yellow-50 hover:border-yellow-300 text-gray-800 font-semibold py-10 rounded-2xl shadow-sm transform hover:scale-105 transition duration-300"
                        >
                            Manage Stock
                        </Link>

                        <Link
                            to="/sales-report"
                            className="block bg-gray-50 border border-gray-200 hover:bg-blue-50 hover:border-blue-300 text-gray-800 font-semibold py-10 rounded-2xl shadow-sm transform hover:scale-105 transition duration-300"
                        >
                            Sales Report
                        </Link>

                        <Link
                            to="/suppliers"
                            className="block bg-gray-50 border border-gray-200 hover:bg-pink-50 hover:border-pink-300 text-gray-800 font-semibold py-10 rounded-2xl shadow-sm transform hover:scale-105 transition duration-300"
                        >
                            Suppliers
                        </Link>

                        <Link
                            to="/settings"
                            className="block bg-gray-50 border border-gray-200 hover:bg-red-50 hover:border-red-300 text-gray-800 font-semibold py-10 rounded-2xl shadow-sm transform hover:scale-105 transition duration-300"
                        >
                            Settings
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home