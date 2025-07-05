import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building, ArrowLeft } from "lucide-react";
import Navigation from "./Navigation";

interface Application {
  id: string;
  proposal: string;
  quote: string;
  company: string;
  application_deadline: string;
}

const ViewApplications = () => {
  const { tenderId } = useParams<{ tenderId: string }>();
  const [applications, setApplications] = useState<Application[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/application/tender/${tenderId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch applications");
        }
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        console.error("Error fetching applications:", err);
      }
    };

    fetchApplications();
  }, [tenderId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tender Applications</h1>
            <p className="text-gray-600 mt-2">Applications received Your Tender</p>
          </div>
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </div>

        {applications.length === 0 ? (
          <p className="text-gray-500 text-center mt-12">No applications found for this tender.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {applications.map((app) => (
              <Card key={app.id}>
                <CardHeader>
                  <CardTitle className="text-xl text-blue-600">{app.company}</CardTitle>
                  <CardDescription>Bid: ₹{app.quote}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4"><strong>Proposal:</strong> {app.proposal}</p>
                  <p className="text-gray-500 text-sm">Deadline: {new Date(app.application_deadline).toLocaleDateString("en-CA")}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewApplications;
