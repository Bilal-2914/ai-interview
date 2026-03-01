import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../features/auth/hooks/useAuth";
import "./Navbar.scss";

const Navbar = () => {
    const { user, handleLogout } = useAuth();
    const navigate = useNavigate();

    const onLogout = async () => {
        await handleLogout();
        navigate("/");
    };

    return (
        <nav className="main-nav">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <div className="logo-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                    </div>
                    <span>Interview AI</span>
                </Link>

                <div className="nav-links">
                    <Link to="/#features">Features</Link>
                    <Link to="/#pricing">Pricing</Link>
                </div>

                <div className="nav-actions">
                    {user ? (
                        <>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                            <button onClick={onLogout} className="button glass-button btn-sm">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="button primary-button btn-sm">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
