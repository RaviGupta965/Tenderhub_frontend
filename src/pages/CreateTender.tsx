import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
function CreateTender() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    budget: "",
    deadline: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("auth_token");
    const { title, description, category, budget, deadline, location } = form;

    // Check for missing fields
    if (!title || !description || !category || !budget || !deadline || !location) {
      alert("Please fill in all fields before submitting.");
      return;
    }

    const res = await fetch("https://tenderhub-backend.onrender.com/api/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...form,
        budget:form.budget,
      }),
    });

    if (res.ok) navigate("/tenders");
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation/>
      
      <div className="flex justify-center px-4 py-10 bg-gray-50 min-h-screen">
        <div className="bg-white border rounded-lg p-8 w-full max-w-2xl shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">Tender Information</h2>
          <p className="text-sm text-gray-500 mb-6">Fill out details to post a new tender opportunity.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Title*</label>
              <Input name="title" value={form.title} onChange={handleChange} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Category*</label>
              <Input name="category" value={form.category} onChange={handleChange} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Budget ($)*</label>
              <Input name="budget" value={form.budget} onChange={handleChange} />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Deadline*</label>
              <Input name="deadline" type="date" value={form.deadline} onChange={handleChange} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Location*</label>
              <Input name="location" value={form.location} onChange={handleChange} />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-gray-700">Description*</label>
            <Textarea name="description" rows={4} value={form.description} onChange={handleChange} />
          </div>

          <div className="mt-6">
            <Button className="w-full" onClick={handleSubmit}>
              Submit Tender
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateTender;
