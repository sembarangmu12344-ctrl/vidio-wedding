import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
import InvitationView from './pages/InvitationView';
import TemplateGallery from './pages/TemplateGallery';
import PricingPage from './pages/PricingPage';
import JavaneseLuxuryLanding from './pages/JavaneseLuxuryLanding';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/luxury" element={<JavaneseLuxuryLanding />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/templates" element={<TemplateGallery />} />
          <Route path="/editor/:templateId?" element={<EditorPage />} />
          <Route path="/invitation/preview" element={<InvitationView />} />
          <Route path="/invitation/:invitationId" element={<InvitationView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
