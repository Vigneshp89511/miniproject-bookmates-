import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "../assets/LogoMakerCa-1759326904291.png";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img src={Logo} className="h-20 w-15 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">BookMates</span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
            >
              Community
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
            >
              Reviews
            </a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/auth"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/auth"
              className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
            >
              Join Now
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
            <a
              href="#features"
              className="block text-gray-700 hover:text-green-600 font-medium"
            >
              Features
            </a>
            <a
              href="#community"
              className="block text-gray-700 hover:text-green-600 font-medium"
            >
              Community
            </a>
            <a
              href="#how-it-works"
              className="block text-gray-700 hover:text-green-600 font-medium"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="block text-gray-700 hover:text-green-600 font-medium"
            >
              Reviews
            </a>
            <div className="flex flex-col space-y-2 pt-4">
              <button className="text-gray-700 hover:text-green-600 font-medium text-left">
                Sign In
              </button>
              <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200">
                Join Now
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
