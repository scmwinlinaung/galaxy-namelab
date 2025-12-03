import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  variant?: 'light' | 'dark';
  className?: string;
  py?: string;
  px?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  variant = 'dark',
  className = '',
  py = 'py-20',
  px = 'px-4 md:px-8'
}) => {
  const bgClass = variant === 'light'
    ? 'bg-white text-gray-900'
    : 'bg-gradient-to-br from-primary-900 to-primary-950 text-white';

  return (
    <section className={`${bgClass} ${py} ${px} ${className}`}>
      <div className="max-w-6xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export default Section;