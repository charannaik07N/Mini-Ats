import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import KanbanBoard from "./Kanban/KanbanBoard";
import AnalyticsDashboard from "./Analytics/AnalyticsDashboard";
import Navbar from "./components/Navbar";
import { Landing } from "./components/Landingpage";
import "./App.css";
import Footer from "./components/Footer";

function App() {
  return (
    <GoogleOAuthProvider clientId="1033556695079-osn1ufaqhamij1uf30gfbairbbolb7l0.apps.googleusercontent.com">
      
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-500 ease-in-out">
            <Navbar />
            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-2xl transition-all duration-500 ease-in-out min-h-full">
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/kanban" element={<KanbanBoard />} />
                  <Route path="/analytics" element={<AnalyticsDashboard />} />
                </Routes>
              </div>
            </main>
            <Footer />
          </div>
        </Router>
      
    </GoogleOAuthProvider>
  );
}

export default App;
