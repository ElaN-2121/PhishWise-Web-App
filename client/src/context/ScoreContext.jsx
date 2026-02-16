import React, { createContext, useState, useContext } from "react";

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [stats, setStats] = useState({
    knowledgeCompleted: 0,
    realWorldCompleted: 0,
    labsCompleted: 0,
    totalScore: 0,
    level: "Beginner",
  });

  const updateStats = (score, type) => {
    setStats((prev) => {
      const newStats = { ...prev };

      if (type === "knowledge") newStats.knowledgeCompleted += 1;
      else if (type === "realWorld") newStats.realWorldCompleted += 1;
      else if (type === "lab") newStats.labsCompleted += 1;

      newStats.totalScore = score;

      const totalFinished =
        newStats.knowledgeCompleted +
        newStats.realWorldCompleted +
        newStats.labsCompleted;

      if (totalFinished > 10) newStats.level = "Advanced";
      else if (totalFinished > 5) newStats.level = "Intermediate";
      else newStats.level = "Beginner";

      return newStats; // Only one return here
    });
  };

  return (
    <ScoreContext.Provider value={{ stats, updateStats }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => useContext(ScoreContext);
