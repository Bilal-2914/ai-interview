import React, { useState, useEffect, useRef } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import Navbar from "../../../components/Navbar/Navbar"


const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)
    return (
        <div className={`q-card ${open ? 'q-card--open' : ''}`}>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <div className='q-card__index-wrap'>
                    <div className='q-card__index'>
                        <span className='q-text'>Q</span>
                        <span className='q-num'>{index + 1}</span>
                    </div>
                </div>
                <div className='q-card__title-area'>
                    <p className='q-card__question'>{item.question}</p>
                </div>
                <div className='q-card__action'>
                    <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                    </span>
                </div>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__content-grid'>
                        <div className='q-card__section q-card__section--intention'>
                            <div className='section-header'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                                <span className='tag'>Interviewer's Intention</span>
                            </div>
                            <div className='section-body'>
                                <p>{item.intention}</p>
                            </div>
                        </div>

                        <div className='q-card__section q-card__section--strategy'>
                            <div className='section-header'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                <span className='tag'>Winning Strategy</span>
                            </div>
                            <div className='section-body'>
                                <p>{item.answer}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__marker-container'>
            <div className='roadmap-day__line' />
            <div className='roadmap-day__marker'>
                <div className='dot' />
            </div>
        </div>
        <div className='roadmap-day__content-card'>
            <div className='roadmap-day__header'>
                <div className='day-pill'>Day {day.day}</div>
                <h3>{day.focus}</h3>
            </div>
            <ul className='roadmap-day__tasks'>
                {day.tasks.map((task, i) => (
                    <li key={i} className='task-item'>
                        <div className='task-check'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                        </div>
                        <span className='task-text'>{task}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()
    const downloadBtnRef = useRef()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [interviewId])




    if (!report) {
        return (
            <div className='loading-screen'>
                <div className='spinner'></div>
                <h1>Preparing your interview plan...</h1>
            </div>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'score--high' :
            report.matchScore >= 60 ? 'score--mid' : 'score--low'


    return (
        <div className='interview-page'>
            <Navbar />
            <div className='interview-layout'>

                {/* ── Left Nav ── */}
                <nav className='interview-nav'>
                    <p className='interview-nav__label'>Reports</p>
                    <div className="nav-content">
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className='interview-nav__icon'>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => { getResumePdf(interviewId) }}
                        disabled={loading}
                        className={`download-resume-btn ${loading ? 'loading' : ''}`}
                    >
                        <span className="btn-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                        </span>
                        <span>Download Optimized Resume</span>
                    </button>
                </nav>

                <div className='interview-divider' />

                {/* ── Center Content ── */}
                <main className='interview-content'>
                    {activeNav === 'technical' && (
                        <section>
                            <div className='content-header'>
                                <h2>Technical Deep Dive</h2>
                                <span className='content-header__count'>{report.technicalQuestions.length} Questions</span>
                            </div>
                            <div className='q-list'>
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='content-header'>
                                <h2>Behavioral Strategy</h2>
                                <span className='content-header__count'>{report.behavioralQuestions.length} Questions</span>
                            </div>
                            <div className='q-list'>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='content-header'>
                                <h2>Preparation Roadmap</h2>
                                <span className='content-header__count'>{report.preparationPlan.length} Day Plan</span>
                            </div>
                            <div className='roadmap-container'>
                                <div className='roadmap-list'>
                                    {report.preparationPlan.map((day) => (
                                        <RoadMapDay key={day.day} day={day} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}
                </main>

                <div className='interview-divider' />

                {/* ── Right Sidebar ── */}
                <aside className='interview-sidebar'>
                    <div className='score-widget'>
                        <span className='score-widget__label'>Role Match score</span>
                        <div className='score-circle' style={{ '--progress': `${(report.matchScore / 100) * 360}deg` }}>
                            <div className='score-circle__content'>
                                <span className='value'>{report.matchScore}</span>
                                <span className='percent'>%</span>
                            </div>
                        </div>
                        <p className='score-widget__message'>
                            Based on our AI analysis, you are a <strong>{report.matchScore >= 80 ? 'Perfect' : 'Strong'} Match</strong> for this role.
                        </p>
                    </div>

                    <div className='skills-widget'>
                        <div className='skills-widget__header'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                            <span>Core Skill Gaps</span>
                        </div>
                        <div className='skills-list'>
                            {report.skillGaps.map((gap, i) => (
                                <span key={i} className='skill-chip'>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Interview