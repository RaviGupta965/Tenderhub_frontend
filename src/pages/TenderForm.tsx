import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Navigation from "./Navigation";
const TenderForm = () => {
    const { tenderId } = useParams<{ tenderId: string }>();
    console.log(tenderId)
    const navigate = useNavigate();
    const [form, setForm] = useState({
        proposal: "",
        quote: "",
        applicationDeadline: "", // <-- New field
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handlechange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.proposal || !form.quote || !form.applicationDeadline) {
            setError("All fields are required.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("auth_token");
            if (!token) {
                navigate("/login");
                return;
            }
            const response = await fetch(`https://tenderhub-backend.onrender.com/api/application/${tenderId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    proposal: form.proposal,
                    quote: form.quote,
                    applicationDeadline: form.applicationDeadline
                }),
            });
            const data = await response.json()
            if(!response.ok){
                alert('Application not submitted.Please Try again.')
                console.log('APPLICATION SUBMISSION ERROR ::',data.error);
                return;
            }
            navigate("/tenders");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navigation />

            <div className="max-w-2xl mx-auto mt-10">
                <Card>
                    <CardHeader>
                        <CardTitle>Apply for Tender</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Proposal</label>
                                <Textarea
                                    name="proposal"
                                    value={form.proposal}
                                    onChange={handlechange}
                                    rows={5}
                                    placeholder="Describe your plan or proposal..."
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="applicationDeadline" className="block text-sm font-medium text-gray-700">
                                    Application Deadline
                                </label>
                                <input
                                    type="date"
                                    id="applicationDeadline"
                                    name="applicationDeadline"
                                    value={form.applicationDeadline}
                                    onChange={handlechange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring focus:ring-blue-200"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bid Amount</label>
                                <Input
                                    name="quote"
                                    type="number"
                                    value={form.quote}
                                    onChange={handlechange}
                                    placeholder="Enter your bid"
                                />
                            </div>

                            {error && <p className="text-red-600 text-sm">{error}</p>}

                            <Button type="submit" disabled={loading}>
                                {loading ? "Submitting..." : "Submit Application"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TenderForm;