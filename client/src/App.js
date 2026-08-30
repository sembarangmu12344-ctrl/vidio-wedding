import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
import InvitationView from './pages/InvitationView';
import TemplateGallery from './pages/TemplateGallery';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/templates" element={<TemplateGallery />} />
          <Route path="/editor/:templateId?" element={<EditorPage />} />
          <Route path="/invitation/:invitationId" element={<InvitationView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
