
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Building, Mail, MapPin, Globe, Upload, Save, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    industry: "",
    description: "",
    location: "",
    website: "",
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem("auth_token");

    if (!authToken) {
      navigate("/login");
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await fetch("https://tenderhub-backend.onrender.com/api/profile", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch");

        const data = await res.json();
        console.log(data);
        setUser(data);
        setFormData({
          companyName: data.company || "",
          email: data.email || "",
          industry: data.industry || "",
          description: data.description || "",
          location: data.location || "",
          website: data.website || "",
        });
        
      } catch (err) {
        console.error("Error fetching profile", err);
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async() => {
    try {
      const token = localStorage.getItem("auth_token");

      const response = await fetch("https://tenderhub-backend.onrender.com/api/edit-profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          company: formData.companyName,
          industry: formData.industry,
          description: formData.description,
          location: formData.location,
          website: formData.website,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Update failed:", data.error);
        return;
      }

      // Update state & local storage
      setUser(data);
      localStorage.setItem("user_data", JSON.stringify(data));
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navigation/>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
            <p className="text-gray-600 mt-2">Manage your company information and settings</p>
          </div>
          <Button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="flex items-center space-x-2"
          >
            {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
            <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardHeader className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Building className="h-12 w-12 text-gray-400" />
              </div>
              <CardTitle>{user.company}</CardTitle>
              <CardDescription>{user.industry}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full mb-4">
                <Upload className="h-4 w-4 mr-2" />
                Upload Logo
              </Button>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Globe className="h-4 w-4 mr-2" />
                  <span>{user.website}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Update your company details and business information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={true}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Input
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button disabled={!isEditing} onClick={handleSave}>
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
