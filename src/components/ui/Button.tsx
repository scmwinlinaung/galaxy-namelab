import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
    // The className prop will receive all the styling from HomePage
    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};

export default Button;