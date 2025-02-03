import { BrowserRouter, Route, Routes } from "react-router";
import { ProtectedRoute } from "@/components/protected-route.tsx";
import { Toaster } from "@/components/ui/toaster.tsx";
import Home from "@/app/routes/home.tsx";
import Card from "@/app/routes/card.tsx";
import Stocks from "@/app/routes/stocks.tsx";
import Help from "@/app/routes/help.tsx";
import Admin from "@/app/routes/admin";
import AdminAuth from "@/app/routes/admin/auth.tsx";
import AdminCards from "@/app/routes/admin/cards.tsx";
import AdminDashboard from "@/app/routes/admin/dashboard.tsx";
import AdminStocks from "@/app/routes/admin/stocks.tsx";
import AdminEvents from "@/app/routes/admin/events.tsx";
import AdminSpotify from "@/app/routes/admin/spotify.tsx";
import AdminParameters from "@/app/routes/admin/parameters.tsx";
import { SidebarProvider } from "@/components/ui/sidebar.tsx";

export const Router = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route index element={<Home />} />
          <Route path="card" element={<Card />} />
          <Route path="stocks" element={<Stocks />} />
          <Route path="help" element={<Help />} />
          <Route path="auth" element={<AdminAuth />} />
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <SidebarProvider>
                  <Admin />
                </SidebarProvider>
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="cards" element={<AdminCards />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="stocks" element={<AdminStocks />} />
            <Route path="spotify" element={<AdminSpotify />} />
            <Route path="parameters" element={<AdminParameters />} />
          </Route>
        </Routes>

        <Toaster />
      </div>
    </BrowserRouter>
  );
};
