import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import OrderAuth from "./pages/OrderAuth";
import DashboardIELTS from "./pages/DashboardIELTS";
import DashboardTOEFL from "./pages/DashboardTOEFL";
import IELTSExam from "./pages/IELTSExam";
import TOEFLExam from "./pages/TOEFLExam";
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
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard/auth/:orderId" element={<OrderAuth />} />
          <Route path="/dashboard/ielts" element={<DashboardIELTS />} />
          <Route path="/dashboard/toefl" element={<DashboardTOEFL />} />
          <Route path="/exam/ielts/:mode" element={<IELTSExam />} />
          <Route path="/exam/toefl-itp/:mode" element={<TOEFLExam />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
