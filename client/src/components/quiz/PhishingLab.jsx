import { useEffect, useState } from "react";
import { useScore } from "../../context/ScoreContext";

const QuizLab = ({ goBack }) => {
  const [labData, setLabData] = useState([]);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [vibrate, setVibrate] = useState(true);
  const [showNotification, setShowNotification] = useState(true);
  const [loading, setLoading] = useState(true);
  const { updateStats } = useScore();
  const API_URL  ="http://localhost:5000";

  // Fetch lab scenarios from backend
  useEffect(() => {
    const fetchLabData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/quiz/lab`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setLabData(data);
      } catch (err) {
        console.error("Failed to fetch lab data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLabData();
  }, []);

  // Vibration effect on new scenario
  useEffect(() => {
    const timer = setTimeout(() => setVibrate(false), 600);
    return () => clearTimeout(timer);
  }, [index]);

  // Notification popup for message preview
  useEffect(() => {
    const hideNotification = setTimeout(() => setShowNotification(false), 2500);
    return () => clearTimeout(hideNotification);
  }, [index]);

  const handleChoice = async (choice) => {
    if (result) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/quiz/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          questionId: labData[index]._id,
          selectedAnswer: choice,
        }),
      });
      const data = await res.json();
      setResult(data.correct ? "correct" : "wrong");
    } catch (err) {
      console.error("Failed to submit lab answer:", err);
    }
  };

  const nextScenario = () => {
    if (index === labData.length - 1) {
      const finalPercentage = labData.length ? 100 : 0;
      updateStats(finalPercentage, "lab");
      setIndex(index + 1); // Move to completion screen
    } else {
      setResult(null);
      setIndex((prev) => prev + 1);
      setVibrate(true);
      setShowNotification(true);
    }
  };

  const restartLab = () => {
    setIndex(0);
    setResult(null);
  };

  if (loading) return <p>Loading lab scenarios...</p>;

  if (index >= labData.length)
    return (
      <div className="quiz-card">
        <h2>Lab Completed!</h2>
        <p>Great job! Your awareness has improved.</p>
        <button onClick={restartLab}>Restart Lab</button>
        <button onClick={goBack}>← Back to Quiz</button>
      </div>
    );

  const scenario = labData[index];

  return (
    <section className="quiz-lab">
      <h2>📱 Real‑Life Scam Practice</h2>
      <p>What would you do if you received this message?</p>

      {showNotification && (
        <div className="notification-preview">
          <strong>{scenario.sender}</strong>
          <p>{scenario.message.slice(0, 45)}...</p>
        </div>
      )}

      <div className="lab-progress">
        <div
          className="lab-progress-bar"
          style={{ width: `${((index + 1) / labData.length) * 100}%` }}
        ></div>
      </div>
      <p>
        {index + 1} of {labData.length} messages
      </p>

      <div className={`phone-frame ${vibrate ? "vibrate" : ""}`}>
        <div className="status-bar">
          <span className="signal">📶</span>
          <span className="time">12:41</span>
          <span className="battery">🔋 78%</span>
        </div>

        <div className="phone-header">{scenario.app}</div>

        <div className="message incoming">
          <strong>{scenario.sender}</strong>
          <p>{scenario.message}</p>
          <span className="timestamp">Just now</span>
        </div>

        <div className="phone-actions">
          <button onClick={() => handleChoice("link")}>Open Link</button>
          <button onClick={() => handleChoice("ignore")}>Ignore</button>
          <button className="report" onClick={() => handleChoice("report")}>
            Report Scam
          </button>
        </div>
      </div>

      {result && (
        <div className={`lab-result ${result}`}>
          {result === "correct" ? "✅ Good choice!" : "❌ Unsafe action."}
          <p>{scenario.explanation}</p>
          <button onClick={nextScenario}>Next Message</button>
        </div>
      )}

      <button className="back-quiz" onClick={goBack}>
        ← Back to Quiz
      </button>
    </section>
  );
};

export default QuizLab;
