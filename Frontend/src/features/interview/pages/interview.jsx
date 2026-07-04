import React, { useState } from "react";
import "../styles/interview.scss";

const mockInterviewData = {
  "matchScore": 35,
  "technicalQuestions": [
    {
      "question": "Given your experience with Node.js and Express, how would you approach designing a scalable API for a service that processes a high volume of real-time data?",
      "intention": "To assess the candidate's understanding of scalability, performance optimization, and architectural patterns beyond their current stack, and how they apply these concepts to their known technologies.",
      "answer": "The candidate should discuss concepts like load balancing, caching (e.g., Redis), asynchronous processing with message queues (e.g., Kafka, RabbitMQ), database sharding/replication, connection pooling, and potentially using WebSockets for real-time push. They should mention stateless APIs, efficient data serialization, and monitoring tools."
    },
    {
      "question": "The job requires experience with distributed systems and microservices. Can you explain what a distributed system is, what challenges it presents, and how you would design a system to handle service failures gracefully?",
      "intention": "To evaluate the candidate's foundational knowledge in distributed systems and fault tolerance, which is crucial for a Senior Software Engineer role, especially given their lack of explicit experience in this area.",
      "answer": "The candidate should define a distributed system, discuss challenges like network latency, partial failures, data consistency (CAP theorem), concurrency, and debugging. For graceful failure handling, they should cover concepts like circuit breakers, retries with backoff, sagas for distributed transactions, idempotency, service discovery, health checks, and robust logging/monitoring."
    },
    {
      "question": "While your experience is primarily with MongoDB and MySQL, the role involves PostgreSQL and Redis. Can you discuss the differences between SQL and NoSQL databases, and when you would choose one over the other?",
      "intention": "To understand the candidate's broader database knowledge and their ability to think critically about data storage solutions, even if they lack direct experience with the specific required technologies.",
      "answer": "The candidate should explain the fundamental differences: SQL (relational, structured schema, ACID properties, vertical scalability) vs. NoSQL (non-relational, flexible schema, BASE properties, horizontal scalability). They should provide use cases for each, e.g., SQL for complex queries and strong consistency; NoSQL for large unstructured data, high write throughput, and rapid schema evolution."
    },
    {
      "question": "Describe a time when you had to optimize the performance of an application. What steps did you take, what tools did you use, and what was the outcome?",
      "intention": "To assess the candidate's practical problem-solving skills, understanding of performance bottlenecks, and ability to deliver tangible improvements, which is relevant for a senior role despite tech stack differences.",
      "answer": "The candidate should describe a specific scenario. They should detail their diagnostic process (profilers, logging, monitoring tools), identify the bottleneck (database queries, slow APIs, rendering issues, network latency), outline the solutions implemented (indexing, caching, code refactoring, lazy loading, optimizing algorithms), and quantify the impact of their changes."
    },
    {
      "question": "The job description mentions CI/CD pipelines and DevOps practices. How familiar are you with these concepts, and how have you incorporated them into your previous projects?",
      "intention": "To gauge the candidate's understanding of modern development and deployment practices, and their potential to adapt to a DevOps-focused environment, even if their direct experience might be limited.",
      "answer": "The candidate should define CI/CD (Continuous Integration/Continuous Delivery/Deployment) and DevOps (culture, automation, metrics, sharing). They should mention experiences with automated testing, build processes, deployment scripts, version control (Git), and potentially tools like Jenkins, GitLab CI, or GitHub Actions. Emphasize the benefits of these practices."
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Tell me about a time you had to lead a technical discussion or mentor a junior developer. What was the context, and what was your approach?",
      "intention": "To directly assess the candidate's leadership and mentoring skills, which are explicit requirements for a Senior Software Engineer in this role.",
      "answer": "The candidate should provide a specific situation, outlining their role, the challenge or goal, their actions (facilitating discussion, guidance, knowledge sharing), and the positive outcome or lessons learned."
    },
    {
      "question": "Describe a challenging technical problem you encountered in one of your projects. How did you approach solving it, and what did you learn from the experience?",
      "intention": "To evaluate the candidate's problem-solving methodology, resilience, and ability to learn from difficulties, which are critical traits for a senior role.",
      "answer": "The candidate should describe the problem, initial steps, research, collaboration (if any), the iterative process, and the final solution. They should highlight what made it challenging and what new skills or insights they gained."
    },
    {
      "question": "How do you stay updated with new technologies and industry trends, especially those outside of your current primary stack?",
      "intention": "To understand the candidate's initiative and commitment to continuous learning, which is crucial for a senior role requiring adaptation to technologies like Go, Python, Kubernetes, and AWS.",
      "answer": "The candidate should mention methods such as blogs, webinars, conferences, online courses (Coursera/Udemy), personal projects, open-source contributions, or following industry leaders."
    },
    {
      "question": "Can you describe a situation where you had to collaborate closely with cross-functional teams (e.g., product, QA, design)? What was your role, and how did you ensure effective communication?",
      "intention": "To assess collaboration and communication skills required for a Senior Software Engineer role.",
      "answer": "The candidate should describe a project involving multiple teams, their role, communication methods, expectation management, conflict resolution, and contribution to success."
    },
    {
      "question": "How do you prioritize your work when faced with multiple urgent tasks and deadlines?",
      "intention": "To evaluate organizational skills, workload management, and decision-making under pressure.",
      "answer": "The candidate should explain prioritization strategies such as impact vs effort, deadlines, dependencies, and business value, along with tools like Kanban boards or the Eisenhower Matrix."
    }
  ],
  "skillGaps": [
    {
      "skill": "5+ years of software development experience (candidate has 3 years)",
      "severity": "high"
    },
    {
      "skill": "Go programming language",
      "severity": "high"
    },
    {
      "skill": "Python programming language",
      "severity": "high"
    },
    {
      "skill": "Kubernetes",
      "severity": "high"
    },
    {
      "skill": "Docker",
      "severity": "high"
    },
    {
      "skill": "AWS cloud infrastructure",
      "severity": "high"
    },
    {
      "skill": "CI/CD pipelines",
      "severity": "medium"
    },
    {
      "skill": "DevOps practices",
      "severity": "medium"
    },
    {
      "skill": "Designing distributed systems",
      "severity": "high"
    },
    {
      "skill": "Microservices architecture",
      "severity": "high"
    },
    {
      "skill": "System security practices",
      "severity": "medium"
    },
    {
      "skill": "Team leadership and mentoring experience",
      "severity": "high"
    },
    {
      "skill": "PostgreSQL",
      "severity": "medium"
    },
    {
      "skill": "Redis",
      "severity": "high"
    },
    {
      "skill": "Architecture skills",
      "severity": "high"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Go & Python Fundamentals",
      "focusDescription": "Introduction to syntax and basic structures.",
      "tasks": [
        "Complete an introductory course/tutorial for Go language, focusing on syntax, concurrency (goroutines, channels), and web development basics.",
        "Complete an introductory course/tutorial for Python, focusing on syntax, data structures, and a basic web framework (e.g., Flask or FastAPI).",
        "Understand the core philosophies and use cases for both languages in backend development."
      ]
    },
    {
      "day": 2,
      "focus": "Containerization (Docker & Kubernetes)",
      "focusDescription": "Understanding containerization and basic orchestration.",
      "tasks": [
        "Learn Docker fundamentals: Dockerfile, images, containers, volumes, networks, Docker Compose.",
        "Understand the core concepts of Kubernetes: Pods, Deployments, Services, Namespaces, ReplicaSets.",
        "Explore basic Kubernetes operations: deploying an application, scaling, exposing services.",
        "Read articles/watch tutorials on container orchestration benefits and challenges."
      ]
    },
    {
      "day": 3,
      "focus": "Cloud Computing (AWS) & Distributed Systems",
      "focusDescription": "Core cloud concepts and distributed architectures.",
      "tasks": [
        "Familiarize with core AWS services: EC2 (compute), S3 (storage), RDS (managed databases), VPC (networking), Lambda (serverless).",
        "Understand the basics of cloud-native architecture and its advantages.",
        "Study fundamental distributed systems concepts: CAP theorem, consistency models, fault tolerance, message queues (e.g., SQS/Kafka concepts)."
      ]
    },
    {
      "day": 4,
      "focus": "Microservices & System Design",
      "focusDescription": "Deep dive into architecture patterns.",
      "tasks": [
        "Deep dive into microservices architecture: benefits, challenges, common patterns (e.g., API Gateway, Service Discovery, Saga).",
        "Practice designing a scalable microservices-based system (e.g., an e-commerce platform). Focus on inter-service communication, data consistency, and error handling.",
        "Review common system design interview questions on scalability, reliability, and availability."
      ]
    },
    {
      "day": 5,
      "focus": "CI/CD, Databases & Leadership",
      "focusDescription": "Modern deployment, supporting databases, and behavioral prep.",
      "tasks": [
        "Review CI/CD concepts: Continuous Integration, Continuous Delivery, Continuous Deployment. Understand common tools (e.g., Jenkins, GitLab CI).",
        "Familiarize with PostgreSQL (SQL syntax, common features) and Redis (caching, pub/sub, data structures) for specific use cases.",
        "Prepare for behavioral questions focusing on leadership, mentoring, communication, and handling technical challenges, drawing examples from past experiences.",
        "Reflect on how to articulate existing experience (Node.js/React) in the context of advanced engineering principles relevant to the senior role."
      ]
    }
  ]
};

