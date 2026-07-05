import React, { useState, useEffect } from "react";
import "../styles/interview.scss";
import { useInterview } from "../hooks/useinterview.js";
import { useNavigate, useParams } from 'react-router';


const Interview = () => {

    const { report, getReportById, loading} = useInterview()

  const [activeTab, setActiveTab] = useState("technical");
  const [checkedTasks, setCheckedTasks] = useState({});
  const [expandedQuestion, setExpandedQuestion] = useState(null);
    const {interviewId} = useParams()

  useEffect(() => {
    if(interviewId){
        getReportById(interviewId)
    }
  },[interviewId])

      if(loading || !report){
    return (
        <main className="loading-screen">
            <h1>Loading your interview plan ... </h1>
        </main>
    )
  }

  const toggleTask = (dayIndex, taskIndex) => {
    const key = `${dayIndex}-${taskIndex}`;
    setCheckedTasks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleQuestion = (index) => {
    setExpandedQuestion(prev => (prev === index ? null : index));
  };



  // Match score circular calculations
  const radius = 45;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (report.matchScore / 100) * circumference;



  return (
    <div className="interview-page">
      <div className="interview-container">
        
        {/* Left Panel: Sidebar Navigation */}
        <aside className="sidebar-left">
          <div className="sidebar-brand">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="brand-icon">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <h2>AI Assistant</h2>
          </div>
          
          <nav className="nav-tabs">
            <button
              className={`tab-btn ${activeTab === "technical" ? "active" : ""}`}
              onClick={() => setActiveTab("technical")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tab-icon">
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
              <span>Technical Questions</span>
              <span className="tab-count">{report.technicalQuestions.length}</span>
            </button>

            <button
              className={`tab-btn ${activeTab === "behavioral" ? "active" : ""}`}
              onClick={() => setActiveTab("behavioral")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tab-icon">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Behavioral Questions</span>
              <span className="tab-count">{report.behavioralQuestions.length}</span>
            </button>

            <button
              className={`tab-btn ${activeTab === "plan" ? "active" : ""}`}
              onClick={() => setActiveTab("plan")}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="tab-icon">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>Preparation Plan</span>
              <span className="tab-count">{report.preparationPlan.length}d</span>
            </button>
          </nav>
        </aside>

        {/* Middle Panel: Main Content Area */}
        <main className="content-middle">
          {activeTab === "technical" && (
            <div className="content-section">
              <div className="section-header">
                <h1>Technical Questions</h1>
                <p>Tailored assessments aligned with your target profile and skill gaps.</p>
              </div>

              <div className="questions-list">
                {report.technicalQuestions.map((q, idx) => {
                  const isExpanded = expandedQuestion === idx;
                  return (
                    <div key={idx} className={`question-card ${isExpanded ? "expanded" : ""}`}>
                      <div className="question-header" onClick={() => toggleQuestion(idx)}>
                        <span className="q-number">Q{idx + 1}</span>
                        <h3>{q.question}</h3>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron-icon">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>

                      {isExpanded && (
                        <div className="question-body">
                          <div className="body-block intention-block">
                            <h4>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="block-icon">
                                <circle cx="12" cy="12" r="10"></circle>
                                <circle cx="12" cy="12" r="6"></circle>
                                <circle cx="12" cy="12" r="2"></circle>
                              </svg>
                              Evaluation Intention
                            </h4>
                            <p>{q.intention}</p>
                          </div>

                          <div className="body-block answer-block">
                            <h4>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="block-icon">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                              </svg>
                              Expected Talking Points
                            </h4>
                            <p>{q.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "behavioral" && (
            <div className="content-section">
              <div className="section-header">
                <h1>Behavioral Questions</h1>
                <p>Scenario-based behavioral prompts designed to probe leadership and problem-solving.</p>
              </div>

              <div className="questions-list">
                {report.behavioralQuestions.map((q, idx) => {
                  const isExpanded = expandedQuestion === idx;
                  return (
                    <div key={idx} className={`question-card ${isExpanded ? "expanded" : ""}`}>
                      <div className="question-header" onClick={() => toggleQuestion(idx)}>
                        <span className="q-number">Q{idx + 1}</span>
                        <h3>{q.question}</h3>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="chevron-icon">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </div>

                      {isExpanded && (
                        <div className="question-body">
                          <div className="body-block intention-block">
                            <h4>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="block-icon">
                                <circle cx="12" cy="12" r="10"></circle>
                                <circle cx="12" cy="12" r="6"></circle>
                                <circle cx="12" cy="12" r="2"></circle>
                              </svg>
                              Evaluation Intention
                            </h4>
                            <p>{q.intention}</p>
                          </div>

                          <div className="body-block answer-block">
                            <h4>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="block-icon">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                              </svg>
                              Expected Talking Points
                            </h4>
                            <p>{q.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "plan" && (
            <div className="content-section">
              <div className="section-header">
                <h1>Preparation Plan</h1>
                <p>A day-by-day structured curriculum to address critical gaps and optimize review.</p>
              </div>

              <div className="timeline-container">
                {report.preparationPlan.map((day, dIdx) => (
                  <div key={dIdx} className="timeline-day-card">
                    <div className="timeline-badge-column">
                      <div className="timeline-dot"></div>
                      <div className="timeline-line"></div>
                    </div>
                    <div className="timeline-content-card">
                      <div className="day-card-header">
                        <span className="day-pill">Day {day.day}</span>
                        <h3>{day.focus}</h3>
                      </div>
                      <ul className="day-tasks-list">
                        {day.tasks.map((task, tIdx) => {
                          const isChecked = !!checkedTasks[`${dIdx}-${tIdx}`];
                          return (
                            <li key={tIdx} className={`task-item ${isChecked ? "completed" : ""}`}>
                              <label className="checkbox-container">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => toggleTask(dIdx, tIdx)}
                                />
                                <span className="custom-checkbox"></span>
                                <span className="task-text">{task}</span>
                              </label>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* Right Panel: Skill Gaps & Match Score */}
        <aside className="sidebar-right">
          <div className="analysis-widget match-score-widget">
            <h3 className="widget-title">Compatibility</h3>
            <div className="match-score-radial">
              <svg width="120" height="120" viewBox="0 0 120 120" className="radial-svg">
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="bg-circle"
                  strokeWidth={strokeWidth}
                />
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  className="progress-circle"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  transform="rotate(-90 60 60)"
                />
              </svg>
              <div className="radial-label">
                <span className="score-val">{report.matchScore}%</span>
                <span className="score-lbl">Match</span>
              </div>
            </div>
            <p className="widget-subtext">Resume match score against JD requirements.</p>
          </div>

          <div className="analysis-widget skill-gaps-widget">
            <div className="widget-header-row">
              <h3 className="widget-title">Skill Gaps</h3>
              <span className="gap-badge-count">{report.skillGaps.length}</span>
            </div>
            <div className="skill-gaps-list">
              {report.skillGaps.map((item, idx) => (
                <div key={idx} className={`skill-badge ${item.severity}`}>
                  <span className="severity-dot"></span>
                  <span className="skill-name">{item.skill}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default Interview;
