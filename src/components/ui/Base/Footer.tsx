import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaTiktok,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#232323] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="mb-6 border-r border-gray-600 md:border-r-0 md:pr-8 flex flex-col">
            {/* Title and Description */}
            <h2 className="text-2xl font-bold mb-2">Amerta Coffee</h2>
            <p className="text-gray-400 mb-4">
              Experience the finest selection of Indonesian coffee at Amerta
              Coffee. Our premium range offers a blend of flavors to satisfy
              every taste.
            </p>

            {/* Social Media Links */}
            <h3 className="text-lg font-semibold mt-4 mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <FaTiktok className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Help Links */}
          <div className="mb-6 border-r border-gray-600 md:border-r-0 md:px-24">
            <h3 className="text-lg font-semibold mb-2">Help</h3>
            <ul className="space-y-1">
              <li>
                <Link
                  to="#"
                  className="block py-1 text-gray-400 hover:text-gray-300"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-1 text-gray-400 hover:text-gray-300"
                >
                  Career at Amerta
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-1 text-gray-400 hover:text-gray-300"
                >
                  Exchange and Return
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-1 text-gray-400 hover:text-gray-300"
                >
                  Terms and Conditions
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-1 text-gray-400 hover:text-gray-300"
                >
                  Payment and Shipping
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="block py-1 text-gray-400 hover:text-gray-300"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="mb-6 md:px-8 flex flex-col space-y-6">
            {/* Call Center */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Call Center</h3>
              <div className="flex flex-col space-y-3">
                <a
                  href="tel:+1234567890"
                  className="flex items-center text-gray-400 hover:text-gray-300"
                >
                  <FaPhone className="mr-2" /> 123-456-7890
                </a>
                <a
                  href="mailto:support@amerta.coffee"
                  className="flex items-center text-gray-400 hover:text-gray-300"
                >
                  <FaEnvelope className="mr-2" /> support@amerta.coffee
                </a>
              </div>
            </div>

            {/* Marketplaces */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Our Marketplaces</h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-16 h-16"
                >
                  <img
                    src="/img/marketplace-bukalapak.webp"
                    alt="Bukalapak"
                    className="w-full h-full object-cover"
                  />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-16 h-16"
                >
                  <img
                    src="/img/marketplace-tokopedia.webp"
                    alt="Tokopedia"
                    className="w-full h-full object-cover"
                  />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-16 h-16"
                >
                  <img
                    src="/img/marketplace-lazada.webp"
                    alt="Lazada"
                    className="w-full h-full object-cover"
                  />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-16 h-16"
                >
                  <img
                    src="/img/marketplace-shopee.webp"
                    alt="Shopee"
                    className="w-full h-full object-cover"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <hr className="border-gray-600 my-8" />
        <div className="text-center mt-8 text-gray-400">
          <p>© 2024 Zacky Achmad. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
