import React, { useEffect, useState } from "react";
import { getReaderProfile, searchReaderBooks, logout, getToken } from "../lib/api";
import { 
  BookOpen, Search, Heart, User, Bell, Menu, X, 
  Filter, Star, MapPin, MessageCircle, Share2, 
  Clock, TrendingUp, Award, Users, Eye, Plus,
  ChevronRight, Settings, LogOut, Home, Library
} from "lucide-react";
import Logo from "../assets/LogoMakerCa-1759326904291.png";
import Image1 from "../assets/Wings of Fire.jpg";
import Image2 from "../assets/DS.png";
import Image3 from "../assets/CN.webp";

export default function BookReaderDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGenre, setFilterGenre] = useState('all');
  const [profile, setProfile] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const token = getToken();
        if (!token) {
          window.location.href = '/auth';
          return;
        }
        const p = await getReaderProfile();
        setProfile(p);
        const list = await searchReaderBooks('');
        setBooks(list);
      } catch (err) {
        setError(err.message || 'Failed to load');
        if (String(err.message || '').toLowerCase().includes('unauthorized')) {
          window.location.href = '/auth';
        }
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

 // Sample data
  const featuredBooks = [
    {
      id: 1,
      title: "Wings of Fire",
      author: "A.P.J. Abdul Kalam",
      genre: "Autobiography",
      rating: 4.8,
      reviews: 245,
      location: "2.3 km away",
      owner: "Vignesh P",
      ownerRating: 4.9,
      condition: "Like New",
      exchangeType: "Exchange",
      image: Image1,
      description: "An inspiring autobiography of India's former President..."
    },
    {
      id: 2,
      title: "Data Structures and Algorithms made easy",
      author: "Narasimha Karumanchi",
      genre: "Programming & Coding",
      rating: 4.9,
      reviews: 389,
      location: "1.8 km away",
      owner: "Sanket",
      ownerRating: 4.7,
      condition: "Good",
      exchangeType: "Donate",
      image: Image2,
      description: "A comprehensive guide to data structures and algorithms..."
    },
    {
      id: 3,
      title: "Compter Networking A Top-Down Approach",
      author: "James F. Kurose",
      genre: "Engineering & Technology",
      rating: 4.7,
      reviews: 156,
      location: "3.1 km away",
      owner: "Revanth",
      ownerRating: 5.0,
      condition: "Very Good",
      exchangeType: "Sell",
      image: Image3,
      description: "An essential textbook for understanding computer networking..."
    }
  ];

  // const myBooks = [
  //   {
  //     id: 1,
  //     title: "The Seven Husbands of Evelyn Hugo",
  //     author: "Taylor Jenkins Reid",
  //     genre: "Fiction",
  //     status: "Available",
  //     requests: 3,
  //     views: 45
  //   },
  //   {
  //     id: 2,
  //     title: "Educated",
  //     author: "Tara Westover",
  //     genre: "Biography",
  //     status: "Exchanged",
  //     requests: 0,
  //     views: 23
  //   }
  // ];

  const recentActivity = [
    { type: "request", message: "You requested 'The Midnight Library' from Sarah", time: "2 hours ago" },
    { type: "match", message: "Your book 'Educated' was requested by Alex", time: "5 hours ago" },
    { type: "review", message: "You received a 5-star review from Emma", time: "1 day ago" }
  ];

  const genres = [
  "All",
  // Literature & Fiction
  "Autobiography",
  "Fiction",
  "Non-Fiction",
  "Mystery & Thriller",
  "Romance",
  "Science Fiction",
  "Fantasy",
  "Biography",
  "History",
  // Self-Improvement
  "Self-Help",
  // Engineering & Technology
  "Engineering & Technology",
  "Mechanical & Robotics",
  "Electrical & Electronics",
  "Civil Engineering",
  // Computer Science & Data
  "Programming & Coding",
  "AI & Machine Learning",
  "Data Science & Analytics",
  "Mathematics & Logic"
];


  useEffect(() => {
  const run = async () => {
    if (activeTab !== 'browse') return;

    try {
      const list = await searchReaderBooks(searchQuery);
      setBooks(list);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message || 'Search failed');
      setBooks([]); // Optionally clear books on error
    }
  };

  run();
}, [activeTab, searchQuery]); // added searchQuery as dependency


  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:flex lg:flex-col`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:flex-shrink-0">
        <div className="flex items-center space-x-2">
          <img src={Logo} className="h-20 w-15 text-green-600" />
          <span className="text-2xl font-bold text-gray-900">BookMates</span>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
          <X className="h-6 w-6 text-gray-500" />
        </button>
      </div>
      
      <nav className="mt-8 px-4 flex-1 overflow-y-auto">
        <div className="space-y-2">
          {[
            { id: 'home', label: 'Dashboard', icon: Home },
            { id: 'browse', label: 'Browse Books', icon: Search },
            // { id: 'library', label: 'My Library', icon: Library },
            { id: 'favorites', label: 'Favorites', icon: Heart },
            { id: 'messages', label: 'Messages', icon: MessageCircle },
            { id: 'profile', label: 'Profile', icon: User }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id ? 'bg-green-100 text-green-700 border-r-2 border-green-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <Settings className="h-5 w-5" />
              <span className="font-medium">Settings</span>
            </button>
            <button onClick={() => { logout(); window.location.href = '/auth'; }} className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
              <LogOut className="h-5 w-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );

  const Header = () => (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="ml-2 lg:ml-0 text-2xl font-bold text-gray-900">
              {activeTab === 'home' && 'Dashboard'}
              {activeTab === 'browse' && 'Browse Books'}
              {/* {activeTab === 'library' && 'My Library'} */}
              {activeTab === 'favorites' && 'Favorites'}
              {activeTab === 'messages' && 'Messages'}
              {activeTab === 'profile' && 'Profile'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={async (e) => {
                  const q = e.target.value;
                  setSearchQuery(q);
                  try {
                    if (activeTab === 'browse') {
                      const list = await searchReaderBooks(q);
                      setBooks(list);
                    }
                  } catch (err) {
                    setError(err.message || 'Search failed');
                  }
                }}
                className="pl-10 pr-4 py-2 w-64 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const BookCard = ({ book }) => (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] border border-gray-100">
      <div className="aspect-w-3 aspect-h-4 relative">
        <img 
          src={book.image} 
          alt={book.title}
          className="w-full h-full  object-cover rounded-t-xl"
        />
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            book.exchangeType === 'Exchange' ? 'bg-blue-100 text-blue-800' :
            book.exchangeType === 'Donate' ? 'bg-green-100 text-green-800' :
            'bg-purple-100 text-purple-800'
          }`}>
            {book.exchangeType}
          </span>
        </div>
        <div className="absolute top-2 left-2">
          <button className="p-1 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all duration-200">
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-2">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
        
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700 ml-1">{book.rating}</span>
          </div>
          <span className="text-gray-400">•</span>
          <span className="text-sm text-gray-600">{book.reviews} reviews</span>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{book.location}</span>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center">
              <User className="h-3 w-3 text-green-600" />
            </div>
            <span className="text-sm text-gray-700">{book.owner}</span>
            <div className="flex items-center">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-600 ml-1">{book.ownerRating}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <button className="p-1 text-gray-400 hover:text-green-600 transition-colors duration-200">
              <Share2 className="h-4 w-4" />
            </button>
            <button className="p-1 text-gray-400 hover:text-green-600 transition-colors duration-200">
              <MessageCircle className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <button className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200">
          Request Book
        </button>
      </div>
    </div>
  );

  const StatsCard = ({ icon: IconComponent, title, value, subtitle, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg ${color}`}>
          <IconComponent className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <StatsCard 
                icon={BookOpen} 
                title="Favorite Genre" 
                value={profile?.favoriteGenre || '-'} 
                subtitle="This year"
                color="bg-blue-500"
              />
              <StatsCard 
                icon={Heart} 
                title="Favorites" 
                value="23" 
                subtitle="Saved books"
                color="bg-red-500"
              />
              <StatsCard 
                icon={Users} 
                title="Exchanges" 
                value="12" 
                subtitle="Completed"
                color="bg-green-500"
              />
              <StatsCard 
                icon={Award} 
                title="Rating" 
                value="4.8" 
                subtitle="Community rating"
                color="bg-yellow-500"
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-green-600" />
                  Recent Activity
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                   {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div className={`h-2 w-2 rounded-full ${
                        activity.type === 'request' ? 'bg-blue-500' :
                        activity.type === 'match' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))} 
                </div>
              </div>
            </div>

            {/* Featured Books */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                    Featured Books
                  </h2>
                  <button 
                    onClick={() => setActiveTab('browse')}
                    className="flex items-center text-green-600 hover:text-green-700 font-medium text-sm transition-colors duration-200"
                  >
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredBooks.slice(0, 3).map(book => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'browse':
        return (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <Filter className="h-5 w-5 text-gray-400" />
                  <select 
                    value={filterGenre}
                    onChange={(e) => setFilterGenre(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {genres.map(genre => (
                      <option key={genre} value={genre.toLowerCase()}>{genre}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Found {featuredBooks.length} books</span>
                </div>
              </div>
            </div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredBooks.map(book => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        );

      // case 'library':
      //   return (
      //     <div className="space-y-6">
      //       <div className="flex justify-between items-center">
      //         <h2 className="text-2xl font-bold text-gray-900">My Books</h2>
      //         <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-green-700 transition-colors duration-200">
      //           <Plus className="h-4 w-4" />
      //           <span>Add Book</span>
      //         </button>
      //       </div>

      //       <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      //         <div className="overflow-x-auto">
      //           <table className="w-full">
      //             <thead className="bg-gray-50 border-b border-gray-200">
      //               <tr>
      //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
      //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
      //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requests</th>
      //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
      //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
      //               </tr>
      //             </thead>
      //             <tbody className="bg-white divide-y divide-gray-200">
      //               {myBooks.map(book => (
      //                 <tr key={book.id} className="hover:bg-gray-50 transition-colors duration-200">
      //                   <td className="px-6 py-4">
      //                     <div>
      //                       <div className="text-sm font-medium text-gray-900">{book.title}</div>
      //                       <div className="text-sm text-gray-500">by {book.author}</div>
      //                     </div>
      //                   </td>
      //                   <td className="px-6 py-4">
      //                     <span className={`px-2 py-1 text-xs font-medium rounded-full ${
      //                       book.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
      //                     }`}>
      //                       {book.status}
      //                     </span>
      //                   </td>
      //                   <td className="px-6 py-4 text-sm text-gray-900">{book.requests}</td>
      //                   <td className="px-6 py-4 text-sm text-gray-900">{book.views}</td>
      //                   <td className="px-6 py-4">
      //                     <div className="flex items-center space-x-2">
      //                       <button className="text-green-600 hover:text-green-700">
      //                         <Eye className="h-4 w-4" />
      //                       </button>
      //                       <button className="text-blue-600 hover:text-blue-700">
      //                         <Settings className="h-4 w-4" />
      //                       </button>
      //                     </div>
      //                   </td>
      //                 </tr>
      //               ))}
      //             </tbody>
      //           </table>
      //         </div>
      //       </div>
      //     </div>
      //   );

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-gray-500">This section is under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {loading && (
            <div className="text-gray-600 mb-4">Loading...</div>
          )}
          {error && (
            <div className="text-red-600 mb-4">{error}</div>
          )}
          {renderContent()}
        </main>
      </div>
    </div>
  );
}