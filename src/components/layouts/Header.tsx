import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="absolute top-0 left-0 w-full p-4 sm:p-6 z-50">
            <nav className="container mx-auto flex justify-between items-center">
                {/* Logo/Brand Name */}
                <Link to="/" className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors duration-300">
                    Special Name Guide
                </Link>

                {/* Navigation Links */}
                <div className="flex items-center space-x-4 sm:space-x-8 text-lg">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `transition-colors duration-300 ${isActive ? 'text-cyan-400' : 'text-white hover:text-cyan-300'}`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `transition-colors duration-300 ${isActive ? 'text-cyan-400' : 'text-white hover:text-cyan-300'}`
                        }
                    >
                        About
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Header;