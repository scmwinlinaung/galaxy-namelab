// src/routes.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ROUTES } from '../constants';
import HomePage from '../pages/home/HomePage';
import AboutPage from '../pages/about/AboutPage';
import SuccessPage from '../pages/success/SuccessPage';
import PricingPage from '../pages/pricing/PricingPage';
import InsightPage from '../pages/insights/InsightPage';
import FAQPage from '../pages/faq/FAQPage';
import OrdersPage from '../pages/orders/OrdersPage';

interface AppRoutesProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    return (
        <Router>
            <Routes>
                <Route path={ROUTES.HOME} element={<HomePage isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />} />
                <Route path={ROUTES.INSIGHT} element={<InsightPage isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />} />
                <Route path={ROUTES.SUCCESS} element={<SuccessPage isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />} />
                <Route path={ROUTES.PRICING} element={<PricingPage isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />} />
                <Route path={ROUTES.FAQ} element={<FAQPage isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />} />
                <Route path={ROUTES.ABOUT} element={<AboutPage isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />} />
                <Route path={ROUTES.ORDERS} element={<OrdersPage isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;