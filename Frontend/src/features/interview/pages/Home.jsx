import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useAuth } from '../../auth/hooks/useAuth'
import Navbar from '../../../components/Navbar/Navbar'

const Home = () => {
    const { user } = useAuth()
    const { loading, generateReport, reports, getReports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [showForm, setShowForm] = useState(false)
    const resumeInputRef = useRef()
    const navigate = useNavigate()

    useEffect(() => {
        getReports()
    }, [])

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        if (data?._id) {
            navigate(`/interview/${data._id}`)
        }
    }

    if (!showForm) {
        return (
            <div className='home-page'>
                <Navbar />
                <div className="dashboard-hub">
                    <header className="dashboard-hub__header">
                        <h1>Welcome back, <span className="name">{user?.username || 'User'}</span></h1>
                        <p>Your AI-powered career growth command center.</p>
                    </header>

                    <section className="snapshot-grid">
                        <div className="snapshot-card">
                            <div className="snapshot-card__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                            </div>
                            <h3>Smart Strategy</h3>
                            <p>Deep analysis of job descriptions to uncover hidden requirements and keywords.</p>
                        </div>
                        <div className="snapshot-card">
                            <div className="snapshot-card__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                            </div>
                            <h3>Expert Q&A</h3>
                            <p>Personalized technical & behavioral questions with high-impact sample answers.</p>
                        </div>
                        <div className="snapshot-card">
                            <div className="snapshot-card__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
                            </div>
                            <h3>ATS Optimizer</h3>
                            <p>Real-time resume feedback to ensure you pass through automated screening systems.</p>
                        </div>
                    </section>

                    <div className="dashboard-main">
                        <section className="activity-section">
                            <h2>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                Recent Activity
                            </h2>
                            <div className="activity-list">
                                {reports && reports.length > 0 ? (
                                    reports.slice(0, 5).map((report) => (
                                        <Link key={report._id} to={`/interview/${report._id}`} className="activity-item">
                                            <div className="activity-item__info">
                                                <h4>{report.jobTitle || 'Interview Plan'}</h4>
                                                <p>{new Date(report.createdAt).toLocaleDateString()} • {report.companyName || 'Target Company'}</p>
                                            </div>
                                            <div className="activity-item__score">
                                                {report.matchScore}% Match
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="empty-state">
                                        <p>No recent reports found. Start your first session!</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        <aside className="action-panel">
                            <h3>Ready to Prep?</h3>
                            <p>Start a new AI-powered interview session tailored for your next role.</p>
                            <button onClick={() => setShowForm(true)} className="button">
                                Create New Session
                            </button>
                        </aside>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='home-page'>
            <Navbar />

            {/* Back Button */}
            <div style={{ width: '100%', maxWidth: '1200px' }}>
                <button
                    onClick={() => setShowForm(false)}
                    className="button glass-button btn-sm"
                    style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>
                    Back to Dashboard
                </button>
            </div>

            {/* Page Header */}
            <header className='page-header'>
                <h1>Create Your Custom <span className='highlight'>Interview Plan</span></h1>
                <p>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </header>

            {/* Main Card */}
            <div className='interview-card'>
                <div className='interview-card__body'>

                    {/* Left Panel - Job Description */}
                    <div className='panel panel--left'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2>Target Job Description</h2>
                            <span className='badge badge--required'>Required</span>
                        </div>
                        <textarea
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            className='panel__textarea'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className='char-counter'>{jobDescription.length} / 5000 chars</div>
                    </div>

                    <div className="panel-divider"></div>

                    {/* Right Panel - Self Description & Resume */}
                    <div className='panel panel--right'>
                        <div className='panel__header'>
                            <span className='panel__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2>Your Profile</h2>
                            <span className='badge badge--required'>Required</span>
                        </div>

                        <div className='input-group'>
                            <label>Professional Summary</label>
                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                className='panel__textarea panel__textarea--short'
                                placeholder="Briefly describe your experience and key expertise..."
                                maxLength={2000}
                                value={selfDescription}
                            />
                            <div className='char-counter'>{selfDescription.length} / 2000 chars</div>
                        </div>

                        <div className='input-group resume-upload'>
                            <label className='section-label'>Current Resume (PDF)</label>
                            <label className='dropzone' onClick={() => resumeInputRef.current.click()}>
                                <div className='dropzone__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" /></svg>
                                </div>
                                <p className='dropzone__title'>Click to upload or drag & drop</p>
                                <p className='dropzone__subtitle'>PDF (Max 5MB)</p>
                                <input type='file' ref={resumeInputRef} hidden accept=".pdf" />
                            </label>
                        </div>

                        {/* Info Box */}
                        <div className='info-box'>
                            <span className='info-box__icon'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12.01" y2="16" /><path d="M12 8v4" /></svg>
                            </span>
                            <p>Either a <strong>Resume</strong> or a <strong>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                <div className='interview-card__footer'>
                    <button
                        onClick={handleGenerateReport}
                        disabled={loading || !jobDescription || (!selfDescription && !resumeInputRef.current?.files?.[0])}
                        className={`button primary-button generate-btn ${loading ? 'loading' : ''}`}
                    >
                        {loading ? 'Analyzing Profile...' : 'Generate Interview Strategy'}
                    </button>
                    <p className='footer-note'>Powered by Gemini 1.5 Pro • Takes ~30 seconds</p>
                </div>
            </div>
        </div>
    )
}

export default Home