import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingCart, FaSearch, FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-[#232323] text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <img src="/logo.svg" alt="Logo" className="w-12 h-12" />
          <Link to="/" className="text-xl font-semibold">
            Amerta Coffee
          </Link>
        </div>

        {/* Search Form */}
        <div className="hidden lg:flex flex-1 justify-center mx-6">
          <form className="flex w-full max-w-lg items-center space-x-2">
            <Input
              type="text"
              placeholder="Find your favorite coffee..."
              className="w-full py-2 px-4 rounded-lg text-black focus:outline-none"
            />
            <Button
              type="submit"
              className="bg-gray-600 text-white rounded-lg hover:bg-gray-500"
            >
              <FaSearch className="w-5 h-5" />
            </Button>
          </form>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <IoMdClose className="w-6 h-6" />
          ) : (
            <FaBars className="w-6 h-6" />
          )}
        </button>

        {/* Menu (Desktop) */}
        <div className="hidden lg:flex lg:items-center lg:space-x-4">
          <Link
            to="/"
            className="flex items-center space-x-2 px-3 py-2 rounded"
          >
            <FaUser className="w-5 h-5 hover:text-gray-300" />
          </Link>
          <Link
            to="/products"
            className="flex items-center space-x-2 px-3 py-2 rounded"
          >
            <FaShoppingCart className="w-5 h-5 hover:text-gray-300" />
          </Link>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-16 left-0 w-full bg-[#232323] ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col items-center space-y-4 py-4 px-6">
            <div className="flex w-full max-w-lg items-center space-x-2 my-2">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full py-2 px-4 rounded-lg text-black focus:outline-none"
              />
              <Button
                type="submit"
                className="bg-gray-600 text-white rounded-lg hover:bg-gray-500"
              >
                <FaSearch className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex flex-col w-full">
              <Link
                to="/"
                className="flex items-center space-x-2 px-3 py-2 rounded text-white w-full"
              >
                <FaUser className="w-5 h-5 hover:text-gray-300" />
                <span>Profile</span>
              </Link>
              <Link
                to="/products"
                className="flex items-center space-x-2 px-3 py-2 rounded text-white w-full"
              >
                <FaShoppingCart className="w-5 h-5 hover:text-gray-300" />
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
