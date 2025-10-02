import React from "react";
import { useState } from "react";
import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Avid Reader",
      avatar: "/api/placeholder/60/60",
      text: "I've exchanged over 50 books through this platform! The community is amazing and I've discovered so many new authors.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Book Collector",
      avatar: "/api/placeholder/60/60",
      text: "Finally found a way to share my extensive collection with fellow book lovers. The platform makes it so easy to connect.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "Student",
      avatar: "/api/placeholder/60/60",
      text: "As a student on a budget, this platform has been a lifesaver. I can access great books without breaking the bank!",
      rating: 5,
    },
  ];
  return (
    <section
      id="testimonials"
      className="py-20 bg-gradient-to-br from-green-50 to-orange-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Community Says
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of happy readers sharing their stories
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <Quote className="h-12 w-12 text-green-600 mb-6 mx-auto" />
            <div className="text-center">
              <p className="text-xl text-gray-700 mb-8 leading-relaxed italic">
                "{testimonials[activeTestimonial].text}"
              </p>

              <div className="flex items-center justify-center space-x-4 mb-6">
                <img
                  src={testimonials[activeTestimonial].avatar}
                  alt={testimonials[activeTestimonial].name}
                  className="w-16 h-16 rounded-full"
                />
                <div className="text-left">
                  <h4 className="font-bold text-gray-900">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-gray-600">
                    {testimonials[activeTestimonial].role}
                  </p>
                </div>
              </div>

              <div className="flex justify-center space-x-1 mb-6">
                {Array(testimonials[activeTestimonial].rating)
                  .fill()
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
              </div>

              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === activeTestimonial
                        ? "bg-green-600"
                        : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
