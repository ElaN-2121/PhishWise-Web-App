import React, { useState } from "react";
import Certificate from "../components/Certificate";
import "../styles/dashboard.css";
import { useScore } from "../context/ScoreContext";

const Dashboard = ({ startQuiz }) => {
  const { stats } = useScore();
  const [showCertificate, setShowCertificate] = useState(false);

  // Popups
  const [notification, setNotification] = useState("");
  const [lockMessage, setLockMessage] = useState("");

  const progressData = [
    {
      type: "Knowledge Quiz",
      progress: stats.percentages.knowledge || 0,
    },
    {
      type: "Real-World Quiz",
      progress: stats.percentages.realWorld || 0,
    },
    {
      type: "Phishing Lab",
      progress: stats.percentages.lab || 0,
    },
  ];

  // Certificate eligibility: ≥80% for each quiz type
  const eligibleForCertificate =
    stats.percentages.knowledge >= 80 &&
    stats.percentages.realWorld >= 80 &&
    stats.percentages.lab >= 80;

  const handleCertClick = () => {
    if (eligibleForCertificate) {
      setNotification("Certificate Generated Successfully! 🎉");
      setShowCertificate(true);
      setTimeout(() => setNotification(""), 3000);
    } else {
      setLockMessage(
        "🔒 Locked: Complete all sections with ≥80% to unlock your certificate!"
      );
      setTimeout(() => setLockMessage(""), 3500);
    }
  };

  return (
    <main className="dashboard-main">
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
              />
            </div>
            <span>{item.progress}%</span>
          </div>
        ))}
      </section>

      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <button onClick={() => startQuiz("knowledge")}>🧠 Start Knowledge Quiz</button>
        <button onClick={() => startQuiz("real")}>🌍 Start Real-World Quiz</button>
        <button onClick={() => startQuiz("lab")}>🧪 Open Phishing Lab</button>
        <button
          className={`cert-btn ${eligibleForCertificate ? "active" : "locked"}`}
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
