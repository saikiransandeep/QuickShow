import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const searchInputRef = useRef(null);

  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      triggerSearch();
    }
  };

  // Helper function to trigger search and reset state
  const triggerSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery.trim()}`);
      setSearchQuery("");
      setShowMobileSearch(false);
      setIsOpen(false);
      scrollTo(0, 0);
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between pl-4 pr-4 md:pl-8 md:pr-8 py-3 bg-black/25 backdrop-blur-sm">
      {/* LEFT: Logo - pushed to absolute leftmost */}
      <Link to="/" className="flex-shrink-0 z-10">
        <img src={assets.logo} alt="QuickShow Logo" className="w-32 h-auto" />
      </Link>

      {/* CENTER: Navigation Menu */}
      <div
        className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium max-md:text-lg z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 md:px-8 py-2 max-md:h-screen md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${
          isOpen ? "max-md:w-full" : "max-md:w-0"
        }`}
      >
        <XIcon
          className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />

        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/"
          className="transition-all duration-200 hover:scale-110 hover:-translate-y-1 hover:text-primary"
        >
          Home
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/movies"
          className="transition-all duration-200 hover:scale-110 hover:-translate-y-1 hover:text-primary"
        >
          Movies
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/releases"
          className="transition-all duration-200 hover:scale-110 hover:-translate-y-1 hover:text-primary"
        >
          Releases
        </Link>
        <Link
          onClick={() => {
            scrollTo(0, 0);
            setIsOpen(false);
          }}
          to="/favorite"
          className="transition-all duration-200 hover:scale-110 hover:-translate-y-1 hover:text-primary"
        >
          Favorites
        </Link>
      </div>

      {/* RIGHT: Search Bar + Login/Profile - pushed to absolute rightmost */}
      <div className="flex items-center gap-3 md:gap-4 flex-shrink-0 z-10">
        {/* Desktop Search bar - Always visible on desktop */}
        <div className="max-md:hidden flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <SearchIcon className="w-5 h-5 text-gray-300 flex-shrink-0" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search movies..."
            className="w-64 lg:w-80 bg-transparent outline-none text-white placeholder-gray-400 text-sm"
          />
        </div>

        {/* Mobile Search Icon */}
        <button
          onClick={() => setShowMobileSearch(!showMobileSearch)}
          className="md:hidden p-2 hover:bg-white/10 rounded-full transition"
        >
          <SearchIcon className="w-6 h-6" />
        </button>

        {/* Login/Profile button - Rightmost position */}
        {!user ? (
          <button
            onClick={openSignIn}
            className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer whitespace-nowrap"
          >
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<TicketPlus width={15} />}
                onClick={() => navigate("/my-bookings")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}

        {/* Mobile menu icon */}
        <MenuIcon
          className="md:hidden w-8 h-8 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      {/* Mobile Search Bar - Dropdown */}
      {showMobileSearch && (
        <div className="md:hidden absolute top-full left-0 right-0 p-4 bg-black/90 backdrop-blur-md border-b border-gray-700">
          <div className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-full border border-white/20">
            <SearchIcon className="w-5 h-5 text-gray-300 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search movies..."
              className="w-full bg-transparent outline-none text-white placeholder-gray-400"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={triggerSearch}
                className="px-4 py-1 bg-primary hover:bg-primary-dull rounded-full text-sm font-medium transition"
              >
                Search
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;