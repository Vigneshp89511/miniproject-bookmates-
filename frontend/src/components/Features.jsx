import { Search, Users, Gift, Shield, MapPin, Award } from "lucide-react";

function Features() {
  const features = [
    {
      icon: Search,
      title: "Discover Books",
      description:
        "Find your next favorite read from thousands of available books in your area.",
    },
    {
      icon: Users,
      title: "Connect with Readers",
      description:
        "Join a community of passionate readers and make meaningful connections.",
    },
    {
      icon: Gift,
      title: "Multiple Exchange Options",
      description:
        "Exchange, donate, or purchase books based on your preference and budget.",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description:
        "Verified users, secure messaging, and community ratings ensure safe exchanges.",
    },
    {
      icon: MapPin,
      title: "Local Community",
      description:
        "Connect with readers in your neighborhood for convenient book exchanges.",
    },
    {
      icon: Award,
      title: "Build Your Reputation",
      description:
        "Earn ratings and reviews as you participate in the community.",
    },
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose BookExchange?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of readers who have transformed their reading
            experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 ml-4">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
