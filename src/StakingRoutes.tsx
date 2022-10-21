import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Details from "./pages/Details";
import Vaults from "./pages/Vaults";
import NotFound from "./pages/NotFound";

export default function StakingRoutes() {
  return (
    <Routes>
      <Route path="/vaults/:id" element={<Details />} />
      <Route path="/vaults" element={<Vaults />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/" element={<Vaults />} />
    </Routes>
  );
}
