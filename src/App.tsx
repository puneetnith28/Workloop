
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import FileViewer from "./pages/FileViewer";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Files from "./pages/Files";
import Feedback from "./pages/Feedback";
import Landing from "./pages/Landing";
import HowItWorks from "./pages/HowItWorks";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/files" element={<Files />} />
          <Route path="/files/:id" element={<FileViewer />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/login" element={<Login />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/settings" element={<Settings />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
