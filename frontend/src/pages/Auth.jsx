 import React, { useState } from "react";
import axios from "axios";
import { signup, login, setToken, setUser } from "../lib/api";
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


const API_BASE_URL =
  // window.location.hostname === "localhost"
  //   ? "http://localhost:4000/api" :
     "https://bookmates-31ak.onrender.com/api";
    

export default function BookExchangeAuth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [userType, setUserType] = useState("reader");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    favoriteGenre: "",
  });
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [pendingEmail, setPendingEmail] = useState("");

  const updateField = (key) => (e) => 
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { email, password } = form;
      
      if (!email || !password) {
        setError("Email and password are required");
        setLoading(false);
        return;
      }

      const resp = await login({ email, password });
      
      // Check if user needs to verify email
      if (resp.requiresVerification) {
        setPendingEmail(email);
        setIsOtpSent(true);
        setError("Please verify your email first. Check your inbox for OTP.");
        setLoading(false);
        return;
      }

      setToken(resp.token);
      setUser(resp.user);
      // Redirect or update app state here
      window.location.href = "/book-contributor";
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Login failed";
      setError(errorMsg);
      
      // If error indicates verification needed, show OTP input
      if (err.response?.data?.requiresVerification) {
        setPendingEmail(err.response.data.email);
        setIsOtpSent(true);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validation
      if (!form.name || !form.email || !form.password) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      if (form.password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        favoriteGenre: form.favoriteGenre,
      };

      const resp = await signup(payload);

      if (resp.requiresVerification) {
        setPendingEmail(form.email);
        setIsOtpSent(true);
        setError(""); // Clear any errors
        // Success message will be shown in the OTP section
      } else {
        // If no verification needed (shouldn't happen with this flow)
        setToken(resp.token);
        setUser(resp.user);
      }

    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Signup failed";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP Verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (!otp || otp.length !== 6) {
        setError("Please enter a valid 6-digit OTP");
        setLoading(false);
        return;
      }

      const resp = await axios.post(`${API_BASE_URL}/verify-otp`, {
        email: pendingEmail,
        otp: otp,
      });

      if (resp.data.success) {
        setToken(resp.data.token);
        setUser(resp.data.user);
        // Reset form and states
        setIsOtpSent(false);
        setOtp("");
        // Redirect or update app state here
      }
      window.location.href = "/book-contributor";
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "OTP verification failed";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Handle Resend OTP
  const handleResendOtp = async () => {
    setError("");
    setLoading(true);

    try {
      const resp = await axios.post(`${API_BASE_URL}/resend-otp`, {
        email: pendingEmail,
      });

      if (resp.data.success) {
        setError(""); // Clear errors
        alert("New OTP sent to your email!");
      }

    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to resend OTP";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-2 sm:p-4 lg:p-6">
      <div className="relative bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-5xl w-full flex flex-col lg:flex-row overflow-hidden border border-gray-100">
        
        {/* Left side panel - Sign In */}
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

              <p className="mb-6 sm:mb-8 text-gray-600 text-center text-sm sm:text-base px-4">
                {userType === "reader"
                  ? "Discover, request, and exchange books with fellow readers"
                  : "Share your books and help build our reading community"}
              </p>

              <form onSubmit={handleLogin} className="w-full flex flex-col space-y-4 sm:space-y-5 max-w-sm">
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={form.email}
                  onChange={updateField("email")}
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={form.password}
                  onChange={updateField("password")}
                  className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                />

                <div className="text-right text-xs sm:text-sm text-blue-600 cursor-pointer hover:underline font-medium">
                  Forgot Your Password?
                </div>

                {error && (
                  <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Loading..." : userType === "reader" ? "START READING JOURNEY" : "JOIN AS CONTRIBUTOR"}
                </button>
              </form>

              <div className="mt-4 sm:mt-6 text-center">
                <p className="text-xs sm:text-sm text-gray-500">
                  New to our community?
                  <span
                    onClick={() => {
                      setIsSignIn(false);
                      setError("");
                      setIsOtpSent(false);
                    }}
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
                onClick={() => {
                  setIsSignIn(true);
                  setError("");
                  setIsOtpSent(false);
                }}
                className="border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all transform hover:scale-105 text-sm sm:text-base"
              >
                BACK TO LOGIN
              </button>
            </>
          )}
        </div>

        {/* Right side panel - Registration */}
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
                onClick={() => {
                  setIsSignIn(false);
                  setError("");
                  setIsOtpSent(false);
                }}
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

              {!isOtpSent ? (
                <form onSubmit={handleSignup} className="w-full flex flex-col space-y-3 sm:space-y-4 max-w-sm">
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    value={form.name}
                    onChange={updateField("name")}
                    className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    required
                    value={form.email}
                    onChange={updateField("email")}
                    className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                  />
                  <select
                    required
                    value={form.favoriteGenre}
                    onChange={updateField("favoriteGenre")}
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
                  <input
                    type="password"
                    placeholder="Create Password"
                    required
                    value={form.password}
                    onChange={updateField("password")}
                    className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={form.confirmPassword}
                    onChange={updateField("confirmPassword")}
                    className="px-3 sm:px-4 py-2 sm:py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm sm:text-base"
                  />

                  <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600">
                    <input
                      type="checkbox"
                      id="terms"
                      required
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="terms">
                      I agree to the Terms of Service and Privacy Policy
                    </label>
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Creating..." : "JOIN BOOK COMMUNITY"}
                  </button>
                </form>
              ) : (
                <div className="w-full flex flex-col space-y-4 max-w-sm">
                  <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg text-sm text-center">
                    ✓ OTP sent to {pendingEmail}
                  </div>

                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter 6-digit OTP
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                        className="tracking-[1.2em] text-center border border-gray-400 rounded-lg p-3 text-2xl font-semibold w-full"
                        placeholder="------"
                        required
                      />
                    </div>

                    {error && (
                      <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                        {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || otp.length !== 6}
                      className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Verifying..." : "VERIFY OTP"}
                    </button>
                  </form>

                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      Didn't receive the code?
                    </p>
                    <button
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="text-blue-600 font-medium hover:underline disabled:opacity-50"
                    >
                      Resend OTP
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setIsOtpSent(false);
                      setOtp("");
                      setError("");
                    }}
                    className="text-sm text-gray-600 hover:text-gray-800 underline"
                  >
                    ← Back to signup
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}