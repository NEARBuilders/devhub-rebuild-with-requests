import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between w-full">
            <Link to="/" className="text-white font-bold text-xl">
              near/dev/hub
            </Link>
            <div className="hidden md:flex space-x-4 ml-8">
              <Link to="/proposals" className="text-gray-300 hover:text-white">
                /proposals
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/proposals"
              className="block text-gray-300 hover:text-white px-3 py-2"
              onClick={() => setIsOpen(false)}
            >
              /proposals
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
