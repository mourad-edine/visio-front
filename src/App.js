import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StreamerDashboard from "./StreamerDashboard";
import Viewer from "./Viewer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StreamerDashboard />} />
        <Route path="/viewer" element={<Viewer />} />
      </Routes>
    </Router>
  );
}

export default App;
