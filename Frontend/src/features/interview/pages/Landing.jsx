import React, { useEffect } from "react";
import { Link, useLocation } from "react-router";
import Navbar from "../../../components/Navbar/Navbar";
import "../style/landing.scss";
import { useAuth } from "../../auth/hooks/useAuth";

const Landing = () => {
    const { user } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const element = document.getElementById(location.hash.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location]);

    return (
        <div className="landing-page">
            <Navbar />
            {/* ── Hero ───────────────────────────────────────────────────────────── */}
            <section className="hero">
                <div className="hero__content">
                    <span className="badge">Beta Access Now Open</span>
                    <h1>
                        Master Your Next <br />
                        <span className="gradient-text">Interview with AI</span>
                    </h1>
                    <p>
                        Generate personalized interview strategies, real-time feedback, and
                        expert-level resumes tailored to your dream job in seconds.
                    </p>
                    <div className="hero__actions">
                        {user ? (
                            <Link to="/dashboard" className="button primary-button">
                                Go to My Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link to="/register" className="button primary-button">
                                    Get Started for Free
                                </Link>
                                <Link to="/login" className="button glass-button">
                                    Sign In
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* ── Stats ──────────────────────────────────────────────────────────── */}
            <section className="stats">
                <div className="stats__grid">
                    <div className="stat-item">
                        <h4>10k+</h4>
                        <p>Interviews Mocked</p>
                    </div>
                    <div className="stat-item">
                        <h4>98%</h4>
                        <p>Success Rate</p>
                    </div>
                    <div className="stat-item">
                        <h4>2min</h4>
                        <p>Avg. Prep Time</p>
                    </div>
                </div>
            </section>

            {/* ── Features ───────────────────────────────────────────────────────── */}
            <section id="features" className="features">
                <div className="features__header">
                    <h2>Why Choose Our AI?</h2>
                    <p>The most advanced interview preparation platform ever built.</p>
                </div>
                <div className="features__grid">
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                        </div>
                        <h3>Smart Strategy</h3>
                        <p>AI analyzes the job description and your resume to build a winning strategy tailored specifically for you.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                        </div>
                        <h3>Real-time Q&A</h3>
                        <p>Generate common and technical questions with expert-level sample answers based on current industry trends.</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-card__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                        </div>
                        <h3>Resume Intelligence</h3>
                        <p>Export a perfectly optimized resume in PDF format that passes ATS filters and highlights your best skills.</p>
                    </div>
                </div>
            </section>

            {/* ── Pricing ────────────────────────────────────────────────────────── */}
            <section id="pricing" className="stats" style={{ borderBottom: 'none' }}>
                <div className="features__header">
                    <h2>Simple, Transparent Pricing</h2>
                    <p>Choose the plan that fits your career goals.</p>
                </div>
                <div className="features__grid" style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <div className="feature-card" style={{ textAlign: 'center' }}>
                        <span className="badge">Free Forever</span>
                        <h3>Starter</h3>
                        <h4 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>$0</h4>
                        <p>3 Interview Reports / Week</p>
                        <p>Basic Feedback</p>
                        <p>PDF Resume Export</p>
                        <Link to="/register" className="button glass-button" style={{ marginTop: '2rem', width: '100%' }}>Get Started</Link>
                    </div>
                    <div className="feature-card" style={{ textAlign: 'center', borderColor: 'var(--accent-indigo)', background: 'rgba(99, 102, 241, 0.05)' }}>
                        <span className="badge" style={{ background: 'var(--accent-indigo)', color: 'white' }}>Most Popular</span>
                        <h3>Pro</h3>
                        <h4 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>$19<span style={{ fontSize: '1rem', opacity: 0.6 }}>/mo</span></h4>
                        <p>Unlimited Reports</p>
                        <p>Advanced AI Analysis</p>
                        <p>Priority Support</p>
                        <Link to="/register" className="button primary-button" style={{ marginTop: '2rem', width: '100%' }}>Go Pro</Link>
                    </div>
                </div>
            </section>

            {/* ── Final CTA ──────────────────────────────────────────────────────── */}
            <section className="cta-section">
                <div className="cta-box">
                    <h2>Ready to get hired?</h2>
                    <p>Join thousands of professionals already using AI to unlock their full career potential.</p>
                    <Link to="/register" className="button">
                        Join Now — It&apos;s Free
                    </Link>
                </div>
            </section>

        </div>
    );
};

export default Landing;
