import { Globe, MessageCircle, Heart } from "lucide-react";
import Logo from "../assets/LogoMakerCa-1759326904291.png";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src={Logo} className="h-20 w-15 text-green-600" />
              <span className="text-2xl font-bold">BookMates</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Connecting book lovers worldwide. Share stories, build community,
              and discover your next great read.
            </p>
            <div className="flex space-x-4">
              <button className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                <Globe className="h-5 w-5" />
              </button>
              <button className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                <MessageCircle className="h-5 w-5" />
              </button>
              <button className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Platform</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Browse Books
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                How It Works
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Community
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Mobile App
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Help Center
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="block text-gray-400 hover:text-white transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; 2025 BookMates. All rights reserved. Made with ❤️ for book
            lovers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
