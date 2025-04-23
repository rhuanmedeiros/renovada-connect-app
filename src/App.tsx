import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "./context/AdminContext";
import { AppDataProvider } from "./context/AppDataContext";
import { AdminAuthModal } from "./components/layout/AdminAuthModal";
import { BottomNav } from "./components/layout/BottomNav";
import { Header } from "./components/layout/Header";

// Pages
import Home from "./pages/Home";
import Agenda from "./pages/Agenda";
import Devocional from "./pages/Devocional";
import Midia from "./pages/Midia";
import Oracao from "./pages/Oracao";
import Contribuicoes from "./pages/Contribuicoes";
import Familia from "./pages/Familia";
import Contato from "./pages/Contato";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Series from "./pages/Series";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AdminProvider>
          <AppDataProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/agenda" element={<Agenda />} />
                    <Route path="/devocional" element={<Devocional />} />
                    <Route path="/midia" element={<Midia />} />
                    <Route path="/oracao" element={<Oracao />} />
                    <Route path="/contribuicoes" element={<Contribuicoes />} />
                    <Route path="/familia" element={<Familia />} />
                    <Route path="/contato" element={<Contato />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/series" element={<Series />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <BottomNav />
                <AdminAuthModal />
              </div>
            </TooltipProvider>
          </AppDataProvider>
        </AdminProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
