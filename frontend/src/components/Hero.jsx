import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  const stats = [
    { number: "50K+", label: "Active Readers" },
    { number: "100K+", label: "Books Exchanged" },
    { number: "500+", label: "Cities" },
    { number: "4.9", label: "User Rating" },
  ];
  return (
    <section className="bg-gradient-to-br from-blue-50 via-green-50 to-red-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Share Stories,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              {" "}
              Build Community
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with fellow book lovers in your area. Exchange, donate, or
            discover your next favorite read through our vibrant community of
            readers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Link
              to="/auth"
              className="bg-gradient-to-r from-blue-600 to-green-600  text-white px-8 py-4 rounded-xl font-semibold text-lghover:shadow-lg transition-all  duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
            >
              Start Exchanging
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
