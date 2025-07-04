
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building, Search, MapPin, Users, Globe, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Companies = () => {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");
    
    if (!authToken || !userData) {
      navigate("/login");
      return;
    }
    
    setUser(JSON.parse(userData));
  }, [navigate]);

  const mockCompanies = [
    {
      id: 1,
      name: "Tech Innovations Inc",
      industry: "Technology",
      description: "Leading software development company specializing in enterprise solutions and mobile applications.",
      location: "San Francisco, CA",
      employees: "201-500",
      website: "www.techinnovations.com",
      email: "contact@techinnovations.com",
      services: ["Software Development", "Mobile Apps", "Cloud Solutions", "AI/ML"],
      logo: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Creative Marketing Solutions",
      industry: "Marketing",
      description: "Full-service marketing agency helping brands create impactful campaigns and digital experiences.",
      location: "New York, NY",
      employees: "51-200",
      website: "www.creativemarketingsol.com",
      email: "hello@creativemarketingsol.com",
      services: ["Digital Marketing", "Brand Strategy", "Content Creation", "Social Media"],
      logo: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Global Supply Chain Ltd",
      industry: "Logistics",
      description: "International logistics and supply chain management company with global reach.",
      location: "Chicago, IL",
      employees: "501-1000",
      website: "www.globalsupplychain.com",
      email: "info@globalsupplychain.com",
      services: ["Logistics", "Supply Chain", "Warehousing", "Distribution"],
      logo: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Green Energy Solutions",
      industry: "Energy",
      description: "Renewable energy company focused on solar and wind power solutions for businesses.",
      location: "Austin, TX",
      employees: "101-200",
      website: "www.greenenergysol.com",
      email: "contact@greenenergysol.com",
      services: ["Solar Power", "Wind Energy", "Energy Consulting", "Installation"],
      logo: "/placeholder.svg"
    }
  ];

  const filteredCompanies = mockCompanies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-blue-600">
                <Building className="h-8 w-8" />
                <span className="text-xl font-bold">TenderHub</span>
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
                <Link to="/tenders" className="text-gray-600 hover:text-blue-600">Tenders</Link>
                <Link to="/companies" className="text-blue-600 font-medium">Companies</Link>
                <Link to="/profile" className="text-gray-600 hover:text-blue-600">Profile</Link>
              </nav>
            </div>
            <Button onClick={() => {
              localStorage.removeItem("auth_token");
              localStorage.removeItem("user_data");
              navigate("/");
            }}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
          <p className="text-gray-600 mt-2">Discover and connect with companies in your industry</p>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search companies by name, industry, or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Building className="h-8 w-8 text-gray-400" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{company.name}</CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Badge variant="outline" className="mr-2">{company.industry}</Badge>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{company.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{company.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Globe className="h-4 w-4 mr-2" />
                    <span>{company.website}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{company.email}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm">View Profile</Button>
                  <Button size="sm">Contact</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">No companies found matching your search criteria.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Companies;
