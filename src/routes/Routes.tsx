// src/routes.tsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES } from '../constants';
import { completeOAuthLogin } from '../utils/oauthCallback';
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
import PaymentCompletePage from '../pages/payment-complete/PaymentCompletePage';

interface AppRoutesProps {
    isLoginModalOpen: boolean;
    setIsLoginModalOpen: (open: boolean) => void;
}

/**
 * Safety net for OAuth logins: the backend has been observed redirecting to
 * `/` with `token`/`userId` query params instead of the dedicated callback
 * routes, which left the app stuck on a "?token=...&userId=..." URL with no
 * session ever stored. This catches those params on any route and finishes
 * the login the same way the callback pages do.
 */
const OAuthQueryParamFallback: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (
            window.location.pathname === ROUTES.GOOGLE_CALLBACK ||
            window.location.pathname === ROUTES.FACEBOOK_CALLBACK
        ) {
            return;
        }

        const token = searchParams.get('token');
        const userId = searchParams.get('userId');

        if (token && userId) {
            completeOAuthLogin(token, userId).finally(() => {
                navigate(window.location.pathname, { replace: true });
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return null;
};

const AppRoutes: React.FC<AppRoutesProps> = ({ isLoginModalOpen, setIsLoginModalOpen }) => {
    return (
        <Router>
            <OAuthQueryParamFallback />
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
                <Route path={ROUTES.PAYMENT_COMPLETE} element={<PaymentCompletePage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;