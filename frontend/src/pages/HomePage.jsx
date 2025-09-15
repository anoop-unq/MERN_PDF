
import { useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import SearchResults from '../components/SearchResults';
import { FaArrowLeft, FaSearch, FaTimes } from 'react-icons/fa';
import debounce from 'lodash/debounce';

const HomePage = () => {
  const { fetchPosts, searchUsers, searchResults, isSearching, clearSearchResults } = useContext(AppContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query && query.trim().length > 0) {
        searchUsers(query);
        setShowResults(true);
      } else {
        clearSearchResults();
        setShowResults(false);
      }
    }, 300),
    [searchUsers, clearSearchResults]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
    
    // Cleanup
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchQuery, debouncedSearch]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    clearSearchResults();
    setShowResults(false);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
    if (searchQuery && searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding results to allow for clicks on them
    setTimeout(() => {
      setIsSearchFocused(false);
      if (!searchQuery) {
        setShowResults(false);
      }
    }, 200);
  };

  const handleCloseResults = () => {
    setShowResults(false);
  };

  // Check if we should show "No users found"
  const shouldShowNoResults = searchQuery && !isSearching && searchResults.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="flex items-center justify-center bg-white text-gray-700 rounded-full p-3 w-12 h-12 hover:bg-gray-100 transition duration-200 ease-in-out shadow-sm border border-gray-200"
              aria-label="Go back"
            >
              <FaArrowLeft className="text-xl" />
            </button>
            <h1 className="text-xl font-bold ml-2 sm:text-2xl"></h1>
          </div>
          
          {/* Search Bar */}
          <div className={`relative ${isSearchFocused || searchQuery ? 'flex-grow max-w-md' : 'w-auto'}`}>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-gray-400">
                <FaSearch />
              </div>
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="w-full pl-10 pr-0 py-2.5 bg-gray-100 rounded-lg border-none focus:ring-2 focus:ring-gray-300 focus:bg-white focus:outline-none transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            
            {/* Search Results */}
            {(showResults || isSearching) && (
              <SearchResults 
                results={searchResults} 
                isSearching={isSearching}
                onClose={handleCloseResults}
                stable = {shouldShowNoResults}
              />
            )}
            
            {/* No results found */}
            {shouldShowNoResults && (
              <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg border border-gray-200 mt-1 z-20">
                <div className="p-4 text-center text-gray-500">
                  No user found
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main>
        <div className="max-w-2xl mx-auto px-4 py-6">
          <PostForm />
        </div>
        <div>
          <PostList />
        </div>
      </main>

      {/* Floating back button for mobile */}
      <div className="md:hidden fixed bottom-6 right-6">
        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center bg-blue-500 text-white rounded-full p-4 w-14 h-14 hover:bg-blue-600 transition duration-200 ease-in-out shadow-lg"
          aria-label="Go back"
        >
          <FaArrowLeft className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export default HomePage;