import React, { ReactNode } from 'react';

interface PageWrapperProps {
    children: ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    return <div className="antialiased text-slate-700">{children}</div>;
};

export default PageWrapper;