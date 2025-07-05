
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Search, FileText, Users, ArrowRight, Calendar, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Mock data for featured tenders
  const featuredTenders = [
    {
      id: 1,
      title: "Cloud Infrastructure Migration",
      company: "TechCorp Solutions",
      budget: "$50,000 - $75,000",
      deadline: "2024-08-15",
      description: "Looking for experienced cloud migration specialists to help transition our legacy systems to AWS infrastructure.",
      industry: "Technology"
    },
    {
      id: 2,
      title: "Marketing Campaign Development",
      company: "GreenLife Industries",
      budget: "$25,000 - $40,000",
      deadline: "2024-07-30",
      description: "Seeking creative agency to develop comprehensive digital marketing campaign for sustainable products launch.",
      industry: "Manufacturing"
    },
    {
      id: 3,
      title: "Financial Audit Services",
      company: "RetailMax Chain",
      budget: "$15,000 - $25,000",
      deadline: "2024-08-10",
      description: "Required: Certified accounting firm for annual financial audit and compliance review.",
      industry: "Retail"
    }
  ];

  const stats = [
    { label: "Active Tenders", value: "1,247", icon: FileText },
    { label: "Registered Companies", value: "3,891", icon: Building },
    { label: "Successful Matches", value: "856", icon: Users },
    { label: "Total Value", value: "$12.4M", icon: DollarSign }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <Navigation/>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connect. Compete. 
              <span className="text-blue-600"> Succeed.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              The premier B2B tender management platform where companies discover opportunities, 
              showcase capabilities, and build lasting business relationships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/tenders">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Search className="mr-2 h-4 w-4" />
                  Browse Tenders
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How TenderHub Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple steps to connect with business opportunities
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-gray-600">Register your company and showcase your capabilities, experience, and services.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Opportunities</h3>
              <p className="text-gray-600">Browse and search for tenders that match your expertise and business goals.</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Submit Proposals</h3>
              <p className="text-gray-600">Apply to relevant tenders with compelling proposals and win new business.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building className="h-6 w-6" />
                <span className="text-xl font-bold">TenderHub</span>
              </div>
              <p className="text-gray-400">
                Connecting businesses through transparent and efficient tender management.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/tenders" className="hover:text-white transition-colors">Browse Tenders</Link></li>
                <li><Link to="/companies" className="hover:text-white transition-colors">Find Companies</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/news" className="hover:text-white transition-colors">News</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 TenderHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
