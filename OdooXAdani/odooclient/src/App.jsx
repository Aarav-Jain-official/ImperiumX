import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Hero from "./pages/Hero";
import Dashboard from "./pages/Dashboard";
import CreateMaintenanceRequest from "./pages/Dashboard";
import MaintenanceRequestBoard from "./pages/Maintainence";
import Requestm from "./pages/Requestm";

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateMaintenanceRequest />} />
        <Route path="/maintenance" element={<MaintenanceRequestBoard />} />
        <Route path="/requestm" element={<Requestm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App