
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building, Plus, Calendar, DollarSign, Users, TrendingUp } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [recentTenders,setrecentTenders]=useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user_data");
    
    if (!authToken || !userData) {
      navigate("/login");
      return;
    }
    const fetchTenders = async () => {

      try {
        const res = await fetch("http://localhost:5000/api/latest");

        if (!res.ok) {
          throw new Error("Failed to fetch tenders");
        }

        const data = await res.json();
        setrecentTenders(data); // Assuming you have a `setTenders` state setter
      } catch (err) {
        console.error("Error fetching tenders:", err);
      }
    };

    fetchTenders();
    setUser(JSON.parse(userData));
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  // const recentTenders = [
  //   { id: 1, title: "Software Development Services", deadline: "2024-01-15", budget: "$50,000", status: "active" },
  //   { id: 2, title: "Marketing Campaign", deadline: "2024-01-20", budget: "$25,000", status: "active" },
  //   { id: 3, title: "Office Equipment Supply", deadline: "2024-01-10", budget: "$15,000", status: "closed" }
  // ];

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
                <Link to="/dashboard" className="text-blue-600 font-medium">Dashboard</Link>
                <Link to="/tenders" className="text-gray-600 hover:text-blue-600">Tenders</Link>
                <Link to="/companies" className="text-gray-600 hover:text-blue-600">Companies</Link>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.company}!</h1>
          <p className="text-gray-600 mt-2">Here's what's happening with your tenders today.</p>
        </div>

        

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link to="/tenders?action=create">
                <Button className="w-full justify-start">Create New Tender</Button>
              </Link>
              <Link to="/tenders">
                <Button variant="outline" className="w-full justify-start">Browse Tenders</Button>
              </Link>
              <Link to="/companies">
                <Button variant="outline" className="w-full justify-start">Find Companies</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Tenders</CardTitle>
              <CardDescription>Your latest tender activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTenders.map((tender) => (
                  <div key={tender.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{tender.title}</h4>
                      <p className="text-sm text-gray-600">Deadline: {tender.deadline}</p>
                      <p className="text-sm font-medium text-green-600">{tender.budget}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
