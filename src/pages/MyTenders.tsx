
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, DollarSign, MapPin, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
function MyTenders() {
  const [tenders, setTenders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTenders = async () => {
      const authToken = localStorage.getItem("auth_token");

      if (!authToken) {
        navigate("/login");
        return;
      }
      const data = localStorage.getItem('user_data');
      const parsedData = JSON.parse(data);
      console.log(parsedData)
      const userId = parsedData.id;

      try {
        const res = await fetch(`https://tenderhub-backend.onrender.com/api/application/${userId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch tenders of the user");
        }
        const data = await res.json();
        setTenders(data);
      } catch (err) {
        console.error("Error fetching tenders:", err);
      }
    };

    fetchTenders();
  }, [navigate]);

  const handleDeleteclick = async (tenderId: string) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this tender?");

      if (!confirmDelete) return;
      const res = await fetch(`https://tenderhub-backend.onrender.com/api/application/${tenderId}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        throw new Error("Failed to fetch tenders of the user");
      }
      const data = await res.json();
      if (!res.ok) {
        console.log('ERROR :: WHILE DELETING', res);
      }
      navigate('./');
    } catch (err) {
      console.error("Error fetching tenders:", err);
    }
  }


  const handleViewApplications = (tenderId: string) => {
    navigate(`/tender/${tenderId}`);
  };


  const filteredTenders = tenders.filter(tender =>
    tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tender.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tender.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleapplyclick = (id: string) => {
    navigate(`/apply/${id}`)
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tenders</h1>
            <p className="text-gray-600 mt-2">
              Browse and apply to available business opportunities
            </p>
          </div>
          <Button onClick={() => navigate('/create-tender')} className="flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Create Tender</span>
          </Button>
        </div>

        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tenders by title, company, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tenders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTenders.map((tender) => (
            <Card key={tender.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{tender.title}</CardTitle>
                    <CardDescription className="text-blue-600 font-medium">
                      {tender.company}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{tender.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>{tender.budget}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Deadline: {new Date(tender.deadline).toLocaleDateString("en-CA")}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span>{tender.location}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <Badge variant="outline">{tender.category}</Badge>
                  <div className="space-x-2">
                    <Button
                      onClick={() => handleDeleteclick(tender.id)}
                      size="sm"
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleViewApplications(tender.id)}
                      size="sm"
                    >
                      View Applications
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTenders.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">
                No Tender Found
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default MyTenders;
