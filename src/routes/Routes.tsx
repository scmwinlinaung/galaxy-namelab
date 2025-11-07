// src/routes.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/home/HomePage';
import ContactInfoPage from '../pages/contact/ContactInfoPage';
import BusinessPage from '../pages/business/BusinessPage';
import SuccessPage from '../pages/success/SuccessPage';
import PricingPage from '../pages/pricing/PricingPage';

interface AppRoutesProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />} />
                <Route path="/business" element={<BusinessPage isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />} />
                <Route path="/success" element={<SuccessPage isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />} />
                <Route path="/pricing" element={<PricingPage isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />} />
                <Route path="/contact" element={<ContactInfoPage isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;