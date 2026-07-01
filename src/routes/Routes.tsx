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
import PortfoliosPage from '../pages/portfolios/PortfoliosPage';
import SuccessStoriesPage from '../pages/success-stories/SuccessStoriesPage';
import InquiryPage from '../pages/inquiry/InquiryPage';
import GoogleCallbackPage from '../pages/auth/GoogleCallbackPage';
import FacebookCallbackPage from '../pages/auth/FacebookCallbackPage';

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
                <Route path={ROUTES.PORTFOLIOS} element={<PortfoliosPage isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />} />
                <Route path={ROUTES.SUCCESS_STORIES} element={<SuccessStoriesPage isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />} />
                <Route path={ROUTES.INQUIRY} element={<InquiryPage isLoginModalOpen={isLoginModalOpen} setIsLoginModalOpen={setIsLoginModalOpen} />} />
                <Route path={ROUTES.GOOGLE_CALLBACK} element={<GoogleCallbackPage />} />
                <Route path={ROUTES.FACEBOOK_CALLBACK} element={<FacebookCallbackPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;