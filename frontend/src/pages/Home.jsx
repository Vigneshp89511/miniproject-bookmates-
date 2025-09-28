import React, { useState } from "react";
import { 
  BookOpen, Search, Heart, Users, Star, MapPin, 
  ArrowRight, Menu, X, Gift, MessageCircle, Award,
  TrendingUp, Shield, Clock, Globe, CheckCircle,
  Play, ChevronRight, Quote, Zap
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const featuredBooks = [
    {
      id: 1,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      rating: 4.8,
      reviews: 245,
      location: "Downtown",
      owner: "Sarah M.",
      exchangeType: "Exchange",
      image: "/api/placeholder/200/280"
    },
    {
      id: 2,
      title: "Atomic Habits",
      author: "James Clear",
      rating: 4.9,
      reviews: 389,
      location: "Midtown",
      owner: "Mike J.",
      exchangeType: "Donate",
      image: "/api/placeholder/200/280"
    },
    {
      id: 3,
      title: "The Midnight Library",
      author: "Matt Haig",
      rating: 4.7,
      reviews: 156,
      location: "Uptown",
      owner: "Emma W.",
      exchangeType: "Sell",
      image: "/api/placeholder/200/280"
    },
    {
      id: 4,
      title: "Project Hail Mary",
      author: "Andy Weir",
      rating: 4.8,
      reviews: 203,
      location: "West Side",
      owner: "David L.",
      exchangeType: "Exchange",
      image: "/api/placeholder/200/280"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Avid Reader",
      avatar: "/api/placeholder/60/60",
      text: "I've exchanged over 50 books through this platform! The community is amazing and I've discovered so many new authors.",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Book Collector",
      avatar: "/api/placeholder/60/60",
      text: "Finally found a way to share my extensive collection with fellow book lovers. The platform makes it so easy to connect.",
      rating: 5
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "Student",
      avatar: "/api/placeholder/60/60",
      text: "As a student on a budget, this platform has been a lifesaver. I can access great books without breaking the bank!",
      rating: 5
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Readers" },
    { number: "100K+", label: "Books Exchanged" },
    { number: "500+", label: "Cities" },
    { number: "4.9", label: "User Rating" }
  ];

  const features = [
    {
      icon: Search,
      title: "Discover Books",
      description: "Find your next favorite read from thousands of available books in your area."
    },
    {
      icon: Users,
      title: "Connect with Readers",
      description: "Join a community of passionate readers and make meaningful connections."
    },
    {
      icon: Gift,
      title: "Multiple Exchange Options",
      description: "Exchange, donate, or purchase books based on your preference and budget."
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Verified users, secure messaging, and community ratings ensure safe exchanges."
    },
    {
      icon: MapPin,
      title: "Local Community",
      description: "Connect with readers in your neighborhood for convenient book exchanges."
    },
    {
      icon: Award,
      title: "Build Your Reputation",
      description: "Earn ratings and reviews as you participate in the community."
    }
  ];

  const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-amber-600" />
            <span className="text-2xl font-bold text-gray-900">BookExchange</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#features" className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200">Features</a>
            <a href="#community" className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200">Community</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200">How It Works</a>
            <a href="#testimonials" className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200">Reviews</a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200">Sign In</button>
            <button className="bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 transition-all duration-200 transform hover:scale-105">
              Join Now
            </button>
          </div>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
            <a href="#features" className="block text-gray-700 hover:text-amber-600 font-medium">Features</a>
            <a href="#community" className="block text-gray-700 hover:text-amber-600 font-medium">Community</a>
            <a href="#how-it-works" className="block text-gray-700 hover:text-amber-600 font-medium">How It Works</a>
            <a href="#testimonials" className="block text-gray-700 hover:text-amber-600 font-medium">Reviews</a>
            <div className="flex flex-col space-y-2 pt-4">
              <button className="text-gray-700 hover:text-amber-600 font-medium text-left">Sign In</button>
              <button className="bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors duration-200">
                Join Now
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );

  const Hero = () => (
    <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Share Stories,
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600"> Build Community</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with fellow book lovers in your area. Exchange, donate, or discover your next favorite read through our vibrant community of readers.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <button className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center">
              Start Exchanging
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border-2 border-amber-600 text-amber-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-amber-600 hover:text-white transition-all duration-300 flex items-center">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const FeaturedBooks = () => (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Books in Your Area
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing books shared by your neighbors and fellow readers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredBooks.map((book, index) => (
            <div key={book.id} className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-gray-100 opacity-0 animate-[fadeInUp_0.6s_ease-out_${index * 0.1}s_forwards]`}>
              <div className="relative">
                <img 
                  src={book.image} 
                  alt={book.title}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    book.exchangeType === 'Exchange' ? 'bg-blue-100 text-blue-800' :
                    book.exchangeType === 'Donate' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {book.exchangeType}
                  </span>
                </div>
                <button className="absolute top-3 left-3 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-200">
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">{book.title}</h3>
                <p className="text-gray-600 text-sm mb-3">by {book.author}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">{book.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({book.reviews})</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    {book.location}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-600">by {book.owner}</span>
                  <button className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-amber-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-700 transition-all duration-200 transform hover:scale-105">
            Browse All Books
          </button>
        </div>
      </div>
    </section>
  );

  const Features = () => (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose BookExchange?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of readers who have transformed their reading experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="p-3 bg-amber-100 rounded-lg">
                  <feature.icon className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 ml-4">{feature.title}</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const HowItWorks = () => (
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
              description: "Sign up and tell us about your reading preferences. Add books to your virtual library.",
              icon: Users
            },
            {
              step: "2", 
              title: "Discover & Connect",
              description: "Browse books in your area and connect with other readers who share your interests.",
              icon: Search
            },
            {
              step: "3",
              title: "Exchange & Enjoy",
              description: "Arrange meetups, exchange books, and dive into your next great read!",
              icon: BookOpen
            }
          ].map((item, index) => (
            <div key={index} className="text-center relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-full text-2xl font-bold mb-6">
                {item.step}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
              
              {index < 2 && (
                <div className="hidden md:block absolute top-8 left-full w-full">
                  <ChevronRight className="h-8 w-8 text-amber-300 mx-auto" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const Testimonials = () => (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
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
            <Quote className="h-12 w-12 text-amber-600 mb-6 mx-auto" />
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
                  <h4 className="font-bold text-gray-900">{testimonials[activeTestimonial].name}</h4>
                  <p className="text-gray-600">{testimonials[activeTestimonial].role}</p>
                </div>
              </div>
              
              <div className="flex justify-center space-x-1 mb-6">
                {Array(testimonials[activeTestimonial].rating).fill().map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <div className="flex justify-center space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === activeTestimonial ? 'bg-amber-600' : 'bg-gray-300'
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

  const CTA = () => (
    <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Start Your Reading Journey?
        </h2>
        <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
          Join our community of book lovers and discover your next favorite story today
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          <button className="bg-white text-amber-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center">
            <Zap className="mr-2 h-5 w-5" />
            Get Started Free
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-amber-600 transition-all duration-300">
            Learn More
          </button>
        </div>
        
        <div className="mt-8 flex items-center justify-center space-x-6 text-amber-100">
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
    </section>
  );

  const Footer = () => (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-amber-600" />
              <span className="text-2xl font-bold">BookExchange</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Connecting book lovers worldwide. Share stories, build community, and discover your next great read.
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
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">Browse Books</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">How It Works</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">Community</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">Mobile App</a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <div className="space-y-2">
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">Help Center</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">Contact Us</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="block text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 BookExchange. All rights reserved. Made with ❤️ for book lovers everywhere.</p>
        </div>
      </div>
    </footer>
  );

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedBooks />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}