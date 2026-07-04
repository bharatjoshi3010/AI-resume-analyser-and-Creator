import React, { useState, useRef } from "react";
import "../styles/home.scss";
import { useInterview } from "../hooks/useinterview.js";
import { useNavigate } from "react-router";


const Home = () => {

    const {loading, generateReport} = useInterview()

    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [resumeFile, setResumeFile] = useState(null);
    const [isDragActive, setIsDragActive] = useState(false);
    const fileInputRef = useRef(null);    //for resume pdf handling

    const navigate = useNavigate()

    const handleJobDescriptionChange = (e) => {
        if (e.target.value.length <= 5000) {
            setJobDescription(e.target.value);
        }
    };

    const handleSelfDescriptionChange = (e) => {
        setSelfDescription(e.target.value);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.size <= 5 * 1024 * 1024) {
                setResumeFile(file);
            } else {
                alert("File size exceeds 5MB limit.");
            }
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size <= 5 * 1024 * 1024) {
                setResumeFile(file);
            } else {
                alert("File size exceeds 5MB limit.");
            }
        }
    };

    const handleRemoveFile = (e) => {
        e.stopPropagation();
        setResumeFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const triggerFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleGenerate = async() => {
        
        const resumeFile1 = fileInputRef.current.files[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile1})
        navigate(`/interview/${data._id}`)
        console.log("Generating strategy with:", {
            jobDescription,
            selfDescription,
            resumeFile
        });
    };


    if(loading){
        return(
            <main className="loading-screen">
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <main className="home">
            <div className="home-header">
                <h1 className="home-title">
                    Create Your Custom <span className="highlight-text">Interview Plan</span>
                </h1>
                <p className="home-subtitle">
                    Let our AI analyze the job requirements and your unique profile to build a winning strategy.
                </p>
            </div>

            <div className="interview-card">
                <div className="card-content">
                    {/* Left Column: Job Description */}
                    <div className="card-column left-column">
                        <div className="column-header">
                            <div className="title-with-icon">
                                <svg className="title-icon briefcase-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                </svg>
                                <h2>Target Job Description</h2>
                            </div>
                            <span className="badge required">Required</span>
                        </div>

                        <div className="textarea-container">
                            <textarea
                                name="jobDescription"
                                id="jobDescription"
                                placeholder="Paste the full job description here...&#10;e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
                                value={jobDescription}
                                onChange={handleJobDescriptionChange}
                                maxLength={5000}
                            />
                            <div className="char-count">
                                {jobDescription.length} / 5000 chars
                            </div>
                        </div>
                    </div>

                    {/* Vertical Divider */}
                    <div className="card-divider"></div>

                    {/* Right Column: Your Profile */}
                    <div className="card-column right-column">
                        <div className="column-header">
                            <div className="title-with-icon">
                                <svg className="title-icon user-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <h2>Your Profile</h2>
                            </div>
                        </div>

                        {/* Resume Section */}
                        <div className="profile-section">
                            <div className="section-label-row">
                                <span className="section-label">Upload Resume</span>
                                <span className="badge best-results">Best Results</span>
                            </div>

                            <div
                                className={`upload-zone ${isDragActive ? "drag-active" : ""} ${resumeFile ? "has-file" : ""}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={triggerFileInput}
                            >
                                <input
                                    type="file"
                                    name="resume"
                                    id="resume"
                                    accept=".pdf,.docx"
                                    className="file-input-hidden"
                                    onChange={handleFileChange}
                                    ref={fileInputRef}
                                />
                                <div className="upload-content">
                                    <svg className="upload-cloud-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 12v9M9 15l3-3 3 3" strokeWidth="2" />
                                        <path d="M20.38 12.87A6 6 0 0 0 12 7a6 6 0 0 0-7.7 5.56H4a3.5 3.5 0 0 0 0 7h1.5" />
                                        <path d="M18.5 19.5H20a3.5 3.5 0 0 0 0-7h-.5" strokeDasharray="3 3" />
                                    </svg>
                                    {resumeFile ? (
                                        <div className="file-display">
                                            <span className="file-name">{resumeFile.name}</span>
                                            <button type="button" className="remove-file-btn" onClick={handleRemoveFile}>
                                                &times;
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <span className="upload-text">Click to upload or drag & drop</span>
                                            <span className="upload-subtext">PDF or DOCX (Max 5MB)</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Separator */}
                        <div className="or-separator">
                            <div className="line"></div>
                            <span className="or-text">OR</span>
                            <div className="line"></div>
                        </div>

                        {/* Self Description Section */}
                        <div className="profile-section">
                            <div className="section-label-row">
                                <span className="section-label">Quick Self-Description</span>
                            </div>
                            <div className="textarea-container self-desc-container">
                                <textarea
                                    name="selfDescription"
                                    id="selfDescription"
                                    placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                                    value={selfDescription}
                                    onChange={handleSelfDescriptionChange}
                                />
                            </div>
                        </div>

                        {/* Info Alert Box */}
                        <div className="info-alert-box">
                            <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                            <span className="alert-text">
                                Either a Resume or a Self Description is required to generate a personalized plan.
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="card-footer">
                    <span className="footer-info-text">
                        AI-Powered Strategy Generation - Approx 30s
                    </span>
                    <button className="generate-btn" onClick={handleGenerate}>
                        <svg className="star-icon" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1.5">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Home;