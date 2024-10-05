import { useState } from "react";
import { useNavigate, Link, Form } from "react-router-dom";
import { FaUser, FaShoppingCart, FaSearch, FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMenu = () => setIsOpen(!isOpen);

  const logout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
      auth.logout();

      Swal.fire({
        icon: "success",
        title: "Logout Successful!",
        text: "You have been logged out of your account!",
        confirmButtonText: "OK!",
        confirmButtonColor: "#986B54",
      });

      navigate("/login");
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery)}`, {
        state: { fromSearch: true },
      });
    } else {
      navigate("/products", { state: { fromSearch: true } });
    }
  };

  return (
    <nav className="bg-[#232323] text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center text-xl font-semibold">
            <img src="/img/logo.svg" alt="Logo" className="w-12 h-12" />
            <span className="ml-2">Amerta Coffee</span>
          </Link>
        </div>

        {/* Search Form */}
        <div className="hidden lg:flex flex-1 justify-center mx-6">
          <Form
            method="get"
            onSubmit={handleSearchSubmit}
            className="flex w-full max-w-lg items-center space-x-2"
          >
            <Input
              type="text"
              placeholder="Find your favorite coffee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 px-4 rounded-lg text-black focus:outline-none"
            />
            <Button
              type="submit"
              className="bg-gray-600 text-white rounded-lg hover:bg-gray-500"
            >
              <FaSearch className="w-5 h-5" />
            </Button>
          </Form>
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
          {auth.isLoggedIn ? (
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center space-x-2 px-3 py-2 rounded-none bg-transparent hover:bg-transparent hover:text-gray-300">
                  <FaUser className="w-5 h-5 hover:text-gray-300" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/profile">
                  <DropdownMenuItem className="hover:bg-transparent">
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem
                  onClick={logout}
                  className="hover:bg-transparent"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-2 px-3 py-2 rounded"
            >
              <FaUser className="w-5 h-5 hover:text-gray-300" />
            </Link>
          )}
          <Link
            to={auth.isLoggedIn ? "/carts" : "/login"}
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
          <div className="flex flex-col items-start space-y-4 py-4 px-6">
            <Form
              method="get"
              onSubmit={handleSearchSubmit}
              className="flex w-full max-w-lg items-center space-x-2 my-2"
            >
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-2 px-4 rounded-lg text-black focus:outline-none"
              />
              <Button
                type="submit"
                className="bg-gray-600 text-white rounded-lg hover:bg-gray-500"
              >
                <FaSearch className="w-5 h-5" />
              </Button>
            </Form>
            {auth.isLoggedIn ? (
              <div className="flex w-full">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button className="flex items-start space-x-2 px-3 py-2 rounded-none bg-transparent hover:bg-transparent text-white w-auto">
                      <FaUser className="w-5 h-5 hover:text-gray-300" />
                      <span>My Account</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to="/profile">
                      <DropdownMenuItem className="hover:bg-transparent">
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem
                      onClick={logout}
                      className="hover:bg-transparent"
                    >
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-3 py-2 rounded text-white w-auto"
              >
                <FaUser className="w-5 h-5 hover:text-gray-300" />
                <span>Login</span>
              </Link>
            )}
            <Link
              to={auth.isLoggedIn ? "/carts" : "/login"}
              className="flex items-center space-x-2 px-3 py-2 rounded text-white w-full"
            >
              <FaShoppingCart className="w-5 h-5 hover:text-gray-300" />
              <span>Cart</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
