import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useWallet } from "../contexts/near";

function AuthButton() {
  const { wallet, signedAccountId } = useWallet();

  const handleSignIn = () => {
    try {
      wallet!.signIn();
    } catch (error) {
      console.error("Wallet not configured properly:", error);
    }
  };

  const handleSignOut = () => {
    try {
      wallet!.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (signedAccountId) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-gray-300">{signedAccountId}</span>
        <button
          onClick={handleSignOut}
          className="bg-orange-400 hover:bg-orange-400/80 text-white px-4 py-2 rounded-md transition-colors duration-200 ease-in-out"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleSignIn}
      className="bg-orange-400 hover:bg-orange-400/80 text-white px-4 py-2 rounded-md transition-colors duration-200 ease-in-out"
    >
      Sign In
    </button>
  );
}

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
            <div className="hidden md:flex items-center space-x-4 ml-8">
              <Link to="/proposals" className="text-gray-300 hover:text-white">
                /proposals
              </Link>
              <AuthButton />
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
            <div className="px-3 py-2">
              <AuthButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
