import React, { ReactNode } from 'react';
import Footer from './Footer';

interface PageWrapperProps {
    children: ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    return (
        <div className="antialiased text-slate-700">
            {children}
            <Footer />
        </div>
    );
};

export default PageWrapper;