const Interview = () => {
  const [activeTab, setActiveTab] = useState("technical");
  const [checkedTasks, setCheckedTasks] = useState({});
  const [expandedQuestion, setExpandedQuestion] = useState(null);

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
  const strokeDashoffset = circumference - (mockInterviewData.matchScore / 100) * circumference;

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
              <span className="tab-count">{mockInterviewData.technicalQuestions.length}</span>
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
              <span className="tab-count">{mockInterviewData.behavioralQuestions.length}</span>
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
              <span className="tab-count">{mockInterviewData.preparationPlan.length}d</span>
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
                {mockInterviewData.technicalQuestions.map((q, idx) => {
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
                {mockInterviewData.behavioralQuestions.map((q, idx) => {
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
                {mockInterviewData.preparationPlan.map((day, dIdx) => (
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
                <span className="score-val">{mockInterviewData.matchScore}%</span>
                <span className="score-lbl">Match</span>
              </div>
            </div>
            <p className="widget-subtext">Resume match score against JD requirements.</p>
          </div>

          <div className="analysis-widget skill-gaps-widget">
            <div className="widget-header-row">
              <h3 className="widget-title">Skill Gaps</h3>
              <span className="gap-badge-count">{mockInterviewData.skillGaps.length}</span>
            </div>
            <div className="skill-gaps-list">
              {mockInterviewData.skillGaps.map((item, idx) => (
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
