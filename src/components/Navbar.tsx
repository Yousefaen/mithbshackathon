
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Container from "./Container";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full py-4 bg-white/90 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-100">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="text-xl font-semibold text-gray-900">
              Project<span className="text-blue-600">.</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <a href="#" className="block text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </a>
            <a href="#" className="block text-gray-700 hover:text-blue-600 transition-colors">
              Features
            </a>
            <a href="#" className="block text-gray-700 hover:text-blue-600 transition-colors">
              About
            </a>
            <a href="#" className="block text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>
        )}
      </Container>
    </nav>
  );
};

export default Navbar;
