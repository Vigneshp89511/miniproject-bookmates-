import React from "react";
import { Users, Search, BookOpen } from "lucide-react";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with book exchanging in just three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Create Your Profile",
              description:
                "Sign up and tell us about your reading preferences. Add books to your virtual library.",
              icon: Users,
            },
            {
              step: "2",
              title: "Discover & Connect",
              description:
                "Browse books in your area and connect with other readers who share your interests.",
              icon: Search,
            },
            {
              step: "3",
              title: "Exchange & Enjoy",
              description:
                "Arrange meetups, exchange books, and dive into your next great read!",
              icon: BookOpen,
            },
          ].map((item, index) => (
            <div key={index} className="text-center relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full text-2xl font-bold mb-6">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
