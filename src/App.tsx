
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tenders from "./pages/Tenders";
import Companies from "./pages/Companies";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import CreateTender from './pages/CreateTender.tsx'
import TenderForm from "./pages/TenderForm.tsx";
import MyTenders from './pages/MyTenders.tsx'
import ViewApplications from "./pages/ViewApplications.tsx";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tenders" element={<Tenders />} />
          <Route path="/companies" element={<Companies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-tender" element={<CreateTender />} />
          <Route path="/apply/:tenderId" element={<TenderForm />} />
          <Route path="/get-tenders" element={<MyTenders />} />
          <Route path="/tender/:tenderId" element={<ViewApplications />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
