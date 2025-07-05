
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Building, Search, MapPin, Globe, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
const Companies = () => {
  const [user, setUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [mockCompanies, setmockCompanies] = useState([]);
  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");

    if (!authToken || !userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));

    const fetchcompanies = async () => {
      try {
        const res = await fetch('https://tenderhub-backend.onrender.com/api/get-all');
        if (!res.ok) {
          throw new Error("Failed to fetch tenders of the user");
        }
        const data = await res.json();
        setmockCompanies(data);
      } catch (err) {
        console.error("Error fetching tenders:", err);
      }
    }
    fetchcompanies()
  }, [navigate]);


useEffect(() => {
  console.log(mockCompanies);
}, [mockCompanies]);

  const filteredCompanies = mockCompanies.filter(company =>
    company.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navigation />

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
                    <CardTitle className="text-xl">{company.company}</CardTitle>
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
