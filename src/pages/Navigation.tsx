import React from 'react'
import { useEffect,useState } from 'react';
import { Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
function Navigation() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user_data");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_data");
    navigate("/");
  };
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2 text-blue-600">
              <Building className="h-8 w-8" />
              <span className="text-xl font-bold">TenderHub</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link to="/dashboard" className="text-blue-600 font-medium">Dashboard</Link>
              <Link to="/tenders" className="text-gray-600 hover:text-blue-600">Tenders</Link>
              <Link to="/companies" className="text-gray-600 hover:text-blue-600">Companies</Link>
              <Link to="/profile" className="text-gray-600 hover:text-blue-600">Profile</Link>
            </nav>
          </div>
          {user ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <div className="space-x-2">
              <Button variant="outline" onClick={() => navigate("/login")}>Sign In</Button>
              <Button onClick={() => navigate("/register")}>Create Account</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navigation
