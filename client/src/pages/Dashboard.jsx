import React, { useState } from "react";
import Certificate from "../components/Certificate";
import "../styles/dashboard.css";
import { useScore } from "../context/ScoreContext";

const TOTAL_QUIZZES = 3;
const TOTAL_LABS = 3;

const Dashboard = () => {
  const { stats } = useScore();
  const [showCertificate, setShowCertificate] = useState(false);

  // States for notifications
  const [notification, setNotification] = useState(""); // For success
  const [lockMessage, setLockMessage] = useState(""); // For locked state

  const progressData = [
    {
      type: "Knowledge Quiz",
      // Use the actual score percentage sent from the quiz
      progress: stats.knowledgeCompleted > 0 ? stats.totalScore : 0,
    },
    {
      type: "Real-World Quiz",
      progress: stats.realWorldCompleted > 0 ? stats.totalScore : 0,
    },
    {
      type: "Phishing Lab",
      // Keep Labs as completion-based since they are pass/fail
      progress: Math.round((stats.labsCompleted / TOTAL_LABS) * 100),
    },
  ];

  // Logic: Must have completed at least 1 of each quiz type and all labs with 100% avg
  const allCorrect =
    stats.knowledgeCompleted >= 1 &&
    stats.realWorldCompleted >= 1 &&
    stats.labsCompleted === TOTAL_LABS &&
    stats.totalScore === 100;

  const handleCertClick = () => {
    if (allCorrect) {
      setNotification("Certificate Generated Successfully! 🎉");
      setShowCertificate(true);
      setTimeout(() => setNotification(""), 3000);
    } else {
      setLockMessage(
        "🔒 Locked: Complete all sections with 100% to unlock your certificate!",
      );
      setTimeout(() => setLockMessage(""), 3500);
    }
  };

  return (
    <main className="dashboard-main">
      {/* Popups */}
      {notification && <div className="success-popup">{notification}</div>}
      {lockMessage && <div className="lock-popup">{lockMessage}</div>}

      <h1>Welcome to Your Dashboard</h1>

      <div className="overview-cards">
        <div className="dcard">
          <h3>Knowledge Quizzes</h3>
          <p>{stats.knowledgeCompleted}</p>
        </div>
        <div className="dcard">
          <h3>Real-World Quizzes</h3>
          <p>{stats.realWorldCompleted}</p>
        </div>
        <div className="dcard">
          <h3>Labs Completed</h3>
          <p>{stats.labsCompleted}</p>
        </div>
        <div className="dcard">
          <h3>Phishing Level</h3>
          <p>{stats.level}</p>
        </div>
      </div>

      <section className="progress-section">
        <h2>Your Progress</h2>
        {progressData.map((item, idx) => (
          <div key={idx} className="progress-bar-container">
            <span>{item.type}</span>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${item.progress}%` }}
              ></div>
            </div>
            <span>{item.progress}%</span>
          </div>
        ))}
      </section>

      <section className="recent-labs">
        <h2>Recent Lab Attempts</h2>
        <ul>
          {stats.labsCompleted > 0 ? (
            <li className="lab-result correct">
              <span>Latest Phishing Lab</span>
              <span className="result-badge">Completed</span>
            </li>
          ) : (
            <li>No labs completed yet.</li>
          )}
        </ul>
      </section>

      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <button>🧠 Start Knowledge Quiz</button>
        <button>🧪 Open Phishing Lab</button>

        {/* Removed 'disabled' so we can capture clicks for the popup */}
        <button
          className={`cert-btn ${allCorrect ? "active" : "locked"}`}
          onClick={handleCertClick}
        >
          🎓 Generate Certificate
        </button>
      </section>

      {showCertificate && (
        <div
          className="certificate-modal"
          onClick={(e) => {
            if (e.target.className === "certificate-modal")
              setShowCertificate(false);
          }}
        >
          <Certificate level={stats.level} />
        </div>
      )}
    </main>
  );
};

export default Dashboard;
