import { Heart, Star, MapPin } from "lucide-react";

function FeaturedBooks() {
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
      image: "/api/placeholder/200/280",
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
      image: "/api/placeholder/200/280",
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
      image: "/api/placeholder/200/280",
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
      image: "/api/placeholder/200/280",
    },
  ];
  return (
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
            <div
              key={book.id}
              className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-gray-100 opacity-0 animate-[fadeInUp_0.6s_ease-out_${
                index * 0.1
              }s_forwards]`}
            >
              <div className="relative">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-64 object-cover rounded-t-xl"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      book.exchangeType === "Exchange"
                        ? "bg-blue-100 text-blue-800"
                        : book.exchangeType === "Donate"
                        ? "bg-green-100 text-green-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {book.exchangeType}
                  </span>
                </div>
                <button className="absolute top-3 left-3 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-200">
                  <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">by {book.author}</p>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">
                      {book.rating}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">
                      ({book.reviews})
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-1" />
                    {book.location}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-600">by {book.owner}</span>
                  <button className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-all duration-200 transform hover:scale-105">
            Browse All Books
          </button>
        </div>
      </div>
    </section>
  );
}

export default FeaturedBooks;
