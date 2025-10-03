import { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, CheckCircle, X } from "lucide-react";
import Video from "../assets/Bookmates.mp4";

const CTA = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Start Your Reading Journey?
        </h2>
        <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
          Join our community of book lovers and discover your next favorite
          story today
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <Link
            to="/auth"
            className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
          >
            <Zap className="mr-2 h-5 w-5" />
            Get Started
          </Link>

          <button
            onClick={() => setIsVideoOpen(true)}
            className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-green-600 transition-all duration-300"
          >
            Learn More
          </button>
        </div>

        {/* Features */}
        <div className="mt-8 flex items-center justify-center space-x-6 text-green-100">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Free to Join</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Secure Platform</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Local Community</span>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative w-full max-w-3xl p-4">
            {/* Close button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-2 right-2 text-white hover:text-gray-300"
            >
              <X size={30} />
            </button>

            {/* Video iframe */}
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                className="w-full h-[500px] rounded-xl shadow-lg"
                src={Video} // replace with your video URL
                title="Learn More Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CTA;
