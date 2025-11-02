 import React, { useEffect, useState, useRef } from "react";
import { getToken, getUser, logout } from "../lib/api";
import { listMyBooks, createMyBook, deleteMyBook, getContributorAnalytics, getContributorRequests } from "../lib/api";
import { 
  BookOpen, Search, Heart, User, Bell, Menu, X, 
  Plus, Star, MapPin, MessageCircle, Share2, 
  Clock, TrendingUp, Award, Users, Eye, Settings,
  ChevronRight, LogOut, Home, Library, DollarSign,
  Package, Edit, Trash2, Check, AlertCircle, BarChart3,
  Upload, Camera, Filter, Download, RefreshCw
} from "lucide-react";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'
import Logo from "../assets/LogoMakerCa-1759326904291.png";
import Image1 from "../assets/Wings of Fire.jpg";
import Image2 from "../assets/DS.png";
import Image3 from "../assets/CN.webp";
import Image4 from "../assets/Book4.jpg"
 
import axios from "axios";
 
export default function BookContributorDashboard() {
  const [logDecode, setlogDecode] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [exchangeType, setExchangeType] = useState('');
  const [user, setUser] = useState(null);
  const [myBooks, setMyBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tested, settested] = useState([]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      window.location.href = '/auth';
      return;
    }
    fetchContributorBooks()
    setUser(getUser());
    (async () => {
      try {
        setLoading(true);
        const [books, stats, requests] = await Promise.all([
          listMyBooks(),
          getContributorAnalytics(),
          getContributorRequests(),
        ]);
        setMyBooks(books);
        setAnalytics(stats);
        setRecentRequests(requests);
      } catch (err) {
        setError(err.message || 'Failed to load books');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const [myListings, setmyListings] = useState([])
  const API_BASE_URL =
  window.location.hostname.includes("localhost")
    ? "http://localhost:4000/api"
    : "https://bookmates-31ak.onrender.com/api";

  const fetchContributorBooks = async () => {
    try {
      console.log("hello2")
      const response = await axios.get(`${API_BASE_URL}/contributer/books`);
      console.log("hello3")
      console.log('Books:', response.data.response);
      setmyListings(response.data.response);
      const token = getToken();
      if (token) {
        try {
          const decoded = jwtDecode(token);
          console.log(decoded)
          const user = decoded.id || decoded.sub || decoded._id; 
          setlogDecode(decoded);
          console.log('User ID from token:', user);
          setMyBooks(response.data.response.filter(b => (user === b.owner)));
          console.log(response.data.response.filter(b => (user === b.owner)))
        } catch (error) {
          console.error('Invalid token, could not decode:', error);
        }
      }
    } catch (error) {
      console.error('Error fetching contributor books:', error);
      throw error;
    }
  };

  const [recentRequests, setRecentRequests] = useState([]);

  const analytics = {
    totalListings: 12,
    activeListings: 8,
    completedExchanges: 24,
    totalViews: 3456,
    totalRequests: 67,
    averageRating: 4.8,
    earnings: 156.50
  };

  const handleEditClick = (book) => {
    setEditingBook(book);
    setExchangeType(book.exchangeType);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
    setEditingBook(null);
    setExchangeType("exchange");
    setError("");
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError("");

      const title = document.querySelector("#edit-title")?.value || "";
      const author = document.querySelector("#edit-author")?.value || "";
      const genre = document.querySelector("#edit-genre")?.value || "";
      const condition = document.querySelector("#edit-condition")?.value || "";
      const description = document.querySelector("#edit-description")?.value || "";
      const exchangeDuration = document.querySelector("#edit-duration")?.value || "";
      const price = document.querySelector("#edit-price")?.value || "";

      if (!title || !author || !genre || !condition || !exchangeType) {
        setError("Please fill all required fields");
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", author);
      formData.append("genre", genre);
      formData.append("condition", condition);
      formData.append("exchangeType", exchangeType);
      formData.append("description", description);
      formData.append("termsAccepted", true);

      if (exchangeType === "exchange") formData.append("exchangeDuration", exchangeDuration);
      if (exchangeType === "sell") formData.append("price", price);

      const fileInput = document.querySelector("#edit-cover-image");
      if (fileInput?.files[0]) {
        formData.append("coverImage", fileInput.files[0]);
      }

      const token = getToken();
      const response = await axios.put(
        `${API_BASE_URL}/contributer/books/${editingBook._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMyBooks(myBooks.map(book => 
        book._id === editingBook._id ? response.data : book
      ));

      handleCloseEdit();
      alert("Book updated successfully!");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Failed to update book");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (book) => {
    try {
      setLoading(true);
      const token = getToken();
      console.log('Deleting book with ID:', book._id);
      if (window.confirm("Do you really want to delete this book? If YES click OK")) {
        await axios.delete(
          `${API_BASE_URL}/contributer/books/${book._id}`,
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
      }
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete book");
    } finally {
      setLoading(false);
    }
  };

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:relative lg:flex lg:flex-col`}>
      <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:flex-shrink-0">
        <div className="flex items-center space-x-2">
          <img src={Logo} className="h-20 w-15 text-green-600" />
          <span className="text-2xl font-bold text-gray-900">BookMates</span>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
          <X className="h-6 w-6 absolute top-4 right-3 text-gray-500" />
        </button>
      </div>

      <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="h-12 w-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">{user?.name || 'Contributor'}</h3>
            <p className="text-sm text-gray-600">{user?.accountType ? user.accountType[0].toUpperCase() + user.accountType.slice(1) : 'Contributor'}</p>
            <div className="flex items-center mt-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-xs text-gray-600 ml-1">{analytics.averageRating} Rating</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="mt-6 px-4 flex-1 overflow-y-auto">
        <div className="space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Home },
            { id: 'listings', label: 'Explore', icon: Library },
            { id: 'requests', label: 'Requests', icon: MessageCircle, badge: recentRequests.length },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'earnings', label: 'Earnings', icon: DollarSign },
            { id: 'profile', label: 'Profile', icon: User }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                activeTab === item.id ? 'bg-green-100 text-green-700 border-r-2 border-green-600' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
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
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'listings' && 'Explore'}
              {activeTab === 'requests' && 'Book Requests'}
              {activeTab === 'analytics' && 'Analytics'}
              {activeTab === 'earnings' && 'Earnings'}
              {activeTab === 'profile' && 'Profile'}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {activeTab === 'listings' && (
              <button
                onClick={() => setShowAddBookModal(true)}
                className="hidden sm:flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-all duration-200 transform hover:scale-105"
              >
                <Plus className="h-4 w-4" />
                <span>Add Book</span>
              </button>
            )}

            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="h-8 w-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const StatsCard = ({ icon: IconComponent, title, value, subtitle, color, trend }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <IconComponent className="h-6 w-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            <TrendingUp className="h-4 w-4 mr-1" />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
  );

  const AddBookModal = () => {
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [localExchangeType, setLocalExchangeType] = useState("");
    const [localLoading, setLocalLoading] = useState(false);
    const [localError, setLocalError] = useState("");

    const handleImageSelect = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setSelectedImage(reader.result);
        reader.readAsDataURL(file);
      }
    };

    const handleCameraClick = () => {
      fileInputRef.current?.click();
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleImageSelect({ target: { files: [file] } });
    };

    const handleClose = () => {
      window.location.reload()
    }

    const handleSubmit = async () => {
      try {
        setLocalLoading(true);
        setLocalError("");

        const title = document.querySelector("#add-title")?.value || "";
        const author = document.querySelector("#add-author")?.value || "";
        const genre = document.querySelector("#add-genre")?.value || "";
        const condition = document.querySelector("#add-condition")?.value || "";
        const description = document.querySelector("#add-description")?.value || "";
        const exchangeDuration = document.querySelector("#add-duration")?.value || "";
        const price = document.querySelector("#add-price")?.value || "";
        const termsAccepted = document.querySelector("#terms")?.checked || false;

        if (!title || !author || !genre || !condition || !localExchangeType) {
          setLocalError("Please fill all required fields and accept terms");
          return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", author);
        formData.append("genre", genre);
        formData.append("condition", condition);
        formData.append("exchangeType", localExchangeType);
        formData.append("description", description);
        formData.append("termsAccepted", termsAccepted);
        if (localExchangeType === "exchange") formData.append("exchangeDuration", exchangeDuration);
        if (localExchangeType === "sell") formData.append("price", price);
        if (fileInputRef.current?.files[0]) {
          formData.append("coverImage", fileInputRef.current.files[0]);
        }

        const token = getToken()
        const createdBook = await axios.post(`${API_BASE_URL}/contributer/books`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setMyBooks([createdBook]);
        handleClose();
      } catch (err) {
        setLocalError(err.response?.data?.message || err.message || "Something went wrong");
      } finally {
        setLocalLoading(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Add New Book</h2>
            <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Cover
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageSelect}
                className="hidden"
              />
              <div
                onClick={handleCameraClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
                  isDragging
                    ? "border-green-500 bg-green-50"
                    : selectedImage
                    ? "border-gray-300 hover:border-gray-400"
                    : "border-gray-300 hover:border-green-500"
                }`}
              >
                {selectedImage ? (
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Book cover preview"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                    </button>
                    <p className="text-sm text-gray-500 mt-4">
                      Click to change photo or drag and drop new one
                    </p>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">
                      {isDragging
                        ? "Drop book photo here"
                        : "Click to add book photo or drag and drop"}
                    </p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book Title *
                </label>
                <input
                  id="add-title"
                  type="text"
                  placeholder="Enter book title"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </label>
                <input
                  id="add-author"
                  type="text"
                  placeholder="Enter author name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Genre *
                </label>
                <select
                  id="add-genre"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select genre</option>
                  <option value="fiction">Fiction</option>
                  <option value="programming">Programming & Coding</option>
                  <option value="ai-ml">AI & Machine Learning</option>
                  <option value="data-science">Data Science</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  id="add-condition"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select condition</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="acceptable">Acceptable</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exchange Type *
                </label>
                <select
                  value={localExchangeType}
                  onChange={(e) => setLocalExchangeType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                >
                  <option value="">Select type</option>
                  <option value="exchange">Exchange</option>
                  <option value="donate">Donate</option>
                  <option value="sell">Sell</option>
                </select>
              </div>

              {localExchangeType === "exchange" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exchange Duration *
                  </label>
                  <select
                    id="add-duration"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select duration</option>
                    <option value="15">15 Days</option>
                    <option value="30">30 Days</option>
                    <option value="60">60 Days</option>
                  </select>
                </div>
              )}

              {localExchangeType === "sell" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    id="add-price"
                    type="number"
                    placeholder="0.00"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="add-description"
                rows="4"
                placeholder="Describe the book..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            {localError && <p className="text-red-600 text-sm">{localError}</p>}

            <div className="flex items-center space-x-4 pt-4">
              <button
                onClick={handleClose}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={localLoading}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
              >
                {localLoading ? "Saving..." : "Add Book"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const EditBookModal = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleImageSelect = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setSelectedImage(reader.result);
        reader.readAsDataURL(file);
      }
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = () => setIsDragging(false);

    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleImageSelect({ target: { files: [file] } });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Edit Book</h2>
            <button onClick={handleCloseEdit} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Book Cover (optional - leave empty to keep current)
              </label>
              <input
                id="edit-cover-image"
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <div
                onClick={() => document.getElementById('edit-cover-image').click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
                  isDragging ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-500"
                }`}
              >
                {selectedImage ? (
                  <div className="relative">
                    <img src={selectedImage} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : editingBook?.coverImage ? (
                  <div className="relative">
                    <img
                      src={`data:image/jpeg;base64,${editingBook.coverImage}`}
                      alt="Current cover"
                      className="max-h-64 mx-auto rounded-lg"
                    />
                    <p className="text-sm text-gray-500 mt-4">Click to change or drag and drop</p>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Click to change photo or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book Title *
                </label>
                <input
                  id="edit-title"
                  type="text"
                  defaultValue={editingBook?.title}
                  placeholder="Enter book title"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </label>
                <input
                  id="edit-author"
                  type="text"
                  defaultValue={editingBook?.author}
                  placeholder="Enter author name"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Genre *
                </label>
                <select
                  id="edit-genre"
                  defaultValue={editingBook?.genre}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select genre</option>
                  <option value="fiction">Fiction</option>
                  <option value="programming">Programming & Coding</option>
                  <option value="ai-ml">AI & Machine Learning</option>
                  <option value="data-science">Data Science</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Condition *
                </label>
                <select
                  id="edit-condition"
                  defaultValue={editingBook?.condition}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select condition</option>
                  <option value="like-new">Like New</option>
                  <option value="good">Good</option>
                  <option value="acceptable">Acceptable</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exchange Type *
                </label>
                <select
                  value={exchangeType}
                  onChange={(e) => setExchangeType(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select type</option>
                  <option value="exchange">Exchange</option>
                  <option value="donate">Donate</option>
                  <option value="sell">Sell</option>
                </select>
              </div>

              {exchangeType === "exchange" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exchange Duration *
                  </label>
                  <select
                    id="edit-duration"
                    defaultValue={editingBook?.exchangeDuration}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select duration</option>
                    <option value="15">15 Days</option>
                    <option value="30">30 Days</option>
                    <option value="60">60 Days</option>
                  </select>
                </div>
              )}

              {exchangeType === "sell" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price *
                  </label>
                  <input
                    id="edit-price"
                    type="number"
                    defaultValue={editingBook?.price}
                    placeholder="0.00"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="edit-description"
                rows="4"
                defaultValue={editingBook?.description}
                placeholder="Describe the book..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              ></textarea>
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex items-center space-x-4 pt-4">
              <button
                onClick={handleCloseEdit}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Book"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
            MY Books
          </h2>
          <div className="flex items-center space-x-2">
            <button className="text-sm px-3 py-1 bg-amber-100 text-amber-700 rounded-md">Manage</button>
            <button onClick={() => setShowAddBookModal(true)} className="text-sm px-3 py-1 bg-amber-600 text-white rounded-md">Add Book</button>
          </div>
        </div>

        <div
          className="overflow-x-auto -mx-4 px-4 pb-4 snap-x snap-mandatory scroll-smooth"
          aria-label="My books carousel"
        >
          <div className="flex space-x-4">
            {myBooks
              .map((book, INDEX) => (
                <div
                  key={INDEX}
                  className="min-w-[220px] md:min-w-[260px] lg:min-w-[300px] bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-all duration-200 snap-start flex-shrink-0"
                >
                  <div className="w-full h-40 md:h-48 overflow-hidden bg-gray-100">
                    <img
                      src={`data:image/jpeg;base64,${book.coverImage}`}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-3">
                    <h3 className="font-medium text-gray-900 text-sm md:text-base truncate">{book.title}</h3>
                    <p className="text-xs md:text-sm text-gray-500 mt-1">by {book.author}</p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-3 text-xs text-gray-500">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          <span>{book.views ?? 0}</span>
                        </div>
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          <span>{book.requests ?? 0}</span>
                        </div>
                        <div className="flex items-center">
                          <Heart className="h-4 w-4 mr-1" />
                          <span>{book.favorites ?? 0}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button 
                          className="px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 transition-colors duration-200"
                          onClick={() => handleEditClick(book)}
                        >
                          Edit
                        </button>
                        <button 
                          className="px-2 py-1 text-xs border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200" 
                          onClick={() => { handleDelete(book) }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            {myListings.filter(b => myBooks.some(m => m._id === b._id)).length === 0 && (
              <div className="min-w-[220px] md:min-w-[260px] lg:min-w-[300px] bg-gray-50 rounded-lg border border-dashed border-gray-200 flex items-center justify-center p-6 snap-start flex-shrink-0">
                <div className="text-center">
                  <p className="text-sm text-gray-500">No books yet</p>
                  <button onClick={() => setShowAddBookModal(true)} className="mt-3 px-3 py-1 bg-amber-600 text-white rounded-md text-sm">Add your first book</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 ">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
              Explore
            </h2>
            <button
              onClick={() => setActiveTab('listings')}
              className="flex items-center text-green-600 hover:text-green-700 font-medium text-sm transition-colors duration-200"
            >
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto snap-x snap-mandatory scroll-smooth" aria-label="Explore books carousel">
          <div className="flex space-x-4 h-full">
            {myListings
              .filter(b => (logDecode.id != b.owner))
              .map((book) => (
                <div
                  key={book._id}
                  className="min-w-[120px] md:min-w-[260px] lg:min-w-[300px] bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] border border-gray-100 w-65 h-90 flex-shrink-0 snap-start m-5 "
                >
                  <div className="w-80 h-40 overflow-hidden rounded-t-xl bg-gray-100 relative ">
                    <img
                      src={`data:image/jpeg;base64,${book.coverImage}`}
                      alt={book.title}
                      className="w-full h-full object-cover"
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
                        <span className="text-sm text-gray-700">{book.title}</span>
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
              ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-amber-600" />
              Recent Requests
            </h2>
            <button
              onClick={() => setActiveTab('requests')}
              className="text-amber-600 hover:text-amber-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentRequests.slice(0, 3).map((request) => (
                <div key={request.id} className="p-4 rounded-lg border border-gray-200 hover:border-amber-300 transition-colors duration-200">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{request.requester}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                        {request.requesterRating}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{request.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Requested: {request.bookTitle}</p>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{request.message}</p>
                  <div className="flex items-center space-x-2">
                    <button className="flex-1 px-3 py-1.5 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-amber-700 transition-colors duration-200">
                      Accept
                    </button>
                    <button className="flex-1 px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors duration-200">
                      Decline
                    </button>
                  </div>
                </div>
              ))}

              {recentRequests.length === 0 && (
                <div className="p-6 text-center text-sm text-gray-500">
                  No recent requests.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-6 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Ready to share more books?</h3>
            <p className="text-blue-100">Add new listings and reach more readers in your community</p>
          </div>
          <button
            onClick={() => setShowAddBookModal(true)}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-200 flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Book
          </button>
        </div>
      </div>
    </div>
  );

  const renderListings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-400" />
            <select className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500">
              <option>All Status</option>
              <option>Active</option>
              <option>Pending</option>
              <option>Completed</option>
            </select>
            <select className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500">
              <option>All Types</option>
              <option>Exchange</option>
              <option>Donate</option>
              <option>Sell</option>
            </select>
          </div>

          <button
            onClick={() => setShowAddBookModal(true)}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors duration-200 flex items-center justify-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Book
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myListings
          .filter(b => (logDecode.id != b.owner))
          .map((book) => (
            <div
              key={book._id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.02] border border-gray-100 w-full max-w-sm mx-auto"
            >
              <div className="w-full h-56 overflow-hidden rounded-t-xl bg-gray-100">
                <img
                  src={`data:image/jpeg;base64,${book.coverImage}`}
                  alt={book.title}
                  className="w-full h-full object-cover"
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
                    <span className="text-sm text-gray-700">{book.title}</span>
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
          ))}
      </div>
    </div>
  );

  const renderRequests = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Book Requests</h2>
            <span className="text-sm text-gray-500">{recentRequests.length} pending requests</span>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {recentRequests.map((request) => (
            <div key={request.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{request.requester}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                        {request.requesterRating} rating
                        <span className="mx-2">•</span>
                        <Clock className="h-3 w-3 mr-1" />
                        {request.time}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-1">Requested Book:</p>
                    <p className="text-sm text-gray-900 font-bold">{request.bookTitle}</p>
                  </div>

                  <p className="text-gray-600 text-sm">{request.message}</p>
                </div>

                <div className="flex md:flex-col items-center md:items-end space-x-2 md:space-x-0 md:space-y-2">
                  {request.status === 'pending' ? (
                    <>
                      <button className="flex-1 md:flex-none w-full md:w-auto px-6 py-2 bg-amber-600 text-white rounded-lg font-medium hover:bg-amber-700 transition-colors duration-200 flex items-center justify-center">
                        <Check className="h-4 w-4 mr-2" />
                        Accept
                      </button>
                      <button className="flex-1 md:flex-none w-full md:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                        Decline
                      </button>
                      <button className="px-4 py-2 text-amber-600 hover:text-amber-700 transition-colors duration-200">
                        <MessageCircle className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm font-medium">
                      Accepted
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Performance Overview</h2>
        <div className="h-64 flex items-center justify-center text-gray-400">
          <div className="text-center">
            <BarChart3 className="h-16 w-16 mx-auto mb-4" />
            <p>Analytics chart would go here</p>
          </div>
        </div>
      </div>
    </div>
  );

  const [earnings, setEarnings] = useState([]);
  const renderEarnings = () => (

    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Transaction History</h2>
          <button className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-medium">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {earnings.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{transaction.book}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{transaction.type}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{transaction.amount}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );


  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'listings':
        return renderListings();
      case 'requests':
        return renderRequests();
      case 'analytics':
        return renderAnalytics();
      case 'earnings':
        return renderEarnings();
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

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {showAddBookModal && <AddBookModal />}
      {showEditModal && <EditBookModal />}
    </div>
  );
}