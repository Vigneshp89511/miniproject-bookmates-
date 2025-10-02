import React, { useState } from "react";
import {
  BookOpen,
  Users,
  Heart,
  Search,
  Gift,
  UserCheck,
  Library,
  Book,
} from "lucide-react";

export default function BookExchangeAuth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [userType, setUserType] = useState("reader"); // 'reader' or 'contributor'

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted for:", userType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-2 sm:p-4 lg:p-6">
      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-5xl w-full flex flex-col lg:flex-row overflow-hidden border border-gray-100">
        {/* Left side panel - Sign In or Welcome for Sign Up */}
        <div
          className={`w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${
            isSignIn
              ? "bg-white"
              : "bg-gradient-to-r from-blue-600 to-green-600 text-white"
          } rounded-t-2xl sm:rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none`}
        >
          {isSignIn ? (
            <>
              <div className="flex items-center mb-4 sm:mb-6">
                {userType === "reader" ? (
                  <Book className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2 sm:mr-3" />
                ) : (
                  <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2 sm:mr-3" />
                )}
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-center">
                  {userType === "reader" ? "Book Reader" : "Book Contributor"}
                </h2>
              </div>

              {/* User Type Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-4 sm:mb-6 w-full max-w-xs">
                <button
                  onClick={() => setUserType("reader")}
                  className={`flex-1 px-3 sm:px-6 py-2 rounded-md font-medium transition-all text-sm sm:text-base ${
                    userType === "reader"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Reader
                </button>
                <button
                  onClick={() => setUserType("contributor")}
                  className={`flex-1 px-3 sm:px-6 py-2 rounded-md font-medium transition-all text-sm sm:text-base ${
                    userType === "contributor"
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  Contributor
                </button>
              </div>

              <p className="mb-6 sm:mb-8 text-gray-600 text-center text-sm sm:text-base px-4">
                {userType === "reader"
                  ? "Discover, request, and exchange books with fellow readers"
                  : "Share your books and help build our reading community"}
              </p>

              <div className="w-full flex flex-col space-y-4 sm:space-y-5 max-w-sm">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                />

                {userType === "contributor" && (
                  <select className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-600 text-sm sm:text-base">
                    <option value="">Select Contribution Type</option>
                    <option value="exchange">Book Exchange</option>
                    <option value="donate">Book Donation</option>
                    <option value="sell">Book Selling</option>
                    <option value="all">All Types</option>
                  </select>
                )}

                <div className="text-right text-xs sm:text-sm text-blue-600 cursor-pointer hover:underline font-medium">
                  Forgot Your Password?
                </div>
                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base"
                >
                  {userType === "reader"
                    ? "START READING JOURNEY"
                    : "JOIN AS CONTRIBUTOR"}
                </button>
              </div>

              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-xs sm:text-sm text-gray-500">
                  New to our community?
                  <span
                    onClick={() => setIsSignIn(false)}
                    className="text-blue-600 cursor-pointer hover:underline font-medium ml-1"
                  >
                    Create an account
                  </span>
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center mb-3 sm:mb-4">
                <Library className="h-8 w-8 sm:h-10 sm:w-10 text-white mr-2 sm:mr-3" />
                <h2 className="text-2xl sm:text-3xl font-bold">
                  Welcome Back!
                </h2>
              </div>
              <p className="mb-6 sm:mb-8 text-blue-100 text-center leading-relaxed text-sm sm:text-base px-4">
                Already part of our book-loving community? Sign in to continue
                your reading journey and connect with fellow book enthusiasts.
              </p>
              <div className="flex items-center justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
                <Search className="h-6 w-6 sm:h-8 sm:w-8 text-blue-200" />
                <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-blue-200" />
                <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-200" />
              </div>
              <button
                onClick={() => setIsSignIn(true)}
                className="border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 text-sm sm:text-base"
              >
                BACK TO LOGIN
              </button>
            </>
          )}
        </div>

        {/* Right side panel - Registration or Welcome for Sign In */}
        <div
          className={`w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center items-center transition-all duration-700 ease-in-out ${
            isSignIn
              ? "bg-gradient-to-r from-blue-600 to-green-600 text-white"
              : "bg-white"
          } rounded-b-2xl sm:rounded-b-3xl lg:rounded-r-3xl lg:rounded-bl-none`}
        >
          {isSignIn ? (
            <>
              <div className="flex items-center mb-3 sm:mb-4">
                <BookOpen className="h-8 w-8 sm:h-10 sm:w-10 text-white mr-2 sm:mr-3" />
                <h2 className="text-2xl sm:text-3xl font-bold">
                  Join Our Community
                </h2>
              </div>
              <p className="mb-6 sm:mb-8 text-blue-100 text-center leading-relaxed text-sm sm:text-base px-4">
                Create an account to start exchanging books, discovering new
                reads, and connecting with a community of book lovers.
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8 max-w-sm">
                <div className="text-center">
                  <Search className="h-6 w-6 sm:h-8 sm:w-8 text-blue-200 mx-auto mb-1 sm:mb-2" />
                  <p className="text-xs sm:text-sm text-blue-100">Find Books</p>
                </div>
                <div className="text-center">
                  <Gift className="h-6 w-6 sm:h-8 sm:w-8 text-blue-200 mx-auto mb-1 sm:mb-2" />
                  <p className="text-xs sm:text-sm text-blue-100">Exchange</p>
                </div>
                <div className="text-center">
                  <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-blue-200 mx-auto mb-1 sm:mb-2" />
                  <p className="text-xs sm:text-sm text-blue-100">
                    Save Favorites
                  </p>
                </div>
                <div className="text-center">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-200 mx-auto mb-1 sm:mb-2" />
                  <p className="text-xs sm:text-sm text-blue-100">Connect</p>
                </div>
              </div>
              <button
                onClick={() => setIsSignIn(false)}
                className="border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 text-sm sm:text-base"
              >
                CREATE ACCOUNT
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center mb-3 sm:mb-4">
                <UserCheck className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mr-2 sm:mr-3" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 text-center">
                  Create Account
                </h2>
              </div>
              <p className="mb-4 sm:mb-6 text-gray-600 text-center text-sm sm:text-base px-4">
                Join our book exchange community today
              </p>

              <div className="w-full flex flex-col space-y-3 sm:space-y-4 max-w-sm">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
                <input
                  type="text"
                  placeholder="City"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
                <select
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-600 text-sm sm:text-base"
                >
                  <option value="">Favorite Genre</option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                  <option value="mystery">Mystery & Thriller</option>
                  <option value="romance">Romance</option>
                  <option value="sci-fi">Science Fiction</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="biography">Biography</option>
                  <option value="history">History</option>
                  <option value="self-help">Self-Help</option>
                  <option value="engineering">Engineering & Technology</option>
                  <option value="programming">Programming & Coding</option>
                  <option value="mechanical">Mechanical & Robotics</option>
                  <option value="electrical">Electrical & Electronics</option>
                  <option value="civil">Civil Engineering</option>
                  <option value="mathematics">Mathematics & Logic</option>
                  <option value="ai-ml">AI & Machine Learning</option>
                  <option value="data-science">Data Science & Analytics</option>
                </select>
                <select
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-600 text-sm sm:text-base"
                >
                  <option value="">Account Type</option>
                  <option value="reader">Book Reader</option>
                  <option value="contributor">Book Contributor</option>
                  <option value="both">Both Reader & Contributor</option>
                </select>
                <input
                  type="password"
                  placeholder="Create Password"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  required
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                />

                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                  <input
                    type="checkbox"
                    id="terms"
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="terms">
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>

                <button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base"
                >
                  JOIN BOOK COMMUNITY
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
