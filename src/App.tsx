import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Login from "./pages/Login";
import StaffLogin from "./pages/StaffLogin";
import Dashboard from "./pages/Dashboard";
import StaffDashboard from "./pages/StaffDashboard";
import CEOLogin from "./pages/CEOLogin";
import CEODashboard from "./pages/CEODashboard";
import PublishedSite from "./components/PublishedSite";
import Feed from "./pages/Feed";
import Explore from "./pages/Explore";
import FingerprintProfile from "./pages/FingerprintProfile";
import Messages from "./pages/Messages";
import Templates from "./pages/Templates";
import AdminCEO from "./pages/AdminCEO";
import AdminStaff from "./pages/AdminStaff";
import AdminChat from "./pages/AdminChat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/staff" element={<StaffLogin />} />
          <Route path="/login/ceo" element={<CEOLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/staff/dashboard" element={<StaffDashboard />} />
          <Route path="/ceo/dashboard" element={<CEODashboard />} />
          
          {/* Social Media Routes */}
          <Route path="/feed" element={<Feed />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/fingerprints/:id" element={<FingerprintProfile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/templates" element={<Templates />} />
          
          {/* Admin Routes */}
          <Route path="/admin/ceo" element={<AdminCEO />} />
          <Route path="/admin/staff" element={<AdminStaff />} />
          <Route path="/admin/chat" element={<AdminChat />} />
          
          {/* Published Sites */}
          <Route path="/s/:slug" element={<PublishedSite />} />
          <Route path="/sites/:id" element={<PublishedSite />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
