import React, { useState } from "react";

import KnowledgeQuiz from "../components/quiz/KnowledgeQuiz";
import PhishingLab from "../components/quiz/PhishingLab";
import RealWorldQuiz from "../components/quiz/RealWorldQuiz";

import "../styles/quiz.css";

const Quiz = () => {
  const [mode, setMode] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleModeSelect = (selectedMode) => {
    setLoading(true);
    setMode(selectedMode);
    // Simulate short loading, or can await backend fetch in child components
    setTimeout(() => setLoading(false), 300);
  };

  return (
    <div className="quiz-page">
      <h1>Phishing Quiz Center</h1>

      {!mode && !loading && (
        <div className="quiz-modes">
          <button onClick={() => handleModeSelect("knowledge")}>
            🧠 Knowledge Quiz
          </button>
          <button onClick={() => handleModeSelect("real")}>
            🌍 Real-World Scenarios
          </button>
          <button onClick={() => handleModeSelect("lab")}>
            🧪 Phishing Lab
          </button>
        </div>
      )}

      {loading && <p>Loading quiz...</p>}

      {mode === "knowledge" && <KnowledgeQuiz goBack={() => setMode(null)} />}
      {mode === "real" && <RealWorldQuiz goBack={() => setMode(null)} />}
      {mode === "lab" && <PhishingLab goBack={() => setMode(null)} />}
    </div>
  );
};

export default Quiz;
