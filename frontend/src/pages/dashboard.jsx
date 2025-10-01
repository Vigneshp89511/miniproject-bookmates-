import { useState } from 'react';
import { BookOpen, Search, Star, Clock, TrendingUp, BookMarked, User, Settings, Plus, Edit2 } from 'lucide-react';

export default function BookReaderDashboard() {
  const [activeTab, setActiveTab] = useState('library');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateBookId, setUpdateBookId] = useState(null);
  const [newPageNumber, setNewPageNumber] = useState('');

  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop',
      progress: 65,
      rating: 4.5,
      pages: 304,
      currentPage: 198,
      genre: 'Fiction',
      lastRead: '2 hours ago'
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=300&h=400&fit=crop',
      progress: 45,
      rating: 5,
      pages: 320,
      currentPage: 144,
      genre: 'Self-Help',
      lastRead: '1 day ago'
    },
    {
      id: 3,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      cover: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop',
      progress: 100,
      rating: 5,
      pages: 496,
      currentPage: 496,
      genre: 'Sci-Fi',
      lastRead: '1 week ago'
    },
    {
      id: 4,
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      cover: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=400&fit=crop',
      progress: 20,
      rating: 4,
      pages: 256,
      currentPage: 51,
      genre: 'Finance',
      lastRead: '3 days ago'
    },
    {
      id: 5,
      title: 'Dune',
      author: 'Frank Herbert',
      cover: 'https://images.unsplash.com/photo-1618328474084-6dc03c0e8a56?w=300&h=400&fit=crop',
      progress: 30,
      rating: 4.5,
      pages: 688,
      currentPage: 206,
      genre: 'Sci-Fi',
      lastRead: '5 hours ago'
    },
    {
      id: 6,
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop',
      progress: 80,
      rating: 5,
      pages: 443,
      currentPage: 354,
      genre: 'History',
      lastRead: '6 hours ago'
    }
  ]);

  const stats = {
    booksRead: 24,
    currentlyReading: 4,
    totalPages: 8432,
    readingStreak: 15
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  const handleOpenUpdateModal = (bookId) => {
    const book = books.find(b => b.id === bookId);
    setUpdateBookId(bookId);
    setNewPageNumber(book.currentPage.toString());
    setShowUpdateModal(true);
  };

  const handleUpdateProgress = () => {
    const pageNum = parseInt(newPageNumber);
    const book = books.find(b => b.id === updateBookId);
    
    if (isNaN(pageNum) || pageNum < 0 || pageNum > book.pages) {
      alert(`Please enter a valid page number between 0 and ${book.pages}`);
      return;
    }

    const updatedBooks = books.map(b => {
      if (b.id === updateBookId) {
        const progress = Math.round((pageNum / b.pages) * 100);
        return {
          ...b,
          currentPage: pageNum,
          progress: progress,
          lastRead: 'Just now'
        };
      }
      return b;
    });

    setBooks(updatedBooks);
    setShowUpdateModal(false);
    setNewPageNumber('');
    setUpdateBookId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <BookOpen className="text-indigo-600" size={32} />
              <h1 className="text-2xl font-bold text-gray-900">BookVerse</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <Settings className="text-gray-600" size={20} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <User className="text-gray-600" size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Books Read</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.booksRead}</p>
              </div>
              <BookMarked className="text-indigo-500" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Currently Reading</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.currentlyReading}</p>
              </div>
              <BookOpen className="text-purple-500" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total Pages</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalPages}</p>
              </div>
              <TrendingUp className="text-pink-500" size={32} />
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Reading Streak</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.readingStreak} days</p>
              </div>
              <Clock className="text-orange-500" size={32} />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('library')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === 'library'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                My Library
              </button>
              <button
                onClick={() => setActiveTab('reading')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === 'reading'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Currently Reading
              </button>
              <button
                onClick={() => setActiveTab('finished')}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                  activeTab === 'finished'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Finished
              </button>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search books or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks
            .filter(book => {
              if (activeTab === 'reading') return book.progress > 0 && book.progress < 100;
              if (activeTab === 'finished') return book.progress === 100;
              return true;
            })
            .map(book => (
              <div
                key={book.id}
                onClick={() => setSelectedBook(book)}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition cursor-pointer overflow-hidden"
              >
                <div className="flex p-4">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-24 h-32 object-cover rounded-lg shadow-md"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{book.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">{book.author}</p>
                    <div className="flex items-center space-x-1 mb-2">
                      {renderStars(book.rating)}
                    </div>
                    <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                      {book.genre}
                    </span>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>{book.currentPage} / {book.pages} pages</span>
                        <span>{book.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all"
                          style={{ width: `${book.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-2">Last read: {book.lastRead}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenUpdateModal(book.id);
                      }}
                      className="ml-3 p-2 bg-indigo-100 hover:bg-indigo-200 rounded-lg transition"
                      title="Update reading progress"
                    >
                      <Edit2 size={18} className="text-indigo-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {filteredBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-500">No books found</p>
          </div>
        )}
      </div>

      {/* Book Detail Modal */}
      {selectedBook && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedBook(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex mb-4">
              <img
                src={selectedBook.cover}
                alt={selectedBook.title}
                className="w-32 h-44 object-cover rounded-lg shadow-lg"
              />
              <div className="ml-4 flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedBook.title}</h2>
                <p className="text-gray-600 mb-3">{selectedBook.author}</p>
                <div className="flex items-center space-x-1 mb-3">
                  {renderStars(selectedBook.rating)}
                  <span className="text-sm text-gray-600 ml-2">({selectedBook.rating})</span>
                </div>
                <span className="inline-block bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full">
                  {selectedBook.genre}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress: {selectedBook.currentPage} / {selectedBook.pages} pages</span>
                <span className="font-semibold">{selectedBook.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
                  style={{ width: `${selectedBook.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedBook(null);
                  handleOpenUpdateModal(selectedBook.id);
                }}
                className="flex-1 bg-white border-2 border-indigo-500 text-indigo-600 font-semibold py-3 rounded-lg hover:bg-indigo-50 transition"
              >
                Update Progress
              </button>
              <button
                onClick={() => setSelectedBook(null)}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition"
              >
                Continue Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Progress Modal */}
      {showUpdateModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => {
            setShowUpdateModal(false);
            setNewPageNumber('');
            setUpdateBookId(null);
          }}
        >
          <div
            className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center mb-4">
              <BookOpen className="text-indigo-600 mr-3" size={28} />
              <h2 className="text-2xl font-bold text-gray-900">Update Reading Progress</h2>
            </div>
            
            {updateBookId && (
              <div className="mb-6">
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold">{books.find(b => b.id === updateBookId)?.title}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Total pages: {books.find(b => b.id === updateBookId)?.pages}
                </p>
              </div>
            )}

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Page Number
              </label>
              <input
                type="number"
                min="0"
                max={books.find(b => b.id === updateBookId)?.pages}
                value={newPageNumber}
                onChange={(e) => setNewPageNumber(e.target.value)}
                placeholder="Enter page number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2">
                Enter the page you're currently on in your physical book
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowUpdateModal(false);
                  setNewPageNumber('');
                  setUpdateBookId(null);
                }}
                className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProgress}
                className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}