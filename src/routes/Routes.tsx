// src/routes.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import ContactInfoPage from '../pages/contact/ContactInfoPage';


const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<ContactInfoPage />} />
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
};

export default AppRoutes;