import React, { useState } from "react";

import KnowledgeQuiz from "../components/quiz/KnowledgeQuiz";
import PhishingLab from "../components/quiz/PhishingLab";
import RealWorldQuiz from "../components/quiz/RealWorldQuiz";

import "../styles/quiz.css";

const Quiz = () => {
  const [mode, setMode] = useState(null);

  return (
    <div className="quiz-page">
      <h1>Phishing Quiz Center</h1>

      {!mode && (
        <div className="quiz-modes">
          <button onClick={() => setMode("knowledge")}>
            🧠 Knowledge Quiz
          </button>
          <button onClick={() => setMode("real")}>
            🌍 Real-World Scenarios
          </button>
          <button onClick={() => setMode("lab")}>
            🧪 Phishing Lab
          </button>
        </div>
      )}

      {mode === "knowledge" && <KnowledgeQuiz goBack={() => setMode(null)} />}
      {mode === "real" && <RealWorldQuiz goBack={() => setMode(null)} />}
      {mode === "lab" && <PhishingLab goBack={() => setMode(null)} />}
    </div>
  );
};

export default Quiz;
