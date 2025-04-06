
import { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Sun,
  Moon,
  Settings,
  User
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import supabase from '../config/supabase';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, session } = useAuth()

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <header className="bg-card py-2 px-4 md:px-6 lg:px-8 shadow-sm border-b">
      <div className="mx-auto flex items-center justify-between h-14">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>

          <Link to="/" className="flex items-center space-x-2">
            <span className="w-8 h-8 bg-earth-green-DEFAULT text-white rounded-full flex items-center justify-center font-bold text-lg">
              CC
            </span>
            <span className="font-bold text-lg hidden sm:inline-flex text-earth-green-DEFAULT">CropCircle Connect</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground hover:text-earth-green-DEFAULT font-medium">
            Dashboard
          </Link>
          <Link to="/requests" className="text-foreground hover:text-earth-green-DEFAULT font-medium">
            Buyer Requests
          </Link>
          <Link to="/practices" className="text-foreground hover:text-earth-green-DEFAULT font-medium">
            Eco Practices
          </Link>
          <Link to="/carbon-credits" className="text-foreground hover:text-earth-green-DEFAULT font-medium">
            Carbon Credits
          </Link>
        </nav>

        <div className="flex items-center space-x-1 md:space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-foreground"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </Button>

          <div>
            {user ? (
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="border-2 border-earth-green-DEFAULT rounded-full overflow-hidden">
                  <div className="w-6 h-6 bg-earth-green-light flex items-center justify-center rounded-full">
                    <User size={16} className="text-earth-green-dark" />
                  </div>
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" className="border-2 border-earth-green-DEFAULT rounded-full overflow-hidden">
                  <div className="w-6 h-6 bg-earth-green-light flex items-center justify-center rounded-full">
                    <User size={16} className="text-earth-green-dark" />
                  </div>
                </Button>
              </Link>
            )}
          </div>

          {/* <Link to="/profile">
            <Button variant="ghost" size="icon" className="border-2 border-earth-green-DEFAULT rounded-full overflow-hidden">
              <div className="w-6 h-6 bg-earth-green-light flex items-center justify-center rounded-full">
                <User size={16} className="text-earth-green-dark" />
              </div>
            </Button>
          </Link> */}
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-background border-t pt-4 pb-6 px-4 mt-2 animate-grow-up">
          <ul className="space-y-4">
            <li>
              <Link to="/" className="block py-2 text-foreground hover:text-earth-green-DEFAULT font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/practices" className="block py-2 text-foreground hover:text-earth-green-DEFAULT font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Eco Practices
              </Link>
            </li>
            <li>
              <Link to="/requests" className="block py-2 text-foreground hover:text-earth-green-DEFAULT font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Buyer Requests
              </Link>
            </li>
            <li>
              <Link to="/carbon-credits" className="block py-2 text-foreground hover:text-earth-green-DEFAULT font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Carbon Credits
              </Link>
            </li>
            <li>
              <Link to="/profile" className="block py-2 text-foreground hover:text-earth-green-DEFAULT font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                My Profile
              </Link>
            </li>
            <li>
              <Link to="/settings" className="block py-2 text-foreground hover:text-earth-green-DEFAULT font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
